# Deployment Instructions

## Vercel Environment Variables

Add these environment variables in your Vercel project settings:

1. Go to https://vercel.com/your-project/settings/environment-variables
2. Add the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://yxwjlfjocaezwiqwwcvl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4d2psZmpvY2FlendpcXd3Y3ZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2NDMyMjcsImV4cCI6MjA3ODIxOTIyN30.5zQGGKKQcHLaI4svV2Sb77-0rbKM48SORvKrK5280RA
```

3. Make sure to add them for all environments (Production, Preview, Development)
4. Redeploy your site for the changes to take effect

## Database Setup Complete ✅

The Supabase database has been set up with:
- `businesses` table
- `cryptocurrencies` table
- `business_cryptocurrencies` junction table
- Sample data for 3 businesses
- Public read access enabled

## Adding New Businesses

You can now add businesses directly in Supabase:

1. Go to https://supabase.com/dashboard/project/yxwjlfjocaezwiqwwcvl/editor
2. Click on the `businesses` table
3. Click "Insert row" to add new businesses
4. Link cryptocurrencies in the `business_cryptocurrencies` table
