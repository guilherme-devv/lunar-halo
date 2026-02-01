import { useState } from 'react';
import { Check, Star } from 'lucide-react';
import { Button } from '../Button';
import type { DriverInfo } from '../../hooks/useRideSimulation';
import {
  FeedbackWrapper,
  SuccessIcon,
  FeedbackTitle,
  FeedbackSubtitle,
  RatingSection,
  RatingLabel,
  StarsContainer,
  StarButton,
  FeedbackInput,
  TipSection,
  TipLabel,
  TipOptions,
  TipButton,
  ButtonsRow,
} from './styles';

export interface RideFeedbackProps {
  driver: DriverInfo | null;
  onComplete: () => void;
}

const TIP_OPTIONS = [
  { value: 0, label: 'Não' },
  { value: 2, label: 'R$ 2' },
  { value: 5, label: 'R$ 5' },
  { value: 10, label: 'R$ 10' },
];

export function RideFeedback({ driver, onComplete }: RideFeedbackProps) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [tipAmount, setTipAmount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log('Feedback submitted:', {
      rating,
      feedback,
      tipAmount,
      driverId: driver?.id,
    });

    setIsSubmitting(false);
    onComplete();
  };

  const displayRating = hoverRating || rating;

  return (
    <FeedbackWrapper aria-live="polite">
      <SuccessIcon>
        <Check size={40} strokeWidth={3} />
      </SuccessIcon>

      <FeedbackTitle>Viagem Concluída!</FeedbackTitle>
      <FeedbackSubtitle>
        {driver ? `Como foi sua experiência com ${driver.name}?` : 'Como foi sua viagem?'}
      </FeedbackSubtitle>

      <RatingSection>
        <RatingLabel>Avaliação</RatingLabel>
        <StarsContainer>
          {[1, 2, 3, 4, 5].map((star) => (
            <StarButton
              key={star}
              $isActive={star <= displayRating}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              aria-label={`${star} estrela${star > 1 ? 's' : ''}`}
            >
              <Star size={36} />
            </StarButton>
          ))}
        </StarsContainer>
      </RatingSection>

      <TipSection>
        <TipLabel>Deixar uma gorjeta?</TipLabel>
        <TipOptions>
          {TIP_OPTIONS.map((tip) => (
            <TipButton
              key={tip.value}
              $isSelected={tipAmount === tip.value}
              onClick={() => setTipAmount(tip.value)}
            >
              {tip.label}
            </TipButton>
          ))}
        </TipOptions>
      </TipSection>

      <FeedbackInput
        placeholder="Conte-nos mais sobre sua experiência (opcional)"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        maxLength={500}
      />

      <ButtonsRow>
        <Button
          fullWidth
          size="lg"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar e Finalizar'}
        </Button>
      </ButtonsRow>
    </FeedbackWrapper>
  );
}
