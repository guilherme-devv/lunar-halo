import styled from 'styled-components';

interface ButtonWrapperProps {
  $variant?: 'primary' | 'secondary' | 'outline';
  $size?: 'sm' | 'md' | 'lg';
  $fullWidth?: boolean;
}

export const ButtonWrapper = styled.button<ButtonWrapperProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  height: ${({ $size }) => {
    switch ($size) {
      case 'sm':
        return '36px';
      case 'lg':
        return '52px';
      default:
        return '48px';
    }
  }};
  padding: 0 ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  transition: all ${({ theme }) => theme.transitions.fast};
  
  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'secondary':
        return `
          background-color: ${theme.colors.secondary};
          color: ${theme.colors.text.inverse};
          
          &:hover:not(:disabled) {
            background-color: #1a1a1f;
          }
          
          &:active:not(:disabled) {
            transform: scale(0.98);
          }
        `;
      case 'outline':
        return `
          background-color: transparent;
          color: ${theme.colors.primary};
          border: 2px solid ${theme.colors.primary};
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primary}10;
          }
          
          &:active:not(:disabled) {
            transform: scale(0.98);
          }
        `;
      default:
        return `
          background-color: ${theme.colors.primary};
          color: ${theme.colors.text.inverse};
          
          &:hover:not(:disabled) {
            background-color: #d55a0a;
          }
          
          &:active:not(:disabled) {
            transform: scale(0.98);
          }
        `;
    }
  }}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
