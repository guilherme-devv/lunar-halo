// OSRM Routing Service
// Uses the free public OSRM demo server for routing

export interface RouteCoordinate {
  lng: number;
  lat: number;
}

export interface RouteResult {
  coordinates: [number, number][];
  distance: number; // in meters
  duration: number; // in seconds
}

const OSRM_BASE_URL = 'https://router.project-osrm.org';

export async function getRoute(
  origin: RouteCoordinate,
  destination: RouteCoordinate
): Promise<RouteResult | null> {
  try {
    const url = `${OSRM_BASE_URL}/route/v1/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?overview=full&geometries=geojson`;

    const response = await fetch(url);

    if (!response.ok) {
      console.error('OSRM request failed:', response.status);
      return null;
    }

    const data = await response.json();

    if (data.code !== 'Ok' || !data.routes || data.routes.length === 0) {
      console.error('OSRM returned no routes:', data);
      return null;
    }

    const route = data.routes[0];

    return {
      coordinates: route.geometry.coordinates as [number, number][],
      distance: route.distance, // meters
      duration: route.duration, // seconds
    };
  } catch (error) {
    console.error('Error fetching route:', error);
    return null;
  }
}

// Format distance for display
export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }
  return `${(meters / 1000).toFixed(1)} km`;
}

// Format duration for display
export function formatDuration(seconds: number): string {
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}min`;
}
