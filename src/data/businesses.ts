import { Business } from "@/types";

export const businesses: Business[] = [
  {
    id: "1",
    name: "Crypto Coffee House",
    slug: "crypto-coffee-house",
    description: "Artisanal coffee shop accepting major cryptocurrencies. Enjoy your favorite brew while spending your digital assets.",
    category: "Food & Beverage",
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80",
    location: {
      address: "123 Main St",
      city: "San Francisco",
      state: "CA",
      zip: "94102",
      country: "USA",
      coordinates: { lat: 37.7749, lng: -122.4194 },
    },
    acceptedCryptos: ["btc", "eth", "usdc"],
    hours: {
      "Monday": "7:00 AM - 6:00 PM",
      "Tuesday": "7:00 AM - 6:00 PM",
      "Wednesday": "7:00 AM - 6:00 PM",
      "Thursday": "7:00 AM - 6:00 PM",
      "Friday": "7:00 AM - 8:00 PM",
      "Saturday": "8:00 AM - 8:00 PM",
      "Sunday": "8:00 AM - 6:00 PM",
    },
    phone: "(415) 555-0123",
    website: "https://cryptocoffeehouse.example",
    featured: true,
    verified: true,
    rating: 4.8,
    reviewCount: 127,
  },
  {
    id: "2",
    name: "Digital Eats",
    slug: "digital-eats",
    description: "Modern restaurant embracing the future of payments. Farm-to-table cuisine with cryptocurrency payment options.",
    category: "Food & Beverage",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    location: {
      address: "456 Market St",
      city: "San Francisco",
      state: "CA",
      zip: "94103",
      country: "USA",
      coordinates: { lat: 37.7849, lng: -122.4094 },
    },
    acceptedCryptos: ["btc", "eth", "usdc", "usdt"],
    hours: {
      "Monday": "11:00 AM - 10:00 PM",
      "Tuesday": "11:00 AM - 10:00 PM",
      "Wednesday": "11:00 AM - 10:00 PM",
      "Thursday": "11:00 AM - 10:00 PM",
      "Friday": "11:00 AM - 11:00 PM",
      "Saturday": "10:00 AM - 11:00 PM",
      "Sunday": "10:00 AM - 9:00 PM",
    },
    phone: "(415) 555-0456",
    website: "https://digitaleats.example",
    featured: true,
    verified: true,
    rating: 4.6,
    reviewCount: 89,
  },
  {
    id: "3",
    name: "Tech Haven",
    slug: "tech-haven",
    description: "Electronics store accepting crypto. Latest gadgets and tech accessories available for digital currency.",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80",
    location: {
      address: "789 Tech Blvd",
      city: "Austin",
      state: "TX",
      zip: "78701",
      country: "USA",
      coordinates: { lat: 30.2672, lng: -97.7431 },
    },
    acceptedCryptos: ["btc", "eth", "sol"],
    hours: {
      "Monday": "10:00 AM - 8:00 PM",
      "Tuesday": "10:00 AM - 8:00 PM",
      "Wednesday": "10:00 AM - 8:00 PM",
      "Thursday": "10:00 AM - 8:00 PM",
      "Friday": "10:00 AM - 9:00 PM",
      "Saturday": "10:00 AM - 9:00 PM",
      "Sunday": "11:00 AM - 7:00 PM",
    },
    phone: "(512) 555-0789",
    website: "https://techhaven.example",
    verified: true,
    rating: 4.7,
    reviewCount: 56,
  },
];

export const getBusinessBySlug = (slug: string): Business | undefined => {
  return businesses.find((business) => business.slug === slug);
};

export const getFeaturedBusinesses = (): Business[] => {
  return businesses.filter((business) => business.featured);
};
