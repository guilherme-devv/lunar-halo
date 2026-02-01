import { useState, useEffect, useCallback, useRef } from 'react';
import driverMock from '../services/driver.mock.json';

// Ride simulation states
export type RideSimulationStatus =
  | 'IDLE'
  | 'SEARCHING'
  | 'DRIVER_FOUND'
  | 'ARRIVED'
  | 'ON_RIDE'
  | 'COMPLETED';

export interface DriverInfo {
  id: string;
  name: string;
  rating: number;
  photo: string;
  phone: string;
  vehicle: {
    model: string;
    plate: string;
    color: string;
    year: number;
  };
  position: {
    lat: number;
    lng: number;
  };
  stats: {
    totalRides: number;
    petsTransported: number;
    memberSince: string;
  };
}

interface UseRideSimulationProps {
  originLat?: number;
  originLng?: number;
  onComplete?: () => void;
}

interface UseRideSimulationResult {
  status: RideSimulationStatus;
  driver: DriverInfo | null;
  driverPosition: { lat: number; lng: number } | null;
  estimatedArrival: number; // minutes
  startSimulation: () => void;
  cancelSimulation: () => void;
  completeRide: () => void;
}

// Timing constants (in milliseconds)
const SEARCH_DURATION = 5000; // 5 seconds
const ARRIVAL_DURATION = 10000; // 10 seconds after found
const RIDE_DURATION = 10000; // 10 seconds on ride
const POSITION_UPDATE_INTERVAL = 1000; // Update driver position every second

export function useRideSimulation({
  originLat = -23.5505,
  originLng = -46.6333,
  onComplete,
}: UseRideSimulationProps = {}): UseRideSimulationResult {
  const [status, setStatus] = useState<RideSimulationStatus>('IDLE');
  const [driver, setDriver] = useState<DriverInfo | null>(null);
  const [driverPosition, setDriverPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [estimatedArrival, setEstimatedArrival] = useState(5);

  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const positionIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);

  // Clear all timers
  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current = [];
    if (positionIntervalRef.current) {
      clearInterval(positionIntervalRef.current);
      positionIntervalRef.current = null;
    }
  }, []);

  // Animate driver position towards origin
  const animateDriverPosition = useCallback(() => {
    const startLat = driverMock.position.lat;
    const startLng = driverMock.position.lng;
    const steps = ARRIVAL_DURATION / POSITION_UPDATE_INTERVAL;
    let currentStep = 0;

    positionIntervalRef.current = setInterval(() => {
      currentStep++;
      const progress = Math.min(currentStep / steps, 1);

      // Ease-out interpolation
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      const newLat = startLat + (originLat - startLat) * easedProgress;
      const newLng = startLng + (originLng - startLng) * easedProgress;

      setDriverPosition({ lat: newLat, lng: newLng });

      // Update ETA
      const remainingMinutes = Math.max(1, Math.round(5 * (1 - progress)));
      setEstimatedArrival(remainingMinutes);

      if (progress >= 1 && positionIntervalRef.current) {
        clearInterval(positionIntervalRef.current);
        positionIntervalRef.current = null;
      }
    }, POSITION_UPDATE_INTERVAL);
  }, [originLat, originLng]);

  // Start the simulation
  const startSimulation = useCallback(() => {
    clearAllTimers();
    setStatus('SEARCHING');
    setDriver(null);
    setDriverPosition(null);
    setEstimatedArrival(5);
    startTimeRef.current = Date.now();

    // Timer 1: Driver found after 5s
    const timer1 = setTimeout(() => {
      setStatus('DRIVER_FOUND');
      setDriver(driverMock as DriverInfo);
      setDriverPosition(driverMock.position);
      animateDriverPosition();
    }, SEARCH_DURATION);

    // Timer 2: Driver arrived after 10s more
    const timer2 = setTimeout(() => {
      setStatus('ARRIVED');
      setEstimatedArrival(0);
      if (positionIntervalRef.current) {
        clearInterval(positionIntervalRef.current);
      }
      setDriverPosition({ lat: originLat, lng: originLng });
    }, SEARCH_DURATION + ARRIVAL_DURATION);

    // Timer 3: Ride started shortly after arrival
    const timer3 = setTimeout(() => {
      setStatus('ON_RIDE');
    }, SEARCH_DURATION + ARRIVAL_DURATION + 2000);

    // Timer 4: Ride completed
    const timer4 = setTimeout(() => {
      setStatus('COMPLETED');
      onComplete?.();
    }, SEARCH_DURATION + ARRIVAL_DURATION + 2000 + RIDE_DURATION);

    timersRef.current = [timer1, timer2, timer3, timer4];
  }, [clearAllTimers, animateDriverPosition, originLat, originLng, onComplete]);

  // Cancel simulation
  const cancelSimulation = useCallback(() => {
    clearAllTimers();
    setStatus('IDLE');
    setDriver(null);
    setDriverPosition(null);
  }, [clearAllTimers]);

  // Complete ride (for manual completion after feedback)
  const completeRide = useCallback(() => {
    clearAllTimers();
    setStatus('IDLE');
    setDriver(null);
    setDriverPosition(null);
  }, [clearAllTimers]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, [clearAllTimers]);

  return {
    status,
    driver,
    driverPosition,
    estimatedArrival,
    startSimulation,
    cancelSimulation,
    completeRide,
  };
}
