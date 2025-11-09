import { BusinessCard } from "@/components/BusinessCard";
import { businesses } from "@/data/businesses";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function ExplorePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Explore Businesses</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Discover crypto-friendly businesses in your area
        </p>
        
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            type="text"
            placeholder="Search by name, location, or category..."
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {businesses.map((business) => (
          <BusinessCard key={business.id} business={business} />
        ))}
      </div>

      {businesses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No businesses found</p>
        </div>
      )}
    </div>
  );
}
