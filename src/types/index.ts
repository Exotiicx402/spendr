export interface Cryptocurrency {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  color: string;
}

export interface Location {
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Business {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  image: string;
  logo?: string;
  location: Location;
  acceptedCryptos: string[]; // Array of crypto IDs
  hours?: {
    [key: string]: string;
  };
  phone?: string;
  website?: string;
  email?: string;
  featured?: boolean;
  verified?: boolean;
  rating?: number;
  reviewCount?: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}
