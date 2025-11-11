"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Star, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Business } from "@/types";

interface BusinessCardEnhancedProps {
  business: Business;
  className?: string;
}

export const BusinessCardEnhanced = React.forwardRef<HTMLAnchorElement, BusinessCardEnhancedProps>(
  ({ business, className }, ref) => {
    // Map crypto IDs to symbols (simplified - just show count for now)
    const cryptoSymbols = ['BTC', 'ETH', 'USDC', 'USDT', 'SOL'].slice(0, Math.min(3, business.acceptedCryptos.length));

    return (
      <Link
        ref={ref}
        href={`/business/${business.slug}`}
        className={cn(
          "relative block h-[480px] rounded-2xl overflow-hidden group border border-gray-800 shadow-lg shadow-black/20 transition-transform hover:-translate-y-2",
          className
        )}
      >
          {/* Background Image */}
          <div className="absolute inset-0 w-full h-3/5">
            <Image
              src={business.image}
              alt={business.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          {/* Card Content */}
          <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-neutral-900 border-t border-gray-800 p-5 flex flex-col justify-between">
            <div className="space-y-2">
              {/* Category Tag */}
              <div className="flex items-center justify-between">
                <div className="flex items-center text-xs text-gray-400">
                  <MapPin className="w-4 h-4 mr-2 text-white" />
                  <span>{business.location.city}, {business.location.state}</span>
                </div>
                {business.verified && (
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                )}
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-white leading-tight line-clamp-1">
                {business.name}
              </h3>
              <p className="text-sm text-gray-400 line-clamp-2">{business.description}</p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-800">
              <div className="flex items-center gap-2">
                {business.rating && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-semibold text-white">{business.rating}</span>
                    <span className="text-xs text-gray-400">({business.reviewCount})</span>
                  </div>
                )}
              </div>
              
              {/* Crypto badges */}
              <div className="flex items-center gap-1">
                {cryptoSymbols.map((symbol) => {
                  const colorMap: Record<string, string> = {
                    'BTC': '#f7931a',
                    'ETH': '#497493',
                    'USDT': '#2ea07b',
                    'USDC': '#2775ca',
                  };
                  const bgColor = colorMap[symbol] || '#ffffff20';
                  return (
                    <span
                      key={symbol}
                      className="text-xs px-2 py-1 text-white rounded font-medium"
                      style={{ backgroundColor: bgColor }}
                    >
                      {symbol}
                    </span>
                  );
                })}
                {business.acceptedCryptos.length > 3 && (
                  <span className="text-xs px-2 py-1 bg-white/10 text-white rounded">
                    +{business.acceptedCryptos.length - 3}
                  </span>
                )}
              </div>

              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white transform transition-transform duration-300 group-hover:rotate-[-45deg] group-hover:bg-white group-hover:text-black">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </Link>
    );
  }
);

BusinessCardEnhanced.displayName = "BusinessCardEnhanced";
