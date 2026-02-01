import { Car } from 'lucide-react';
import {
  RadarWrapper,
  RadarContainer,
  RadarRing,
  RadarCore,
  SearchingText,
  SearchingSubtext,
  CancelButton,
} from './styles';

export interface SearchingStateProps {
  onCancel: () => void;
}

export function SearchingState({ onCancel }: SearchingStateProps) {
  return (
    <RadarWrapper aria-live="polite" aria-busy="true">
      <RadarContainer>
        <RadarRing $delay={0} />
        <RadarRing $delay={0.5} />
        <RadarRing $delay={1} />
        <RadarCore>
          <Car size={28} />
        </RadarCore>
      </RadarContainer>

      <SearchingText>Localizando motorista parceiro...</SearchingText>
      <SearchingSubtext>
        Conectando você ao melhor motorista pet-friendly disponível
      </SearchingSubtext>

      <CancelButton onClick={onCancel} type="button">
        Cancelar Solicitação
      </CancelButton>
    </RadarWrapper>
  );
}
