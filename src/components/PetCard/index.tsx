import { Dog, Cat, Check } from 'lucide-react';
import type { Pet } from '../../hooks';
import {
  PetCardWrapper,
  PetAvatar,
  PetInfo,
  PetName,
  PetDetails,
  CheckIndicator,
} from './styles';

export interface PetCardProps {
  pet: Pet;
  isSelected: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

const SIZE_LABELS: Record<string, string> = {
  small: 'Pequeno',
  medium: 'Médio',
  large: 'Grande',
};

export function PetCard({ pet, isSelected, onToggle, disabled = false }: PetCardProps) {
  const PetIcon = pet.species === 'cat' ? Cat : Dog;

  return (
    <PetCardWrapper
      type="button"
      $isSelected={isSelected}
      onClick={onToggle}
      disabled={disabled && !isSelected}
      aria-pressed={isSelected}
      aria-label={`${isSelected ? 'Remover' : 'Selecionar'} ${pet.name}`}
    >
      <PetAvatar $isSelected={isSelected}>
        <PetIcon size={24} />
      </PetAvatar>

      <PetInfo>
        <PetName>{pet.name}</PetName>
        <PetDetails>
          {pet.breed} • {SIZE_LABELS[pet.size] || pet.size}
        </PetDetails>
      </PetInfo>

      <CheckIndicator $isSelected={isSelected}>
        {isSelected && <Check size={14} strokeWidth={3} />}
      </CheckIndicator>
    </PetCardWrapper>
  );
}
