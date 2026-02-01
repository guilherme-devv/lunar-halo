import {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
  type Dispatch,
} from 'react';

// Types
export interface Location {
  id: string;
  address: string;
  lat: number;
  lng: number;
}

export type RideStep = 'LOCATION' | 'PETS' | 'SCHEDULE' | 'SUMMARY';

export interface Schedule {
  isImmediate: boolean;
  date: Date | null;
}

export interface RideState {
  step: RideStep;
  origin: Location | null;
  destination: Location | null;
  selectedPets: string[];
  schedule: Schedule;
}

// Action Types
type RideAction =
  | { type: 'SET_ORIGIN'; payload: Location | null }
  | { type: 'SET_DESTINATION'; payload: Location | null }
  | { type: 'ADD_PET'; payload: string }
  | { type: 'REMOVE_PET'; payload: string }
  | { type: 'SET_SCHEDULE'; payload: Schedule }
  | { type: 'TOGGLE_IMMEDIATE' }
  | { type: 'SET_DATE'; payload: Date | null }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'GO_TO_STEP'; payload: RideStep }
  | { type: 'RESET' };

// Initial State
const initialState: RideState = {
  step: 'LOCATION',
  origin: null,
  destination: null,
  selectedPets: [],
  schedule: {
    isImmediate: true,
    date: null,
  },
};

// Step order for navigation
const STEP_ORDER: RideStep[] = ['LOCATION', 'PETS', 'SCHEDULE', 'SUMMARY'];

// Reducer
function rideReducer(state: RideState, action: RideAction): RideState {
  switch (action.type) {
    case 'SET_ORIGIN':
      return { ...state, origin: action.payload };

    case 'SET_DESTINATION':
      return { ...state, destination: action.payload };

    case 'ADD_PET':
      if (state.selectedPets.length >= 3) {
        return state; // Max 3 pets
      }
      if (state.selectedPets.includes(action.payload)) {
        return state; // Already selected
      }
      return {
        ...state,
        selectedPets: [...state.selectedPets, action.payload],
      };

    case 'REMOVE_PET':
      return {
        ...state,
        selectedPets: state.selectedPets.filter((id) => id !== action.payload),
      };

    case 'SET_SCHEDULE':
      return { ...state, schedule: action.payload };

    case 'TOGGLE_IMMEDIATE':
      return {
        ...state,
        schedule: {
          ...state.schedule,
          isImmediate: !state.schedule.isImmediate,
          date: state.schedule.isImmediate ? null : state.schedule.date,
        },
      };

    case 'SET_DATE':
      return {
        ...state,
        schedule: {
          ...state.schedule,
          date: action.payload,
        },
      };

    case 'NEXT_STEP': {
      const currentIndex = STEP_ORDER.indexOf(state.step);
      if (currentIndex < STEP_ORDER.length - 1) {
        return { ...state, step: STEP_ORDER[currentIndex + 1] };
      }
      return state;
    }

    case 'PREV_STEP': {
      const currentIndex = STEP_ORDER.indexOf(state.step);
      if (currentIndex > 0) {
        return { ...state, step: STEP_ORDER[currentIndex - 1] };
      }
      return state;
    }

    case 'GO_TO_STEP':
      return { ...state, step: action.payload };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

// Context
interface RideContextValue {
  state: RideState;
  dispatch: Dispatch<RideAction>;
  // Helper actions
  setOrigin: (location: Location | null) => void;
  setDestination: (location: Location | null) => void;
  addPet: (petId: string) => boolean;
  removePet: (petId: string) => void;
  togglePet: (petId: string) => boolean;
  toggleImmediate: () => void;
  setDate: (date: Date | null) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: RideStep) => void;
  reset: () => void;
  // Validation helpers
  canProceedFromLocation: boolean;
  canProceedFromPets: boolean;
  canProceedFromSchedule: boolean;
  currentStepIndex: number;
  totalSteps: number;
}

const RideContext = createContext<RideContextValue | null>(null);

// Provider
interface RideProviderProps {
  children: ReactNode;
}

export function RideProvider({ children }: RideProviderProps) {
  const [state, dispatch] = useReducer(rideReducer, initialState);

  // Helper actions
  const setOrigin = (location: Location | null) => {
    dispatch({ type: 'SET_ORIGIN', payload: location });
  };

  const setDestination = (location: Location | null) => {
    dispatch({ type: 'SET_DESTINATION', payload: location });
  };

  const addPet = (petId: string): boolean => {
    if (state.selectedPets.length >= 3) {
      return false; // Cannot add more
    }
    dispatch({ type: 'ADD_PET', payload: petId });
    return true;
  };

  const removePet = (petId: string) => {
    dispatch({ type: 'REMOVE_PET', payload: petId });
  };

  const togglePet = (petId: string): boolean => {
    if (state.selectedPets.includes(petId)) {
      removePet(petId);
      return true;
    }
    return addPet(petId);
  };

  const toggleImmediate = () => {
    dispatch({ type: 'TOGGLE_IMMEDIATE' });
  };

  const setDate = (date: Date | null) => {
    dispatch({ type: 'SET_DATE', payload: date });
  };

  const nextStep = () => {
    dispatch({ type: 'NEXT_STEP' });
  };

  const prevStep = () => {
    dispatch({ type: 'PREV_STEP' });
  };

  const goToStep = (step: RideStep) => {
    dispatch({ type: 'GO_TO_STEP', payload: step });
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  // Validation helpers
  const canProceedFromLocation = Boolean(state.origin && state.destination);
  const canProceedFromPets = state.selectedPets.length >= 1 && state.selectedPets.length <= 3;
  const canProceedFromSchedule = state.schedule.isImmediate || state.schedule.date !== null;
  const currentStepIndex = STEP_ORDER.indexOf(state.step);
  const totalSteps = STEP_ORDER.length;

  const value: RideContextValue = {
    state,
    dispatch,
    setOrigin,
    setDestination,
    addPet,
    removePet,
    togglePet,
    toggleImmediate,
    setDate,
    nextStep,
    prevStep,
    goToStep,
    reset,
    canProceedFromLocation,
    canProceedFromPets,
    canProceedFromSchedule,
    currentStepIndex,
    totalSteps,
  };

  return <RideContext.Provider value={value}>{children}</RideContext.Provider>;
}

// Hook
export function useRide() {
  const context = useContext(RideContext);
  if (!context) {
    throw new Error('useRide must be used within a RideProvider');
  }
  return context;
}

export { STEP_ORDER };
