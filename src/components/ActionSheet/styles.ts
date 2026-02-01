import styled, { keyframes } from 'styled-components';

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
  max-height: 75vh;
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

// Spinner animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

export const ButtonContent = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

// Success Toast
export const ToastOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const ToastCard = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  max-width: 320px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
`;

export const ToastIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #10B981, #059669);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${({ theme }) => theme.spacing.lg};
  color: white;
`;

export const ToastTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const ToastMessage = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  line-height: 1.5;
`;
