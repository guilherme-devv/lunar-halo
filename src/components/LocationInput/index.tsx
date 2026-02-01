import { useState, useRef, useEffect } from 'react';
import { Navigation, MapPin, X, MapPinned } from 'lucide-react';
import { useTheme } from 'styled-components';
import type { Location } from '../../context/RideContext';
import locationsData from '../../services/maps.mock.json';
import {
  LocationInputWrapper,
  InputContainer,
  InputField,
  InputIconWrapper,
  ClearButton,
  SuggestionsList,
  SuggestionItem,
  SuggestionIcon,
  SuggestionText,
} from './styles';

interface LocationInputProps {
  origin: Location | null;
  destination: Location | null;
  onOriginChange: (location: Location | null) => void;
  onDestinationChange: (location: Location | null) => void;
}

export function LocationInput({
  origin,
  destination,
  onOriginChange,
  onDestinationChange,
}: LocationInputProps) {
  const theme = useTheme();
  const [originQuery, setOriginQuery] = useState(origin?.address || '');
  const [destinationQuery, setDestinationQuery] = useState(destination?.address || '');
  const [activeInput, setActiveInput] = useState<'origin' | 'destination' | null>(null);
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);

  const originInputRef = useRef<HTMLInputElement>(null);
  const destinationInputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Filter locations based on query
  useEffect(() => {
    if (!activeInput) {
      setFilteredLocations([]);
      return;
    }

    const query = activeInput === 'origin' ? originQuery : destinationQuery;

    if (query.length > 0) {
      const filtered = (locationsData as Location[]).filter((loc) =>
        loc.address.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredLocations(filtered);
    } else {
      // Show all locations when input is focused but empty
      setFilteredLocations(locationsData as Location[]);
    }
  }, [originQuery, destinationQuery, activeInput]);

  // Click outside to close suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setActiveInput(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOriginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOriginQuery(e.target.value);
    if (origin) {
      onOriginChange(null);
    }
  };

  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDestinationQuery(e.target.value);
    if (destination) {
      onDestinationChange(null);
    }
  };

  const handleSelectLocation = (location: Location) => {
    if (activeInput === 'origin') {
      setOriginQuery(location.address);
      onOriginChange(location);
      setActiveInput(null);
      // Focus destination if empty
      if (!destination) {
        setTimeout(() => {
          destinationInputRef.current?.focus();
          setActiveInput('destination');
        }, 100);
      }
    } else if (activeInput === 'destination') {
      setDestinationQuery(location.address);
      onDestinationChange(location);
      setActiveInput(null);
    }
  };

  const handleClearOrigin = () => {
    setOriginQuery('');
    onOriginChange(null);
    originInputRef.current?.focus();
  };

  const handleClearDestination = () => {
    setDestinationQuery('');
    onDestinationChange(null);
    destinationInputRef.current?.focus();
  };

  return (
    <LocationInputWrapper ref={wrapperRef}>
      {/* Origin Input */}
      <InputContainer>
        <InputIconWrapper $color={theme.colors.primary}>
          <Navigation size={20} />
        </InputIconWrapper>
        <InputField
          ref={originInputRef}
          type="text"
          placeholder="De onde?"
          value={originQuery}
          onChange={handleOriginChange}
          onFocus={() => setActiveInput('origin')}
        />
        {originQuery && (
          <ClearButton onClick={handleClearOrigin} type="button" aria-label="Limpar origem">
            <X size={16} />
          </ClearButton>
        )}
        {activeInput === 'origin' && filteredLocations.length > 0 && (
          <SuggestionsList>
            {filteredLocations.map((location) => (
              <SuggestionItem
                key={location.id}
                onClick={() => handleSelectLocation(location)}
              >
                <SuggestionIcon>
                  <MapPinned size={16} />
                </SuggestionIcon>
                <SuggestionText>{location.address}</SuggestionText>
              </SuggestionItem>
            ))}
          </SuggestionsList>
        )}
      </InputContainer>

      {/* Destination Input */}
      <InputContainer>
        <InputIconWrapper $color={theme.colors.secondary}>
          <MapPin size={20} />
        </InputIconWrapper>
        <InputField
          ref={destinationInputRef}
          type="text"
          placeholder="Para onde?"
          value={destinationQuery}
          onChange={handleDestinationChange}
          onFocus={() => setActiveInput('destination')}
        />
        {destinationQuery && (
          <ClearButton onClick={handleClearDestination} type="button" aria-label="Limpar destino">
            <X size={16} />
          </ClearButton>
        )}
        {activeInput === 'destination' && filteredLocations.length > 0 && (
          <SuggestionsList>
            {filteredLocations.map((location) => (
              <SuggestionItem
                key={location.id}
                onClick={() => handleSelectLocation(location)}
              >
                <SuggestionIcon>
                  <MapPinned size={16} />
                </SuggestionIcon>
                <SuggestionText>{location.address}</SuggestionText>
              </SuggestionItem>
            ))}
          </SuggestionsList>
        )}
      </InputContainer>
    </LocationInputWrapper>
  );
}
