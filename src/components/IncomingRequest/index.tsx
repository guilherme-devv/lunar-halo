import { useEffect, useState, useCallback } from 'react';
import { MapPin, Navigation, Ruler, Check } from 'lucide-react';
import { formatCurrency } from '../../services/pricing.mock';
import {
  RequestOverlay,
  RequestCard,
  RequestHeader,
  NewRequestBadge,
  ValueSection,
  NetValue,
  ValueLabel,
  InfoRow,
  InfoIcon,
  InfoContent,
  InfoLabel,
  InfoValue,
  PetTags,
  PetTag,
  ActionButtons,
  AcceptButtonWrapper,
  CountdownRing,
  AcceptButton,
  CountdownText,
  DeclineButton,
} from './styles';

export interface IncomingRide {
  id: string;
  distance: string;
  duration: string;
  grossValue: number;
  netValue: number;
  pets: Array<{ name: string; size: string; type: string }>;
  origin: { address: string; short: string };
  destination: { address: string; short: string };
  passenger: { name: string; photo: string; rating: number };
}

export interface IncomingRequestProps {
  ride: IncomingRide;
  onAccept: (rideId: string) => void;
  onDecline: (rideId: string) => void;
  timeoutSeconds?: number;
}

const COUNTDOWN_DURATION = 15;

export function IncomingRequest({
  ride,
  onAccept,
  onDecline,
  timeoutSeconds = COUNTDOWN_DURATION,
}: IncomingRequestProps) {
  const [countdown, setCountdown] = useState(timeoutSeconds);

  const handleDecline = useCallback(() => {
    onDecline(ride.id);
  }, [ride.id, onDecline]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleDecline();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [handleDecline]);

  const handleAccept = () => {
    onAccept(ride.id);
  };

  const getPetIcon = (type: string) => {
    return type === 'dog' ? '🐕' : type === 'cat' ? '🐈' : '🐾';
  };

  const getPetSize = (size: string): 'small' | 'medium' | 'large' => {
    const lowerSize = size.toLowerCase();
    if (lowerSize.includes('grand')) return 'large';
    if (lowerSize.includes('méd')) return 'medium';
    return 'small';
  };

  return (
    <RequestOverlay>
      <RequestCard>
        <RequestHeader>
          <NewRequestBadge>
            🔔 Nova Solicitação!
          </NewRequestBadge>
        </RequestHeader>

        {/* Net Value Highlight */}
        <ValueSection>
          <NetValue>{formatCurrency(ride.netValue)}</NetValue>
          <ValueLabel>
            <Check size={16} />
            Sua parte (70%)
          </ValueLabel>
        </ValueSection>

        {/* Ride Info */}
        <InfoRow>
          <InfoIcon>
            <Ruler size={20} />
          </InfoIcon>
          <InfoContent>
            <InfoLabel>Distância</InfoLabel>
            <InfoValue>{ride.distance} • {ride.duration}</InfoValue>
          </InfoContent>
        </InfoRow>

        <InfoRow>
          <InfoIcon>
            <MapPin size={20} />
          </InfoIcon>
          <InfoContent>
            <InfoLabel>Origem</InfoLabel>
            <InfoValue>{ride.origin.short}</InfoValue>
          </InfoContent>
        </InfoRow>

        <InfoRow>
          <InfoIcon>
            <Navigation size={20} />
          </InfoIcon>
          <InfoContent>
            <InfoLabel>Destino</InfoLabel>
            <InfoValue>{ride.destination.short}</InfoValue>
          </InfoContent>
        </InfoRow>

        {/* Pet Tags */}
        <PetTags>
          {ride.pets.map((pet, index) => (
            <PetTag key={index} $size={getPetSize(pet.size)}>
              {getPetIcon(pet.type)} {pet.name} ({pet.size})
            </PetTag>
          ))}
        </PetTags>

        {/* Action Buttons */}
        <ActionButtons>
          <AcceptButtonWrapper>
            <CountdownRing viewBox="0 0 100 100" $duration={timeoutSeconds}>
              <circle className="bg" cx="50" cy="50" r="45" />
              <circle className="progress" cx="50" cy="50" r="45" />
            </CountdownRing>
            <AcceptButton onClick={handleAccept}>
              ACEITAR
              <CountdownText>{countdown}s</CountdownText>
            </AcceptButton>
          </AcceptButtonWrapper>

          <DeclineButton onClick={handleDecline}>
            Recusar
          </DeclineButton>
        </ActionButtons>
      </RequestCard>
    </RequestOverlay>
  );
}
