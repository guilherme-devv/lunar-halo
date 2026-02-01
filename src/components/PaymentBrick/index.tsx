import { useEffect, useState } from 'react';
import { initMercadoPago, Payment } from '@mercadopago/sdk-react';
import { AlertTriangle } from 'lucide-react';
import { MERCADO_PAGO_PUBLIC_KEY, IS_SANDBOX, MP_LOCALE } from '../../config/mercadopago';
import { formatCurrency } from '../../services/pricing.mock';
import {
  PaymentWrapper,
  PaymentHeader,
  PaymentTitle,
  PaymentSubtitle,
  AmountDisplay,
  AmountLabel,
  AmountValue,
  LoadingContainer,
  LoadingText,
  ErrorContainer,
  ErrorText,
  SandboxBadge,
} from './styles';

export interface PaymentBrickProps {
  amount: number;
  onSuccess: (paymentData: PaymentData) => void;
  onError: (error: Error) => void;
  payer?: {
    email?: string;
    firstName?: string;
    lastName?: string;
  };
}

export interface PaymentData {
  paymentId: string;
  status: string;
  statusDetail: string;
  paymentMethodId: string;
  paymentTypeId: string;
}

// Initialize MP SDK once
let isInitialized = false;

export function PaymentBrick({ amount, onSuccess, onError, payer }: PaymentBrickProps) {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isInitialized) {
      initMercadoPago(MERCADO_PAGO_PUBLIC_KEY, { locale: MP_LOCALE });
      isInitialized = true;
    }
    setIsReady(true);
  }, []);

  const initialization = {
    amount,
    payer: payer ? {
      email: payer.email,
      firstName: payer.firstName,
      lastName: payer.lastName,
    } : undefined,
  };

  const customization = {
    paymentMethods: {
      creditCard: 'all' as const,
      debitCard: 'all' as const,
      ticket: 'all' as const,
      bankTransfer: 'all' as const,
    },
    visual: {
      style: {
        theme: 'default' as const,
        customVariables: {
          formBackgroundColor: '#FFFFFF',
          baseColor: '#EA620B',
        },
      },
    },
  };

  const onSubmit = async (param: { formData: unknown }) => {
    try {
      // In a real app, this would call your backend API
      // For demo purposes, we'll simulate a successful payment
      const formData = param.formData as Record<string, unknown>;
      console.log('Payment form data:', formData);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock successful payment response
      const mockPaymentData: PaymentData = {
        paymentId: `pay_${Date.now()}`,
        status: 'approved',
        statusDetail: 'accredited',
        paymentMethodId: String(formData.payment_method_id || 'pix'),
        paymentTypeId: String(formData.payment_type || 'bank_transfer'),
      };

      onSuccess(mockPaymentData);
    } catch (err) {
      console.error('Payment error:', err);
      setError('Erro ao processar pagamento. Tente novamente.');
      onError(err instanceof Error ? err : new Error('Payment failed'));
    }
  };

  const onPaymentError = (err: unknown) => {
    console.error('Payment Brick error:', err);
    setError('Erro no formulário de pagamento.');
    onError(err instanceof Error ? err : new Error('Payment Brick error'));
  };

  const onReady = () => {
    console.log('Payment Brick ready');
  };

  if (error) {
    return (
      <ErrorContainer>
        <ErrorText>{error}</ErrorText>
      </ErrorContainer>
    );
  }

  if (!isReady) {
    return (
      <LoadingContainer>
        <LoadingText>Carregando opções de pagamento...</LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <PaymentWrapper>
      <PaymentHeader>
        {IS_SANDBOX && (
          <SandboxBadge>
            <AlertTriangle size={12} />
            Modo de Teste
          </SandboxBadge>
        )}
        <PaymentTitle>Pagamento</PaymentTitle>
        <PaymentSubtitle>Escolha como deseja pagar</PaymentSubtitle>
      </PaymentHeader>

      <AmountDisplay>
        <AmountLabel>Total a pagar</AmountLabel>
        <AmountValue>{formatCurrency(amount)}</AmountValue>
      </AmountDisplay>

      <Payment
        initialization={initialization}
        customization={customization}
        onSubmit={onSubmit}
        onReady={onReady}
        onError={onPaymentError}
      />
    </PaymentWrapper>
  );
}
