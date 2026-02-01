import styled, { css } from 'styled-components';

export const ScheduleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  width: 100%;
`;

export const ToggleContainer = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 4px;
`;

export const ToggleOption = styled.button<{ $isActive: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  min-height: 48px;
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.sizes.md};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: none;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  ${({ $isActive, theme }) => $isActive ? css`
    background-color: ${theme.colors.primary};
    color: ${theme.colors.text.inverse};
    box-shadow: ${theme.shadows.md};
  ` : css`
    background-color: transparent;
    color: ${theme.colors.text.secondary};
    
    &:hover {
      color: ${theme.colors.text.primary};
    }
  `}
`;

export const DateTimeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  animation: slideIn 0.2s ease-out;
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const DateTimeLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const LabelText = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const DateTimeInput = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.typography.sizes.md};
  font-family: inherit;
  color: ${({ theme }) => theme.colors.text.primary};
  background-color: ${({ theme }) => theme.colors.surface};
  border: 2px solid transparent;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  outline: none;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.background};
  }
  
  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
    filter: opacity(0.6);
  }
`;

export const ScheduleInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.primary}10;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
`;
