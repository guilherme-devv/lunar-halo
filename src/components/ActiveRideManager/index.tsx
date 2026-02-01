import { useState } from 'react';
import { Car, Check, MapPin, Navigation, Star, UserCheck, Map, ExternalLink } from 'lucide-react';
import { formatCurrency } from '../../services/pricing.mock';
import { calculateSplit } from '../../services/split';
import type { IncomingRide } from '../IncomingRequest';
import {
  RideManagerWrapper,
  BottomSheet,
  SheetHandle,
  StateHeader,
  StateIcon,
  StateInfo,
  StateTitle,
  StateSubtitle,
  PassengerInfo,
  PassengerAvatar,
  PassengerDetails,
  PassengerName,
  PassengerRating,
  AddressCard,
  AddressRow,
  AddressDot,
  AddressText,
  Checklist,
  ChecklistItem,
  CheckCircle,
  CheckText,
  NavigationLinks,
  NavLink,
  SummaryCard,
  SummaryTitle,
  SummaryValue,
  SummaryDetail,
  ActionButton,
} from './styles';

export type RideState = 'TO_PICKUP' | 'AT_PICKUP' | 'IN_TRANSIT' | 'COMPLETED';

export interface ActiveRideManagerProps {
  ride: IncomingRide;
  onComplete: () => void;
}

const BOARDING_CHECKLIST = [
  { id: 'pets', label: 'Confirmar pets embarcados' },
  { id: 'belt', label: 'Cinto de segurança pet ajustado' },
  { id: 'crate', label: 'Caixa de transporte fechada (se aplicável)' },
];

