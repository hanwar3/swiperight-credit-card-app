-- Add comprehensive credit card database with all major issuers
-- First, let's add all the new cards with their basic information

-- Chase Cards
INSERT INTO cards (name, issuer, image_url, annual_fee, network, features, welcome_bonus, credit_range, apply_url, is_popular, rating, review_count) VALUES
('Chase Sapphire Preferred® Card', 'Chase', 'https://creditcards.chase.com/K-Marketplace/images/cardart/sapphire_preferred_card.png', 95, 'Visa', 
 '["2x Points on Travel and Dining", "No Foreign Transaction Fees", "Transfer Partners", "Trip Cancellation/Interruption Insurance"]', 
 '60,000 bonus points after spending $4,000 in first 3 months', 'Good to Excellent', 'https://creditcards.chase.com/rewards-credit-cards/sapphire/preferred', TRUE, 4.5, 1876),

('Chase Freedom Rise®', 'Chase', 'https://creditcards.chase.com/K-Marketplace/images/cardart/freedom_rise_card.png', 0, 'Mastercard',
 '["1.5% Cash Back on Everything", "No Annual Fee", "Build Credit History"]',
 '$200 cash back after spending $500 in first 3 months', 'Fair to Good', 'https://creditcards.chase.com/cash-back-credit-cards/freedom/rise', FALSE, 4.2, 543),

('United Quest℠ Card', 'Chase', 'https://creditcards.chase.com/K-Marketplace/images/cardart/united_quest_card.png', 250, 'Visa',
 '["2x Miles on United Purchases", "2x Miles on Dining", "Free First Checked Bag", "Priority Boarding"]',
 '80,000 bonus miles after spending $5,000 in first 3 months', 'Good to Excellent', 'https://creditcards.chase.com/airline-credit-cards/united/quest', FALSE, 4.3, 987),

('Southwest Rapid Rewards® Plus Credit Card', 'Chase', 'https://creditcards.chase.com/K-Marketplace/images/cardart/southwest_plus_card.png', 99, 'Visa',
 '["2x Points on Southwest Purchases", "2x Points on Rapid Rewards Hotel Partners", "6,000 Anniversary Points"]',
 '50,000 points after spending $2,000 in first 3 months', 'Good to Excellent', 'https://creditcards.chase.com/southwest-credit-cards/plus', FALSE, 4.1, 654),

('Southwest Rapid Rewards® Premier Credit Card', 'Chase', 'https://creditcards.chase.com/K-Marketplace/images/cardart/southwest_premier_card.png', 99, 'Visa',
 '["2x Points on Southwest Purchases", "2x Points on Rapid Rewards Partners", "6,000 Anniversary Points", "25% Back on Inflight Purchases"]',
 '60,000 points after spending $3,000 in first 3 months', 'Good to Excellent', 'https://creditcards.chase.com/southwest-credit-cards/premier', FALSE, 4.2, 432),

('Southwest Rapid Rewards® Priority Credit Card', 'Chase', 'https://creditcards.chase.com/K-Marketplace/images/cardart/southwest_priority_card.png', 149, 'Visa',
 '["2x Points on Southwest Purchases", "2x Points on Rapid Rewards Partners", "7,500 Anniversary Points", "Upgraded Boarding Credits"]',
 '65,000 points after spending $3,000 in first 3 months', 'Good to Excellent', 'https://creditcards.chase.com/southwest-credit-cards/priority', FALSE, 4.0, 321),

('Ink Business Unlimited®', 'Chase', 'https://creditcards.chase.com/K-Marketplace/images/cardart/ink_business_unlimited_card.png', 0, 'Visa',
 '["1.5% Cash Back on Everything", "No Annual Fee", "Cell Phone Protection", "Purchase Protection"]',
 '$900 bonus cash back after spending $6,000 in first 3 months', 'Good to Excellent', 'https://creditcards.chase.com/business-credit-cards/ink/business-unlimited', FALSE, 4.4, 876),

('Ink Business Preferred® Credit Card', 'Chase', 'https://creditcards.chase.com/K-Marketplace/images/cardart/ink_business_preferred_card.png', 95, 'Visa',
 '["3x Points on Travel", "3x Points on Shipping", "3x Points on Internet/Cable/Phone", "3x Points on Advertising"]',
 '100,000 bonus points after spending $15,000 in first 3 months', 'Good to Excellent', 'https://creditcards.chase.com/business-credit-cards/ink/business-preferred', FALSE, 4.3, 654),

('Ink Business Cash®', 'Chase', 'https://creditcards.chase.com/K-Marketplace/images/cardart/ink_business_cash_card.png', 0, 'Visa',
 '["5% Cash Back on Office Supplies", "5% Cash Back on Internet/Cable/Phone", "5% Cash Back on Gas Stations", "2% Cash Back on Dining"]',
 '$900 bonus cash back after spending $6,000 in first 3 months', 'Good to Excellent', 'https://creditcards.chase.com/business-credit-cards/ink/business-cash', FALSE, 4.2, 543),

('World of Hyatt Credit Card', 'Chase', 'https://creditcards.chase.com/K-Marketplace/images/cardart/world_of_hyatt_card.png', 95, 'Visa',
 '["2x Points on Hyatt Purchases", "2x Points on Dining", "2x Points on Fitness Clubs", "Free Night Award"]',
 '60,000 bonus points after spending $3,000 in first 3 months', 'Good to Excellent', 'https://creditcards.chase.com/hotel-credit-cards/world-of-hyatt', FALSE, 4.1, 432),

('Marriott Bonvoy Bold® Credit Card', 'Chase', 'https://creditcards.chase.com/K-Marketplace/images/cardart/marriott_bonvoy_bold_card.png', 0, 'Visa',
 '["2x Points on Marriott Bonvoy Purchases", "No Annual Fee", "Silver Elite Status"]',
 '30,000 bonus points after spending $1,000 in first 3 months', 'Good to Excellent', 'https://creditcards.chase.com/hotel-credit-cards/marriott/bonvoy-bold', FALSE, 3.9, 321),

('Marriott Bonvoy Boundless® Credit Card', 'Chase', 'https://creditcards.chase.com/K-Marketplace/images/cardart/marriott_bonvoy_boundless_card.png', 95, 'Visa',
 '["2x Points on Marriott Bonvoy Purchases", "Silver Elite Status", "Free Night Award"]',
 '75,000 bonus points after spending $3,000 in first 3 months', 'Good to Excellent', 'https://creditcards.chase.com/hotel-credit-cards/marriott/bonvoy-boundless', FALSE, 4.0, 543);

-- American Express Cards
INSERT INTO cards (name, issuer, image_url, annual_fee, network, features, welcome_bonus, credit_range, apply_url, is_popular, rating, review_count) VALUES
('American Express® Green Card', 'American Express', 'https://icm.aexp-static.com/Internet/Acquisition/US_en/AppContent/OneSite/category/cardarts/green-card.png', 150, 'American Express',
 '["3x Points on Travel", "3x Points on Transit", "3x Points on Restaurants", "CLEAR® Plus Credit"]',
 '60,000 Membership Rewards points after spending $2,000 in first 6 months', 'Good to Excellent', 'https://www.americanexpress.com/us/credit-cards/card/green/', FALSE, 4.2, 876),

('American Express® Cash Magnet Card', 'American Express', 'https://icm.aexp-static.com/Internet/Acquisition/US_en/AppContent/OneSite/category/cardarts/cash-magnet-card.png', 0, 'American Express',
 '["1.5% Cash Back on Everything", "No Annual Fee", "Intro APR on Purchases"]',
 '$200 statement credit after spending $2,000 in first 6 months', 'Good to Excellent', 'https://www.americanexpress.com/us/credit-cards/card/cash-magnet/', FALSE, 4.1, 654),

('Delta SkyMiles® Gold American Express Card', 'American Express', 'https://icm.aexp-static.com/Internet/Acquisition/US_en/AppContent/OneSite/category/cardarts/delta-gold-card.png', 99, 'American Express',
 '["2x Miles on Delta Purchases", "2x Miles on Dining", "2x Miles on Groceries", "Free First Checked Bag"]',
 '60,000 bonus miles and $200 statement credit after spending $2,000 in first 3 months', 'Good to Excellent', 'https://www.americanexpress.com/us/credit-cards/card/delta-gold/', FALSE, 4.3, 987),

