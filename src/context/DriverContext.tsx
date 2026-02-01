import { createContext, useContext, useReducer, type ReactNode } from 'react';
import driverMock from '../services/driver-context.mock.json';

// Types
export type OnboardingStepStatus = 'pending' | 'in_progress' | 'completed' | 'approved' | 'rejected';
export type DriverStatus = 'onboarding' | 'active' | 'offline' | 'online' | 'on_ride';

export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  completed: boolean;
  completedAt?: string;
}

export interface DriverProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  photo: string;
  cpf: string;
  cnh: string;
  cnhCategory: string;
  vehicle: {
    model: string;
    plate: string;
    year: number;
    color: string;
  };
}

export interface OnboardingState {
  currentStep: number;
  steps: {
    registration: { status: OnboardingStepStatus; completedAt?: string };
    empathyTest: { status: OnboardingStepStatus; score?: number; completedAt?: string };
    payment: { status: OnboardingStepStatus; amount?: number; paymentId?: string; method?: string; completedAt?: string };
    kitInstallation: { status: OnboardingStepStatus; photoUrl?: string; approvedAt?: string };
    training: {
      status: OnboardingStepStatus;
      totalModules: number;
      completedModules: number;
      lastWatchedId?: string;
      modules: TrainingModule[];
    };
  };
}

export interface DriverState {
  driver: DriverProfile;
  onboarding: OnboardingState;
  driverStatus: DriverStatus;
  isOnline: boolean;
}

// Actions
type DriverAction =
  | { type: 'COMPLETE_STEP'; step: 'registration' | 'empathyTest' | 'payment' | 'kitInstallation' }
  | { type: 'COMPLETE_MODULE'; moduleId: string }
  | { type: 'COMPLETE_TRAINING' }
  | { type: 'SET_ONLINE'; isOnline: boolean }
  | { type: 'RESET' };

// Initial state from mock
const initialState: DriverState = {
  driver: driverMock.driver as DriverProfile,
  onboarding: driverMock.onboarding as OnboardingState,
  driverStatus: driverMock.driverStatus as DriverStatus,
  isOnline: false,
};

// Step order for progression
const STEP_ORDER = ['registration', 'empathyTest', 'payment', 'kitInstallation', 'training'] as const;

// Reducer
function driverReducer(state: DriverState, action: DriverAction): DriverState {
  switch (action.type) {
    case 'COMPLETE_STEP': {
      const stepIndex = STEP_ORDER.indexOf(action.step);
      const nextStepIndex = stepIndex + 1;

      return {
        ...state,
        onboarding: {
          ...state.onboarding,
          currentStep: nextStepIndex + 1,
          steps: {
            ...state.onboarding.steps,
            [action.step]: {
              ...state.onboarding.steps[action.step],
              status: action.step === 'payment' || action.step === 'kitInstallation' ? 'approved' : 'completed',
              completedAt: new Date().toISOString(),
            },
            // Set next step to in_progress if it exists
            ...(nextStepIndex < STEP_ORDER.length && STEP_ORDER[nextStepIndex] !== 'training'
              ? {
                [STEP_ORDER[nextStepIndex]]: {
                  ...state.onboarding.steps[STEP_ORDER[nextStepIndex] as keyof typeof state.onboarding.steps],
                  status: 'in_progress',
                },
              }
              : {}),
            // If moving to training, set it to in_progress
            ...(STEP_ORDER[nextStepIndex] === 'training'
              ? {
                training: {
                  ...state.onboarding.steps.training,
                  status: 'in_progress',
                },
              }
              : {}),
          },
        },
      };
    }

    case 'COMPLETE_MODULE': {
      const modules = state.onboarding.steps.training.modules.map((mod) =>
        mod.id === action.moduleId
          ? { ...mod, completed: true, completedAt: new Date().toISOString() }
          : mod
      );
      const completedModules = modules.filter((m) => m.completed).length;
      const allCompleted = completedModules === state.onboarding.steps.training.totalModules;

      return {
        ...state,
        onboarding: {
          ...state.onboarding,
          steps: {
            ...state.onboarding.steps,
            training: {
              ...state.onboarding.steps.training,
              modules,
              completedModules,
              lastWatchedId: action.moduleId,
              status: allCompleted ? 'completed' : 'in_progress',
            },
          },
        },
        driverStatus: allCompleted ? 'active' : state.driverStatus,
      };
    }

    case 'COMPLETE_TRAINING':
      return {
        ...state,
        onboarding: {
          ...state.onboarding,
          steps: {
            ...state.onboarding.steps,
            training: {
              ...state.onboarding.steps.training,
              status: 'completed',
              completedModules: state.onboarding.steps.training.totalModules,
              modules: state.onboarding.steps.training.modules.map((m) => ({
                ...m,
                completed: true,
              })),
            },
          },
        },
        driverStatus: 'active',
      };

    case 'SET_ONLINE':
      if (state.driverStatus !== 'active' && state.driverStatus !== 'online' && state.driverStatus !== 'offline') {
        return state;
      }
      return {
        ...state,
        isOnline: action.isOnline,
        driverStatus: action.isOnline ? 'online' : 'offline',
      };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

// Context
interface DriverContextType {
  state: DriverState;
  completeStep: (step: 'registration' | 'empathyTest' | 'payment' | 'kitInstallation') => void;
  completeModule: (moduleId: string) => void;
  completeTraining: () => void;
  setOnline: (isOnline: boolean) => void;
  isTrainingComplete: boolean;
  canGoOnline: boolean;
  trainingProgress: number;
}

const DriverContext = createContext<DriverContextType | null>(null);

// Provider
export function DriverProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(driverReducer, initialState);

  const completeStep = (step: 'registration' | 'empathyTest' | 'payment' | 'kitInstallation') => {
    dispatch({ type: 'COMPLETE_STEP', step });
  };

  const completeModule = (moduleId: string) => {
    dispatch({ type: 'COMPLETE_MODULE', moduleId });
  };

  const completeTraining = () => {
    dispatch({ type: 'COMPLETE_TRAINING' });
  };

  const setOnline = (isOnline: boolean) => {
    dispatch({ type: 'SET_ONLINE', isOnline });
  };

  const isTrainingComplete =
    state.onboarding.steps.training.completedModules ===
    state.onboarding.steps.training.totalModules;

  const canGoOnline = state.driverStatus === 'active' || state.driverStatus === 'online' || state.driverStatus === 'offline';

  const trainingProgress =
    state.onboarding.steps.training.totalModules > 0
      ? (state.onboarding.steps.training.completedModules /
        state.onboarding.steps.training.totalModules) *
      100
      : 0;

  return (
    <DriverContext.Provider
      value={{
        state,
        completeStep,
        completeModule,
        completeTraining,
        setOnline,
        isTrainingComplete,
        canGoOnline,
        trainingProgress,
      }}
    >
      {children}
    </DriverContext.Provider>
  );
}

// Hook
export function useDriver() {
  const context = useContext(DriverContext);
  if (!context) {
    throw new Error('useDriver must be used within a DriverProvider');
  }
  return context;
}
