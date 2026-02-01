import { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { useRide, STEP_ORDER, type RideStep } from '../../context';
import { useRoute } from '../../hooks';
import { processPayment, type PaymentMethod } from '../../services/pricing.mock';
import { Button } from '../Button';
import { LocationInput } from '../LocationInput';
import { PetSelector } from '../PetSelector';
import { ScheduleToggle } from '../ScheduleToggle';
import { RideSummary } from '../RideSummary';
import { PaymentMethodSelector } from '../PaymentMethodSelector';
import {
  SheetWrapper,
  SheetHandle,
  SheetHeader,
  BackButton,
  SheetTitle,
  StepIndicator,
  StepDot,
  SheetContent,
  SheetFooter,
  Spinner,
  ButtonContent,
  ToastOverlay,
  ToastCard,
  ToastIcon,
  ToastTitle,
  ToastMessage,
} from './styles';

const STEP_TITLES: Record<RideStep, string> = {
  LOCATION: 'Para onde vamos, Pet?',
  PETS: 'Quem vai viajar?',
  SCHEDULE: 'Quando?',
  SUMMARY: 'Confirmar viagem',
};

const STEP_BUTTONS: Record<RideStep, string> = {
  LOCATION: 'Próximo',
  PETS: 'Próximo',
  SCHEDULE: 'Revisar',
  SUMMARY: 'Confirmar e Chamar',
};

export function ActionSheet() {
  const {
    state,
    setOrigin,
    setDestination,
    togglePet,
    toggleImmediate,
    setDate,
    nextStep,
    prevStep,
    reset,
    canProceedFromLocation,
    canProceedFromPets,
    canProceedFromSchedule,
    currentStepIndex,
  } = useRide();

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Get route info
  const { route } = useRoute({
    origin: state.origin,
    destination: state.destination,
  });

  const distanceKm = route ? route.distance / 1000 : 5;
  const durationMin = route ? route.duration / 60 : undefined;

  const handleNext = async () => {
    if (state.step === 'SUMMARY') {
      // Process payment
      setIsProcessing(true);

      try {
        const result = await processPayment({
          method: paymentMethod,
          amount: 25.00, // This would come from pricing
          rideId: `ride_${Date.now()}`,
        });

        if (result.success) {
          setSuccessMessage(result.message);
          setShowSuccessToast(true);
        }
      } catch (error) {
        console.error('Payment failed:', error);
      } finally {
        setIsProcessing(false);
      }

      return;
    }
    nextStep();
  };

  const handleToastClose = () => {
    setShowSuccessToast(false);
    reset();
  };

  const canProceed = (): boolean => {
    switch (state.step) {
      case 'LOCATION':
        return canProceedFromLocation;
      case 'PETS':
        return canProceedFromPets;
      case 'SCHEDULE':
        return canProceedFromSchedule;
      case 'SUMMARY':
        return !isProcessing;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (state.step) {
      case 'LOCATION':
        return (
          <LocationInput
            origin={state.origin}
            destination={state.destination}
            onOriginChange={setOrigin}
            onDestinationChange={setDestination}
          />
        );
      case 'PETS':
        return (
          <PetSelector
            selectedPets={state.selectedPets}
            onTogglePet={togglePet}
          />
        );
      case 'SCHEDULE':
        return (
          <ScheduleToggle
            schedule={state.schedule}
            onToggleImmediate={toggleImmediate}
            onDateChange={setDate}
          />
        );
      case 'SUMMARY':
        return (
          <>
            <RideSummary
              state={state}
              distanceKm={distanceKm}
              durationMin={durationMin}
            />
            <div style={{ marginTop: 16 }}>
              <PaymentMethodSelector
                selectedMethod={paymentMethod}
                onMethodChange={setPaymentMethod}
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <SheetWrapper>
        <SheetHandle />

        <SheetHeader>
          {currentStepIndex > 0 && (
            <BackButton onClick={prevStep} aria-label="Voltar" disabled={isProcessing}>
              <ArrowLeft size={20} />
            </BackButton>
          )}
          <SheetTitle>{STEP_TITLES[state.step]}</SheetTitle>
          <StepIndicator>
            {STEP_ORDER.map((step, index) => (
              <StepDot
                key={step}
                $isActive={index === currentStepIndex}
                $isCompleted={index < currentStepIndex}
              />
            ))}
          </StepIndicator>
        </SheetHeader>

        <SheetContent>
          {renderStepContent()}
        </SheetContent>

        <SheetFooter>
          <Button
            fullWidth
            size="lg"
            onClick={handleNext}
            disabled={!canProceed()}
          >
            <ButtonContent>
              {isProcessing ? (
                <>
                  <Spinner />
                  Processando...
                </>
              ) : (
                STEP_BUTTONS[state.step]
              )}
            </ButtonContent>
          </Button>
        </SheetFooter>
      </SheetWrapper>

      {/* Success Toast */}
      {showSuccessToast && (
        <ToastOverlay onClick={handleToastClose}>
          <ToastCard onClick={(e) => e.stopPropagation()}>
            <ToastIcon>
              <Check size={32} />
            </ToastIcon>
            <ToastTitle>Viagem Confirmada!</ToastTitle>
            <ToastMessage>{successMessage}</ToastMessage>
            <Button fullWidth onClick={handleToastClose}>
              Entendido
            </Button>
          </ToastCard>
        </ToastOverlay>
      )}
    </>
  );
}