('Delta SkyMiles® Platinum American Express Card', 'American Express', 'https://icm.aexp-static.com/Internet/Acquisition/US_en/AppContent/OneSite/category/cardarts/delta-platinum-card.png', 250, 'American Express',
 '["3x Miles on Delta Purchases", "2x Miles on Dining", "2x Miles on Groceries", "Free First Checked Bag", "Priority Boarding"]',
 '80,000 bonus miles and $200 statement credit after spending $3,000 in first 3 months', 'Good to Excellent', 'https://www.americanexpress.com/us/credit-cards/card/delta-platinum/', FALSE, 4.2, 765),

('Delta SkyMiles® Reserve American Express Card', 'American Express', 'https://icm.aexp-static.com/Internet/Acquisition/US_en/AppContent/OneSite/category/cardarts/delta-reserve-card.png', 550, 'American Express',
 '["3x Miles on Delta Purchases", "3x Miles on Dining", "Sky Club Access", "First Class Check-in"]',
 '125,000 bonus miles and $200 statement credit after spending $5,000 in first 3 months', 'Excellent', 'https://www.americanexpress.com/us/credit-cards/card/delta-reserve/', FALSE, 4.4, 543),

('Marriott Bonvoy Brilliant® American Express® Card', 'American Express', 'https://icm.aexp-static.com/Internet/Acquisition/US_en/AppContent/OneSite/category/cardarts/marriott-bonvoy-brilliant-card.png', 650, 'American Express',
 '["6x Points on Marriott Bonvoy Purchases", "3x Points on Dining", "3x Points on Flights", "Gold Elite Status"]',
 '150,000 bonus points after spending $5,000 in first 3 months', 'Excellent', 'https://www.americanexpress.com/us/credit-cards/card/marriott-bonvoy-brilliant/', FALSE, 4.1, 432),

('Hilton Honors American Express Card', 'American Express', 'https://icm.aexp-static.com/Internet/Acquisition/US_en/AppContent/OneSite/category/cardarts/hilton-honors-card.png', 0, 'American Express',
 '["7x Points on Hilton Purchases", "5x Points on Dining", "5x Points on Groceries", "3x Points on Gas"]',
 '100,000 bonus points after spending $2,000 in first 6 months', 'Good to Excellent', 'https://www.americanexpress.com/us/credit-cards/card/hilton-honors/', FALSE, 4.0, 654),

('Hilton Honors American Express Surpass® Card', 'American Express', 'https://icm.aexp-static.com/Internet/Acquisition/US_en/AppContent/OneSite/category/cardarts/hilton-honors-surpass-card.png', 150, 'American Express',
 '["12x Points on Hilton Purchases", "6x Points on Dining", "6x Points on Groceries", "3x Points on Gas"]',
 '130,000 bonus points after spending $2,000 in first 3 months', 'Good to Excellent', 'https://www.americanexpress.com/us/credit-cards/card/hilton-honors-surpass/', FALSE, 4.2, 543),

('Hilton Honors American Express Aspire Card', 'American Express', 'https://icm.aexp-static.com/Internet/Acquisition/US_en/AppContent/OneSite/category/cardarts/hilton-honors-aspire-card.png', 450, 'American Express',
 '["14x Points on Hilton Purchases", "7x Points on Dining", "7x Points on Flights", "Diamond Status", "Resort Credit"]',
 '180,000 bonus points after spending $4,000 in first 3 months', 'Excellent', 'https://www.americanexpress.com/us/credit-cards/card/hilton-honors-aspire/', FALSE, 4.3, 432),

('Blue Business Plus Credit Card from American Express', 'American Express', 'https://icm.aexp-static.com/Internet/Acquisition/US_en/AppContent/OneSite/category/cardarts/blue-business-plus-card.png', 0, 'American Express',
 '["2x Points on Everything up to $50,000", "No Annual Fee", "Employee Cards at No Cost"]',
 '15,000 Membership Rewards points after spending $3,000 in first 3 months', 'Good to Excellent', 'https://www.americanexpress.com/us/credit-cards/business/charge-cards/blue-business-plus-credit-card/', FALSE, 4.4, 765),

('The Business Platinum Card® from American Express', 'American Express', 'https://icm.aexp-static.com/Internet/Acquisition/US_en/AppContent/OneSite/category/cardarts/business-platinum-card.png', 695, 'American Express',
 '["5x Points on Flights", "5x Points on Hotels", "1.5x Points on Purchases over $5,000", "Centurion Lounge Access"]',
 '120,000 Membership Rewards points after spending $15,000 in first 3 months', 'Excellent', 'https://www.americanexpress.com/us/credit-cards/business/charge-cards/platinum-business-card/', FALSE, 4.2, 543);

-- Bank of America Cards
INSERT INTO cards (name, issuer, image_url, annual_fee, network, features, welcome_bonus, credit_range, apply_url, is_popular, rating, review_count) VALUES
('Bank of America® Unlimited Cash Rewards credit card', 'Bank of America', 'https://www.bankofamerica.com/content/images/ContextualSiteGraphics/CreditCardArt/en_US/Approved/unlimited_cash_rewards_card_v1.png', 0, 'Visa',
 '["1.5% Cash Back on Everything", "No Annual Fee", "Preferred Rewards Bonus"]',
 '$200 online cash rewards bonus after spending $1,000 in first 90 days', 'Good to Excellent', 'https://www.bankofamerica.com/credit-cards/products/cash-back-credit-card/', TRUE, 4.2, 1234),

('Bank of America® Customized Cash Rewards credit card', 'Bank of America', 'https://www.bankofamerica.com/content/images/ContextualSiteGraphics/CreditCardArt/en_US/Approved/customized_cash_rewards_card_v1.png', 0, 'Visa',
 '["3% Cash Back in Choice Category", "2% Cash Back at Grocery Stores and Wholesale Clubs", "1% Cash Back on Everything"]',
 '$200 online cash rewards bonus after spending $1,000 in first 90 days', 'Good to Excellent', 'https://www.bankofamerica.com/credit-cards/products/customized-cash-rewards-credit-card/', TRUE, 4.3, 987),

('Bank of America® Travel Rewards credit card', 'Bank of America', 'https://www.bankofamerica.com/content/images/ContextualSiteGraphics/CreditCardArt/en_US/Approved/travel_rewards_card_v1.png', 0, 'Visa',
 '["1.5 Points per $1 on Everything", "No Foreign Transaction Fees", "No Annual Fee"]',
 '25,000 online bonus points after spending $1,000 in first 90 days', 'Good to Excellent', 'https://www.bankofamerica.com/credit-cards/products/travel-rewards-credit-card/', FALSE, 4.1, 654),

('BankAmericard® credit card', 'Bank of America', 'https://www.bankofamerica.com/content/images/ContextualSiteGraphics/CreditCardArt/en_US/Approved/bankamericard_card_v1.png', 0, 'Visa',
 '["0% Intro APR for 21 Billing Cycles", "No Annual Fee", "Low Regular APR"]',
 'No welcome bonus', 'Good to Excellent', 'https://www.bankofamerica.com/credit-cards/products/bankamericard-credit-card/', FALSE, 4.0, 543),

('Bank of America® Unlimited Cash Rewards Secured credit card', 'Bank of America', 'https://www.bankofamerica.com/content/images/ContextualSiteGraphics/CreditCardArt/en_US/Approved/secured_card_v1.png', 0, 'Visa',
 '["1.5% Cash Back on Everything", "No Annual Fee", "Graduation to Unsecured Card"]',
 'No welcome bonus', 'Fair to Good', 'https://www.bankofamerica.com/credit-cards/products/secured-credit-card/', FALSE, 3.8, 432);

