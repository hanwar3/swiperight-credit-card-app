-- Enhance cards table with additional fields for comprehensive database
ALTER TABLE cards ADD COLUMN IF NOT EXISTS features JSONB DEFAULT '[]';
ALTER TABLE cards ADD COLUMN IF NOT EXISTS welcome_bonus TEXT;
ALTER TABLE cards ADD COLUMN IF NOT EXISTS credit_range TEXT DEFAULT 'Good to Excellent';
ALTER TABLE cards ADD COLUMN IF NOT EXISTS apply_url TEXT;
ALTER TABLE cards ADD COLUMN IF NOT EXISTS is_popular BOOLEAN DEFAULT FALSE;
ALTER TABLE cards ADD COLUMN IF NOT EXISTS rating DECIMAL(2,1) DEFAULT 4.0;
ALTER TABLE cards ADD COLUMN IF NOT EXISTS review_count INTEGER DEFAULT 0;
ALTER TABLE cards ADD COLUMN IF NOT EXISTS last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Update existing cards with enhanced data
UPDATE cards SET 
  features = '["No Foreign Transaction Fees", "Travel Insurance", "Airport Lounge Access"]',
  welcome_bonus = '60,000 bonus points after spending $4,000 in first 3 months',
  is_popular = TRUE,
  rating = 4.8,
  review_count = 2547
WHERE name = 'Chase Sapphire Reserve';

UPDATE cards SET 
  features = '["No Annual Fee", "Cell Phone Protection", "Purchase Protection"]',
  welcome_bonus = '$200 cash back after spending $500 in first 3 months',
  is_popular = TRUE,
  rating = 4.6,
  review_count = 1823
WHERE name = 'Chase Freedom Unlimited';

UPDATE cards SET 
  features = '["5% Rotating Categories", "No Annual Fee", "Cashback Match"]',
  welcome_bonus = '5% cash back on up to $1,500 in combined purchases in bonus categories',
  is_popular = TRUE,
  rating = 4.5,
  review_count = 1456
WHERE name = 'Chase Freedom Flex';

UPDATE cards SET 
  features = '["4x Points on Dining", "4x Points on Groceries", "Uber Credits"]',
  welcome_bonus = '60,000 Membership Rewards points after spending $4,000 in first 6 months',
  is_popular = TRUE,
  rating = 4.7,
  review_count = 1987
WHERE name = 'American Express Gold Card';

UPDATE cards SET 
  features = '["5x Points on Flights", "5x Points on Hotels", "Centurion Lounge Access"]',
  welcome_bonus = '80,000 Membership Rewards points after spending $6,000 in first 6 months',
  is_popular = TRUE,
  rating = 4.4,
  review_count = 1234
WHERE name = 'American Express Platinum Card';

UPDATE cards SET 
  features = '["2x Miles on Everything", "10,000 Mile Anniversary Bonus", "No Foreign Transaction Fees"]',
  welcome_bonus = '75,000 bonus miles after spending $4,000 in first 3 months',
  is_popular = TRUE,
  rating = 4.6,
  review_count = 987
WHERE name = 'Capital One Venture X';

UPDATE cards SET 
  features = '["3% on Dining", "3% on Entertainment", "3% on Streaming", "No Annual Fee"]',
  welcome_bonus = '$200 cash bonus after spending $500 in first 3 months',
  rating = 4.3,
  review_count = 756
WHERE name = 'Capital One Savor One';

UPDATE cards SET 
  features = '["2% Cash Back on Everything", "No Annual Fee", "18-Month 0% APR"]',
  welcome_bonus = '$200 cash back after spending $1,500 in first 6 months',
  rating = 4.4,
  review_count = 1567
WHERE name = 'Citi Double Cash Card';

UPDATE cards SET 
  features = '["5% Rotating Categories", "Cashback Match", "No Annual Fee"]',
  welcome_bonus = 'Unlimited Cashback Match for your first year',
  rating = 4.2,
  review_count = 1098
WHERE name = 'Discover it Cash Back';

UPDATE cards SET 
  features = '["2% Cash Back on Everything", "No Annual Fee", "Cell Phone Protection"]',
  welcome_bonus = '$200 cash rewards bonus after spending $1,000 in first 3 months',
  rating = 4.1,
  review_count = 543
WHERE name = 'Wells Fargo Active Cash Card';

-- Add more comprehensive cards to the database
INSERT INTO cards (name, issuer, image_url, annual_fee, network, features, welcome_bonus, credit_range, is_popular, rating, review_count) VALUES
('Chase Sapphire Preferred', 'Chase', 'https://creditcards.chase.com/K-Marketplace/images/cardart/sapphire_preferred_card.png', 95, 'Visa', 
 '["2x Points on Travel and Dining", "No Foreign Transaction Fees", "Transfer Partners"]', 
 '60,000 bonus points after spending $4,000 in first 3 months', 'Good to Excellent', TRUE, 4.5, 1876),

