import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, CheckCircle } from "lucide-react";
import { Business } from "@/types";
import { getCryptosByIds } from "@/data/cryptocurrencies";

interface BusinessCardProps {
  business: Business;
}

export function BusinessCard({ business }: BusinessCardProps) {
  const acceptedCryptos = getCryptosByIds(business.acceptedCryptos);
  
  return (
    <Link href={`/business/${business.slug}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        <div className="relative h-48 w-full">
          <Image
            src={business.image}
            alt={business.name}
            fill
            className="object-cover"
          />
        </div>
        
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-lg">{business.name}</h3>
            {business.verified && (
              <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />
            )}
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {business.description}
          </p>
          
          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
            <MapPin className="h-4 w-4" />
            <span>{business.location.city}, {business.location.state}</span>
          </div>
          
          {business.rating && (
            <div className="flex items-center gap-1 mb-3">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{business.rating}</span>
              <span className="text-sm text-muted-foreground">
                ({business.reviewCount} reviews)
              </span>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="p-4 pt-0">
          <div className="flex flex-wrap gap-2">
            {acceptedCryptos.slice(0, 4).map((crypto) => (
              <Badge key={crypto.id} variant="secondary">
                {crypto.symbol}
              </Badge>
            ))}
            {business.acceptedCryptos.length > 4 && (
              <Badge variant="secondary">
                +{business.acceptedCryptos.length - 4}
              </Badge>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
