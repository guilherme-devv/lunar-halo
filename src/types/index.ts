export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Pet {
  id: string;
  name: string;
  size: 'small' | 'medium' | 'large';
  species: string;
  breed: string;
}

export interface RideParams {
  pricePerKm: number;
  minPrice: number;
  currency: string;
}

export interface DefaultLocation {
  lat: number;
  lng: number;
  city: string;
  state: string;
}

export interface MockData {
  user: User;
  pets: Pet[];
  rideParams: RideParams;
  defaultLocation: DefaultLocation;
}
