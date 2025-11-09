-- Clear existing data first
DELETE FROM business_cryptocurrencies;
DELETE FROM businesses;

-- Insert businesses
INSERT INTO businesses (name, slug, description, category, image, logo, address, city, state, zip, country, latitude, longitude, phone, website, email, hours, featured, verified, rating, review_count)
VALUES
  -- Coffee Shops
  ('Crypto Coffee House', 'crypto-coffee-house', 'A modern coffee shop where you can pay with your favorite cryptocurrencies. Specializing in artisan coffee and pastries.', 'Coffee & Tea', 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800', 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=200', '123 Main St', 'San Francisco', 'CA', '94102', 'USA', 37.7749, -122.4194, '(415) 555-0123', 'https://cryptocoffeehouse.com', 'hello@cryptocoffeehouse.com', '{"monday": "7:00 AM - 6:00 PM", "tuesday": "7:00 AM - 6:00 PM", "wednesday": "7:00 AM - 6:00 PM", "thursday": "7:00 AM - 6:00 PM", "friday": "7:00 AM - 8:00 PM", "saturday": "8:00 AM - 8:00 PM", "sunday": "8:00 AM - 5:00 PM"}', true, true, 4.8, 247),
  
  ('Bean & Bitcoin', 'bean-and-bitcoin', 'Your neighborhood coffee spot embracing the future of payments. Fresh roasted beans daily.', 'Coffee & Tea', 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800', 'https://images.unsplash.com/photo-1559496417-e7f25c0c5cea?w=200', '456 Market St', 'Austin', 'TX', '78701', 'USA', 30.2672, -97.7431, '(512) 555-0147', 'https://beanandbitcoin.com', 'info@beanandbitcoin.com', '{"monday": "6:00 AM - 7:00 PM", "tuesday": "6:00 AM - 7:00 PM", "wednesday": "6:00 AM - 7:00 PM", "thursday": "6:00 AM - 7:00 PM", "friday": "6:00 AM - 9:00 PM", "saturday": "7:00 AM - 9:00 PM", "sunday": "7:00 AM - 6:00 PM"}', true, true, 4.6, 189),
  
  -- Restaurants
  ('Digital Eats', 'digital-eats', 'Farm-to-table dining meets digital currency. Fresh, organic ingredients prepared by award-winning chefs.', 'Restaurant', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200', '789 Broadway', 'New York', 'NY', '10003', 'USA', 40.7128, -74.0060, '(212) 555-0198', 'https://digitaleats.com', 'reservations@digitaleats.com', '{"monday": "11:00 AM - 10:00 PM", "tuesday": "11:00 AM - 10:00 PM", "wednesday": "11:00 AM - 10:00 PM", "thursday": "11:00 AM - 10:00 PM", "friday": "11:00 AM - 11:00 PM", "saturday": "10:00 AM - 11:00 PM", "sunday": "10:00 AM - 9:00 PM"}', true, true, 4.9, 512),
  
  ('Blockchain Bistro', 'blockchain-bistro', 'Fine dining with a tech twist. Experience culinary excellence while paying with cryptocurrency.', 'Restaurant', 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800', 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=200', '321 5th Ave', 'Miami', 'FL', '33139', 'USA', 25.7617, -80.1918, '(305) 555-0234', 'https://blockchainbistro.com', 'contact@blockchainbistro.com', '{"monday": "5:00 PM - 11:00 PM", "tuesday": "5:00 PM - 11:00 PM", "wednesday": "5:00 PM - 11:00 PM", "thursday": "5:00 PM - 11:00 PM", "friday": "5:00 PM - 12:00 AM", "saturday": "5:00 PM - 12:00 AM", "sunday": "5:00 PM - 10:00 PM"}', false, true, 4.7, 334),
  
  ('The Satoshi Steakhouse', 'satoshi-steakhouse', 'Premium cuts and premium crypto. The finest steakhouse accepting digital currencies.', 'Restaurant', 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800', 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=200', '567 Oak St', 'Chicago', 'IL', '60611', 'USA', 41.8781, -87.6298, '(312) 555-0289', 'https://satoshisteakhouse.com', 'info@satoshisteakhouse.com', '{"monday": "5:00 PM - 10:00 PM", "tuesday": "5:00 PM - 10:00 PM", "wednesday": "5:00 PM - 10:00 PM", "thursday": "5:00 PM - 10:00 PM", "friday": "5:00 PM - 11:00 PM", "saturday": "4:00 PM - 11:00 PM", "sunday": "4:00 PM - 9:00 PM"}', true, true, 4.9, 428),
  
  -- Bars & Nightlife
  ('The Crypto Bar', 'crypto-bar', 'Craft cocktails and cryptocurrency. A modern bar for the digital age.', 'Bar & Nightlife', 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800', 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=200', '890 Pine St', 'Seattle', 'WA', '98101', 'USA', 47.6062, -122.3321, '(206) 555-0345', 'https://thecryptobar.com', 'hello@thecryptobar.com', '{"monday": "4:00 PM - 12:00 AM", "tuesday": "4:00 PM - 12:00 AM", "wednesday": "4:00 PM - 12:00 AM", "thursday": "4:00 PM - 2:00 AM", "friday": "4:00 PM - 2:00 AM", "saturday": "2:00 PM - 2:00 AM", "sunday": "2:00 PM - 12:00 AM"}', false, true, 4.5, 267),
  
  -- Tech & Electronics
  ('Tech Haven', 'tech-haven', 'Your one-stop shop for electronics and gadgets. Pay with crypto for the latest tech.', 'Electronics', 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800', 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=200', '234 Tech Blvd', 'Los Angeles', 'CA', '90012', 'USA', 34.0522, -118.2437, '(213) 555-0456', 'https://techhaven.com', 'support@techhaven.com', '{"monday": "10:00 AM - 8:00 PM", "tuesday": "10:00 AM - 8:00 PM", "wednesday": "10:00 AM - 8:00 PM", "thursday": "10:00 AM - 8:00 PM", "friday": "10:00 AM - 9:00 PM", "saturday": "10:00 AM - 9:00 PM", "sunday": "11:00 AM - 7:00 PM"}', true, true, 4.7, 892),
  
  ('Gadget Galaxy', 'gadget-galaxy', 'Discover the latest gadgets and tech accessories. Crypto-friendly since day one.', 'Electronics', 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800', 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=200', '678 Innovation Way', 'San Jose', 'CA', '95113', 'USA', 37.3382, -121.8863, '(408) 555-0567', 'https://gadgetgalaxy.com', 'hello@gadgetgalaxy.com', '{"monday": "9:00 AM - 9:00 PM", "tuesday": "9:00 AM - 9:00 PM", "wednesday": "9:00 AM - 9:00 PM", "thursday": "9:00 AM - 9:00 PM", "friday": "9:00 AM - 10:00 PM", "saturday": "9:00 AM - 10:00 PM", "sunday": "10:00 AM - 8:00 PM"}', false, true, 4.6, 543),
  
  -- Retail
  ('Crypto Threads', 'crypto-threads', 'Fashion-forward clothing boutique accepting cryptocurrency. Unique styles for unique people.', 'Retail & Shopping', 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800', 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=200', '901 Fashion Ave', 'Denver', 'CO', '80202', 'USA', 39.7392, -104.9903, '(303) 555-0678', 'https://cryptothreads.com', 'shop@cryptothreads.com', '{"monday": "10:00 AM - 7:00 PM", "tuesday": "10:00 AM - 7:00 PM", "wednesday": "10:00 AM - 7:00 PM", "thursday": "10:00 AM - 7:00 PM", "friday": "10:00 AM - 8:00 PM", "saturday": "10:00 AM - 8:00 PM", "sunday": "11:00 AM - 6:00 PM"}', false, true, 4.4, 156),
  
  ('Digital Goods Co.', 'digital-goods-co', 'Curated home goods and lifestyle products. Pay the modern way.', 'Retail & Shopping', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800', 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=200', '135 Home St', 'Portland', 'OR', '97201', 'USA', 45.5152, -122.6784, '(503) 555-0789', 'https://digitalgoodsco.com', 'info@digitalgoodsco.com', '{"monday": "10:00 AM - 6:00 PM", "tuesday": "10:00 AM - 6:00 PM", "wednesday": "10:00 AM - 6:00 PM", "thursday": "10:00 AM - 6:00 PM", "friday": "10:00 AM - 7:00 PM", "saturday": "10:00 AM - 7:00 PM", "sunday": "11:00 AM - 5:00 PM"}', false, true, 4.5, 203),
  
  -- Fitness & Wellness
  ('Blockchain Gym', 'blockchain-gym', 'State-of-the-art fitness center accepting crypto payments. Transform your body, embrace the future.', 'Health & Fitness', 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800', 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=200', '246 Fitness Ln', 'Boston', 'MA', '02108', 'USA', 42.3601, -71.0589, '(617) 555-0890', 'https://blockchaingym.com', 'memberships@blockchaingym.com', '{"monday": "5:00 AM - 11:00 PM", "tuesday": "5:00 AM - 11:00 PM", "wednesday": "5:00 AM - 11:00 PM", "thursday": "5:00 AM - 11:00 PM", "friday": "5:00 AM - 10:00 PM", "saturday": "7:00 AM - 9:00 PM", "sunday": "7:00 AM - 9:00 PM"}', true, true, 4.8, 367),
  
  ('Crypto Yoga Studio', 'crypto-yoga-studio', 'Find your zen and pay with crypto. Daily yoga and meditation classes.', 'Health & Fitness', 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800', 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=200', '357 Peace Rd', 'Boulder', 'CO', '80302', 'USA', 40.0150, -105.2705, '(720) 555-0901', 'https://cryptoyogastudio.com', 'namaste@cryptoyogastudio.com', '{"monday": "6:00 AM - 8:00 PM", "tuesday": "6:00 AM - 8:00 PM", "wednesday": "6:00 AM - 8:00 PM", "thursday": "6:00 AM - 8:00 PM", "friday": "6:00 AM - 7:00 PM", "saturday": "8:00 AM - 6:00 PM", "sunday": "8:00 AM - 6:00 PM"}', false, true, 4.9, 445),
  
  -- Services
  ('Decentralized Barber Shop', 'decentralized-barber-shop', 'Classic cuts, modern payments. Expert barbers accepting cryptocurrency.', 'Personal Care', 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800', 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=200', '468 Style St', 'Nashville', 'TN', '37201', 'USA', 36.1627, -86.7816, '(615) 555-1012', 'https://decentralizedbarbershop.com', 'bookings@decentralizedbarbershop.com', '{"monday": "9:00 AM - 7:00 PM", "tuesday": "9:00 AM - 7:00 PM", "wednesday": "9:00 AM - 7:00 PM", "thursday": "9:00 AM - 7:00 PM", "friday": "9:00 AM - 8:00 PM", "saturday": "8:00 AM - 6:00 PM", "sunday": "Closed"}', false, true, 4.7, 289),
  
  ('Bitcoin Auto Repair', 'bitcoin-auto-repair', 'Honest auto repair with transparent pricing in fiat or crypto. ASE certified technicians.', 'Automotive', 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800', 'https://images.unsplash.com/photo-1632823469876-1e32b7d2f4b5?w=200', '579 Motor Dr', 'Detroit', 'MI', '48201', 'USA', 42.3314, -83.0458, '(313) 555-1123', 'https://bitcoinautorepair.com', 'service@bitcoinautorepair.com', '{"monday": "7:00 AM - 6:00 PM", "tuesday": "7:00 AM - 6:00 PM", "wednesday": "7:00 AM - 6:00 PM", "thursday": "7:00 AM - 6:00 PM", "friday": "7:00 AM - 6:00 PM", "saturday": "8:00 AM - 4:00 PM", "sunday": "Closed"}', false, true, 4.8, 512),
  
  -- Hotels & Lodging
  ('Crypto Stay Hotel', 'crypto-stay-hotel', 'Luxury accommodations with crypto-friendly policies. Book your stay and pay digitally.', 'Hotel & Lodging', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=200', '680 Luxury Ln', 'Las Vegas', 'NV', '89101', 'USA', 36.1699, -115.1398, '(702) 555-1234', 'https://cryptostayhotel.com', 'reservations@cryptostayhotel.com', '{"monday": "24 hours", "tuesday": "24 hours", "wednesday": "24 hours", "thursday": "24 hours", "friday": "24 hours", "saturday": "24 hours", "sunday": "24 hours"}', true, true, 4.9, 678);

-- Link businesses to cryptocurrencies
INSERT INTO business_cryptocurrencies (business_id, cryptocurrency_id)
SELECT b.id, c.id
FROM businesses b
CROSS JOIN cryptocurrencies c
WHERE 
  -- Coffee shops accept BTC, ETH, USDC
  (b.slug IN ('crypto-coffee-house', 'bean-and-bitcoin') AND c.symbol IN ('BTC', 'ETH', 'USDC'))
  OR
  -- High-end restaurants accept all major cryptos
  (b.slug IN ('digital-eats', 'satoshi-steakhouse') AND c.symbol IN ('BTC', 'ETH', 'USDC', 'USDT'))
  OR
  -- Blockchain Bistro accepts BTC, ETH, SOL
  (b.slug = 'blockchain-bistro' AND c.symbol IN ('BTC', 'ETH', 'SOL'))
  OR
  -- Bars accept BTC, ETH, USDC
  (b.slug = 'crypto-bar' AND c.symbol IN ('BTC', 'ETH', 'USDC'))
  OR
  -- Tech stores accept everything
  (b.slug IN ('tech-haven', 'gadget-galaxy') AND c.symbol IN ('BTC', 'ETH', 'USDC', 'USDT', 'SOL'))
  OR
  -- Retail accepts BTC, ETH, USDC
  (b.slug IN ('crypto-threads', 'digital-goods-co') AND c.symbol IN ('BTC', 'ETH', 'USDC'))
  OR
  -- Fitness accepts BTC, ETH
  (b.slug IN ('blockchain-gym', 'crypto-yoga-studio') AND c.symbol IN ('BTC', 'ETH'))
  OR
  -- Services accept BTC, ETH, USDC
  (b.slug IN ('decentralized-barber-shop', 'bitcoin-auto-repair') AND c.symbol IN ('BTC', 'ETH', 'USDC'))
  OR
  -- Hotel accepts all
  (b.slug = 'crypto-stay-hotel' AND c.symbol IN ('BTC', 'ETH', 'USDC', 'USDT', 'SOL'));
