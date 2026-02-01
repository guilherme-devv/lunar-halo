import styled, { keyframes, css } from 'styled-components';

export const TimelineWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const TimelineItem = styled.div<{ $isActive: boolean; $isCompleted: boolean }>`
  display: flex;
  position: relative;
  padding-bottom: ${({ theme }) => theme.spacing.lg};
  
  /* Connection line */
  &:not(:last-child)::before {
    content: '';
    position: absolute;
    left: 15px;
    top: 32px;
    bottom: 0;
    width: 2px;
    background: ${({ $isCompleted, theme }) =>
    $isCompleted ? theme.colors.success : theme.colors.surface};
  }
`;

const pulseRing = keyframes`
  0% { transform: scale(0.8); opacity: 1; }
  100% { transform: scale(1.5); opacity: 0; }
`;

export const TimelineIcon = styled.div<{ $isActive: boolean; $isCompleted: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  z-index: 1;
  position: relative;
  background-color: ${({ $isActive, $isCompleted, theme }) => {
    if ($isCompleted) return theme.colors.success;
    if ($isActive) return theme.colors.primary;
    return theme.colors.surface;
  }};
  color: ${({ $isActive, $isCompleted, theme }) => {
    if ($isCompleted || $isActive) return 'white';
    return theme.colors.text.tertiary;
  }};
  
  ${({ $isActive }) =>
    $isActive &&
    css`
    &::before {
      content: '';
      position: absolute;
      inset: -4px;
      border-radius: 50%;
      border: 2px solid currentColor;
      animation: ${pulseRing} 1.5s ease-out infinite;
    }
  `}
`;

export const TimelineContent = styled.div`
  flex: 1;
  margin-left: ${({ theme }) => theme.spacing.md};
  padding-top: 4px;
`;

export const TimelineTitle = styled.h4<{ $isActive: boolean; $isCompleted: boolean }>`
  font-size: ${({ theme }) => theme.typography.sizes.md};
  font-weight: ${({ $isActive, theme }) =>
    $isActive ? theme.typography.weights.bold : theme.typography.weights.semibold};
  color: ${({ $isActive, $isCompleted, theme }) => {
    if ($isActive) return theme.colors.primary;
    if ($isCompleted) return theme.colors.text.primary;
    return theme.colors.text.tertiary;
  }};
  margin-bottom: 2px;
`;

export const TimelineDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const TimelineStatus = styled.span<{ $variant: 'success' | 'warning' | 'pending' }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  background-color: ${({ $variant }) => {
    switch ($variant) {
      case 'success': return '#DCFCE7';
      case 'warning': return '#FEF3C7';
      default: return '#F4F4F5';
    }
  }};
  color: ${({ $variant }) => {
    switch ($variant) {
      case 'success': return '#166534';
      case 'warning': return '#92400E';
      default: return '#71717A';
    }
  }};
`;

export const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  margin-top: ${({ theme }) => theme.spacing.sm};
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  overflow: hidden;
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

export const ProgressFill = styled.div<{ $progress: number }>`
  height: 100%;
  width: ${({ $progress }) => $progress}%;
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, #F97316);
  border-radius: ${({ theme }) => theme.borderRadius.full};
  transition: width 0.3s ease;
`;

export const ProgressText = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: 4px;
  display: block;
`;