-- Wells Fargo Cards
INSERT INTO cards (name, issuer, image_url, annual_fee, network, features, welcome_bonus, credit_range, apply_url, is_popular, rating, review_count) VALUES
('Wells Fargo Reflect® Card', 'Wells Fargo', 'https://www.wellsfargo.com/assets/images/personal/credit-cards/product-art/reflect-card.png', 0, 'Visa',
 '["21-Month 0% Intro APR", "No Annual Fee", "Cell Phone Protection"]',
 'No welcome bonus', 'Good to Excellent', 'https://creditcards.wellsfargo.com/cards/reflect-credit-card', FALSE, 4.1, 765),

('Wells Fargo Autograph® Card', 'Wells Fargo', 'https://www.wellsfargo.com/assets/images/personal/credit-cards/product-art/autograph-card.png', 0, 'Visa',
 '["3x Points on Restaurants", "3x Points on Travel", "3x Points on Gas Stations", "3x Points on Transit"]',
 '20,000 bonus points after spending $1,000 in first 3 months', 'Good to Excellent', 'https://creditcards.wellsfargo.com/cards/autograph-credit-card', TRUE, 4.4, 1098),

('Wells Fargo Autograph Journey℠ Card', 'Wells Fargo', 'https://www.wellsfargo.com/assets/images/personal/credit-cards/product-art/autograph-journey-card.png', 95, 'Visa',
 '["4x Points on Restaurants", "4x Points on Travel", "2x Points on Gas Stations", "Cell Phone Protection"]',
 '60,000 bonus points after spending $4,000 in first 3 months', 'Good to Excellent', 'https://creditcards.wellsfargo.com/cards/autograph-journey-credit-card', FALSE, 4.2, 654),

('Wells Fargo Attune℠ Card', 'Wells Fargo', 'https://www.wellsfargo.com/assets/images/personal/credit-cards/product-art/attune-card.png', 0, 'Visa',
 '["4x Points on Popular Streaming Services", "2x Points on Gas Stations", "1x Points on Everything"]',
 '20,000 bonus points after spending $1,000 in first 3 months', 'Good to Excellent', 'https://creditcards.wellsfargo.com/cards/attune-credit-card', FALSE, 4.0, 432),

('Choice Privileges® Select Mastercard®', 'Wells Fargo', 'https://www.wellsfargo.com/assets/images/personal/credit-cards/product-art/choice-privileges-select-card.png', 85, 'Mastercard',
 '["5x Points on Choice Hotels", "2x Points on Gas", "2x Points on Groceries", "Platinum Elite Status"]',
 '60,000 bonus points after spending $1,000 in first 3 months', 'Good to Excellent', 'https://creditcards.wellsfargo.com/cards/choice-privileges-select-mastercard', FALSE, 3.9, 321),

('Choice Privileges® Mastercard®', 'Wells Fargo', 'https://www.wellsfargo.com/assets/images/personal/credit-cards/product-art/choice-privileges-card.png', 0, 'Mastercard',
 '["3x Points on Choice Hotels", "2x Points on Gas", "1x Points on Everything", "Gold Elite Status"]',
 '32,000 bonus points after spending $1,000 in first 3 months', 'Good to Excellent', 'https://creditcards.wellsfargo.com/cards/choice-privileges-mastercard', FALSE, 3.8, 287);

-- Capital One Cards (additional ones)
INSERT INTO cards (name, issuer, image_url, annual_fee, network, features, welcome_bonus, credit_range, apply_url, is_popular, rating, review_count) VALUES
('Capital One Venture Rewards Credit Card', 'Capital One', 'https://ecm.capitalone.com/WCM/card/products/venture-card-art.png', 95, 'Visa',
 '["2x Miles on Everything", "No Foreign Transaction Fees", "Transfer Partners"]',
 '75,000 bonus miles after spending $4,000 in first 3 months', 'Good to Excellent', 'https://www.capitalone.com/credit-cards/venture/', TRUE, 4.3, 1543),

('Capital One VentureOne Rewards Credit Card', 'Capital One', 'https://ecm.capitalone.com/WCM/card/products/ventureone-card-art.png', 0, 'Visa',
 '["1.25x Miles on Everything", "No Annual Fee", "No Foreign Transaction Fees"]',
 '20,000 bonus miles after spending $500 in first 3 months', 'Good to Excellent', 'https://www.capitalone.com/credit-cards/ventureone-rewards/', FALSE, 4.1, 876),

('Capital One Savor Cash Rewards Credit Card', 'Capital One', 'https://ecm.capitalone.com/WCM/card/products/savor-card-art.png', 95, 'Mastercard',
 '["4% Cash Back on Dining", "4% Cash Back on Entertainment", "2% Cash Back on Groceries"]',
 '$300 cash bonus after spending $3,000 in first 3 months', 'Good to Excellent', 'https://www.capitalone.com/credit-cards/savor-dining-rewards/', FALSE, 4.2, 654),

('Capital One QuicksilverOne Cash Rewards Credit Card', 'Capital One', 'https://ecm.capitalone.com/WCM/card/products/quicksilverone-card-art.png', 39, 'Visa',
 '["1.5% Cash Back on Everything", "Build Credit History"]',
 'No welcome bonus', 'Fair to Good', 'https://www.capitalone.com/credit-cards/quicksilverone/', FALSE, 3.8, 432),

('Capital One Platinum Credit Card', 'Capital One', 'https://ecm.capitalone.com/WCM/card/products/platinum-card-art.png', 0, 'Mastercard',
 '["Build Credit History", "No Annual Fee", "Access to Higher Credit Line"]',
 'No welcome bonus', 'Fair to Good', 'https://www.capitalone.com/credit-cards/platinum/', FALSE, 3.7, 321),

('Capital One Platinum Secured Credit Card', 'Capital One', 'https://ecm.capitalone.com/WCM/card/products/platinum-secured-card-art.png', 0, 'Mastercard',
 '["Build Credit History", "No Annual Fee", "Graduation to Unsecured Card"]',
 'No welcome bonus', 'Limited/Bad Credit', 'https://www.capitalone.com/credit-cards/platinum-secured/', FALSE, 3.9, 543),

('Capital One Savor Student Cash Rewards Credit Card', 'Capital One', 'https://ecm.capitalone.com/WCM/card/products/savor-student-card-art.png', 0, 'Mastercard',
 '["3% Cash Back on Dining", "3% Cash Back on Entertainment", "3% Cash Back on Streaming", "1% Cash Back on Everything"]',
 '$50 cash bonus after first purchase', 'Limited/Student', 'https://www.capitalone.com/credit-cards/savor-student/', FALSE, 4.0, 432),

('Capital One Spark Cash Plus', 'Capital One', 'https://ecm.capitalone.com/WCM/card/products/spark-cash-plus-card-art.png', 150, 'Mastercard',
 '["2% Cash Back on Everything", "5% Cash Back on Hotels and Rental Cars", "No Foreign Transaction Fees"]',
 '$500 cash bonus after spending $4,500 in first 3 months', 'Good to Excellent', 'https://www.capitalone.com/small-business/credit-cards/spark-cash-plus/', FALSE, 4.1, 321),

('Capital One Spark Miles for Business', 'Capital One', 'https://ecm.capitalone.com/WCM/card/products/spark-miles-card-art.png', 95, 'Visa',
 '["2x Miles on Everything", "No Foreign Transaction Fees", "Employee Cards at No Cost"]',
 '50,000 bonus miles after spending $4,500 in first 3 months', 'Good to Excellent', 'https://www.capitalone.com/small-business/credit-cards/spark-miles/', FALSE, 4.0, 287);

-- Citi Cards (additional ones)
INSERT INTO cards (name, issuer, image_url, annual_fee, network, features, welcome_bonus, credit_range, apply_url, is_popular, rating, review_count) VALUES
('Citi Custom Cash® Card', 'Citi', 'https://www.citi.com/CRD/images/citi-custom-cash-card.png', 0, 'Mastercard',
 '["5% Cash Back on Top Spending Category", "1% Cash Back on Everything", "No Annual Fee"]',
 '$200 cash back after spending $1,500 in first 6 months', 'Good to Excellent', 'https://www.citi.com/credit-cards/citi-custom-cash-credit-card', TRUE, 4.5, 1432),

