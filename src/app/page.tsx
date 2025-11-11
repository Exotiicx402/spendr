"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BusinessCardEnhanced } from "@/components/BusinessCardEnhanced";
import { BusinessMap } from "@/components/BusinessMap";
import { getAllBusinesses } from "@/lib/supabase-queries";
import { ArrowRight, MapPin } from "lucide-react";
import { BeamsBackground } from "@/components/ui/beams-background";
import { motion } from "motion/react";
import { getUserLocation, sortBusinessesByDistance } from "@/lib/geolocation";
import { Business } from "@/types";

export default function Home() {
  const [nearbyBusinesses, setNearbyBusinesses] = useState<Business[]>([]);
  const [allBusinesses, setAllBusinesses] = useState<Business[]>([]);
  const [userLocation, setUserLocation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const businesses = await getAllBusinesses();
      setAllBusinesses(businesses);
      const location = await getUserLocation();
      
      if (location && businesses.length > 0) {
        const sorted = sortBusinessesByDistance(
          businesses,
          location.latitude,
          location.longitude
        );
        setNearbyBusinesses(sorted.slice(0, 3));
        setUserLocation(location.city && location.region ? `${location.city}, ${location.region}` : null);
      } else {
        setNearbyBusinesses(businesses.slice(0, 3));
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);
  
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
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold italic mb-6 text-white tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Crypto spent <span className="font-normal">beautifully.</span>
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
              <Button size="lg" variant="outline" className="border-white text-black bg-white hover:bg-gray-200" asChild>
                      <Link href="/for-businesses">List Your Business</Link>
                    </Button>
                  </div>
                </div>
              </motion.div>

              {/* Right Side - Map */}
              <motion.div
                className="hidden lg:block"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="h-[600px]">
                  <BusinessMap businesses={allBusinesses} />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </BeamsBackground>

      {/* Closest Businesses */}
      <section className="py-20 bg-neutral-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Closest to You</h2>
              {userLocation && (
                <p className="text-gray-400 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {userLocation}
                </p>
              )}
            </div>
            <Button variant="outline" className="border-gray-600 text-black bg-white hover:bg-gray-200" asChild>
              <Link href="/explore">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-400">Finding businesses near you...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nearbyBusinesses.map((business) => (
                <BusinessCardEnhanced key={business.id} business={business} />
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
