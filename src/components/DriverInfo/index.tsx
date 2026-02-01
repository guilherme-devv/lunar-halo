import { Star, Car, Phone, MessageCircle, Clock, MapPin } from 'lucide-react';
import type { DriverInfo as DriverInfoType } from '../../hooks/useRideSimulation';
import type { RideSimulationStatus } from '../../hooks/useRideSimulation';
import {
  DriverCard,
  StatusBanner,
  DriverHeader,
  DriverPhoto,
  DriverDetails,
  DriverName,
  DriverRating,
  DriverStats,
  VehicleSection,
  VehicleIcon,
  VehicleDetails,
  VehicleModel,
  VehiclePlate,
  ActionButtons,
  ActionButton,
  ETABadge,
} from './styles';

export interface DriverInfoProps {
  driver: DriverInfoType;
  status: RideSimulationStatus;
  estimatedArrival: number;
}

export function DriverInfo({ driver, status, estimatedArrival }: DriverInfoProps) {
  const getStatusBanner = () => {
    switch (status) {
      case 'DRIVER_FOUND':
        return { variant: 'arriving' as const, icon: <Clock size={16} />, text: `Chegando em ${estimatedArrival} min` };
      case 'ARRIVED':
        return { variant: 'arrived' as const, icon: <MapPin size={16} />, text: 'Motorista chegou!' };
      case 'ON_RIDE':
        return { variant: 'onride' as const, icon: <Car size={16} />, text: 'Viagem em andamento' };
      default:
        return null;
    }
  };

  const banner = getStatusBanner();

  const handleCall = () => {
    console.log('Calling driver:', driver.phone);
    // In a real app: window.open(`tel:${driver.phone}`);
    alert(`Ligando para ${driver.name}...`);
  };

  const handleChat = () => {
    console.log('Opening chat with driver');
    alert('Abrindo chat com o motorista...');
  };

  return (
    <DriverCard aria-live="polite">
      {banner && (
        <StatusBanner $variant={banner.variant}>
          {banner.icon}
          {banner.text}
          {status === 'DRIVER_FOUND' && estimatedArrival > 0 && (
            <ETABadge>
              <Clock size={12} />
              {estimatedArrival} min
            </ETABadge>
          )}
        </StatusBanner>
      )}

      <DriverHeader>
        <DriverPhoto src={driver.photo} alt={`Foto de ${driver.name}`} />
        <DriverDetails>
          <DriverName>{driver.name}</DriverName>
          <DriverRating>
            <Star size={14} />
            <span>{driver.rating}</span>
          </DriverRating>
          <DriverStats>
            {driver.stats.totalRides} viagens • {driver.stats.petsTransported} pets transportados
          </DriverStats>
        </DriverDetails>
      </DriverHeader>

      <VehicleSection>
        <VehicleIcon>
          <Car size={22} />
        </VehicleIcon>
        <VehicleDetails>
          <VehicleModel>{driver.vehicle.model}</VehicleModel>
          <VehiclePlate>
            {driver.vehicle.plate} • {driver.vehicle.color}
          </VehiclePlate>
        </VehicleDetails>
      </VehicleSection>

      {(status === 'DRIVER_FOUND' || status === 'ARRIVED') && (
        <ActionButtons>
          <ActionButton onClick={handleCall}>
            <Phone size={18} />
            Ligar
          </ActionButton>
          <ActionButton onClick={handleChat}>
            <MessageCircle size={18} />
            Chat
          </ActionButton>
        </ActionButtons>
      )}
    </DriverCard>
  );
}