('Citi Strata Premier® Card', 'Citi', 'https://www.citi.com/CRD/images/citi-strata-premier-card.png', 95, 'Mastercard',
 '["3x Points on Travel", "3x Points on Gas Stations", "3x Points on Groceries", "3x Points on Restaurants"]',
 '70,000 bonus points after spending $4,000 in first 3 months', 'Good to Excellent', 'https://www.citi.com/credit-cards/citi-strata-premier-credit-card', FALSE, 4.3, 876),

('Citi Simplicity® Card', 'Citi', 'https://www.citi.com/CRD/images/citi-simplicity-card.png', 0, 'Mastercard',
 '["21-Month 0% Intro APR", "No Late Fees", "No Penalty APR", "No Annual Fee"]',
 'No welcome bonus', 'Good to Excellent', 'https://www.citi.com/credit-cards/citi-simplicity-credit-card', FALSE, 4.1, 654),

('Citi® Diamond Preferred® Card', 'Citi', 'https://www.citi.com/CRD/images/citi-diamond-preferred-card.png', 0, 'Mastercard',
 '["21-Month 0% Intro APR", "No Annual Fee", "Citi Entertainment Access"]',
 'No welcome bonus', 'Good to Excellent', 'https://www.citi.com/credit-cards/citi-diamond-preferred-credit-card', FALSE, 4.0, 543),

('Citi® / AAdvantage® Platinum Select® World Elite Mastercard®', 'Citi', 'https://www.citi.com/CRD/images/citi-aadvantage-platinum-select-card.png', 99, 'Mastercard',
 '["2x Miles on American Airlines Purchases", "2x Miles on Gas Stations", "2x Miles on Restaurants", "Free First Checked Bag"]',
 '50,000 American Airlines AAdvantage bonus miles after spending $2,500 in first 3 months', 'Good to Excellent', 'https://www.citi.com/credit-cards/citi-aadvantage-platinum-select-credit-card', FALSE, 4.2, 765),

('Citi® / AAdvantage® Executive World Elite Mastercard®', 'Citi', 'https://www.citi.com/CRD/images/citi-aadvantage-executive-card.png', 450, 'Mastercard',
 '["2x Miles on American Airlines Purchases", "2x Miles on Restaurants", "Admirals Club Access", "Free First Checked Bag"]',
 '70,000 American Airlines AAdvantage bonus miles after spending $7,000 in first 3 months', 'Excellent', 'https://www.citi.com/credit-cards/citi-aadvantage-executive-credit-card', FALSE, 4.1, 432);

-- Discover Cards (additional ones)
INSERT INTO cards (name, issuer, image_url, annual_fee, network, features, welcome_bonus, credit_range, apply_url, is_popular, rating, review_count) VALUES
('Discover it® Chrome', 'Discover', 'https://www.discover.com/credit-cards/images/cardart/discover-it-chrome-card.png', 0, 'Discover',
 '["2% Cash Back at Gas Stations and Restaurants", "1% Cash Back on Everything", "Cashback Match"]',
 'Unlimited Cashback Match for your first year', 'Good to Excellent', 'https://www.discover.com/credit-cards/cash-back/chrome/', FALSE, 4.2, 876),

('Discover it® Miles', 'Discover', 'https://www.discover.com/credit-cards/images/cardart/discover-it-miles-card.png', 0, 'Discover',
 '["1.5x Miles on Everything", "No Annual Fee", "No Foreign Transaction Fees", "Miles Match"]',
 'Unlimited Miles Match for your first year', 'Good to Excellent', 'https://www.discover.com/credit-cards/travel/it-miles/', FALSE, 4.1, 654),

('Discover it® Student Cash Back', 'Discover', 'https://www.discover.com/credit-cards/images/cardart/discover-it-student-card.png', 0, 'Discover',
 '["5% Rotating Categories", "1% Cash Back on Everything", "Cashback Match", "Good Grade Reward"]',
 'Unlimited Cashback Match for your first year', 'Limited/Student', 'https://www.discover.com/credit-cards/student/it-card/', FALSE, 4.3, 543),

('Discover it® Student Chrome', 'Discover', 'https://www.discover.com/credit-cards/images/cardart/discover-it-student-chrome-card.png', 0, 'Discover',
 '["2% Cash Back at Gas Stations and Restaurants", "1% Cash Back on Everything", "Cashback Match", "Good Grade Reward"]',
 'Unlimited Cashback Match for your first year', 'Limited/Student', 'https://www.discover.com/credit-cards/student/chrome/', FALSE, 4.2, 432),

('Discover it® Secured Credit Card', 'Discover', 'https://www.discover.com/credit-cards/images/cardart/discover-it-secured-card.png', 0, 'Discover',
 '["2% Cash Back at Gas Stations and Restaurants", "1% Cash Back on Everything", "Cashback Match", "Build Credit"]',
 'Unlimited Cashback Match for your first year', 'Limited/Bad Credit', 'https://www.discover.com/credit-cards/secured/', FALSE, 4.0, 765),

('NHL® Discover it®', 'Discover', 'https://www.discover.com/credit-cards/images/cardart/nhl-discover-it-card.png', 0, 'Discover',
 '["5% Rotating Categories", "1% Cash Back on Everything", "Cashback Match", "NHL Team Design"]',
 'Unlimited Cashback Match for your first year', 'Good to Excellent', 'https://www.discover.com/credit-cards/nhl/', FALSE, 4.1, 321);

-- U.S. Bank Cards (additional ones)
INSERT INTO cards (name, issuer, image_url, annual_fee, network, features, welcome_bonus, credit_range, apply_url, is_popular, rating, review_count) VALUES
('U.S. Bank Altitude Connect Visa Signature® Card', 'US Bank', 'https://www.usbank.com/dam/images/credit-cards/altitude-connect-card-art.png', 0, 'Visa',
 '["4x Points on Travel", "2x Points on Streaming", "2x Points on Gas", "2x Points on Groceries"]',
 '50,000 bonus points after spending $2,000 in first 3 months', 'Good to Excellent', 'https://www.usbank.com/credit-cards/altitude-connect-visa-signature-credit-card.html', FALSE, 4.2, 654),

('U.S. Bank Visa® Platinum Card', 'US Bank', 'https://www.usbank.com/dam/images/credit-cards/visa-platinum-card-art.png', 0, 'Visa',
 '["0% Intro APR for 21 Billing Cycles", "No Annual Fee", "Cell Phone Protection"]',
 'No welcome bonus', 'Good to Excellent', 'https://www.usbank.com/credit-cards/visa-platinum-credit-card.html', FALSE, 4.0, 432),

('U.S. Bank Smartly™ Visa Signature® Card', 'US Bank', 'https://www.usbank.com/dam/images/credit-cards/smartly-card-art.png', 0, 'Visa',
 '["4% Cash Back on Top Spending Category", "1.5% Cash Back on Everything", "No Annual Fee"]',
 '$200 cash back after spending $1,000 in first 3 months', 'Good to Excellent', 'https://www.usbank.com/credit-cards/smartly-visa-signature-credit-card.html', FALSE, 4.1, 543),

('U.S. Bank Shopper Cash Rewards Visa Signature® Card', 'US Bank', 'https://www.usbank.com/dam/images/credit-cards/shopper-cash-rewards-card-art.png', 0, 'Visa',
 '["6% Cash Back on Select Streaming Services", "3% Cash Back on Groceries", "3% Cash Back on Gas", "1.5% Cash Back on Everything"]',
 '$200 cash back after spending $1,000 in first 3 months', 'Good to Excellent', 'https://www.usbank.com/credit-cards/shopper-cash-rewards-visa-signature-credit-card.html', FALSE, 4.0, 321),

('Altitude Go Secured Visa® Card', 'US Bank', 'https://www.usbank.com/dam/images/credit-cards/altitude-go-secured-card-art.png', 0, 'Visa',
 '["4x Points on Dining", "2x Points on Groceries", "Build Credit History"]',
 'No welcome bonus', 'Limited/Bad Credit', 'https://www.usbank.com/credit-cards/secured-visa-card.html', FALSE, 3.8, 287);

