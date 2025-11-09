import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BusinessCard } from "@/components/BusinessCard";
import { getFeaturedBusinesses } from "@/data/businesses";
import { cryptocurrencies } from "@/data/cryptocurrencies";
import { ArrowRight, Search, MapPin, Shield } from "lucide-react";

export default function Home() {
  const featuredBusinesses = getFeaturedBusinesses();
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-black text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-6xl font-bold mb-4">
              Crypto spent beautifully.
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Discover businesses near you that accept cryptocurrency payments.
              Bridge the gap between digital assets and physical commerce.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-white text-black hover:bg-gray-200" asChild>
                <Link href="/explore">
                  Explore Businesses <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black" asChild>
                <Link href="/for-businesses">List Your Business</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Easy Discovery</h3>
              <p className="text-muted-foreground">
                Search and filter businesses by location, category, and accepted cryptocurrencies.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Local Businesses</h3>
              <p className="text-muted-foreground">
                Find crypto-friendly businesses in your area and support local commerce.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Verified Listings</h3>
              <p className="text-muted-foreground">
                All businesses are verified to ensure they truly accept cryptocurrency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Businesses */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Featured Businesses</h2>
            <Button variant="outline" asChild>
              <Link href="/explore">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBusinesses.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Cryptocurrencies */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Popular Cryptocurrencies
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {cryptocurrencies.map((crypto) => (
              <Badge key={crypto.id} variant="outline" className="text-lg py-2 px-4">
                {crypto.symbol} - {crypto.name}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Accept Crypto at Your Business?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Join our growing network of crypto-friendly businesses and reach new customers.
          </p>
          <Button size="lg" className="bg-white text-black hover:bg-gray-200" asChild>
            <Link href="/for-businesses">
              Get Listed Today <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
