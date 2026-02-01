import { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { useRide, STEP_ORDER, type RideStep } from '../../context';
import { useRoute, useRideSimulation } from '../../hooks';
import { processPayment, type PaymentMethod } from '../../services/pricing.mock';
import { Button } from '../Button';
import { LocationInput } from '../LocationInput';
import { PetSelector } from '../PetSelector';
import { ScheduleToggle } from '../ScheduleToggle';
import { RideSummary } from '../RideSummary';
import { PaymentMethodSelector } from '../PaymentMethodSelector';
import { SearchingState } from '../SearchingState';
import { DriverInfo } from '../DriverInfo';
import { RideFeedback } from '../RideFeedback';
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

export interface ActionSheetProps {
  onDriverPositionChange?: (position: { lat: number; lng: number } | null) => void;
}

export function ActionSheet({ onDriverPositionChange }: ActionSheetProps) {
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

  // Ride simulation
  const {
    status: rideStatus,
    driver,
    estimatedArrival,
    startSimulation,
    cancelSimulation,
    completeRide,
  } = useRideSimulation({
    originLat: state.origin?.lat,
    originLng: state.origin?.lng,
  });

  // Notify parent about driver position changes
  if (onDriverPositionChange) {
    // This will be called via effect in parent
  }

  const handleNext = async () => {
    if (state.step === 'SUMMARY') {
      // Process payment
      setIsProcessing(true);

      try {
        const result = await processPayment({
          method: paymentMethod,
          amount: 25.00,
          rideId: `ride_${Date.now()}`,
        });

        if (result.success) {
          setSuccessMessage(result.message);
          setShowSuccessToast(true);

          // Start ride simulation after payment
          setTimeout(() => {
            setShowSuccessToast(false);
            startSimulation();
          }, 2000);
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
  };

  const handleCancelRide = () => {
    cancelSimulation();
    reset();
  };

  const handleFeedbackComplete = () => {
    completeRide();
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

  // Ride tracking states - render different content
  if (rideStatus === 'SEARCHING') {
    return (
      <SheetWrapper>
        <SheetHandle />
        <SearchingState onCancel={handleCancelRide} />
      </SheetWrapper>
    );
  }

  if (rideStatus === 'DRIVER_FOUND' || rideStatus === 'ARRIVED' || rideStatus === 'ON_RIDE') {
    return (
      <SheetWrapper>
        <SheetHandle />
        <SheetContent>
          {driver && (
            <DriverInfo
              driver={driver}
              status={rideStatus}
              estimatedArrival={estimatedArrival}
            />
          )}
        </SheetContent>
      </SheetWrapper>
    );
  }

  if (rideStatus === 'COMPLETED') {
    return (
      <SheetWrapper>
        <SheetHandle />
        <SheetContent>
          <RideFeedback driver={driver} onComplete={handleFeedbackComplete} />
        </SheetContent>
      </SheetWrapper>
    );
  }

  // Normal wizard flow
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
            <ToastTitle>Pagamento Aprovado!</ToastTitle>
            <ToastMessage>{successMessage}</ToastMessage>
          </ToastCard>
        </ToastOverlay>
      )}
    </>
  );
}
