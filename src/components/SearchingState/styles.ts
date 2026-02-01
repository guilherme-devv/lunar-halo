import styled, { keyframes } from 'styled-components';

// Pulse animation for radar
const pulse = keyframes`
  0% {
    transform: scale(0.5);
    opacity: 0.8;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    transform: scale(2.5);
    opacity: 0;
  }
`;

export const RadarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  min-height: 280px;
`;

export const RadarContainer = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const RadarRing = styled.div<{ $delay: number }>`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 3px solid ${({ theme }) => theme.colors.primary};
  animation: ${pulse} 2s ease-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
`;

export const RadarCore = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, #F97316);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  z-index: 1;
  box-shadow: 0 4px 20px rgba(234, 98, 11, 0.4);
`;

export const SearchingText = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const SearchingSubtext = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const CancelButton = styled.button`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.sizes.md};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  margin-top: ${({ theme }) => theme.spacing.lg};
  
  &:hover {
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text.primary};
  }
  
  &:active {
    transform: scale(0.98);
  }
`;
