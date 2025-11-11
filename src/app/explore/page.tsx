"use client";

import { useState, useEffect } from "react";
import { BusinessCardEnhanced } from "@/components/BusinessCardEnhanced";
import { getAllBusinesses, getAllCryptocurrencies } from "@/lib/supabase-queries";
import { Business, Cryptocurrency } from "@/types";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Search, Filter, MapPin, Star, ChevronDown } from "lucide-react";

export default function ExplorePage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [cryptocurrencies, setCryptocurrencies] = useState<Cryptocurrency[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCryptos, setSelectedCryptos] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    async function fetchData() {
      const [businessesData, cryptosData] = await Promise.all([
        getAllBusinesses(),
        getAllCryptocurrencies()
      ]);
      setBusinesses(businessesData);
      setCryptocurrencies(cryptosData);
      setIsLoading(false);
    }
    fetchData();
    
    // Get user's geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => {
          console.log('Geolocation permission denied');
        }
      );
    }
  }, []);

  // Calculate distance from user location
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 3959; // Radius of Earth in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Filter businesses
  const filteredBusinesses = businesses.filter(business => {
    // Search query filter
    if (searchQuery && !business.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !business.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !business.category.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Location filter
    if (locationQuery && 
        !business.location.city.toLowerCase().includes(locationQuery.toLowerCase()) &&
        !business.location.state.toLowerCase().includes(locationQuery.toLowerCase()) &&
        !business.location.zip.includes(locationQuery)) {
      return false;
    }
    
    // Category filter
    if (selectedCategory !== 'All' && business.category !== selectedCategory) {
      return false;
    }
    
    // Crypto filter
    if (selectedCryptos.length > 0) {
      const businessCryptoSymbols = cryptocurrencies
        .filter(c => business.acceptedCryptos.includes(c.id))
        .map(c => c.symbol);
      const hasSelectedCrypto = selectedCryptos.some(selected => 
        businessCryptoSymbols.includes(selected)
      );
      if (!hasSelectedCrypto) return false;
    }
    
    // Rating filter
    if (selectedRating !== null && (business.rating || 0) < selectedRating) {
      return false;
    }
    
    return true;
  });

  // Sort businesses based on selected option
  const sortedBusinesses = [...filteredBusinesses].sort((a, b) => {
    switch (sortBy) {
      case 'featured':
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'name':
        return a.name.localeCompare(b.name);
      case 'distance':
        if (!userLocation) return 0;
        const distA = calculateDistance(userLocation.lat, userLocation.lng, 
          a.location.coordinates.lat, a.location.coordinates.lng);
        const distB = calculateDistance(userLocation.lat, userLocation.lng,
          b.location.coordinates.lat, b.location.coordinates.lng);
        return distA - distB;
      case 'newest':
        return 0; // Already sorted by created_at in query
      default:
        return 0;
    }
  });

  const clearFilters = () => {
    setSearchQuery('');
    setLocationQuery('');
    setSelectedCategory('All');
    setSelectedCryptos([]);
    setSelectedRating(null);
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="flex flex-col lg:flex-row">
        {/* Mobile Collapsible Filters */}
        <div className="lg:hidden bg-white border-b border-gray-200">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="w-full px-6 py-4 flex items-center justify-between text-black font-semibold"
          >
            <span className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters
            </span>
            <ChevronDown 
              className={`w-5 h-5 transition-transform duration-300 ${filtersOpen ? 'rotate-180' : ''}`}
            />
          </button>
          {filtersOpen && (
            <div className="px-6 pb-6 space-y-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search businesses..."
                  className="pl-10 bg-gray-100 border-gray-300 text-black placeholder:text-gray-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Separator className="bg-gray-200" />

              {/* Location Filter */}
              <div>
                <h3 className="text-sm font-semibold text-black mb-3 flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Location
                </h3>
                <Input
                  type="text"
                  placeholder="City, State, or ZIP"
                  className="bg-gray-100 border-gray-300 text-black placeholder:text-gray-500"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                />
              </div>

              <Separator className="bg-gray-200" />

              {/* Category Filter */}
              <div>
                <h3 className="text-sm font-semibold text-black mb-3">Category</h3>
                <div className="space-y-2">
                  {["All", "Food & Beverage", "Retail", "Services", "Entertainment", "Healthcare"].map((category) => (
                    <Button
                      key={category}
                      variant="ghost"
                      className={`w-full justify-start hover:text-black hover:bg-gray-100 ${
                        selectedCategory === category ? 'text-black bg-gray-100 font-semibold' : 'text-gray-700'
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              <Separator className="bg-gray-200" />

              {/* Cryptocurrency Filter */}
              <div>
                <h3 className="text-sm font-semibold text-black mb-3">Accepted Crypto</h3>
                <div className="flex flex-wrap gap-2">
                  {cryptocurrencies.map((crypto) => (
                    <Badge
                      key={crypto.id}
                      variant="outline"
                      className={`border-gray-300 cursor-pointer ${
                        selectedCryptos.includes(crypto.symbol)
                          ? 'bg-black text-white'
                          : 'text-black bg-white hover:bg-gray-100'
                      }`}
                      onClick={() => {
                        if (selectedCryptos.includes(crypto.symbol)) {
                          setSelectedCryptos(selectedCryptos.filter(s => s !== crypto.symbol));
                        } else {
                          setSelectedCryptos([...selectedCryptos, crypto.symbol]);
                        }
                      }}
                    >
                      {crypto.symbol}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator className="bg-gray-200" />

              {/* Rating Filter */}
              <div>
                <h3 className="text-sm font-semibold text-black mb-3 flex items-center">
                  <Star className="w-4 h-4 mr-2" />
                  Minimum Rating
                </h3>
                <div className="space-y-2">
                  {["4.5+", "4.0+", "3.5+", "3.0+", "Any"].map((rating) => {
                    const ratingValue = rating === "Any" ? null : parseFloat(rating);
                    return (
                      <Button
                        key={rating}
                        variant="ghost"
                        className={`w-full justify-start hover:text-black hover:bg-gray-100 ${
                          selectedRating === ratingValue ? 'text-black bg-gray-100 font-semibold' : 'text-gray-700'
                        }`}
                        onClick={() => setSelectedRating(ratingValue)}
                      >
                        {rating}
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Clear Filters */}
              <Button
                variant="outline"
                className="w-full border-gray-300 text-black bg-white hover:bg-gray-100"
                onClick={clearFilters}
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>

        {/* Desktop Sidebar - Search & Filters */}
        <aside className="hidden lg:block w-80 min-h-screen border-r border-gray-800 bg-black sticky top-0 p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Explore</h1>
              <p className="text-sm text-gray-400">
                Discover crypto-friendly businesses
              </p>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search businesses..."
                className="pl-10 bg-neutral-900 border-gray-700 text-white placeholder:text-gray-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Separator className="bg-gray-800" />

            {/* Location Filter */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-3 flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                Location
              </h3>
              <Input
                type="text"
                placeholder="City, State, or ZIP"
                className="bg-neutral-900 border-gray-700 text-white placeholder:text-gray-500"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
              />
            </div>

            <Separator className="bg-gray-800" />

            {/* Category Filter */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-3">Category</h3>
              <div className="space-y-2">
                {["All", "Food & Beverage", "Retail", "Services", "Entertainment", "Healthcare"].map((category) => (
                  <Button
                    key={category}
                    variant="ghost"
                    className={`w-full justify-start hover:text-white hover:bg-neutral-900 ${
                      selectedCategory === category ? 'text-white bg-neutral-900 font-semibold' : 'text-gray-400'
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            <Separator className="bg-gray-800" />

            {/* Cryptocurrency Filter */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-3">Accepted Crypto</h3>
              <div className="flex flex-wrap gap-2">
                {cryptocurrencies.map((crypto) => (
                  <Badge
                    key={crypto.id}
                    variant="outline"
                    className={`border-gray-700 cursor-pointer ${
                      selectedCryptos.includes(crypto.symbol)
                        ? 'bg-white text-black font-semibold'
                        : 'text-black bg-white/50 hover:bg-white'
                    }`}
                    onClick={() => {
                      if (selectedCryptos.includes(crypto.symbol)) {
                        setSelectedCryptos(selectedCryptos.filter(s => s !== crypto.symbol));
                      } else {
                        setSelectedCryptos([...selectedCryptos, crypto.symbol]);
                      }
                    }}
                  >
                    {crypto.symbol}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator className="bg-gray-800" />

            {/* Rating Filter */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-3 flex items-center">
                <Star className="w-4 h-4 mr-2" />
                Minimum Rating
              </h3>
              <div className="space-y-2">
                {["4.5+", "4.0+", "3.5+", "3.0+", "Any"].map((rating) => {
                  const ratingValue = rating === "Any" ? null : parseFloat(rating);
                  return (
                    <Button
                      key={rating}
                      variant="ghost"
                      className={`w-full justify-start hover:text-white hover:bg-neutral-900 ${
                        selectedRating === ratingValue ? 'text-white bg-neutral-900 font-semibold' : 'text-gray-400'
                      }`}
                      onClick={() => setSelectedRating(ratingValue)}
                    >
                      {rating}
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Clear Filters */}
            <Button
              variant="outline"
              className="w-full border-gray-700 text-black bg-white hover:bg-gray-200"
              onClick={clearFilters}
            >
              Clear All Filters
            </Button>
          </div>
        </aside>

        {/* Main Content - Business Cards */}
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            {/* Results Header */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-400">
                Showing <span className="text-white font-semibold">{sortedBusinesses.length}</span> of {businesses.length} businesses
              </p>
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-700 text-black bg-white hover:bg-gray-200"
                  onClick={() => setSortMenuOpen(!sortMenuOpen)}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Sort by
                </Button>
                {sortMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="py-1">
                      {[
                        { value: 'featured', label: 'Featured' },
                        { value: 'rating', label: 'Highest Rated' },
                        { value: 'distance', label: 'Nearest to Me' },
                        { value: 'name', label: 'Name (A-Z)' },
                        { value: 'newest', label: 'Newest' },
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setSortBy(option.value);
                            setSortMenuOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                            sortBy === option.value ? 'bg-gray-100 font-semibold' : ''
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Business Cards Grid - 2 columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {sortedBusinesses.map((business) => (
                <BusinessCardEnhanced key={business.id} business={business} />
              ))}
            </div>

            {businesses.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400">No businesses found</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
