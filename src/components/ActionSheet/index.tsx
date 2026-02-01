import { MapPin, Navigation } from 'lucide-react';
import { useTheme } from 'styled-components';
import { SheetWrapper, SheetHandle, SheetTitle, InputsContainer } from './styles';
import { FakeInput } from '../FakeInput';
import { Button } from '../Button';

export interface ActionSheetProps {
  title?: string;
  onOriginClick?: () => void;
  onDestinationClick?: () => void;
  onSubmit?: () => void;
  submitLabel?: string;
  isLoading?: boolean;
}

export function ActionSheet({
  title = 'Para onde vamos, Pet?',
  onOriginClick,
  onDestinationClick,
  onSubmit,
  submitLabel = 'Solicitar Viagem',
  isLoading = false,
}: ActionSheetProps) {
  const theme = useTheme();

  return (
    <SheetWrapper>
      <SheetHandle />
      <SheetTitle>{title}</SheetTitle>

      <InputsContainer>
        <FakeInput
          icon={Navigation}
          placeholder="Local de Partida"
          iconColor={theme.colors.primary}
          onClick={onOriginClick}
        />
        <FakeInput
          icon={MapPin}
          placeholder="Para onde?"
          iconColor={theme.colors.secondary}
          onClick={onDestinationClick}
        />
      </InputsContainer>

      <Button
        fullWidth
        size="lg"
        onClick={onSubmit}
        disabled={isLoading}
      >
        {isLoading ? 'Carregando...' : submitLabel}
      </Button>
    </SheetWrapper>
  );
}
