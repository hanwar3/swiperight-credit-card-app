-- Add user portfolios and merchant offers functionality
CREATE TABLE user_portfolios (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  card_id BIGINT REFERENCES cards(id) ON DELETE CASCADE,
  nickname TEXT,
  credit_limit INTEGER,
  current_balance INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, card_id)
);

CREATE TABLE merchant_offers (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  card_id BIGINT REFERENCES cards(id) ON DELETE CASCADE,
  merchant_name TEXT NOT NULL,
  offer_description TEXT NOT NULL,
  cashback_rate DOUBLE PRECISION,
  cashback_amount INTEGER, -- in cents
  minimum_spend INTEGER, -- in cents
  maximum_cashback INTEGER, -- in cents
  offer_type VARCHAR(50) NOT NULL DEFAULT 'cashback', -- 'cashback', 'statement_credit', 'bonus_points'
  start_date DATE,
  end_date DATE,
  is_activated BOOLEAN DEFAULT FALSE,
  is_used BOOLEAN DEFAULT FALSE,
  usage_count INTEGER DEFAULT 0,
  max_usage INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE merchant_offer_sync (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  sync_data JSONB NOT NULL,
  sync_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  source VARCHAR(50) DEFAULT 'browser_extension'
);

-- Add indexes for performance
CREATE INDEX idx_user_portfolios_user_id ON user_portfolios(user_id);
CREATE INDEX idx_user_portfolios_card_id ON user_portfolios(card_id);
CREATE INDEX idx_merchant_offers_user_id ON merchant_offers(user_id);
CREATE INDEX idx_merchant_offers_card_id ON merchant_offers(card_id);
CREATE INDEX idx_merchant_offers_merchant ON merchant_offers(merchant_name);
CREATE INDEX idx_merchant_offers_active ON merchant_offers(is_activated, is_used, end_date);
CREATE INDEX idx_merchant_offer_sync_user_id ON merchant_offer_sync(user_id);

-- Update cards table to include network information
ALTER TABLE cards ADD COLUMN IF NOT EXISTS network VARCHAR(50) DEFAULT 'Visa';

-- Update existing cards with proper network information
UPDATE cards SET network = 'Visa' WHERE network IS NULL AND (issuer LIKE '%Chase%' OR issuer LIKE '%Wells Fargo%' OR issuer LIKE '%Bank of America%');
UPDATE cards SET network = 'Mastercard' WHERE issuer LIKE '%Citi%' OR name LIKE '%Freedom Flex%' OR name LIKE '%Savor%';
UPDATE cards SET network = 'American Express' WHERE issuer = 'American Express';
UPDATE cards SET network = 'Discover' WHERE issuer = 'Discover';
