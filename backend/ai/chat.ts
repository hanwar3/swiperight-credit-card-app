import { api } from "encore.dev/api";
import { secret } from "encore.dev/config";
import { cards } from "~encore/clients";

const geminiApiKey = secret("GeminiApiKey");

export interface ChatRequest {
  message: string;
  userId?: string;
}

export interface ChatResponse {
  response: string;
}

// Processes user queries about credit card optimization and cashback strategies.
export const chat = api<ChatRequest, ChatResponse>(
  { expose: true, method: "POST", path: "/ai/chat" },
  async (req) => {
    let userPortfolioContext = "The user has not provided their portfolio, or they are not signed in.";
    if (req.userId) {
      try {
        const portfolio = await cards.getUserPortfolio({ userId: req.userId });
        if (portfolio.cards.length > 0) {
          const cardDescriptions = portfolio.cards.map(userCard => {
            const categories = userCard.card.categories
              .map(cat => `${cat.category} at ${cat.cashbackRate}%`)
              .join(', ');
            return `- ${userCard.nickname || userCard.card.name} (${userCard.card.issuer}): Offers ${categories}.`;
          }).join('\n');
          userPortfolioContext = `Here is the user's current credit card portfolio:\n${cardDescriptions}`;
        } else {
          userPortfolioContext = "The user has an empty portfolio.";
        }
      } catch (error) {
        console.error("Failed to fetch user portfolio for AI context:", error);
        userPortfolioContext = "There was an error fetching the user's portfolio. Please inform the user about this issue.";
      }
    }

    const systemPrompt = `You are SwipeRight AI, an expert credit card advisor. Your primary goal is to help users maximize their cashback and rewards by recommending the best card *from their portfolio* for a specific purchase.

    ${userPortfolioContext}

    When the user asks for a recommendation (e.g., "what card for groceries?"), first check their portfolio. If a card in their portfolio offers a good rate for that category, recommend it. Explain why it's a good choice (e.g., "Use your Amex Gold for groceries to get 4% back.").

    If no card in their portfolio is a good fit, you can suggest other cards from the general database, but make it clear that these are not in the user's wallet. For example: "None of your cards have a high rate for that. However, the 'Some Other Card' offers 5% on that category."

    If the user asks a general question (e.g., "what are the best travel cards?"), you can answer more broadly using your general knowledge.

    Keep responses concise, helpful, and focused on maximizing rewards. Always prioritize the user's existing cards for spending recommendations.`;

    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': geminiApiKey()
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: systemPrompt
                },
                {
                  text: req.message
                }
              ]
            }
          ]
        })
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error(`Gemini API error: ${response.status}`, errorBody);
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't process your request. Please try again.";

      return { response: aiResponse };
    } catch (error) {
      console.error('AI chat error:', error);
      return { 
        response: "I'm experiencing technical difficulties. Please try asking your question again in a moment." 
      };
    }
  }
);