-- Continue with remaining issuers...
-- Synchrony Cards
INSERT INTO cards (name, issuer, image_url, annual_fee, network, features, welcome_bonus, credit_range, apply_url, is_popular, rating, review_count) VALUES
('Synchrony Premier World Mastercard®', 'Synchrony', 'https://via.placeholder.com/300x190/1f2937/ffffff?text=Synchrony+Premier', 0, 'Mastercard',
 '["2% Cash Back on Everything", "No Annual Fee", "PayPal Rewards"]',
 '$200 cash back after spending $1,000 in first 3 months', 'Good to Excellent', 'https://www.synchrony.com/financing/synchrony-mastercards', FALSE, 4.0, 432),

('Sam''s Club® Mastercard®', 'Synchrony', 'https://via.placeholder.com/300x190/1f2937/ffffff?text=Sams+Club+Mastercard', 0, 'Mastercard',
 '["5% Cash Back on Gas", "3% Cash Back on Dining and Travel", "1% Cash Back on Everything"]',
 '$25 statement credit after first purchase', 'Good to Excellent', 'https://www.synchrony.com/financing/samsclub', FALSE, 4.1, 654),

('PayPal Cashback Mastercard®', 'Synchrony', 'https://via.placeholder.com/300x190/1f2937/ffffff?text=PayPal+Cashback', 0, 'Mastercard',
 '["3% Cash Back on PayPal Purchases", "2% Cash Back on Everything", "No Annual Fee"]',
 '$100 cash back after spending $500 in first 3 months', 'Good to Excellent', 'https://www.synchrony.com/financing/paypal', FALSE, 4.2, 543),

('Amazon Store Card', 'Synchrony', 'https://via.placeholder.com/300x190/1f2937/ffffff?text=Amazon+Store+Card', 0, 'Store Card',
 '["5% Back on Amazon Purchases", "Special Financing Options", "No Annual Fee"]',
 '$70 Amazon Gift Card upon approval', 'Fair to Excellent', 'https://www.synchrony.com/financing/amazon', FALSE, 3.9, 876);

-- PNC Bank Cards
INSERT INTO cards (name, issuer, image_url, annual_fee, network, features, welcome_bonus, credit_range, apply_url, is_popular, rating, review_count) VALUES
('PNC Cash Rewards® Visa® Credit Card', 'PNC Bank', 'https://via.placeholder.com/300x190/1f2937/ffffff?text=PNC+Cash+Rewards', 0, 'Visa',
 '["4% Cash Back on Gas", "3% Cash Back on Dining", "2% Cash Back on Groceries", "1% Cash Back on Everything"]',
 '$200 cash back after spending $2,000 in first 3 months', 'Good to Excellent', 'https://www.pnc.com/en/personal-banking/banking/credit-cards.html', FALSE, 4.1, 432),

('PNC Cash Unlimited® Visa Signature® Credit Card', 'PNC Bank', 'https://via.placeholder.com/300x190/1f2937/ffffff?text=PNC+Cash+Unlimited', 0, 'Visa',
 '["1.5% Cash Back on Everything", "No Annual Fee", "No Foreign Transaction Fees"]',
 '$200 cash back after spending $2,000 in first 3 months', 'Good to Excellent', 'https://www.pnc.com/en/personal-banking/banking/credit-cards.html', FALSE, 4.0, 321);

-- Navy Federal Credit Union Cards
INSERT INTO cards (name, issuer, image_url, annual_fee, network, features, welcome_bonus, credit_range, apply_url, is_popular, rating, review_count) VALUES
('Navy Federal Credit Union® More Rewards American Express® Credit Card', 'Navy Federal Credit Union', 'https://via.placeholder.com/300x190/1f2937/ffffff?text=NFCU+More+Rewards', 0, 'American Express',
 '["3x Points on Supermarkets", "3x Points on Gas", "3x Points on Restaurants", "1x Points on Everything"]',
 '20,000 bonus points after spending $1,500 in first 90 days', 'Good to Excellent', 'https://www.navyfederal.org/loans-cards/credit-cards/more-rewards.html', FALSE, 4.3, 654),

('Navy Federal Credit Union® cashRewards Credit Card', 'Navy Federal Credit Union', 'https://via.placeholder.com/300x190/1f2937/ffffff?text=NFCU+cashRewards', 0, 'Visa',
 '["1.75% Cash Back on Everything", "No Annual Fee", "No Foreign Transaction Fees"]',
 '$200 cash back after spending $1,500 in first 90 days', 'Good to Excellent', 'https://www.navyfederal.org/loans-cards/credit-cards/cashrewards.html', FALSE, 4.2, 543),

('Navy Federal Credit Union® Visa Signature® Flagship Rewards Credit Card', 'Navy Federal Credit Union', 'https://via.placeholder.com/300x190/1f2937/ffffff?text=NFCU+Flagship', 49, 'Visa',
 '["5x Points on Travel", "3x Points on Restaurants", "2x Points on Everything", "No Foreign Transaction Fees"]',
 '50,000 bonus points after spending $4,000 in first 90 days', 'Good to Excellent', 'https://www.navyfederal.org/loans-cards/credit-cards/flagship-rewards.html', FALSE, 4.4, 432);

-- USAA Cards
INSERT INTO cards (name, issuer, image_url, annual_fee, network, features, welcome_bonus, credit_range, apply_url, is_popular, rating, review_count) VALUES
('USAA® Rate Advantage Visa Platinum® Card', 'USAA', 'https://via.placeholder.com/300x190/1f2937/ffffff?text=USAA+Rate+Advantage', 0, 'Visa',
 '["Low APR", "No Annual Fee", "No Balance Transfer Fee"]',
 'No welcome bonus', 'Good to Excellent', 'https://www.usaa.com/inet/wc/bank-credit-cards-rate-advantage', FALSE, 4.1, 321),

('USAA Cashback Rewards Plus American Express® Credit Card', 'USAA', 'https://via.placeholder.com/300x190/1f2937/ffffff?text=USAA+Cashback+Plus', 0, 'American Express',
 '["5% Cash Back on Gas and Military Base Purchases", "2% Cash Back on Groceries", "1% Cash Back on Everything"]',
 'No welcome bonus', 'Good to Excellent', 'https://www.usaa.com/inet/wc/bank-credit-cards-cashback-rewards-plus', FALSE, 4.2, 432),

('USAA® Preferred Cash Rewards Visa Signature® Credit Card', 'USAA', 'https://via.placeholder.com/300x190/1f2937/ffffff?text=USAA+Preferred+Cash', 0, 'Visa',
 '["1.5% Cash Back on Everything", "No Annual Fee", "No Foreign Transaction Fees"]',
 'No welcome bonus', 'Good to Excellent', 'https://www.usaa.com/inet/wc/bank-credit-cards-preferred-cash-rewards', FALSE, 4.0, 287);

-- Barclays Cards
INSERT INTO cards (name, issuer, image_url, annual_fee, network, features, welcome_bonus, credit_range, apply_url, is_popular, rating, review_count) VALUES
('AAdvantage® Aviator® Red World Elite Mastercard®', 'Barclays', 'https://via.placeholder.com/300x190/1f2937/ffffff?text=Aviator+Red', 99, 'Mastercard',
 '["2x Miles on American Airlines Purchases", "1x Miles on Everything", "Free First Checked Bag"]',
 '60,000 American Airlines AAdvantage bonus miles after first purchase and paying annual fee', 'Good to Excellent', 'https://cards.barclaycardus.com/banking/cards/aadvantage-aviator-red-world-elite-mastercard/', FALSE, 4.1, 543),

('JetBlue Card', 'Barclays', 'https://via.placeholder.com/300x190/1f2937/ffffff?text=JetBlue+Card', 0, 'Mastercard',
 '["2x Points on JetBlue Purchases", "2x Points on Restaurants", "2x Points on Groceries", "1x Points on Everything"]',
 '40,000 bonus points after spending $1,000 in first 90 days', 'Good to Excellent', 'https://cards.barclaycardus.com/banking/cards/jetblue-card/', FALSE, 4.0, 432),

('JetBlue Plus Card', 'Barclays', 'https://via.placeholder.com/300x190/1f2937/ffffff?text=JetBlue+Plus', 99, 'Mastercard',
 '["2x Points on JetBlue Purchases", "2x Points on Restaurants", "2x Points on Groceries", "Free First Checked Bag"]',
 '80,000 bonus points after spending $1,000 in first 90 days', 'Good to Excellent', 'https://cards.barclaycardus.com/banking/cards/jetblue-plus-card/', FALSE, 4.2, 321);

