"use client";

import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Clock } from "lucide-react";
import { Business, Cryptocurrency } from "@/types";

interface BusinessPageClientProps {
  business: Business;
  acceptedCryptos: Cryptocurrency[];
}

export function BusinessPageClient({ business, acceptedCryptos }: BusinessPageClientProps) {
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-8">
        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">About</h2>
          <p className="text-lg text-gray-300 leading-relaxed">{business.description}</p>
        </motion.div>

        <Separator className="bg-gray-800" />

        {/* Accepted Cryptocurrencies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">Accepted Cryptocurrencies</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {acceptedCryptos.map((crypto) => (
              <div
                key={crypto.id}
                className="bg-neutral-900 border border-gray-800 rounded-xl p-4 hover:border-white/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="text-lg font-bold text-white">{crypto.symbol.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">{crypto.symbol}</p>
                    <p className="text-xs text-gray-400">{crypto.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {business.hours && (
          <>
            <Separator className="bg-gray-800" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Clock className="h-6 w-6" />
                Hours of Operation
              </h2>
              <Card className="bg-neutral-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {Object.entries(business.hours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between items-center">
                        <span className="font-medium text-white">{day}</span>
                        <span className="text-gray-400">{hours}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </div>

      {/* Sidebar */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="space-y-6"
      >
        {/* This will be filled by the parent component */}
        <div id="sidebar-content" />
      </motion.div>
    </div>
  );
}
