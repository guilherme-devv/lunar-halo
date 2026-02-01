import styled, { keyframes } from 'styled-components';

const pulseAnimation = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(234, 98, 11, 0.4); }
  70% { box-shadow: 0 0 0 15px rgba(234, 98, 11, 0); }
  100% { box-shadow: 0 0 0 0 rgba(234, 98, 11, 0); }
`;

const slideUp = keyframes`
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

export const RequestOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 1000;
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const RequestCard = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.xl} ${({ theme }) => theme.borderRadius.xl} 0 0;
  width: 100%;
  max-width: 420px;
  padding: ${({ theme }) => theme.spacing.xl};
  animation: ${slideUp} 0.4s ease-out, ${pulseAnimation} 2s ease-in-out infinite;
  border: 3px solid ${({ theme }) => theme.colors.primary};
`;

export const RequestHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const NewRequestBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  background: linear-gradient(135deg, #EA620B, #F97316);
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const ValueSection = styled.div`
  background-color: #F0FDF4;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const NetValue = styled.p`
  font-size: 2.5rem;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: #16A34A;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const ValueLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: #166534;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.sm} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.surface};
  
  &:last-child {
    border-bottom: none;
  }
`;

export const InfoIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.surface};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  flex-shrink: 0;
`;

export const InfoContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const InfoLabel = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.text.tertiary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const InfoValue = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.md};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const PetTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export const PetTag = styled.span<{ $size: 'small' | 'medium' | 'large' }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  background-color: ${({ $size }) => {
    switch ($size) {
      case 'large': return '#FEE2E2';
      case 'medium': return '#FEF3C7';
      default: return '#DCFCE7';
    }
  }};
  color: ${({ $size }) => {
    switch ($size) {
      case 'large': return '#991B1B';
      case 'medium': return '#92400E';
      default: return '#166534';
    }
  }};
`;

// Accept Button with Countdown
export const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const countdownAnimation = keyframes`
  from { stroke-dashoffset: 0; }
  to { stroke-dashoffset: 283; }
`;

export const AcceptButtonWrapper = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
`;

export const CountdownRing = styled.svg<{ $duration: number }>`
  position: absolute;
  inset: 0;
  transform: rotate(-90deg);
  
  circle.progress {
    fill: none;
    stroke: ${({ theme }) => theme.colors.primary};
    stroke-width: 4;
    stroke-linecap: round;
    stroke-dasharray: 283;
    stroke-dashoffset: 0;
    animation: ${countdownAnimation} ${({ $duration }) => $duration}s linear forwards;
  }
  
  circle.bg {
    fill: none;
    stroke: ${({ theme }) => theme.colors.surface};
    stroke-width: 4;
  }
`;

export const AcceptButton = styled.button`
  position: absolute;
  inset: 8px;
  border-radius: 50%;
  background: linear-gradient(135deg, #22C55E, #16A34A);
  border: none;
  color: white;
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  transition: transform 0.2s;
  box-shadow: 0 4px 15px rgba(34, 197, 94, 0.4);
  
  &:hover {
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

export const CountdownText = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  opacity: 0.9;
`;

export const DeclineButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.xl};
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-size: ${({ theme }) => theme.typography.sizes.md};
  cursor: pointer;
  
  &:hover {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;
