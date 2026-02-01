import type { LucideIcon } from 'lucide-react';
import { InputWrapper, IconContainer, InputText } from './styles';

export interface FakeInputProps {
  icon?: LucideIcon;
  placeholder: string;
  iconColor?: string;
  onClick?: () => void;
}

export function FakeInput({ icon: Icon, placeholder, iconColor, onClick }: FakeInputProps) {
  return (
    <InputWrapper onClick={onClick}>
      {Icon && (
        <IconContainer $iconColor={iconColor}>
          <Icon size={20} />
        </IconContainer>
      )}
      <InputText>{placeholder}</InputText>
    </InputWrapper>
  );
}
