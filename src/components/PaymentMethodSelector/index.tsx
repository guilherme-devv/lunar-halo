import { QrCode, CreditCard, Barcode } from 'lucide-react';
import type { PaymentMethod } from '../../services/pricing.mock';
import {
  SelectorGrid,
  PaymentOption,
  OptionIcon,
  OptionLabel,
  SectionTitle,
} from './styles';

export interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod;
  onMethodChange: (method: PaymentMethod) => void;
}

const PAYMENT_OPTIONS: { method: PaymentMethod; label: string; icon: typeof QrCode }[] = [
  { method: 'pix', label: 'PIX', icon: QrCode },
  { method: 'credit_card', label: 'Cartão', icon: CreditCard },
  { method: 'boleto', label: 'Boleto', icon: Barcode },
];

export function PaymentMethodSelector({
  selectedMethod,
  onMethodChange,
}: PaymentMethodSelectorProps) {
  return (
    <div>
      <SectionTitle>Forma de Pagamento</SectionTitle>
      <SelectorGrid>
        {PAYMENT_OPTIONS.map(({ method, label, icon: Icon }) => {
          const isSelected = selectedMethod === method;
          return (
            <PaymentOption
              key={method}
              $isSelected={isSelected}
              onClick={() => onMethodChange(method)}
              type="button"
              aria-selected={isSelected}
            >
              <OptionIcon $isSelected={isSelected}>
                <Icon size={24} />
              </OptionIcon>
              <OptionLabel $isSelected={isSelected}>{label}</OptionLabel>
            </PaymentOption>
          );
        })}
      </SelectorGrid>
    </div>
  );
}
