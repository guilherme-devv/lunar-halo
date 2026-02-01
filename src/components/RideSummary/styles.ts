import styled from 'styled-components';

export const SummaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const SummaryCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.surface};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const SectionLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.text.tertiary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  display: block;
`;

export const RouteContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const RouteTimeline = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding-top: 2px;
`;

export const RouteIcon = styled.div<{ $variant: 'origin' | 'destination' }>`
  width: 28px;
  height: 28px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ $variant, theme }) =>
    $variant === 'origin' ? theme.colors.primary : theme.colors.secondary};
  color: white;
  font-size: 12px;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  flex-shrink: 0;
`;

export const RouteLine = styled.div`
  flex: 1;
  width: 2px;
  min-height: 24px;
  background: repeating-linear-gradient(
    to bottom,
    ${({ theme }) => theme.colors.text.tertiary} 0,
    ${({ theme }) => theme.colors.text.tertiary} 4px,
    transparent 4px,
    transparent 8px
  );
`;

export const RouteStops = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const RouteStop = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RouteStopLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.text.tertiary};
`;

export const RouteStopAddress = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.md};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  
  svg {
    color: ${({ theme }) => theme.colors.text.tertiary};
    flex-shrink: 0;
  }
`;

export const InfoText = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.md};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const PetBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 4px 10px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
`;

export const BreakdownList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const BreakdownItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const BreakdownLabel = styled.span``;

export const BreakdownValue = styled.span`
  font-weight: ${({ theme }) => theme.typography.weights.medium};
`;

export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.surface};
`;

export const TotalLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const TotalValue = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.xxl};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.secondary};
`;

export const RouteInfoBadge = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: ${({ theme }) => theme.spacing.sm};
  
  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