export function ActiveRideManager({ ride, onComplete }: ActiveRideManagerProps) {
  const [rideState, setRideState] = useState<RideState>('TO_PICKUP');
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const split = calculateSplit(ride.grossValue);
  const allChecked = checkedItems.size === BOARDING_CHECKLIST.length;

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleArrived = () => {
    setRideState('AT_PICKUP');
  };

  const handleStartRide = () => {
    setRideState('IN_TRANSIT');
  };

  const handleFinishRide = () => {
    setRideState('COMPLETED');
  };

  const handleDone = () => {
    onComplete();
  };

  const getStateVariant = (): 'pickup' | 'boarding' | 'transit' | 'complete' => {
    switch (rideState) {
      case 'TO_PICKUP': return 'pickup';
      case 'AT_PICKUP': return 'boarding';
      case 'IN_TRANSIT': return 'transit';
      case 'COMPLETED': return 'complete';
    }
  };

  const getStateTitle = (): string => {
    switch (rideState) {
      case 'TO_PICKUP': return 'A caminho do passageiro';
      case 'AT_PICKUP': return 'Chegou no local';
      case 'IN_TRANSIT': return 'Em viagem';
      case 'COMPLETED': return 'Corrida finalizada!';
    }
  };

  const getStateSubtitle = (): string => {
    switch (rideState) {
      case 'TO_PICKUP': return 'Dirija-se ao ponto de embarque';
      case 'AT_PICKUP': return 'Confirme os pets antes de iniciar';
      case 'IN_TRANSIT': return 'Siga para o destino';
      case 'COMPLETED': return 'Parabéns pela corrida!';
    }
  };

  const getStateIcon = () => {
    switch (rideState) {
      case 'TO_PICKUP': return <Car size={24} />;
      case 'AT_PICKUP': return <UserCheck size={24} />;
      case 'IN_TRANSIT': return <Navigation size={24} />;
      case 'COMPLETED': return <Check size={24} />;
    }
  };

  // Google Maps URL
  const getNavigationUrl = (address: string) => {
    const encoded = encodeURIComponent(address);
    return `https://www.google.com/maps/dir/?api=1&destination=${encoded}`;
  };

  // Waze URL
  const getWazeUrl = (address: string) => {
    const encoded = encodeURIComponent(address);
    return `https://waze.com/ul?q=${encoded}&navigate=yes`;
  };

  return (
    <RideManagerWrapper>
      <BottomSheet>
        <SheetHandle />

        <StateHeader>
          <StateIcon $variant={getStateVariant()}>
            {getStateIcon()}
          </StateIcon>
          <StateInfo>
            <StateTitle>{getStateTitle()}</StateTitle>
            <StateSubtitle>{getStateSubtitle()}</StateSubtitle>
          </StateInfo>
        </StateHeader>

        {/* Passenger Info (show during ride) */}
        {rideState !== 'COMPLETED' && (
          <PassengerInfo>
            <PassengerAvatar src={ride.passenger.photo} alt={ride.passenger.name} />
            <PassengerDetails>
              <PassengerName>{ride.passenger.name}</PassengerName>
              <PassengerRating>
                <Star size={14} fill="#F59E0B" color="#F59E0B" />
                {ride.passenger.rating}
              </PassengerRating>
            </PassengerDetails>
          </PassengerInfo>
        )}

        {/* State 1: TO_PICKUP */}
        {rideState === 'TO_PICKUP' && (
          <>
            <AddressCard>
              <AddressRow>
                <AddressDot $variant="origin" />
                <AddressText>{ride.origin.address}</AddressText>
              </AddressRow>
            </AddressCard>

            <NavigationLinks>
              <NavLink href={getNavigationUrl(ride.origin.address)} target="_blank">
                <Map size={18} />
                Google Maps
                <ExternalLink size={14} />
              </NavLink>
              <NavLink href={getWazeUrl(ride.origin.address)} target="_blank">
                🚗 Waze
                <ExternalLink size={14} />
              </NavLink>
            </NavigationLinks>

            <ActionButton onClick={handleArrived}>
              <MapPin size={18} style={{ marginRight: 8, verticalAlign: 'middle' }} />
              Cheguei no Local
            </ActionButton>
          </>
        )}

        {/* State 2: AT_PICKUP */}
        {rideState === 'AT_PICKUP' && (
          <>
            <Checklist>
              {BOARDING_CHECKLIST.map((item) => (
                <ChecklistItem
                  key={item.id}
                  $checked={checkedItems.has(item.id)}
                  onClick={() => toggleCheck(item.id)}
                >
                  <CheckCircle $checked={checkedItems.has(item.id)}>
                    {checkedItems.has(item.id) && <Check size={14} />}
                  </CheckCircle>
                  <CheckText $checked={checkedItems.has(item.id)}>
                    {item.label}
                  </CheckText>
                </ChecklistItem>
              ))}
            </Checklist>

            <ActionButton onClick={handleStartRide} disabled={!allChecked}>
              Iniciar Viagem
            </ActionButton>
          </>
        )}

        {/* State 3: IN_TRANSIT */}
        {rideState === 'IN_TRANSIT' && (
          <>
            <AddressCard>
              <AddressRow>
                <AddressDot $variant="origin" />
                <AddressText>{ride.origin.short}</AddressText>
              </AddressRow>
              <AddressRow>
                <AddressDot $variant="destination" />
                <AddressText>{ride.destination.address}</AddressText>
              </AddressRow>
            </AddressCard>

            <NavigationLinks>
              <NavLink href={getNavigationUrl(ride.destination.address)} target="_blank">
                <Map size={18} />
                Google Maps
                <ExternalLink size={14} />
              </NavLink>
              <NavLink href={getWazeUrl(ride.destination.address)} target="_blank">
                🚗 Waze
                <ExternalLink size={14} />
              </NavLink>
            </NavigationLinks>

            <ActionButton $variant="success" onClick={handleFinishRide}>
              <Check size={18} style={{ marginRight: 8, verticalAlign: 'middle' }} />
              Finalizar Corrida
            </ActionButton>
          </>
        )}

        {/* State 4: COMPLETED */}
        {rideState === 'COMPLETED' && (
          <>
            <SummaryCard>
              <SummaryTitle>Você ganhou</SummaryTitle>
              <SummaryValue>{formatCurrency(split.net)}</SummaryValue>
              <SummaryDetail>
                Total: {formatCurrency(split.gross)} • Taxa Voudpet: -{formatCurrency(split.fee)}
              </SummaryDetail>
            </SummaryCard>

            <ActionButton onClick={handleDone}>
              Buscar Novas Corridas
            </ActionButton>
          </>
        )}
      </BottomSheet>
    </RideManagerWrapper>
  );
}
