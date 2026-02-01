import styled, { keyframes, css } from 'styled-components';

const slideUp = keyframes`
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
`;

export const RideManagerWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
`;

export const BottomSheet = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.xl} ${({ theme }) => theme.borderRadius.xl} 0 0;
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
  animation: ${slideUp} 0.3s ease-out;
`;

export const SheetHandle = styled.div`
  width: 40px;
  height: 4px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 2px;
  margin: 0 auto ${({ theme }) => theme.spacing.md};
`;

export const StateHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const StateIcon = styled.div<{ $variant: 'pickup' | 'boarding' | 'transit' | 'complete' }>`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  
  ${({ $variant }) => {
    switch ($variant) {
      case 'pickup': return css`
        background: linear-gradient(135deg, #3B82F6, #1D4ED8);
        color: white;
      `;
      case 'boarding': return css`
        background: linear-gradient(135deg, #F59E0B, #D97706);
        color: white;
      `;
      case 'transit': return css`
        background: linear-gradient(135deg, #8B5CF6, #6D28D9);
        color: white;
      `;
      case 'complete': return css`
        background: linear-gradient(135deg, #22C55E, #16A34A);
        color: white;
      `;
    }
  }}
`;

export const StateInfo = styled.div`
  flex: 1;
`;

export const StateTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 2px;
`;

export const StateSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const PassengerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const PassengerAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  object-fit: cover;
`;

export const PassengerDetails = styled.div`
  flex: 1;
`;

export const PassengerName = styled.p`
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const PassengerRating = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const AddressCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const AddressRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} 0;
  
  &:first-child {
    border-bottom: 1px dashed ${({ theme }) => theme.colors.text.tertiary};
    padding-bottom: ${({ theme }) => theme.spacing.md};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

export const AddressDot = styled.div<{ $variant: 'origin' | 'destination' }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ $variant, theme }) =>
    $variant === 'origin' ? '#3B82F6' : theme.colors.primary};
`;

export const AddressText = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  flex: 1;
`;

// Checklist
export const Checklist = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const ChecklistItem = styled.button<{ $checked: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ $checked }) => $checked ? '#F0FDF4' : 'transparent'};
  border: 2px solid ${({ $checked, theme }) =>
    $checked ? '#22C55E' : theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: ${({ $checked }) => $checked ? '#22C55E' : '#CBD5E1'};
  }
`;

export const CheckCircle = styled.div<{ $checked: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid ${({ $checked }) => $checked ? '#22C55E' : '#CBD5E1'};
  background-color: ${({ $checked }) => $checked ? '#22C55E' : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

export const CheckText = styled.span<{ $checked: boolean }>`
  font-size: ${({ theme }) => theme.typography.sizes.md};
  color: ${({ $checked, theme }) =>
    $checked ? '#166534' : theme.colors.text.primary};
  text-align: left;
`;

// Navigation Links
export const NavigationLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const NavLink = styled.a`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #E2E8F0;
  }
`;

// Summary
export const SummaryCard = styled.div`
  background: linear-gradient(135deg, #F0FDF4, #DCFCE7);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const SummaryTitle = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: #166534;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const SummaryValue = styled.p`
  font-size: 2rem;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: #16A34A;
`;

export const SummaryDetail = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: #166534;
  opacity: 0.8;
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

export const ActionButton = styled.button<{ $variant?: 'primary' | 'success' }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.sizes.md};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  cursor: pointer;
  transition: all 0.2s;
  
  ${({ $variant = 'primary', theme }) => {
    switch ($variant) {
      case 'success': return css`
        background: linear-gradient(135deg, #22C55E, #16A34A);
        color: white;
        &:hover { filter: brightness(1.1); }
      `;
      default: return css`
        background: linear-gradient(135deg, ${theme.colors.primary}, #D95409);
        color: white;
        &:hover { filter: brightness(1.1); }
      `;
    }
  }}
`;