('American Express Blue Cash Preferred', 'American Express', 'https://icm.aexp-static.com/Internet/Acquisition/US_en/AppContent/OneSite/category/cardarts/blue-cash-preferred-card.png', 95, 'American Express',
 '["6% Cash Back at Groceries", "6% Cash Back on Streaming", "3% Cash Back on Gas"]',
 '$350 statement credit after spending $3,000 in first 6 months', 'Good to Excellent', TRUE, 4.6, 1432),

('Capital One Quicksilver', 'Capital One', 'https://ecm.capitalone.com/WCM/card/products/quicksilver-card-art.png', 0, 'Visa',
 '["1.5% Cash Back on Everything", "No Annual Fee", "No Foreign Transaction Fees"]',
 '$200 cash bonus after spending $500 in first 3 months', 'Fair to Excellent', FALSE, 4.2, 987),

('Citi Premier Card', 'Citi', 'https://www.citi.com/CRD/images/citi-premier-card.png', 95, 'Mastercard',
 '["3x Points on Travel", "3x Points on Gas", "3x Points on Groceries"]',
 '80,000 bonus points after spending $4,000 in first 3 months', 'Good to Excellent', FALSE, 4.3, 654),

('Bank of America Premium Rewards', 'Bank of America', 'https://www.bankofamerica.com/content/images/ContextualSiteGraphics/CreditCardArt/en_US/Approved/premium_rewards_card_v1.png', 95, 'Visa',
 '["2x Points on Travel and Dining", "1.5x Points on Everything", "Airline Fee Credits"]',
 '60,000 bonus points after spending $4,000 in first 3 months', 'Excellent', FALSE, 4.1, 432),

('Wells Fargo Bilt Mastercard', 'Wells Fargo', 'https://www.wellsfargo.com/assets/images/personal/credit-cards/product-art/bilt-card.png', 0, 'Mastercard',
 '["3x Points on Dining", "2x Points on Travel", "1x Point on Rent"]',
 'No welcome bonus', 'Good to Excellent', FALSE, 4.4, 876),

('US Bank Altitude Go', 'US Bank', 'https://www.usbank.com/dam/images/credit-cards/altitude-go-card-art.png', 0, 'Visa',
 '["4x Points on Dining", "2x Points on Groceries", "2x Points on Streaming"]',
 '20,000 bonus points after spending $1,000 in first 3 months', 'Good to Excellent', FALSE, 4.0, 321);

-- Insert categories for new cards
INSERT INTO card_categories (card_id, category, cashback_rate, is_rotating, valid_until) VALUES
-- Chase Sapphire Preferred (assuming it gets ID 14)
(14, 'Travel', 2.0, FALSE, NULL),
(14, 'Dining', 2.0, FALSE, NULL),
(14, 'Other', 1.0, FALSE, NULL),

-- American Express Blue Cash Preferred (ID 15)
(15, 'Groceries', 6.0, FALSE, NULL),
(15, 'Streaming', 6.0, FALSE, NULL),
(15, 'Gas', 3.0, FALSE, NULL),
(15, 'Other', 1.0, FALSE, NULL),

-- Capital One Quicksilver (ID 16)
(16, 'All Purchases', 1.5, FALSE, NULL),

-- Citi Premier Card (ID 17)
(17, 'Travel', 3.0, FALSE, NULL),
(17, 'Gas', 3.0, FALSE, NULL),
(17, 'Groceries', 3.0, FALSE, NULL),
(17, 'Other', 1.0, FALSE, NULL),

-- Bank of America Premium Rewards (ID 18)
(18, 'Travel', 2.0, FALSE, NULL),
(18, 'Dining', 2.0, FALSE, NULL),
(18, 'All Purchases', 1.5, FALSE, NULL),

-- Wells Fargo Bilt Mastercard (ID 19)
(19, 'Dining', 3.0, FALSE, NULL),
(19, 'Travel', 2.0, FALSE, NULL),
(19, 'Rent', 1.0, FALSE, NULL),
(19, 'Other', 1.0, FALSE, NULL),

-- US Bank Altitude Go (ID 20)
(20, 'Dining', 4.0, FALSE, NULL),
(20, 'Groceries', 2.0, FALSE, NULL),
(20, 'Streaming', 2.0, FALSE, NULL),
(20, 'Other', 1.0, FALSE, NULL);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_cards_popular ON cards(is_popular);
CREATE INDEX IF NOT EXISTS idx_cards_rating ON cards(rating);
CREATE INDEX IF NOT EXISTS idx_cards_issuer_network ON cards(issuer, network);
CREATE INDEX IF NOT EXISTS idx_cards_annual_fee ON cards(annual_fee);
