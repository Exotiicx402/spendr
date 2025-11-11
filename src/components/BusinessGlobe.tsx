"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Business } from "@/types";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

interface BusinessGlobeProps {
  businesses: Business[];
}

export function BusinessGlobe({ businesses }: BusinessGlobeProps) {
  const globeEl = useRef<any>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!globeEl.current) return;

    // Auto-rotate globe
    globeEl.current.controls().autoRotate = true;
    globeEl.current.controls().autoRotateSpeed = 0.5;
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  const markers = businesses.map((business) => ({
    lat: business.location.coordinates.lat,
    lng: business.location.coordinates.lng,
    name: business.name,
    city: business.location.city,
  }));

  return (
    <Globe
      ref={globeEl}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
      backgroundColor="rgba(0,0,0,0)"
      atmosphereColor="#ffffff"
      atmosphereAltitude={0.15}
      htmlElementsData={markers}
      htmlElement={(d: any) => {
        const el = document.createElement("div");
        el.style.cssText = `
          width: 32px;
          height: 32px;
          background: black;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid white;
          cursor: pointer;
          transition: transform 0.2s;
        `;
        el.innerHTML = `<span style="
          color: white;
          font-family: 'Playfair Display', serif;
          font-size: 16px;
          font-weight: bold;
          font-style: italic;
        ">S</span>`;
        
        el.onmouseover = () => {
          el.style.transform = "scale(1.3)";
        };
        el.onmouseout = () => {
          el.style.transform = "scale(1)";
        };

        return el;
      }}
    />
  );
}
