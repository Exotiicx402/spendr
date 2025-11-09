import { supabase } from './supabase';
import { Business, Cryptocurrency } from '@/types';

// Fetch all businesses with their accepted cryptocurrencies
export async function getAllBusinesses(): Promise<Business[]> {
  const { data, error } = await supabase
    .from('businesses')
    .select(`
      *,
      business_cryptocurrencies (
        cryptocurrency_id
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching businesses:', error);
    return [];
  }

  console.log('Fetched businesses from Supabase:', data?.length || 0);
  return data.map(formatBusinessData);
}

// Fetch a single business by slug
export async function getBusinessBySlug(slug: string): Promise<Business | null> {
  const { data, error } = await supabase
    .from('businesses')
    .select(`
      *,
      business_cryptocurrencies (
        cryptocurrency_id
      )
    `)
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching business:', error);
    return null;
  }

  return formatBusinessData(data);
}

// Fetch featured businesses
export async function getFeaturedBusinesses(): Promise<Business[]> {
  const { data, error } = await supabase
    .from('businesses')
    .select(`
      *,
      business_cryptocurrencies (
        cryptocurrency_id
      )
    `)
    .eq('featured', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching featured businesses:', error);
    return [];
  }

  return data.map(formatBusinessData);
}

// Fetch all cryptocurrencies
export async function getAllCryptocurrencies(): Promise<Cryptocurrency[]> {
  const { data, error } = await supabase
    .from('cryptocurrencies')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching cryptocurrencies:', error);
    return [];
  }

  return data;
}

// Helper function to format business data from Supabase
function formatBusinessData(data: any): Business {
  return {
    id: data.id,
    name: data.name,
    slug: data.slug,
    description: data.description,
    category: data.category,
    image: data.image,
    logo: data.logo,
    location: {
      address: data.address,
      city: data.city,
      state: data.state,
      zip: data.zip,
      country: data.country,
      coordinates: {
        lat: parseFloat(data.latitude),
        lng: parseFloat(data.longitude),
      },
    },
    acceptedCryptos: data.business_cryptocurrencies?.map((bc: any) => bc.cryptocurrency_id) || [],
    hours: data.hours,
    phone: data.phone,
    website: data.website,
    email: data.email,
    featured: data.featured,
    verified: data.verified,
    rating: data.rating ? parseFloat(data.rating) : undefined,
    reviewCount: data.review_count,
  };
}
