"use client";

import { BusinessCardEnhanced } from "@/components/BusinessCardEnhanced";
import { businesses } from "@/data/businesses";
import { cryptocurrencies } from "@/data/cryptocurrencies";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Search, Filter, MapPin, Star } from "lucide-react";

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="flex">
        {/* Fixed Left Sidebar - Search & Filters */}
        <aside className="w-80 min-h-screen border-r border-gray-800 bg-black sticky top-0 p-6 overflow-y-auto">
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
              <Button
                variant="outline"
                size="sm"
                className="border-gray-700 text-black bg-white hover:bg-gray-200"
              >
                <Filter className="w-4 h-4 mr-2" />
                Sort by
              </Button>
            </div>

            {/* Business Cards Grid - 2 columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {businesses.map((business) => (
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
