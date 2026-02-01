import { Clock, MapPin, Navigation, PawPrint } from 'lucide-react';
import { useMockDataSync } from '../../hooks';
import { calculateEstimate, formatCurrency } from '../../services/pricing.mock';
import type { RideState } from '../../context/RideContext';
import {
  SummaryWrapper,
  SummaryCard,
  SectionLabel,
  RouteContainer,
  RouteTimeline,
  RouteIcon,
  RouteLine,
  RouteStops,
  RouteStop,
  RouteStopLabel,
  RouteStopAddress,
  InfoRow,
  InfoText,
  PetBadge,
  BreakdownList,
  BreakdownItem,
  BreakdownLabel,
  BreakdownValue,
  TotalRow,
  TotalLabel,
  TotalValue,
  RouteInfoBadge,
} from './styles';

export interface RideSummaryProps {
  state: RideState;
  distanceKm?: number;
  durationMin?: number;
}

export function RideSummary({ state, distanceKm = 5, durationMin }: RideSummaryProps) {
  const pets = useMockDataSync('pets') || [];
  const selectedPetNames = pets
    .filter((pet) => state.selectedPets.includes(pet.id))
    .map((pet) => pet.name);

  // Format date/time
  const formatDateTime = () => {
    if (state.schedule.isImmediate) {
      return 'Agora';
    }
    if (state.schedule.date) {
      return new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'short',
        timeStyle: 'short',
      }).format(state.schedule.date);
    }
    return 'Agora';
  };

  // Calculate pricing
  const estimate = calculateEstimate(distanceKm, state.selectedPets.length);

  return (
    <SummaryWrapper>
      {/* Route Card */}
      <SummaryCard>
        <SectionLabel>Rota</SectionLabel>
        <RouteContainer>
          <RouteTimeline>
            <RouteIcon $variant="origin">
              <Navigation size={14} />
            </RouteIcon>
            <RouteLine />
            <RouteIcon $variant="destination">
              <MapPin size={14} />
            </RouteIcon>
          </RouteTimeline>
          <RouteStops>
            <RouteStop>
              <RouteStopLabel>Partida</RouteStopLabel>
              <RouteStopAddress>
                {state.origin?.address || 'Origem não selecionada'}
              </RouteStopAddress>
            </RouteStop>
            <RouteStop>
              <RouteStopLabel>Destino</RouteStopLabel>
              <RouteStopAddress>
                {state.destination?.address || 'Destino não selecionado'}
              </RouteStopAddress>
            </RouteStop>
          </RouteStops>
        </RouteContainer>

        {(distanceKm || durationMin) && (
          <RouteInfoBadge>
            <MapPin size={14} />
            <span>{distanceKm?.toFixed(1)} km</span>
            {durationMin && (
              <>
                <span>•</span>
                <Clock size={14} />
                <span>{Math.round(durationMin)} min</span>
              </>
            )}
          </RouteInfoBadge>
        )}
      </SummaryCard>

      {/* Details Card */}
      <SummaryCard>
        <SectionLabel>Detalhes</SectionLabel>

        <InfoRow style={{ marginBottom: '12px' }}>
          <Clock size={18} />
          <InfoText>{formatDateTime()}</InfoText>
        </InfoRow>

        <InfoRow>
          <PawPrint size={18} />
          <InfoText>
            {selectedPetNames.length > 0 ? (
              selectedPetNames.map((name, idx) => (
                <PetBadge key={name} style={{ marginRight: idx < selectedPetNames.length - 1 ? 8 : 0 }}>
                  {name}
                </PetBadge>
              ))
            ) : (
              'Nenhum pet selecionado'
            )}
          </InfoText>
        </InfoRow>
      </SummaryCard>

      {/* Pricing Card */}
      <SummaryCard>
        <SectionLabel>Valores</SectionLabel>

        <BreakdownList>
          {estimate.breakdown.map((item, idx) => (
            <BreakdownItem key={idx}>
              <BreakdownLabel>{item.label}</BreakdownLabel>
              <BreakdownValue>{formatCurrency(item.value)}</BreakdownValue>
            </BreakdownItem>
          ))}
        </BreakdownList>

        <TotalRow>
          <TotalLabel>Total</TotalLabel>
          <TotalValue>{estimate.formattedTotal}</TotalValue>
        </TotalRow>
      </SummaryCard>
    </SummaryWrapper>
  );
}
