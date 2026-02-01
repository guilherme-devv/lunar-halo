import styled, { keyframes } from 'styled-components';

export const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const DashboardHeader = styled.header`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
`;

export const DriverAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.3);
`;

export const DriverInfo = styled.div`
  flex: 1;
`;

export const DriverName = styled.h2`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
`;

export const DriverStatus = styled.span<{ $variant: 'onboarding' | 'active' | 'online' }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  opacity: 0.9;
  
  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${({ $variant }) => {
    switch ($variant) {
      case 'online': return '#22C55E';
      case 'active': return '#FBBF24';
      default: return '#94A3B8';
    }
  }};
  }
`;

export const DashboardContent = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

// Online Toggle
const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); }
  50% { box-shadow: 0 0 0 10px rgba(34, 197, 94, 0); }
`;

export const OnlineToggleWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const OnlineToggleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const OnlineToggleLabel = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const OnlineIcon = styled.div<{ $isOnline: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ $isOnline }) => ($isOnline ? '#22C55E' : '#94A3B8')};
  color: white;
  transition: all 0.3s ease;
  animation: ${({ $isOnline }) => ($isOnline ? pulse : 'none')} 2s ease-in-out infinite;
`;

export const OnlineText = styled.div``;

export const OnlineTitle = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.md};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const OnlineSubtext = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const ToggleSwitch = styled.button<{ $isOn: boolean; $disabled: boolean }>`
  width: 56px;
  height: 32px;
  border-radius: 16px;
  border: none;
  padding: 2px;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  background-color: ${({ $isOn, $disabled }) => {
    if ($disabled) return '#E5E7EB';
    return $isOn ? '#22C55E' : '#94A3B8';
  }};
  transition: all 0.2s ease;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background-color: white;
    top: 2px;
    left: ${({ $isOn }) => ($isOn ? '26px' : '2px')};
    transition: left 0.2s ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }
`;

export const BlockedMessage = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  background-color: #FEF3C7;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-top: ${({ theme }) => theme.spacing.md};
  
  svg {
    color: #92400E;
    flex-shrink: 0;
  }
  
  p {
    font-size: ${({ theme }) => theme.typography.sizes.sm};
    color: #92400E;
  }
`;

// Stats Card
export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

export const StatCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.md};
  text-align: center;
`;

export const StatValue = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.xxl};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.primary};
`;

export const StatLabel = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;
