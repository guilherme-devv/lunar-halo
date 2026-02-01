import { HomeWrapper } from './styles';
import { Map, MapControls } from '../../components';
import { FloatingHeader, ActionSheet } from '../../components';
import { useMockData } from '../../hooks';

export function Home() {
  const { data: user } = useMockData('user');
  const { data: defaultLocation } = useMockData('defaultLocation');

  const handleAvatarClick = () => {
    console.log('Avatar clicked - open profile');
  };

  const handleMenuClick = () => {
    console.log('Menu clicked - open drawer');
  };

  const handleOriginClick = () => {
    console.log('Origin input clicked - open location picker');
  };

  const handleDestinationClick = () => {
    console.log('Destination input clicked - open location picker');
  };

  const handleSubmit = () => {
    console.log('Submit clicked - request ride');
  };

  // MapLibre uses [longitude, latitude] format
  const mapCenter: [number, number] = defaultLocation
    ? [defaultLocation.lng, defaultLocation.lat]
    : [-46.6333, -23.5505];

  return (
    <HomeWrapper>
      <FloatingHeader
        user={user}
        onAvatarClick={handleAvatarClick}
        onMenuClick={handleMenuClick}
      />

      <Map
        center={mapCenter}
        zoom={15}
        showOverlay={true}
      >
        <MapControls
          position="bottom-right"
          showZoom={true}
          showLocate={true}
        />
      </Map>

      <ActionSheet
        onOriginClick={handleOriginClick}
        onDestinationClick={handleDestinationClick}
        onSubmit={handleSubmit}
      />
    </HomeWrapper>
  );
}
