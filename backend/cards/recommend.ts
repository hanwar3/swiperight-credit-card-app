import { api } from "encore.dev/api";
import { Query } from "encore.dev/api";
import { cardsDB } from "./db";
import type { Card, CardCategory } from "./list";

export interface RecommendCardsParams {
  category: Query<string>;
}

export interface RecommendCardsResponse {
  cards: Card[];
  category: string;
}

// Recommends the best credit cards for a specific spending category.
export const recommend = api<RecommendCardsParams, RecommendCardsResponse>(
  { expose: true, method: "GET", path: "/cards/recommend" },
  async (params) => {
    const category = params.category.toLowerCase();
    const cards: Card[] = [];
    
    const cardRows = await cardsDB.queryAll`
      SELECT DISTINCT c.id, c.name, c.issuer, c.image_url, c.annual_fee,
             cc.cashback_rate
      FROM cards c
      JOIN card_categories cc ON c.id = cc.card_id
      WHERE LOWER(cc.category) LIKE ${'%' + category + '%'} 
         OR LOWER(cc.category) = 'all purchases'
      ORDER BY cc.cashback_rate DESC, c.name
    `;
    
    for (const cardRow of cardRows) {
      const categoryRows = await cardsDB.queryAll`
        SELECT id, category, cashback_rate, is_rotating, valid_until
        FROM card_categories 
        WHERE card_id = ${cardRow.id}
        ORDER BY cashback_rate DESC
      `;
      
      const categories: CardCategory[] = categoryRows.map(cat => ({
        id: cat.id,
        category: cat.category,
        cashbackRate: cat.cashback_rate,
        isRotating: cat.is_rotating,
        validUntil: cat.valid_until ? cat.valid_until.toISOString().split('T')[0] : undefined
      }));
      
      cards.push({
        id: cardRow.id,
        name: cardRow.name,
        issuer: cardRow.issuer,
        imageUrl: cardRow.image_url,
        annualFee: cardRow.annual_fee,
        categories
      });
    }
    
    return { cards, category: params.category };
  }
);
