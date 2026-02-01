import styled from 'styled-components';

export const PaymentWrapper = styled.div`
  width: 100%;
  
  /* Customization for MP Bricks */
  .mercadopago-bricks-container {
    font-family: ${({ theme }) => theme.typography.fontFamily};
  }
`;

export const PaymentHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const PaymentTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const PaymentSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const AmountDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const AmountLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.md};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const AmountValue = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.secondary};
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  gap: ${({ theme }) => theme.spacing.md};
`;

export const LoadingText = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.md};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const ErrorContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: #FEF2F2;
  border: 1px solid #FECACA;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  text-align: center;
`;

export const ErrorText = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.md};
  color: #DC2626;
`;

export const SandboxBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background-color: #FEF3C7;
  border: 1px solid #FCD34D;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: #92400E;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;
