"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BusinessCardEnhanced } from "@/components/BusinessCardEnhanced";
import { getFeaturedBusinesses } from "@/data/businesses";
import { cryptocurrencies } from "@/data/cryptocurrencies";
import { ArrowRight, Search, MapPin, Shield } from "lucide-react";
import { BeamsBackground } from "@/components/ui/beams-background";
import { motion } from "motion/react";

export default function Home() {
  const featuredBusinesses = getFeaturedBusinesses();
  
  return (
    <div className="bg-black">
      {/* Hero Section with Beams Background */}
      <BeamsBackground intensity="medium">
        <div className="relative z-10 flex min-h-screen w-full items-center">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left Side - Liquid Glass Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white tracking-tight">
                    Crypto spent beautifully.
                  </h1>
                  <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
                    Discover businesses near you that accept cryptocurrency payments.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
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
              </motion.div>

              {/* Right Side - Open for Future Component */}
              <motion.div
                className="hidden lg:block"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Placeholder for future component */}
                <div className="h-full flex items-center justify-center">
                  {/* Add your component here */}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </BeamsBackground>

      {/* Features Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-white">Easy Discovery</h3>
              <p className="text-gray-400">
                Search and filter businesses by location, category, and accepted cryptocurrencies.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-white">Local Businesses</h3>
              <p className="text-gray-400">
                Find crypto-friendly businesses in your area and support local commerce.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-white">Verified Listings</h3>
              <p className="text-gray-400">
                All businesses are verified to ensure they truly accept cryptocurrency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Businesses */}
      <section className="py-20 bg-neutral-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">Featured Businesses</h2>
            <Button variant="outline" className="border-gray-600 text-white hover:bg-white hover:text-black" asChild>
              <Link href="/explore">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBusinesses.map((business) => (
              <BusinessCardEnhanced key={business.id} business={business} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Cryptocurrencies */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">
            Popular Cryptocurrencies
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {cryptocurrencies.map((crypto) => (
              <Badge key={crypto.id} variant="outline" className="text-lg py-2 px-4 border-gray-600 text-white hover:bg-white hover:text-black">
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
