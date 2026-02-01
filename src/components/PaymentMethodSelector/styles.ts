import styled from 'styled-components';

export const SelectorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const PaymentOption = styled.button<{ $isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 2px solid ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.primary : theme.colors.surface};
  background-color: ${({ $isSelected, theme }) =>
    $isSelected ? 'rgba(234, 98, 11, 0.08)' : theme.colors.background};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  min-height: 90px;
  
  &:hover {
    border-color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.primary : theme.colors.secondary};
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

export const OptionIcon = styled.div<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.primary : theme.colors.text.secondary};
  transition: color ${({ theme }) => theme.transitions.fast};
`;

export const OptionLabel = styled.span<{ $isSelected: boolean }>`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ $isSelected, theme }) =>
    $isSelected ? theme.typography.weights.semibold : theme.typography.weights.medium};
  color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.text.primary : theme.colors.text.secondary};
  transition: all ${({ theme }) => theme.transitions.fast};
`;

export const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.md};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;
