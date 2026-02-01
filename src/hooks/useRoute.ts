import { useState, useEffect } from 'react';
import { getRoute, formatDistance, formatDuration, type RouteResult } from '../services/routing';

interface UseRouteProps {
  origin: { lng: number; lat: number } | null;
  destination: { lng: number; lat: number } | null;
}

interface UseRouteResult {
  route: RouteResult | null;
  isLoading: boolean;
  error: string | null;
  formattedDistance: string | null;
  formattedDuration: string | null;
}

export function useRoute({ origin, destination }: UseRouteProps): UseRouteResult {
  const [route, setRoute] = useState<RouteResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!origin || !destination) {
      setRoute(null);
      setError(null);
      return;
    }

    let cancelled = false;

    async function fetchRoute() {
      setIsLoading(true);
      setError(null);

      try {
        // TypeScript safety: origin and destination are guaranteed non-null here
        // because we return early at the top of the effect if either is null
        const result = await getRoute(
          { lng: origin!.lng, lat: origin!.lat },
          { lng: destination!.lng, lat: destination!.lat }
        );

        if (cancelled) return;

        if (result) {
          setRoute(result);
        } else {
          setError('Não foi possível calcular a rota');
        }
      } catch (err) {
        if (cancelled) return;
        setError('Erro ao calcular rota');
        console.error(err);
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchRoute();

    return () => {
      cancelled = true;
    };
  }, [origin?.lng, origin?.lat, destination?.lng, destination?.lat]);

  return {
    route,
    isLoading,
    error,
    formattedDistance: route ? formatDistance(route.distance) : null,
    formattedDuration: route ? formatDuration(route.duration) : null,
  };
}
