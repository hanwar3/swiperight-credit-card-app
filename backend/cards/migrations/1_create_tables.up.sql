CREATE TABLE cards (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  issuer TEXT NOT NULL,
  image_url TEXT,
  annual_fee INTEGER NOT NULL DEFAULT 0,
  network TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE card_categories (
  id BIGSERIAL PRIMARY KEY,
  card_id BIGINT REFERENCES cards(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  cashback_rate DOUBLE PRECISION NOT NULL,
  is_rotating BOOLEAN DEFAULT FALSE,
  valid_until DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE user_cards (
  id BIGSERIAL PRIMARY KEY,
  card_id BIGINT REFERENCES cards(id) ON DELETE CASCADE,
  nickname TEXT,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert popular credit cards with proper image URLs and networks
INSERT INTO cards (name, issuer, image_url, annual_fee, network) VALUES
('Chase Sapphire Reserve', 'Chase', 'https://creditcards.chase.com/K-Marketplace/images/cardart/sapphire_reserve_card.png', 550, 'Visa'),
('Chase Freedom Unlimited', 'Chase', 'https://creditcards.chase.com/K-Marketplace/images/cardart/freedom_unlimited_card.png', 0, 'Visa'),
('Chase Freedom Flex', 'Chase', 'https://creditcards.chase.com/K-Marketplace/images/cardart/freedom_flex_card.png', 0, 'Mastercard'),
('American Express Gold Card', 'American Express', 'https://icm.aexp-static.com/Internet/Acquisition/US_en/AppContent/OneSite/category/cardarts/gold-card.png', 250, 'American Express'),
('American Express Platinum Card', 'American Express', 'https://icm.aexp-static.com/Internet/Acquisition/US_en/AppContent/OneSite/category/cardarts/platinum-card.png', 695, 'American Express'),
('Capital One Venture X', 'Capital One', 'https://ecm.capitalone.com/WCM/card/products/venture-x-card-art.png', 395, 'Visa'),
('Capital One Savor One', 'Capital One', 'https://ecm.capitalone.com/WCM/card/products/savor-one-card-art.png', 0, 'Mastercard'),
('Citi Double Cash Card', 'Citi', 'https://www.citi.com/CRD/images/citi-double-cash-card.png', 0, 'Mastercard'),
('Discover it Cash Back', 'Discover', 'https://www.discover.com/credit-cards/images/cardart/discover-it-cash-back-card.png', 0, 'Discover'),
('Wells Fargo Active Cash Card', 'Wells Fargo', 'https://www.wellsfargo.com/assets/images/personal/credit-cards/product-art/active-cash-card.png', 0, 'Visa'),
('Amex Blue Cash Everyday', 'American Express', 'https://icm.aexp-static.com/Internet/Acquisition/US_en/AppContent/OneSite/category/cardarts/blue-cash-everyday-card.png', 0, 'American Express'),
('Bank of America Cash Rewards', 'Bank of America', 'https://www.bankofamerica.com/content/images/ContextualSiteGraphics/CreditCardArt/en_US/Approved/cash_rewards_card_v1.png', 0, 'Visa'),
('US Bank Cash+', 'US Bank', 'https://www.usbank.com/dam/images/credit-cards/cash-plus-card-art.png', 0, 'Visa');

-- Insert card categories and cashback rates
INSERT INTO card_categories (card_id, category, cashback_rate, is_rotating, valid_until) VALUES
-- Chase Sapphire Reserve
(1, 'Travel', 3.0, FALSE, NULL),
(1, 'Dining', 3.0, FALSE, NULL),
(1, 'Other', 1.0, FALSE, NULL),

-- Chase Freedom Unlimited
(2, 'All Purchases', 1.5, FALSE, NULL),
(2, 'Drugstores', 3.0, FALSE, NULL),
(2, 'Dining', 3.0, FALSE, NULL),

-- Chase Freedom Flex
(3, 'Groceries', 5.0, TRUE, '2024-09-30'),
(3, 'Gas', 5.0, TRUE, '2024-12-31'),
(3, 'Drugstores', 3.0, FALSE, NULL),
(3, 'Dining', 3.0, FALSE, NULL),
(3, 'Other', 1.0, FALSE, NULL),

-- American Express Gold Card
(4, 'Dining', 4.0, FALSE, NULL),
(4, 'Groceries', 4.0, FALSE, NULL),
(4, 'Other', 1.0, FALSE, NULL),

-- American Express Platinum Card
(5, 'Flights', 5.0, FALSE, NULL),
(5, 'Hotels', 5.0, FALSE, NULL),
(5, 'Other', 1.0, FALSE, NULL),

-- Capital One Venture X
(6, 'Travel', 2.0, FALSE, NULL),
(6, 'All Purchases', 2.0, FALSE, NULL),

-- Capital One Savor One
(7, 'Dining', 3.0, FALSE, NULL),
(7, 'Entertainment', 3.0, FALSE, NULL),
(7, 'Streaming', 3.0, FALSE, NULL),
(7, 'Other', 1.0, FALSE, NULL),

-- Citi Double Cash Card
(8, 'All Purchases', 2.0, FALSE, NULL),

-- Discover it Cash Back
(9, 'Gas', 5.0, TRUE, '2024-12-31'),
(9, 'Restaurants', 5.0, TRUE, '2024-12-31'),
(9, 'Other', 1.0, FALSE, NULL),

-- Wells Fargo Active Cash Card
(10, 'All Purchases', 2.0, FALSE, NULL),

-- Amex Blue Cash Everyday
(11, 'Groceries', 3.0, FALSE, NULL),
(11, 'Gas', 2.0, FALSE, NULL),
(11, 'Department Stores', 2.0, FALSE, NULL),
(11, 'Other', 1.0, FALSE, NULL),

-- Bank of America Cash Rewards
(12, 'Gas', 3.0, FALSE, NULL),
(12, 'Online Shopping', 3.0, FALSE, NULL),
(12, 'Dining', 2.0, FALSE, NULL),
(12, 'Other', 1.0, FALSE, NULL),

-- US Bank Cash+
(13, 'Gas', 5.0, TRUE, NULL),
(13, 'Groceries', 5.0, TRUE, NULL),
(13, 'Restaurants', 5.0, TRUE, NULL),
(13, 'Other', 1.0, FALSE, NULL);