-- Alliant Credit Union Cards
INSERT INTO cards (name, issuer, image_url, annual_fee, network, features, welcome_bonus, credit_range, apply_url, is_popular, rating, review_count) VALUES
('Alliant Signature Visa', 'Alliant Credit Union', 'https://via.placeholder.com/300x190/1f2937/ffffff?text=Alliant+Signature', 0, 'Visa',
 '["2.5% Cash Back on Everything", "No Annual Fee", "No Foreign Transaction Fees"]',
 '$100 cash back after spending $1,000 in first 90 days', 'Good to Excellent', 'https://www.alliantcreditunion.org/bank/credit-cards', TRUE, 4.6, 876),

('Alliant Platinum Visa', 'Alliant Credit Union', 'https://via.placeholder.com/300x190/1f2937/ffffff?text=Alliant+Platinum', 0, 'Visa',
 '["Low APR", "No Annual Fee", "No Balance Transfer Fee"]',
 'No welcome bonus', 'Good to Excellent', 'https://www.alliantcreditunion.org/bank/credit-cards', FALSE, 4.2, 432);

-- Now let's add categories for all these new cards
-- Chase Cards Categories
INSERT INTO card_categories (card_id, category, cashback_rate, is_rotating, valid_until) VALUES
-- Chase Sapphire Preferred (ID will be auto-assigned, let's assume starting from 21)
((SELECT id FROM cards WHERE name = 'Chase Sapphire Preferred® Card'), 'Travel', 2.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Chase Sapphire Preferred® Card'), 'Dining', 2.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Chase Sapphire Preferred® Card'), 'Other', 1.0, FALSE, NULL),

-- Chase Freedom Rise
((SELECT id FROM cards WHERE name = 'Chase Freedom Rise®'), 'All Purchases', 1.5, FALSE, NULL),

-- United Quest
((SELECT id FROM cards WHERE name = 'United Quest℠ Card'), 'United Purchases', 2.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'United Quest℠ Card'), 'Dining', 2.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'United Quest℠ Card'), 'Other', 1.0, FALSE, NULL),

-- Southwest Plus
((SELECT id FROM cards WHERE name = 'Southwest Rapid Rewards® Plus Credit Card'), 'Southwest Purchases', 2.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Southwest Rapid Rewards® Plus Credit Card'), 'Other', 1.0, FALSE, NULL),

-- Southwest Premier
((SELECT id FROM cards WHERE name = 'Southwest Rapid Rewards® Premier Credit Card'), 'Southwest Purchases', 2.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Southwest Rapid Rewards® Premier Credit Card'), 'Other', 1.0, FALSE, NULL),

-- Southwest Priority
((SELECT id FROM cards WHERE name = 'Southwest Rapid Rewards® Priority Credit Card'), 'Southwest Purchases', 2.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Southwest Rapid Rewards® Priority Credit Card'), 'Other', 1.0, FALSE, NULL),

-- Ink Business Unlimited
((SELECT id FROM cards WHERE name = 'Ink Business Unlimited®'), 'All Purchases', 1.5, FALSE, NULL),

-- Ink Business Preferred
((SELECT id FROM cards WHERE name = 'Ink Business Preferred® Credit Card'), 'Travel', 3.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Ink Business Preferred® Credit Card'), 'Shipping', 3.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Ink Business Preferred® Credit Card'), 'Internet/Cable/Phone', 3.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Ink Business Preferred® Credit Card'), 'Advertising', 3.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Ink Business Preferred® Credit Card'), 'Other', 1.0, FALSE, NULL),

-- Ink Business Cash
((SELECT id FROM cards WHERE name = 'Ink Business Cash®'), 'Office Supplies', 5.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Ink Business Cash®'), 'Internet/Cable/Phone', 5.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Ink Business Cash®'), 'Gas', 5.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Ink Business Cash®'), 'Dining', 2.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Ink Business Cash®'), 'Other', 1.0, FALSE, NULL),

-- World of Hyatt
((SELECT id FROM cards WHERE name = 'World of Hyatt Credit Card'), 'Hyatt Purchases', 2.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'World of Hyatt Credit Card'), 'Dining', 2.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'World of Hyatt Credit Card'), 'Fitness Clubs', 2.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'World of Hyatt Credit Card'), 'Other', 1.0, FALSE, NULL),

-- Marriott Bonvoy Bold
((SELECT id FROM cards WHERE name = 'Marriott Bonvoy Bold® Credit Card'), 'Marriott Purchases', 2.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Marriott Bonvoy Bold® Credit Card'), 'Other', 1.0, FALSE, NULL),

-- Marriott Bonvoy Boundless
((SELECT id FROM cards WHERE name = 'Marriott Bonvoy Boundless® Credit Card'), 'Marriott Purchases', 2.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Marriott Bonvoy Boundless® Credit Card'), 'Other', 1.0, FALSE, NULL),

-- American Express Green
((SELECT id FROM cards WHERE name = 'American Express® Green Card'), 'Travel', 3.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'American Express® Green Card'), 'Transit', 3.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'American Express® Green Card'), 'Restaurants', 3.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'American Express® Green Card'), 'Other', 1.0, FALSE, NULL),

-- American Express Cash Magnet
((SELECT id FROM cards WHERE name = 'American Express® Cash Magnet Card'), 'All Purchases', 1.5, FALSE, NULL),

-- Delta Gold
((SELECT id FROM cards WHERE name = 'Delta SkyMiles® Gold American Express Card'), 'Delta Purchases', 2.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Delta SkyMiles® Gold American Express Card'), 'Dining', 2.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Delta SkyMiles® Gold American Express Card'), 'Groceries', 2.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Delta SkyMiles® Gold American Express Card'), 'Other', 1.0, FALSE, NULL),

-- Delta Platinum
((SELECT id FROM cards WHERE name = 'Delta SkyMiles® Platinum American Express Card'), 'Delta Purchases', 3.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Delta SkyMiles® Platinum American Express Card'), 'Dining', 2.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Delta SkyMiles® Platinum American Express Card'), 'Groceries', 2.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Delta SkyMiles® Platinum American Express Card'), 'Other', 1.0, FALSE, NULL),

-- Delta Reserve
((SELECT id FROM cards WHERE name = 'Delta SkyMiles® Reserve American Express Card'), 'Delta Purchases', 3.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Delta SkyMiles® Reserve American Express Card'), 'Dining', 3.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Delta SkyMiles® Reserve American Express Card'), 'Other', 1.0, FALSE, NULL),

-- Marriott Bonvoy Brilliant
((SELECT id FROM cards WHERE name = 'Marriott Bonvoy Brilliant® American Express® Card'), 'Marriott Purchases', 6.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Marriott Bonvoy Brilliant® American Express® Card'), 'Dining', 3.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Marriott Bonvoy Brilliant® American Express® Card'), 'Flights', 3.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Marriott Bonvoy Brilliant® American Express® Card'), 'Other', 1.0, FALSE, NULL),

-- Hilton Honors
((SELECT id FROM cards WHERE name = 'Hilton Honors American Express Card'), 'Hilton Purchases', 7.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Hilton Honors American Express Card'), 'Dining', 5.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Hilton Honors American Express Card'), 'Groceries', 5.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Hilton Honors American Express Card'), 'Gas', 3.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Hilton Honors American Express Card'), 'Other', 1.0, FALSE, NULL),

-- Hilton Honors Surpass
((SELECT id FROM cards WHERE name = 'Hilton Honors American Express Surpass® Card'), 'Hilton Purchases', 12.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Hilton Honors American Express Surpass® Card'), 'Dining', 6.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Hilton Honors American Express Surpass® Card'), 'Groceries', 6.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Hilton Honors American Express Surpass® Card'), 'Gas', 3.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Hilton Honors American Express Surpass® Card'), 'Other', 1.0, FALSE, NULL),

