import { Navigation, MapPin, Clock, Calendar, Dog, Cat } from 'lucide-react';
import { useTheme } from 'styled-components';
import type { RideState } from '../../context/RideContext';
import { useMockDataSync, type Pet, type RideParams } from '../../hooks';
import {
  SummaryWrapper,
  SummarySection,
  SectionLabel,
  SummaryCard,
  CardIcon,
  CardContent,
  CardTitle,
  CardSubtitle,
  PetChips,
  PetChip,
  PriceCard,
  PriceLabel,
  PriceValue,
} from './styles';

export interface RideSummaryProps {
  state: RideState;
}

export function RideSummary({ state }: RideSummaryProps) {
  const theme = useTheme();
  const allPets = useMockDataSync('pets') as Pet[];
  const rideParams = useMockDataSync('rideParams') as RideParams;

  const selectedPetDetails = allPets?.filter((pet) =>
    state.selectedPets.includes(pet.id)
  ) || [];

  // Calculate estimated price (mock calculation)
  const estimatedDistance = 5.2; // km (mock)
  const estimatedPrice = Math.max(
    rideParams?.minPrice || 10,
    estimatedDistance * (rideParams?.pricePerKm || 2.5)
  );

  const getScheduleText = () => {
    if (state.schedule.isImmediate) {
      return 'Agora';
    }
    if (state.schedule.date) {
      return `${state.schedule.date.toLocaleDateString('pt-BR')} às ${state.schedule.date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
    }
    return 'Não definido';
  };

  return (
    <SummaryWrapper>
      {/* Route Section */}
      <SummarySection>
        <SectionLabel>Rota</SectionLabel>
        <SummaryCard>
          <CardIcon $color={theme.colors.primary}>
            <Navigation size={20} />
          </CardIcon>
          <CardContent>
            <CardSubtitle>Partida</CardSubtitle>
            <CardTitle>{state.origin?.address || 'Não definido'}</CardTitle>
          </CardContent>
        </SummaryCard>
        <SummaryCard>
          <CardIcon $color={theme.colors.secondary}>
            <MapPin size={20} />
          </CardIcon>
          <CardContent>
            <CardSubtitle>Destino</CardSubtitle>
            <CardTitle>{state.destination?.address || 'Não definido'}</CardTitle>
          </CardContent>
        </SummaryCard>
      </SummarySection>

      {/* Pets Section */}
      <SummarySection>
        <SectionLabel>Pets ({selectedPetDetails.length})</SectionLabel>
        <PetChips>
          {selectedPetDetails.map((pet) => {
            const PetIcon = pet.species === 'cat' ? Cat : Dog;
            return (
              <PetChip key={pet.id}>
                <PetIcon size={14} />
                {pet.name}
              </PetChip>
            );
          })}
        </PetChips>
      </SummarySection>

      {/* Schedule Section */}
      <SummarySection>
        <SectionLabel>Quando</SectionLabel>
        <SummaryCard>
          <CardIcon $color={theme.colors.success}>
            {state.schedule.isImmediate ? <Clock size={20} /> : <Calendar size={20} />}
          </CardIcon>
          <CardContent>
            <CardTitle>{getScheduleText()}</CardTitle>
            {!state.schedule.isImmediate && state.schedule.date && (
              <CardSubtitle>Viagem agendada</CardSubtitle>
            )}
          </CardContent>
        </SummaryCard>
      </SummarySection>

      {/* Price Section */}
      <PriceCard>
        <PriceLabel>Valor estimado</PriceLabel>
        <PriceValue>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(estimatedPrice)}
        </PriceValue>
      </PriceCard>
    </SummaryWrapper>
  );
}
