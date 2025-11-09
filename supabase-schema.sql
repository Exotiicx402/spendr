-- Create businesses table
CREATE TABLE IF NOT EXISTS businesses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  logo TEXT,
  
  -- Location
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip TEXT NOT NULL,
  country TEXT DEFAULT 'USA',
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  
  -- Contact
  phone TEXT,
  website TEXT,
  email TEXT,
  
  -- Hours (stored as JSONB)
  hours JSONB,
  
  -- Metadata
  featured BOOLEAN DEFAULT FALSE,
  verified BOOLEAN DEFAULT FALSE,
  rating DECIMAL(2, 1),
  review_count INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create cryptocurrencies table
CREATE TABLE IF NOT EXISTS cryptocurrencies (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  symbol TEXT NOT NULL,
  icon TEXT NOT NULL,
  color TEXT NOT NULL
);

-- Create junction table for businesses and accepted cryptos
CREATE TABLE IF NOT EXISTS business_cryptocurrencies (
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  cryptocurrency_id TEXT REFERENCES cryptocurrencies(id) ON DELETE CASCADE,
  PRIMARY KEY (business_id, cryptocurrency_id)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_businesses_slug ON businesses(slug);
CREATE INDEX IF NOT EXISTS idx_businesses_city ON businesses(city);
CREATE INDEX IF NOT EXISTS idx_businesses_category ON businesses(category);
CREATE INDEX IF NOT EXISTS idx_businesses_featured ON businesses(featured);
CREATE INDEX IF NOT EXISTS idx_businesses_location ON businesses(latitude, longitude);

-- Insert cryptocurrencies
INSERT INTO cryptocurrencies (id, name, symbol, icon, color) VALUES
  ('btc', 'Bitcoin', 'BTC', '/bitcoin.svg', '#F7931A'),
  ('eth', 'Ethereum', 'ETH', '/ethereum.svg', '#627EEA'),
  ('usdc', 'USD Coin', 'USDC', '/usdc.svg', '#2775CA'),
  ('usdt', 'Tether', 'USDT', '/tether.svg', '#26A17B'),
  ('sol', 'Solana', 'SOL', '/solana.svg', '#14F195')
ON CONFLICT (id) DO NOTHING;

-- Insert sample businesses
INSERT INTO businesses (name, slug, description, category, image, address, city, state, zip, latitude, longitude, phone, website, hours, featured, verified, rating, review_count) VALUES
  (
    'Crypto Coffee House',
    'crypto-coffee-house',
    'Artisanal coffee shop accepting major cryptocurrencies. Enjoy your favorite brew while spending your digital assets.',
    'Food & Beverage',
    'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80',
    '123 Main St',
    'San Francisco',
    'CA',
    '94102',
    37.7749,
    -122.4194,
    '(415) 555-0123',
    'https://cryptocoffeehouse.example',
    '{"Monday": "7:00 AM - 6:00 PM", "Tuesday": "7:00 AM - 6:00 PM", "Wednesday": "7:00 AM - 6:00 PM", "Thursday": "7:00 AM - 6:00 PM", "Friday": "7:00 AM - 8:00 PM", "Saturday": "8:00 AM - 8:00 PM", "Sunday": "8:00 AM - 6:00 PM"}',
    true,
    true,
    4.8,
    127
  ),
  (
    'Digital Eats',
    'digital-eats',
    'Modern restaurant embracing the future of payments. Farm-to-table cuisine with cryptocurrency payment options.',
    'Food & Beverage',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    '456 Market St',
    'San Francisco',
    'CA',
    '94103',
    37.7849,
    -122.4094,
    '(415) 555-0456',
    'https://digitaleats.example',
    '{"Monday": "11:00 AM - 10:00 PM", "Tuesday": "11:00 AM - 10:00 PM", "Wednesday": "11:00 AM - 10:00 PM", "Thursday": "11:00 AM - 10:00 PM", "Friday": "11:00 AM - 11:00 PM", "Saturday": "10:00 AM - 11:00 PM", "Sunday": "10:00 AM - 9:00 PM"}',
    true,
    true,
    4.6,
    89
  ),
  (
    'Tech Haven',
    'tech-haven',
    'Electronics store accepting crypto. Latest gadgets and tech accessories available for digital currency.',
    'Electronics',
    'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80',
    '789 Tech Blvd',
    'Austin',
    'TX',
    '78701',
    30.2672,
    -97.7431,
    '(512) 555-0789',
    'https://techhaven.example',
    '{"Monday": "10:00 AM - 8:00 PM", "Tuesday": "10:00 AM - 8:00 PM", "Wednesday": "10:00 AM - 8:00 PM", "Thursday": "10:00 AM - 8:00 PM", "Friday": "10:00 AM - 9:00 PM", "Saturday": "10:00 AM - 9:00 PM", "Sunday": "11:00 AM - 7:00 PM"}',
    false,
    true,
    4.7,
    56
  )
ON CONFLICT (slug) DO NOTHING;

-- Link businesses to cryptocurrencies
INSERT INTO business_cryptocurrencies (business_id, cryptocurrency_id)
SELECT b.id, c.id
FROM businesses b
CROSS JOIN cryptocurrencies c
WHERE 
  (b.slug = 'crypto-coffee-house' AND c.id IN ('btc', 'eth', 'usdc'))
  OR (b.slug = 'digital-eats' AND c.id IN ('btc', 'eth', 'usdc', 'usdt'))
  OR (b.slug = 'tech-haven' AND c.id IN ('btc', 'eth', 'sol'))
ON CONFLICT DO NOTHING;

-- Enable Row Level Security (RLS)
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE cryptocurrencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_cryptocurrencies ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access
CREATE POLICY "Public read access for businesses" ON businesses FOR SELECT USING (true);
CREATE POLICY "Public read access for cryptocurrencies" ON cryptocurrencies FOR SELECT USING (true);
CREATE POLICY "Public read access for business_cryptocurrencies" ON business_cryptocurrencies FOR SELECT USING (true);
