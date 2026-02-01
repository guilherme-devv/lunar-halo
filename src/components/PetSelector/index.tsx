import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { useMockDataSync, type Pet } from '../../hooks';
import { PetCard } from '../PetCard';
import {
  PetSelectorWrapper,
  SelectorHeader,
  SelectorTitle,
  SelectionCount,
  PetList,
  ErrorMessage,
} from './styles';

const MAX_PETS = 3;

export interface PetSelectorProps {
  selectedPets: string[];
  onTogglePet: (petId: string) => boolean;
}

export function PetSelector({ selectedPets, onTogglePet }: PetSelectorProps) {
  const pets = useMockDataSync('pets') as Pet[];
  const [showError, setShowError] = useState(false);

  const handleToggle = (petId: string) => {
    const success = onTogglePet(petId);
    if (!success && !selectedPets.includes(petId)) {
      // Tried to add but failed (max reached)
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  const isMaxSelected = selectedPets.length >= MAX_PETS;

  return (
    <PetSelectorWrapper>
      <SelectorHeader>
        <SelectorTitle>Quais pets vão viajar?</SelectorTitle>
        <SelectionCount $isMax={isMaxSelected}>
          {selectedPets.length}/{MAX_PETS}
        </SelectionCount>
      </SelectorHeader>

      {showError && (
        <ErrorMessage>
          <AlertCircle size={16} />
          Máximo de {MAX_PETS} pets por viagem
        </ErrorMessage>
      )}

      <PetList>
        {pets?.map((pet) => (
          <PetCard
            key={pet.id}
            pet={pet}
            isSelected={selectedPets.includes(pet.id)}
            onToggle={() => handleToggle(pet.id)}
            disabled={isMaxSelected}
          />
        ))}
      </PetList>
    </PetSelectorWrapper>
  );
}
