import { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { useRide, STEP_ORDER, type RideStep } from '../../context';
import { useRoute, useRideSimulation } from '../../hooks';
import { calculateEstimate } from '../../services/pricing.mock';
import { Button } from '../Button';
import { LocationInput } from '../LocationInput';
import { PetSelector } from '../PetSelector';
import { ScheduleToggle } from '../ScheduleToggle';
import { RideSummary } from '../RideSummary';
import { PaymentBrick, type PaymentData } from '../PaymentBrick';
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
  SUMMARY: 'Pagamento',
};

export interface ActionSheetProps {
  onDriverPositionChange?: (position: { lat: number; lng: number } | null) => void;
}

export function ActionSheet({ onDriverPositionChange: _onDriverPositionChange }: ActionSheetProps) {
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

  // Payment success state
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Get route info
  const { route } = useRoute({
    origin: state.origin,
    destination: state.destination,
  });

  const distanceKm = route ? route.distance / 1000 : 5;
  const durationMin = route ? route.duration / 60 : undefined;

  // Calculate price
  const estimate = calculateEstimate(distanceKm, state.selectedPets.length);

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

  const handlePaymentSuccess = (paymentData: PaymentData) => {
    console.log('Payment successful:', paymentData);
    setSuccessMessage(`Pagamento aprovado via ${paymentData.paymentMethodId}!`);
    setShowSuccessToast(true);

    // Start ride simulation after payment
    setTimeout(() => {
      setShowSuccessToast(false);
      startSimulation();
    }, 2000);
  };

  const handlePaymentError = (error: Error) => {
    console.error('Payment error:', error);
  };

  const handleNext = () => {
    // For summary step, we let the PaymentBrick handle the flow
    if (state.step !== 'SUMMARY') {
      nextStep();
    }
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
            <div style={{ marginTop: 24 }}>
              <PaymentBrick
                amount={estimate.total}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  // Don't show footer button on SUMMARY step (PaymentBrick has its own button)
  const showFooterButton = state.step !== 'SUMMARY';

  return (
    <>
      <SheetWrapper>
        <SheetHandle />

        <SheetHeader>
          {currentStepIndex > 0 && (
            <BackButton onClick={prevStep} aria-label="Voltar">
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

        {showFooterButton && (
          <SheetFooter>
            <Button
              fullWidth
              size="lg"
              onClick={handleNext}
              disabled={!canProceed()}
            >
              Próximo
            </Button>
          </SheetFooter>
        )}
      </SheetWrapper>

      {/* Success Toast */}
      {showSuccessToast && (
        <ToastOverlay>
          <ToastCard>
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
