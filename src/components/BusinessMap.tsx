"use client";

import { useState, useEffect } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Business } from "@/types";

interface BusinessMapProps {
  businesses: Business[];
}

export function BusinessMap({ businesses }: BusinessMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-neutral-900 rounded-2xl">
        <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  // Calculate center point of all businesses
  const avgLat = businesses.length > 0 
    ? businesses.reduce((sum, b) => sum + b.location.coordinates.lat, 0) / businesses.length 
    : 39.8283;
  const avgLng = businesses.length > 0
    ? businesses.reduce((sum, b) => sum + b.location.coordinates.lng, 0) / businesses.length
    : -98.5795;

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden border border-gray-800 shadow-xl">
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGV4YW1wbGUifQ.example"}
        initialViewState={{
          longitude: avgLng,
          latitude: avgLat,
          zoom: 3.5,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
      >
        {businesses.map((business) => (
          <Marker
            key={business.id}
            longitude={business.location.coordinates.lng}
            latitude={business.location.coordinates.lat}
            anchor="center"
          >
            <div
              className="w-8 h-8 bg-black border-2 border-white rounded-full flex items-center justify-center cursor-pointer hover:scale-125 transition-transform shadow-lg"
              title={business.name}
            >
              <span
                className="text-white font-bold italic"
                style={{ fontFamily: "Playfair Display, serif", fontSize: "16px" }}
              >
                S
              </span>
            </div>
          </Marker>
        ))}
      </Map>
    </div>
  );
}
