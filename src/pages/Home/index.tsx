import { HomeWrapper } from './styles';
import { Map, MapControls, MapMarker, MapRoute, FloatingHeader, ActionSheet } from '../../components';
import { useMockData, useRide, useRoute } from '../../hooks';
import { RideProvider } from '../../context';

function HomeContent() {
  const { data: user } = useMockData('user');
  const { data: defaultLocation } = useMockData('defaultLocation');
  const { state } = useRide();

  // Fetch real route from OSRM
  const { route, isLoading: routeLoading, formattedDistance, formattedDuration } = useRoute({
    origin: state.origin ? { lng: state.origin.lng, lat: state.origin.lat } : null,
    destination: state.destination ? { lng: state.destination.lng, lat: state.destination.lat } : null,
  });

  const handleAvatarClick = () => {
    console.log('Avatar clicked - open profile');
  };

  const handleMenuClick = () => {
    console.log('Menu clicked - open drawer');
  };

  // Calculate map center based on ride state
  const getMapCenter = (): [number, number] => {
    if (state.origin && state.destination) {
      // Center between origin and destination
      return [
        (state.origin.lng + state.destination.lng) / 2,
        (state.origin.lat + state.destination.lat) / 2,
      ];
    }
    if (state.destination) {
      return [state.destination.lng, state.destination.lat];
    }
    if (state.origin) {
      return [state.origin.lng, state.origin.lat];
    }
    // Default: São Paulo
    return defaultLocation
      ? [defaultLocation.lng, defaultLocation.lat]
      : [-46.6333, -23.5505];
  };

  // Calculate zoom based on route
  const getMapZoom = (): number => {
    if (state.origin && state.destination) {
      // Calculate distance to determine zoom
      const latDiff = Math.abs(state.origin.lat - state.destination.lat);
      const lngDiff = Math.abs(state.origin.lng - state.destination.lng);
      const maxDiff = Math.max(latDiff, lngDiff);

      if (maxDiff > 0.1) return 11;
      if (maxDiff > 0.05) return 12;
      if (maxDiff > 0.02) return 13;
      return 14;
    }
    if (state.origin || state.destination) {
      return 14;
    }
    return 15;
  };

  // Use OSRM route coordinates if available, fallback to straight line
  const routeCoordinates: [number, number][] = route?.coordinates || [];

  return (
    <HomeWrapper>
      <FloatingHeader
        user={user}
        onAvatarClick={handleAvatarClick}
        onMenuClick={handleMenuClick}
      />

      <Map
        center={getMapCenter()}
        zoom={getMapZoom()}
        showOverlay={true}
      >
        <MapControls
          position="bottom-right"
          showZoom={true}
          showLocate={state.step === 'LOCATION'}
        />

        {/* Origin Marker */}
        {state.origin && (
          <MapMarker
            longitude={state.origin.lng}
            latitude={state.origin.lat}
            color="#EA620B"
          />
        )}

        {/* Destination Marker */}
        {state.destination && (
          <MapMarker
            longitude={state.destination.lng}
            latitude={state.destination.lat}
            color="#09090B"
          />
        )}

        {/* Route Line - uses real road data from OSRM */}
        {routeCoordinates.length >= 2 && (
          <MapRoute
            coordinates={routeCoordinates}
            color="#EA620B"
            width={4}
          />
        )}
      </Map>

      <ActionSheet />

      {/* Route Info Badge */}
      {(formattedDistance || routeLoading) && state.step === 'LOCATION' && (
        <div style={{
          position: 'fixed',
          top: 60,
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#09090B',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '20px',
          fontSize: '14px',
          fontWeight: 600,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          {routeLoading ? (
            '⏳ Calculando rota...'
          ) : (
            <>
              📍 {formattedDistance} • 🕐 {formattedDuration}
            </>
          )}
        </div>
      )}
    </HomeWrapper>
  );
}

export function Home() {
  return (
    <RideProvider>
      <HomeContent />
    </RideProvider>
  );
}
