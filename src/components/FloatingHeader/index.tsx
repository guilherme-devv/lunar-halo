import { Menu } from 'lucide-react';
import type { User } from '../../types';
import { HeaderWrapper, AvatarButton, AvatarImage, MenuButton } from './styles';

export interface FloatingHeaderProps {
  user?: User | null;
  onAvatarClick?: () => void;
  onMenuClick?: () => void;
}

export function FloatingHeader({ user, onAvatarClick, onMenuClick }: FloatingHeaderProps) {
  return (
    <HeaderWrapper>
      <AvatarButton onClick={onAvatarClick} aria-label="Perfil do usuário">
        {user?.avatar ? (
          <AvatarImage src={user.avatar} alt={user.name || 'Avatar'} />
        ) : (
          <AvatarImage
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Default"
            alt="Avatar padrão"
          />
        )}
      </AvatarButton>

      <MenuButton onClick={onMenuClick} aria-label="Menu">
        <Menu size={24} />
      </MenuButton>
    </HeaderWrapper>
  );
}
