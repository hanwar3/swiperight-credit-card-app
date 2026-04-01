import { api } from "encore.dev/api";
import { secret } from "encore.dev/config";
import { cardsDB } from "../cards/db";

const geminiApiKey = secret("GeminiApiKey");

export interface ChatRequest {
  message: string;
  context?: string;
  userId?: string;
}

export interface ChatResponse {
  response: string;
}

// Processes user queries about credit card optimization and cashback strategies.
export const chat = api<ChatRequest, ChatResponse>(
  { expose: true, method: "POST", path: "/ai/chat" },
  async (req) => {
    let portfolioContext = "";

    if (req.userId) {
      try {
        const portfolioRows = await cardsDB.queryAll`
          SELECT up.id, up.card_id, up.nickname, c.name, c.issuer
          FROM user_portfolios up
          JOIN cards c ON up.card_id = c.id
          WHERE up.user_id = ${req.userId} AND up.is_active = TRUE
        `;

        if (portfolioRows.length > 0) {
          portfolioContext = "\n\nThe user has the following cards in their portfolio:\n";
          for (const row of portfolioRows) {
            const categoryRows = await cardsDB.queryAll`
              SELECT category, cashback_rate
              FROM card_categories
              WHERE card_id = ${row.card_id}
              ORDER BY cashback_rate DESC
            `;

            const categoriesText = categoryRows.map(c => `${c.cashback_rate}% on ${c.category}`).join(", ");
            const cardName = row.nickname || row.name;
            portfolioContext += `- ${cardName} (${row.issuer}): ${categoriesText}\n`;
          }
          portfolioContext += "\nPlease tailor your recommendations to these cards when answering questions about what card to use.";
        }
      } catch (err) {
        console.error('Error fetching user portfolio for chat:', err);
      }
    }

    const systemPrompt = `You are SwipeRight AI, an expert credit card advisor. Help users maximize their cashback and rewards by:

1. Recommending the best cards for specific purchases (groceries, gas, dining, etc.)
2. Explaining how to track rotating category benefits and annual limits
3. Providing strategies to optimize credit card usage
4. Answering questions about credit card features and benefits

Keep responses concise, helpful, and focused on maximizing rewards. Always consider the user's spending patterns and suggest practical advice.

Context about available cards: Chase Freedom Flex (5% rotating categories), Chase Sapphire Reserve (3% travel/dining), Amex Gold (4% dining/groceries), Citi Double Cash (2% everything), Discover it (5% rotating), and many others.${portfolioContext}`;

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
