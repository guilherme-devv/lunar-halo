import { ArrowLeft } from 'lucide-react';
import { useRide, STEP_ORDER, type RideStep } from '../../context';
import { Button } from '../Button';
import { LocationInput } from '../LocationInput';
import { PetSelector } from '../PetSelector';
import { ScheduleToggle } from '../ScheduleToggle';
import { RideSummary } from '../RideSummary';
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
  SUMMARY: 'Solicitar Viagem',
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

  const handleNext = () => {
    if (state.step === 'SUMMARY') {
      // Submit ride request
      console.log('Submitting ride request:', state);
      alert('Viagem solicitada com sucesso! 🐾');
      reset();
      return;
    }
    nextStep();
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
        return true;
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
        return <RideSummary state={state} />;
      default:
        return null;
    }
  };

  return (
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

      <SheetFooter>
        <Button
          fullWidth
          size="lg"
          onClick={handleNext}
          disabled={!canProceed()}
        >
          {STEP_BUTTONS[state.step]}
        </Button>
      </SheetFooter>
    </SheetWrapper>
  );
}
