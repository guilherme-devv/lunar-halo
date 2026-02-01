import styled, { css } from 'styled-components';

export const PetCardWrapper = styled.button<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
  min-height: 72px;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.background};
  border: 2px solid ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.primary : theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  text-align: left;
  
  ${({ $isSelected, theme }) => $isSelected && css`
    background-color: ${theme.colors.primary}08;
    box-shadow: 0 0 0 3px ${theme.colors.primary}20;
  `}
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
  
  &:active {
    transform: scale(0.99);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    border-color: ${({ theme }) => theme.colors.surface};
    
    &:hover {
      border-color: ${({ theme }) => theme.colors.surface};
    }
  }
`;

export const PetAvatar = styled.div<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.primary : theme.colors.surface};
  color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.text.inverse : theme.colors.text.secondary};
  flex-shrink: 0;
  transition: all ${({ theme }) => theme.transitions.fast};
`;

export const PetInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
`;

export const PetName = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const PetDetails = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-transform: capitalize;
`;

export const CheckIndicator = styled.div<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.primary : 'transparent'};
  border: 2px solid ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.primary : theme.colors.surface};
  color: ${({ theme }) => theme.colors.text.inverse};
  flex-shrink: 0;
  transition: all ${({ theme }) => theme.transitions.fast};
`;