-- Hilton Honors Aspire
((SELECT id FROM cards WHERE name = 'Hilton Honors American Express Aspire Card'), 'Hilton Purchases', 14.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Hilton Honors American Express Aspire Card'), 'Dining', 7.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Hilton Honors American Express Aspire Card'), 'Flights', 7.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Hilton Honors American Express Aspire Card'), 'Other', 1.0, FALSE, NULL),

-- Blue Business Plus
((SELECT id FROM cards WHERE name = 'Blue Business Plus Credit Card from American Express'), 'All Purchases', 2.0, FALSE, NULL),

-- Business Platinum
((SELECT id FROM cards WHERE name = 'The Business Platinum Card® from American Express'), 'Flights', 5.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'The Business Platinum Card® from American Express'), 'Hotels', 5.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'The Business Platinum Card® from American Express'), 'Large Purchases', 1.5, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'The Business Platinum Card® from American Express'), 'Other', 1.0, FALSE, NULL),

-- Bank of America Unlimited Cash Rewards
((SELECT id FROM cards WHERE name = 'Bank of America® Unlimited Cash Rewards credit card'), 'All Purchases', 1.5, FALSE, NULL),

-- Bank of America Customized Cash Rewards
((SELECT id FROM cards WHERE name = 'Bank of America® Customized Cash Rewards credit card'), 'Choice Category', 3.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Bank of America® Customized Cash Rewards credit card'), 'Groceries', 2.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Bank of America® Customized Cash Rewards credit card'), 'Wholesale Clubs', 2.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Bank of America® Customized Cash Rewards credit card'), 'Other', 1.0, FALSE, NULL),

-- Bank of America Travel Rewards
((SELECT id FROM cards WHERE name = 'Bank of America® Travel Rewards credit card'), 'All Purchases', 1.5, FALSE, NULL),

-- BankAmericard
((SELECT id FROM cards WHERE name = 'BankAmericard® credit card'), 'Other', 0.0, FALSE, NULL),

-- Bank of America Secured
((SELECT id FROM cards WHERE name = 'Bank of America® Unlimited Cash Rewards Secured credit card'), 'All Purchases', 1.5, FALSE, NULL),

-- Wells Fargo Reflect
((SELECT id FROM cards WHERE name = 'Wells Fargo Reflect® Card'), 'Other', 0.0, FALSE, NULL),

-- Wells Fargo Autograph
((SELECT id FROM cards WHERE name = 'Wells Fargo Autograph® Card'), 'Restaurants', 3.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Wells Fargo Autograph® Card'), 'Travel', 3.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Wells Fargo Autograph® Card'), 'Gas', 3.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Wells Fargo Autograph® Card'), 'Transit', 3.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Wells Fargo Autograph® Card'), 'Other', 1.0, FALSE, NULL),

-- Wells Fargo Autograph Journey
((SELECT id FROM cards WHERE name = 'Wells Fargo Autograph Journey℠ Card'), 'Restaurants', 4.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Wells Fargo Autograph Journey℠ Card'), 'Travel', 4.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Wells Fargo Autograph Journey℠ Card'), 'Gas', 2.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Wells Fargo Autograph Journey℠ Card'), 'Other', 1.0, FALSE, NULL),

-- Wells Fargo Attune
((SELECT id FROM cards WHERE name = 'Wells Fargo Attune℠ Card'), 'Streaming', 4.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Wells Fargo Attune℠ Card'), 'Gas', 2.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Wells Fargo Attune℠ Card'), 'Other', 1.0, FALSE, NULL),

-- Capital One Venture
((SELECT id FROM cards WHERE name = 'Capital One Venture Rewards Credit Card'), 'All Purchases', 2.0, FALSE, NULL),

-- Capital One VentureOne
((SELECT id FROM cards WHERE name = 'Capital One VentureOne Rewards Credit Card'), 'All Purchases', 1.25, FALSE, NULL),

-- Capital One Savor
((SELECT id FROM cards WHERE name = 'Capital One Savor Cash Rewards Credit Card'), 'Dining', 4.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Capital One Savor Cash Rewards Credit Card'), 'Entertainment', 4.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Capital One Savor Cash Rewards Credit Card'), 'Groceries', 2.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Capital One Savor Cash Rewards Credit Card'), 'Other', 1.0, FALSE, NULL),

-- Capital One QuicksilverOne
((SELECT id FROM cards WHERE name = 'Capital One QuicksilverOne Cash Rewards Credit Card'), 'All Purchases', 1.5, FALSE, NULL),

-- Capital One Platinum
((SELECT id FROM cards WHERE name = 'Capital One Platinum Credit Card'), 'Other', 0.0, FALSE, NULL),

-- Capital One Platinum Secured
((SELECT id FROM cards WHERE name = 'Capital One Platinum Secured Credit Card'), 'Other', 0.0, FALSE, NULL),

-- Capital One Savor Student
((SELECT id FROM cards WHERE name = 'Capital One Savor Student Cash Rewards Credit Card'), 'Dining', 3.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Capital One Savor Student Cash Rewards Credit Card'), 'Entertainment', 3.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Capital One Savor Student Cash Rewards Credit Card'), 'Streaming', 3.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Capital One Savor Student Cash Rewards Credit Card'), 'Other', 1.0, FALSE, NULL),

-- Capital One Spark Cash Plus
((SELECT id FROM cards WHERE name = 'Capital One Spark Cash Plus'), 'All Purchases', 2.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Capital One Spark Cash Plus'), 'Hotels', 5.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Capital One Spark Cash Plus'), 'Rental Cars', 5.0, FALSE, NULL),

-- Capital One Spark Miles
((SELECT id FROM cards WHERE name = 'Capital One Spark Miles for Business'), 'All Purchases', 2.0, FALSE, NULL),

-- Citi Custom Cash
((SELECT id FROM cards WHERE name = 'Citi Custom Cash® Card'), 'Top Category', 5.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Citi Custom Cash® Card'), 'Other', 1.0, FALSE, NULL),

-- Citi Strata Premier
((SELECT id FROM cards WHERE name = 'Citi Strata Premier® Card'), 'Travel', 3.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Citi Strata Premier® Card'), 'Gas', 3.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Citi Strata Premier® Card'), 'Groceries', 3.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Citi Strata Premier® Card'), 'Restaurants', 3.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Citi Strata Premier® Card'), 'Other', 1.0, FALSE, NULL),

-- Citi Simplicity
((SELECT id FROM cards WHERE name = 'Citi Simplicity® Card'), 'Other', 0.0, FALSE, NULL),

-- Citi Diamond Preferred
((SELECT id FROM cards WHERE name = 'Citi® Diamond Preferred® Card'), 'Other', 0.0, FALSE, NULL),

-- Citi AAdvantage Platinum Select
((SELECT id FROM cards WHERE name = 'Citi® / AAdvantage® Platinum Select® World Elite Mastercard®'), 'American Airlines', 2.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Citi® / AAdvantage® Platinum Select® World Elite Mastercard®'), 'Gas', 2.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Citi® / AAdvantage® Platinum Select® World Elite Mastercard®'), 'Restaurants', 2.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Citi® / AAdvantage® Platinum Select® World Elite Mastercard®'), 'Other', 1.0, FALSE, NULL),

-- Citi AAdvantage Executive
((SELECT id FROM cards WHERE name = 'Citi® / AAdvantage® Executive World Elite Mastercard®'), 'American Airlines', 2.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Citi® / AAdvantage® Executive World Elite Mastercard®'), 'Restaurants', 2.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Citi® / AAdvantage® Executive World Elite Mastercard®'), 'Other', 1.0, FALSE, NULL),

-- Continue with remaining cards categories...
-- Discover Chrome
((SELECT id FROM cards WHERE name = 'Discover it® Chrome'), 'Gas', 2.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Discover it® Chrome'), 'Restaurants', 2.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Discover it® Chrome'), 'Other', 1.0, FALSE, NULL),

-- Discover Miles
((SELECT id FROM cards WHERE name = 'Discover it® Miles'), 'All Purchases', 1.5, FALSE, NULL),

-- Discover Student Cash Back
((SELECT id FROM cards WHERE name = 'Discover it® Student Cash Back'), 'Rotating Categories', 5.0, TRUE, '2024-12-31'),
((SELECT id FROM cards WHERE name = 'Discover it® Student Cash Back'), 'Other', 1.0, FALSE, NULL),

