import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import maplibregl, { type Map as MapLibreMap, type MapOptions } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { MapWrapper, MapOverlay } from './styles';

// Map styles
const MAP_STYLES = {
  light: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
  dark: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
};

// Context for child components
interface MapContextValue {
  map: MapLibreMap | null;
  isLoaded: boolean;
}

const MapContext = createContext<MapContextValue>({ map: null, isLoaded: false });

export function useMap() {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error('useMap must be used within a Map component');
  }
  return context;
}

// Main Map component
export interface MapProps extends Omit<MapOptions, 'container' | 'style'> {
  children?: ReactNode;
  theme?: 'light' | 'dark';
  styles?: {
    light?: string;
    dark?: string;
  };
  className?: string;
  showOverlay?: boolean;
}

export function Map({
  children,
  theme = 'light',
  styles,
  className,
  center = [-46.6333, -23.5505], // São Paulo (lng, lat format for MapLibre)
  zoom = 15,
  showOverlay = true,
  ...options
}: MapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const styleUrl = styles?.[theme] || MAP_STYLES[theme];

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: styleUrl,
      center: center as [number, number],
      zoom,
      attributionControl: { compact: true },
      ...options,
    });

    map.on('load', () => {
      setIsLoaded(true);
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      setIsLoaded(false);
    };
  }, []);

  // Update center and zoom
  useEffect(() => {
    if (mapRef.current && isLoaded) {
      mapRef.current.setCenter(center as [number, number]);
      mapRef.current.setZoom(zoom);
    }
  }, [center, zoom, isLoaded]);

  // Update style when theme changes
  useEffect(() => {
    if (mapRef.current && isLoaded) {
      mapRef.current.setStyle(styleUrl);
    }
  }, [styleUrl, isLoaded]);

  return (
    <MapContext.Provider value={{ map: mapRef.current, isLoaded }}>
      <MapWrapper className={className}>
        <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
        {children}
        {showOverlay && <MapOverlay />}
      </MapWrapper>
    </MapContext.Provider>
  );
}

// MapControls component
export interface MapControlsProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  showZoom?: boolean;
  showCompass?: boolean;
  showLocate?: boolean;
  showFullscreen?: boolean;
  className?: string;
  onLocate?: (coords: { longitude: number; latitude: number }) => void;
}

export function MapControls({
  position = 'bottom-right',
  showZoom = true,
  showCompass = false,
  showLocate = false,
  showFullscreen = false,
  onLocate,
}: MapControlsProps) {
  const { map, isLoaded } = useMap();

  useEffect(() => {
    if (!map || !isLoaded) return;

    const controls: maplibregl.IControl[] = [];

    if (showZoom) {
      const nav = new maplibregl.NavigationControl({ showCompass });
      map.addControl(nav, position);
      controls.push(nav);
    }

    if (showLocate) {
      const geolocate = new maplibregl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
      });
      geolocate.on('geolocate', (e: GeolocationPosition) => {
        onLocate?.({
          longitude: e.coords.longitude,
          latitude: e.coords.latitude,
        });
      });
      map.addControl(geolocate, position);
      controls.push(geolocate);
    }

    if (showFullscreen) {
      const fullscreen = new maplibregl.FullscreenControl();
      map.addControl(fullscreen, position);
      controls.push(fullscreen);
    }

    return () => {
      controls.forEach((control) => {
        map.removeControl(control);
      });
    };
  }, [map, isLoaded, showZoom, showCompass, showLocate, showFullscreen, position, onLocate]);

  return null;
}

// MapMarker component
export interface MapMarkerProps {
  longitude: number;
  latitude: number;
  color?: string;
  children?: ReactNode;
  onClick?: () => void;
  draggable?: boolean;
  onDragEnd?: (lngLat: { lng: number; lat: number }) => void;
}

export function MapMarker({
  longitude,
  latitude,
  color = '#3b82f6',
  onClick,
  draggable = false,
  onDragEnd,
}: MapMarkerProps) {
  const { map, isLoaded } = useMap();
  const markerRef = useRef<maplibregl.Marker | null>(null);

  useEffect(() => {
    if (!map || !isLoaded) return;

    const marker = new maplibregl.Marker({
      color,
      draggable,
    })
      .setLngLat([longitude, latitude])
      .addTo(map);

    if (onClick) {
      marker.getElement().addEventListener('click', onClick);
    }

    if (draggable && onDragEnd) {
      marker.on('dragend', () => {
        const lngLat = marker.getLngLat();
        onDragEnd({ lng: lngLat.lng, lat: lngLat.lat });
      });
    }

    markerRef.current = marker;

    return () => {
      marker.remove();
      markerRef.current = null;
    };
  }, [map, isLoaded, longitude, latitude, color, draggable, onClick, onDragEnd]);

  return null;
}

// MapRoute component - draws a line between points
export interface MapRouteProps {
  coordinates: [number, number][];
  color?: string;
  width?: number;
  dashArray?: [number, number];
}

export function MapRoute({
  coordinates,
  color = '#EA620B',
  width = 4,
  dashArray,
}: MapRouteProps) {
  const { map, isLoaded } = useMap();
  const sourceId = useRef(`route-${Date.now()}`);
  const layerId = useRef(`route-layer-${Date.now()}`);

  useEffect(() => {
    if (!map || !isLoaded || coordinates.length < 2) return;

    const source = sourceId.current;
    const layer = layerId.current;

    // Wait for style to be loaded
    const addRoute = () => {
      // Remove existing source/layer if they exist
      if (map.getLayer(layer)) {
        map.removeLayer(layer);
      }
      if (map.getSource(source)) {
        map.removeSource(source);
      }

      // Add route source
      map.addSource(source, {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates,
          },
        },
      });

      // Add route layer
      map.addLayer({
        id: layer,
        type: 'line',
        source,
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': color,
          'line-width': width,
          ...(dashArray && { 'line-dasharray': dashArray }),
        },
      });
    };

    if (map.isStyleLoaded()) {
      addRoute();
    } else {
      map.once('style.load', addRoute);
    }

    return () => {
      if (map.getLayer(layer)) {
        map.removeLayer(layer);
      }
      if (map.getSource(source)) {
        map.removeSource(source);
      }
    };
  }, [map, isLoaded, coordinates, color, width, dashArray]);

  // Update route when coordinates change
  useEffect(() => {
    if (!map || !isLoaded || coordinates.length < 2) return;

    const source = map.getSource(sourceId.current) as maplibregl.GeoJSONSource;
    if (source) {
      source.setData({
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates,
        },
      });
    }
  }, [map, isLoaded, coordinates]);

  return null;
}

