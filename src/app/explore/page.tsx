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
  }, []);

  // Sort businesses based on selected option
  const sortedBusinesses = [...businesses].sort((a, b) => {
    switch (sortBy) {
      case 'featured':
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'name':
        return a.name.localeCompare(b.name);
      case 'newest':
        return 0; // Already sorted by created_at in query
      default:
        return 0;
    }
  });

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
                      className="w-full justify-start text-gray-700 hover:text-black hover:bg-gray-100"
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
                      className="border-gray-300 text-black bg-white hover:bg-gray-100 cursor-pointer"
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
                  {["4.5+", "4.0+", "3.5+", "3.0+", "Any"].map((rating) => (
                    <Button
                      key={rating}
                      variant="ghost"
                      className="w-full justify-start text-gray-700 hover:text-black hover:bg-gray-100"
                    >
                      {rating}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <Button
                variant="outline"
                className="w-full border-gray-300 text-black bg-white hover:bg-gray-100"
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
                    className="w-full justify-start text-gray-400 hover:text-white hover:bg-neutral-900"
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
                className="border-gray-700 text-black bg-white hover:bg-gray-200 cursor-pointer"
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
                {["4.5+", "4.0+", "3.5+", "3.0+", "Any"].map((rating) => (
                  <Button
                    key={rating}
                    variant="ghost"
                    className="w-full justify-start text-gray-400 hover:text-white hover:bg-neutral-900"
                  >
                    {rating}
                  </Button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            <Button
              variant="outline"
              className="w-full border-gray-700 text-black bg-white hover:bg-gray-200"
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
                Showing <span className="text-white font-semibold">{businesses.length}</span> businesses
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
