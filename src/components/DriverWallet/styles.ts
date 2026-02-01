import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const WalletWrapper = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const WalletHeader = styled.header`
  background: linear-gradient(135deg, #1E3A8A, #3B82F6);
  padding: ${({ theme }) => theme.spacing.xl};
  padding-top: 60px;
  color: white;
`;

export const HeaderTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};
  margin-left: -${({ theme }) => theme.spacing.sm};
`;

export const BalanceCard = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  animation: ${fadeIn} 0.4s ease-out;
`;

export const BalanceLabel = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  opacity: 0.9;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const BalanceAmount = styled.p`
  font-size: 2.5rem;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const PendingBalance = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  opacity: 0.8;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const WithdrawButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
  background: white;
  color: #1E3A8A;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.sizes.md};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.02);
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

export const StatsRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

export const StatItem = styled.div`
  flex: 1;
  text-align: center;
  padding: ${({ theme }) => theme.spacing.md};
  background: rgba(255, 255, 255, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;

export const StatValue = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
`;

export const StatLabel = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  opacity: 0.8;
`;

// Transaction History
export const HistorySection = styled.section`
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const TransactionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const TransactionCard = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.md};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  animation: ${fadeIn} 0.3s ease-out;
`;

export const TransactionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const TransactionDestination = styled.p`
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.sizes.md};
`;

export const TransactionDate = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.text.tertiary};
`;

export const SplitBreakdown = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-top: ${({ theme }) => theme.spacing.sm};
  border-top: 1px dashed ${({ theme }) => theme.colors.surface};
`;

export const SplitRow = styled.div<{ $variant?: 'gross' | 'net' | 'fee' }>`
  display: flex;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  
  ${({ $variant }) => {
    switch ($variant) {
      case 'net':
        return `
          color: #16A34A;
          font-weight: 600;
        `;
      case 'fee':
        return `
          color: #9CA3AF;
          font-size: 0.75rem;
        `;
      default:
        return `
          color: #6B7280;
        `;
    }
  }}
`;

// Mercado Pago Branding
export const MercadoPagoIcon = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  opacity: 0.9;
  
  &::before {
    content: '💰';
    font-size: 1rem;
  }
`;

export const SecureBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: 4px 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;
