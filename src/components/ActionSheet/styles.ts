import styled from 'styled-components';

export const SheetWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.xxl} ${({ theme }) => theme.borderRadius.xxl} 0 0;
  box-shadow: ${({ theme }) => theme.shadows.xl};
  padding: ${({ theme }) => theme.spacing.lg};
  padding-bottom: calc(env(safe-area-inset-bottom, 0px) + ${({ theme }) => theme.spacing.lg});
  z-index: 50;
  max-height: 70vh;
  display: flex;
  flex-direction: column;
`;

export const SheetHandle = styled.div`
  width: 36px;
  height: 4px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  margin: 0 auto ${({ theme }) => theme.spacing.md};
  flex-shrink: 0;
`;

export const SheetHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  flex-shrink: 0;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  background-color: ${({ theme }) => theme.colors.surface};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  flex-shrink: 0;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.text.inverse};
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

export const SheetTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  flex: 1;
`;

export const StepIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  flex-shrink: 0;
`;

export const StepDot = styled.div<{ $isActive: boolean; $isCompleted: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ $isActive, $isCompleted, theme }) => {
    if ($isActive) return theme.colors.primary;
    if ($isCompleted) return theme.colors.success;
    return theme.colors.surface;
  }};
  transition: all ${({ theme }) => theme.transitions.fast};
`;

export const SheetContent = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding-right: 4px;
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.surface};
    border-radius: ${({ theme }) => theme.borderRadius.full};
  }
`;

export const SheetFooter = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  flex-shrink: 0;
`;
