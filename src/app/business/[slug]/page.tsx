"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getBusinessBySlug } from "@/lib/supabase-queries";
import { getAllCryptocurrencies } from "@/lib/supabase-queries";
import { 
  MapPin, 
  Clock, 
  Phone, 
  Globe, 
  Mail, 
  Star, 
  CheckCircle,
  ArrowLeft,
  Navigation,
  Share2
} from "lucide-react";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function BusinessPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [business, allCryptos] = use(Promise.all([
    getBusinessBySlug(slug),
    getAllCryptocurrencies()
  ]));

  const handleShare = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: business.name,
          text: `Check out ${business.name} on Spendr!`,
          url: url,
        });
      } catch (err) {
        console.log('Share canceled');
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  if (!business) {
    notFound();
  }

  const acceptedCryptos = allCryptos.filter(crypto => 
    business.acceptedCryptos.includes(crypto.id)
  );

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Image Section */}
      <div className="relative h-[500px] w-full">
        <Image
          src={business.image}
          alt={business.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        {/* Back Button */}
        <div className="absolute top-6 left-6">
          <Button 
            variant="ghost" 
            className="bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 border border-white/20" 
            asChild
          >
            <Link href="/explore">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
        </div>

        {/* Share Button */}
        <div className="absolute top-6 right-6">
          <Button 
            variant="ghost" 
            className="bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 border border-white/20"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Business Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <h1 className="text-5xl font-bold text-white">{business.name}</h1>
                  {business.verified && (
                    <CheckCircle className="h-8 w-8 text-blue-500" />
                  )}
                </div>
                <div className="flex items-center gap-4 text-white/80">
                  <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                    {business.category}
                  </Badge>
                  {business.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{business.rating}</span>
                      <span className="text-white/60">({business.reviewCount} reviews)</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">About</h2>
              <p className="text-lg text-gray-300 leading-relaxed">{business.description}</p>
            </div>

            <Separator className="bg-gray-800" />

            {/* Accepted Cryptocurrencies */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Accepted Cryptocurrencies</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {acceptedCryptos.map((crypto) => {
                  const logoMap: Record<string, string> = {
                    'BTC': 'https://res.cloudinary.com/dy1nbfg5g/image/upload/v1762889478/bitcoin-btc-logo_imydfk.svg',
                    'ETH': 'https://res.cloudinary.com/dy1nbfg5g/image/upload/v1762889478/ethereum-eth-logo_ehwtkf.svg',
                    'USDT': 'https://res.cloudinary.com/dy1nbfg5g/image/upload/v1762889478/tether-usdt-logo_kxyj7a.svg',
                    'USDC': 'https://res.cloudinary.com/dy1nbfg5g/image/upload/v1762889478/usd-coin-usdc-logo_omy1lm.svg',
                    'SOL': 'https://res.cloudinary.com/dy1nbfg5g/image/upload/v1762889478/solana-sol-logo_x844er.svg',
                  };
                  const logoUrl = logoMap[crypto.symbol];
                  
                  return (
                    <div
                      key={crypto.id}
                      className="bg-neutral-900 border border-gray-800 rounded-xl p-4 hover:border-white/20 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {logoUrl ? (
                          <Image
                            src={logoUrl}
                            alt={crypto.symbol}
                            width={40}
                            height={40}
                            className="w-10 h-10"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                            <span className="text-lg font-bold text-white">{crypto.symbol.charAt(0)}</span>
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-white">{crypto.symbol}</p>
                          <p className="text-xs text-gray-400">{crypto.name}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {business.hours && (
              <>
                <Separator className="bg-gray-800" />
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                      <Clock className="h-6 w-6" />
                      Hours of Operation
                    </h2>
                    {(() => {
                      const now = new Date();
                      const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
                      const today = dayNames[now.getDay()];
                      const currentHours = business.hours[today as keyof typeof business.hours];
                      const isOpen = currentHours && currentHours !== 'Closed';
                      return (
                        <Badge className={isOpen ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}>
                          {isOpen ? 'Open Now' : 'Closed'}
                        </Badge>
                      );
                    })()}
                  </div>
                  <Card className="bg-neutral-900 border-gray-800">
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        {Object.entries(business.hours).map(([day, hours]) => {
                          const now = new Date();
                          const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
                          const isToday = day.toLowerCase() === dayNames[now.getDay()];
                          return (
                            <div key={day} className={`flex justify-between items-center ${isToday ? 'font-bold' : ''}`}>
                              <span className={`font-medium ${isToday ? 'text-white' : 'text-gray-300'}`}>
                                {day.charAt(0).toUpperCase() + day.slice(1)}
                              </span>
                              <span className={isToday ? 'text-white' : 'text-gray-400'}>{hours}</span>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card className="bg-neutral-900 border-gray-800 sticky top-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-6 text-white">Contact & Location</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-white">Address</p>
                      <p className="text-sm text-gray-400">
                      {business.location.address}<br />
                      {business.location.city}, {business.location.state} {business.location.zip}
                    </p>
                  </div>
                </div>

                {business.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-white">Phone</p>
                        <a 
                          href={`tel:${business.phone}`}
                          className="text-sm text-blue-600 hover:underline"
                        >
                          {business.phone}
                        </a>
                    </div>
                  </div>
                )}

                {business.website && (
                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-white">Website</p>
                      <a 
                        href={business.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Visit Website
                      </a>
                    </div>
                  </div>
                )}

                {business.email && (
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-white">Email</p>
                        <a 
                          href={`mailto:${business.email}`}
                          className="text-sm text-blue-600 hover:underline"
                        >
                          {business.email}
                        </a>
                    </div>
                  </div>
                )}
              </div>

                <Separator className="my-6 bg-gray-800" />

                <div className="space-y-3">
                  <Button className="w-full bg-white text-black hover:bg-gray-200" asChild>
                    <a 
                      href={`https://maps.google.com/?q=${business.location.coordinates.lat},${business.location.coordinates.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Navigation className="mr-2 h-4 w-4" />
                      Get Directions
                    </a>
                  </Button>
                  
                  {business.website && (
                    <Button className="w-full border-gray-700 text-black bg-white hover:bg-gray-200" variant="outline" asChild>
                      <a 
                        href={business.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Globe className="mr-2 h-4 w-4" />
                        Visit Website
                      </a>
                    </Button>
                  )}
                  
                  {business.phone && (
                    <Button className="w-full border-gray-700 text-black bg-white hover:bg-gray-200" variant="outline" asChild>
                      <a href={`tel:${business.phone}`}>
                        <Phone className="mr-2 h-4 w-4" />
                        Call Now
                      </a>
                    </Button>
                  )}
                  
                  {business.email && (
                    <Button className="w-full border-gray-700 text-black bg-white hover:bg-gray-200" variant="outline" asChild>
                      <a href={`mailto:${business.email}`}>
                        <Mail className="mr-2 h-4 w-4" />
                        Send Email
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
