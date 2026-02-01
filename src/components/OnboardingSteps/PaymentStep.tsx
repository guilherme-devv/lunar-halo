import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { formatCurrency } from '../../services/pricing.mock';
import { PaymentBrick, type PaymentData } from '../PaymentBrick';
import { Button } from '../Button';
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
  SuccessCheck,
  SuccessTitle,
  SuccessMessage,
} from './styles';
import styled from 'styled-components';

interface PaymentStepProps {
  onClose: () => void;
  onComplete: () => void;
}

const PaymentInfo = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

const PaymentAmount = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.xxl};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const PaymentDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const PaymentBrickWrapper = styled.div`
  max-height: 400px;
  overflow-y: auto;
  margin: 0 -${({ theme }) => theme.spacing.lg};
  padding: 0 ${({ theme }) => theme.spacing.lg};
`;

type PaymentState = 'checkout' | 'success';

const ADHESION_FEE = 300;

export function PaymentStep({ onClose, onComplete }: PaymentStepProps) {
  const [paymentState, setPaymentState] = useState<PaymentState>('checkout');
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);

  const handlePaymentSuccess = (data: PaymentData) => {
    console.log('Payment successful:', data);
    setPaymentData(data);
    setPaymentState('success');
  };

  const handlePaymentError = (error: Error) => {
    console.error('Payment error:', error);
    // In a real app, show error message to user
  };

  if (paymentState === 'success') {
    return (
      <ModalOverlay>
        <ModalContent>
          <ModalBody style={{ paddingTop: 32, paddingBottom: 32 }}>
            <SuccessCheck>
              <Check size={40} />
            </SuccessCheck>
            <SuccessTitle>Pagamento Confirmado!</SuccessTitle>
            <SuccessMessage>
              Sua taxa de adesão de {formatCurrency(ADHESION_FEE)} foi processada com sucesso.
              {paymentData && (
                <small style={{ display: 'block', marginTop: 8, opacity: 0.7 }}>
                  ID: {paymentData.paymentId}
                </small>
              )}
            </SuccessMessage>
            <Button fullWidth onClick={onComplete}>
              Continuar
            </Button>
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    );
  }

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Taxa de Adesão</ModalTitle>
          <CloseButton onClick={onClose}>
            <X size={24} />
          </CloseButton>
        </ModalHeader>

        <ModalBody>
          <PaymentInfo>
            <PaymentAmount>{formatCurrency(ADHESION_FEE)}</PaymentAmount>
            <PaymentDescription>
              Taxa única para adesão ao programa Voudpet
            </PaymentDescription>
          </PaymentInfo>

          <PaymentBrickWrapper>
            <PaymentBrick
              amount={ADHESION_FEE}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
              payer={{
                email: 'driver@voudpet.com',
                firstName: 'Carlos',
                lastName: 'Eduardo',
              }}
            />
          </PaymentBrickWrapper>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
}
