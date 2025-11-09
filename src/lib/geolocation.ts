import { Business } from "@/types";

// Calculate distance between two coordinates using Haversine formula
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 3959; // Earth's radius in miles
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(value: number): number {
  return (value * Math.PI) / 180;
}

// Get user's location from IP address
export async function getUserLocation(): Promise<{
  latitude: number;
  longitude: number;
  city?: string;
  region?: string;
} | null> {
  try {
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();
    
    if (data.latitude && data.longitude) {
      return {
        latitude: data.latitude,
        longitude: data.longitude,
        city: data.city,
        region: data.region,
      };
    }
    return null;
  } catch (error) {
    console.error("Error getting user location:", error);
    return null;
  }
}

// Sort businesses by distance from user
export function sortBusinessesByDistance(
  businesses: Business[],
  userLat: number,
  userLon: number
): Business[] {
  return [...businesses].sort((a, b) => {
    const distanceA = calculateDistance(
      userLat,
      userLon,
      a.location.coordinates.lat,
      a.location.coordinates.lng
    );
    const distanceB = calculateDistance(
      userLat,
      userLon,
      b.location.coordinates.lat,
      b.location.coordinates.lng
    );
    return distanceA - distanceB;
  });
}

// Get distance in miles for display
export function getDistanceLabel(
  userLat: number,
  userLon: number,
  businessLat: number,
  businessLon: number
): string {
  const distance = calculateDistance(userLat, userLon, businessLat, businessLon);
  if (distance < 1) {
    return `${(distance * 5280).toFixed(0)} ft away`;
  }
  return `${distance.toFixed(1)} mi away`;
}
