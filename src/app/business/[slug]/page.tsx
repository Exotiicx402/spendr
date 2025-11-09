import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getBusinessBySlug } from "@/data/businesses";
import { getCryptosByIds } from "@/data/cryptocurrencies";
import { 
  MapPin, 
  Clock, 
  Phone, 
  Globe, 
  Mail, 
  Star, 
  CheckCircle,
  ArrowLeft 
} from "lucide-react";

export default function BusinessPage({ params }: { params: { slug: string } }) {
  const business = getBusinessBySlug(params.slug);

  if (!business) {
    notFound();
  }

  const acceptedCryptos = getCryptosByIds(business.acceptedCryptos);

  return (
    <div className="container mx-auto px-4 py-12">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/explore">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Explore
        </Link>
      </Button>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative h-96 w-full rounded-lg overflow-hidden mb-6">
            <Image
              src={business.image}
              alt={business.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-4xl font-bold">{business.name}</h1>
                {business.verified && (
                  <CheckCircle className="h-6 w-6 text-blue-500" />
                )}
              </div>
              <Badge>{business.category}</Badge>
            </div>
          </div>

          {business.rating && (
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{business.rating}</span>
              </div>
              <span className="text-muted-foreground">
                ({business.reviewCount} reviews)
              </span>
            </div>
          )}

          <p className="text-lg mb-6">{business.description}</p>

          <Separator className="my-6" />

          <div>
            <h2 className="text-2xl font-semibold mb-4">Accepted Cryptocurrencies</h2>
            <div className="flex flex-wrap gap-3">
              {acceptedCryptos.map((crypto) => (
                <Badge key={crypto.id} variant="outline" className="text-base py-2 px-4">
                  {crypto.symbol} - {crypto.name}
                </Badge>
              ))}
            </div>
          </div>

          {business.hours && (
            <>
              <Separator className="my-6" />
              <div>
                <h2 className="text-2xl font-semibold mb-4">Hours</h2>
                <div className="space-y-2">
                  {Object.entries(business.hours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between">
                      <span className="font-medium">{day}</span>
                      <span className="text-muted-foreground">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">
                      {business.location.address}<br />
                      {business.location.city}, {business.location.state} {business.location.zip}
                    </p>
                  </div>
                </div>

                {business.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">{business.phone}</p>
                    </div>
                  </div>
                )}

                {business.website && (
                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Website</p>
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
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">{business.email}</p>
                    </div>
                  </div>
                )}
              </div>

              <Separator className="my-6" />

              <Button className="w-full" asChild>
                <a 
                  href={`https://maps.google.com/?q=${business.location.coordinates.lat},${business.location.coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Directions
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