-- Discover Student Chrome
((SELECT id FROM cards WHERE name = 'Discover it® Student Chrome'), 'Gas', 2.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Discover it® Student Chrome'), 'Restaurants', 2.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Discover it® Student Chrome'), 'Other', 1.0, FALSE, NULL),

-- Discover Secured
((SELECT id FROM cards WHERE name = 'Discover it® Secured Credit Card'), 'Gas', 2.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Discover it® Secured Credit Card'), 'Restaurants', 2.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Discover it® Secured Credit Card'), 'Other', 1.0, FALSE, NULL),

-- NHL Discover
((SELECT id FROM cards WHERE name = 'NHL® Discover it®'), 'Rotating Categories', 5.0, TRUE, '2024-12-31'),
((SELECT id FROM cards WHERE name = 'NHL® Discover it®'), 'Other', 1.0, FALSE, NULL),

-- U.S. Bank Altitude Connect
((SELECT id FROM cards WHERE name = 'U.S. Bank Altitude Connect Visa Signature® Card'), 'Travel', 4.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'U.S. Bank Altitude Connect Visa Signature® Card'), 'Streaming', 2.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'U.S. Bank Altitude Connect Visa Signature® Card'), 'Gas', 2.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'U.S. Bank Altitude Connect Visa Signature® Card'), 'Groceries', 2.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'U.S. Bank Altitude Connect Visa Signature® Card'), 'Other', 1.0, FALSE, NULL),

-- U.S. Bank Visa Platinum
((SELECT id FROM cards WHERE name = 'U.S. Bank Visa® Platinum Card'), 'Other', 0.0, FALSE, NULL),

-- U.S. Bank Smartly
((SELECT id FROM cards WHERE name = 'U.S. Bank Smartly™ Visa Signature® Card'), 'Top Category', 4.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'U.S. Bank Smartly™ Visa Signature® Card'), 'Other', 1.5, FALSE, NULL),

-- U.S. Bank Shopper Cash Rewards
((SELECT id FROM cards WHERE name = 'U.S. Bank Shopper Cash Rewards Visa Signature® Card'), 'Streaming', 6.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'U.S. Bank Shopper Cash Rewards Visa Signature® Card'), 'Groceries', 3.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'U.S. Bank Shopper Cash Rewards Visa Signature® Card'), 'Gas', 3.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'U.S. Bank Shopper Cash Rewards Visa Signature® Card'), 'Other', 1.5, FALSE, NULL),

-- Altitude Go Secured
((SELECT id FROM cards WHERE name = 'Altitude Go Secured Visa® Card'), 'Dining', 4.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Altitude Go Secured Visa® Card'), 'Groceries', 2.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Altitude Go Secured Visa® Card'), 'Other', 1.0, FALSE, NULL),

-- Synchrony Premier
((SELECT id FROM cards WHERE name = 'Synchrony Premier World Mastercard®'), 'All Purchases', 2.0, FALSE, NULL),

-- Sam's Club
((SELECT id FROM cards WHERE name = 'Sam''s Club® Mastercard®'), 'Gas', 5.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Sam''s Club® Mastercard®'), 'Dining', 3.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Sam''s Club® Mastercard®'), 'Travel', 3.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Sam''s Club® Mastercard®'), 'Other', 1.0, FALSE, NULL),

-- PayPal Cashback
((SELECT id FROM cards WHERE name = 'PayPal Cashback Mastercard®'), 'PayPal Purchases', 3.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'PayPal Cashback Mastercard®'), 'All Purchases', 2.0, FALSE, NULL),

-- Amazon Store Card
((SELECT id FROM cards WHERE name = 'Amazon Store Card'), 'Amazon Purchases', 5.0, FALSE, NULL),

-- PNC Cash Rewards
((SELECT id FROM cards WHERE name = 'PNC Cash Rewards® Visa® Credit Card'), 'Gas', 4.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'PNC Cash Rewards® Visa® Credit Card'), 'Dining', 3.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'PNC Cash Rewards® Visa® Credit Card'), 'Groceries', 2.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'PNC Cash Rewards® Visa® Credit Card'), 'Other', 1.0, FALSE, NULL),

-- PNC Cash Unlimited
((SELECT id FROM cards WHERE name = 'PNC Cash Unlimited® Visa Signature® Credit Card'), 'All Purchases', 1.5, FALSE, NULL),

-- Navy Federal More Rewards
((SELECT id FROM cards WHERE name = 'Navy Federal Credit Union® More Rewards American Express® Credit Card'), 'Supermarkets', 3.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Navy Federal Credit Union® More Rewards American Express® Credit Card'), 'Gas', 3.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Navy Federal Credit Union® More Rewards American Express® Credit Card'), 'Restaurants', 3.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Navy Federal Credit Union® More Rewards American Express® Credit Card'), 'Other', 1.0, FALSE, NULL),

-- Navy Federal cashRewards
((SELECT id FROM cards WHERE name = 'Navy Federal Credit Union® cashRewards Credit Card'), 'All Purchases', 1.75, FALSE, NULL),

-- Navy Federal Flagship
((SELECT id FROM cards WHERE name = 'Navy Federal Credit Union® Visa Signature® Flagship Rewards Credit Card'), 'Travel', 5.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Navy Federal Credit Union® Visa Signature® Flagship Rewards Credit Card'), 'Restaurants', 3.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'Navy Federal Credit Union® Visa Signature® Flagship Rewards Credit Card'), 'Other', 2.0, FALSE, NULL),

-- USAA Rate Advantage
((SELECT id FROM cards WHERE name = 'USAA® Rate Advantage Visa Platinum® Card'), 'Other', 0.0, FALSE, NULL),

-- USAA Cashback Plus
((SELECT id FROM cards WHERE name = 'USAA Cashback Rewards Plus American Express® Credit Card'), 'Gas', 5.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'USAA Cashback Rewards Plus American Express® Credit Card'), 'Military Base', 5.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'USAA Cashback Rewards Plus American Express® Credit Card'), 'Groceries', 2.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'USAA Cashback Rewards Plus American Express® Credit Card'), 'Other', 1.0, FALSE, NULL),

-- USAA Preferred Cash
((SELECT id FROM cards WHERE name = 'USAA® Preferred Cash Rewards Visa Signature® Credit Card'), 'All Purchases', 1.5, FALSE, NULL),

-- Barclays Aviator Red
((SELECT id FROM cards WHERE name = 'AAdvantage® Aviator® Red World Elite Mastercard®'), 'American Airlines', 2.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'AAdvantage® Aviator® Red World Elite Mastercard®'), 'Other', 1.0, FALSE, NULL),

-- JetBlue Card
((SELECT id FROM cards WHERE name = 'JetBlue Card'), 'JetBlue Purchases', 2.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'JetBlue Card'), 'Restaurants', 2.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'JetBlue Card'), 'Groceries', 2.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'JetBlue Card'), 'Other', 1.0, FALSE, NULL),

-- JetBlue Plus
((SELECT id FROM cards WHERE name = 'JetBlue Plus Card'), 'JetBlue Purchases', 2.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'JetBlue Plus Card'), 'Restaurants', 2.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'JetBlue Plus Card'), 'Groceries', 2.0, FALSE, NULL),
((SELECT id FROM cards WHERE name = 'JetBlue Plus Card'), 'Other', 1.0, FALSE, NULL),

-- Alliant Signature
((SELECT id FROM cards WHERE name = 'Alliant Signature Visa'), 'All Purchases', 2.5, FALSE, NULL),

-- Alliant Platinum
((SELECT id FROM cards WHERE name = 'Alliant Platinum Visa'), 'Other', 0.0, FALSE, NULL);

-- Update some cards to be popular
UPDATE cards SET is_popular = TRUE WHERE name IN (
  'Chase Sapphire Preferred® Card',
  'Wells Fargo Autograph® Card',
  'Capital One Venture Rewards Credit Card',
  'Bank of America® Unlimited Cash Rewards credit card',
  'Bank of America® Customized Cash Rewards credit card',
  'Citi Custom Cash® Card',
  'Alliant Signature Visa'
);
