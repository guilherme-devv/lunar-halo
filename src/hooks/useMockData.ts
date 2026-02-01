import { useState, useEffect } from 'react';
import mockData from '../services/api.mock.json';
import type { MockData, User, Pet, RideParams, DefaultLocation } from '../types';

type MockDataKey = keyof MockData;

interface UseMockDataResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useMockData<K extends MockDataKey>(key: K): UseMockDataResult<MockData[K]>;
export function useMockData(): UseMockDataResult<MockData>;
export function useMockData<K extends MockDataKey>(key?: K): UseMockDataResult<MockData | MockData[K]> {
  const [data, setData] = useState<MockData | MockData[K] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 300));

        const typedMockData = mockData as MockData;

        if (key && typedMockData[key]) {
          setData(typedMockData[key]);
        } else if (!key) {
          setData(typedMockData);
        } else {
          throw new Error(`Key "${key}" not found in mock data`);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [key]);

  return { data, loading, error };
}

export function useMockDataSync<K extends MockDataKey>(key: K): MockData[K];
export function useMockDataSync(): MockData;
export function useMockDataSync<K extends MockDataKey>(key?: K): MockData | MockData[K] | null {
  const typedMockData = mockData as MockData;
  if (key && typedMockData[key]) {
    return typedMockData[key];
  }
  return key ? null : typedMockData;
}

export type { User, Pet, RideParams, DefaultLocation, MockData };
