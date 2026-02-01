import { ArrowLeft, HandCoins, Lock, TrendingUp, Car, ExternalLink } from 'lucide-react';
import { formatCurrency } from '../../services/pricing.mock';
import walletData from '../../services/ride-operation.mock.json';
import {
  WalletWrapper,
  WalletHeader,
  HeaderTitle,
  BackButton,
  BalanceCard,
  BalanceLabel,
  BalanceAmount,
  PendingBalance,
  WithdrawButton,
  StatsRow,
  StatItem,
  StatValue,
  StatLabel,
  HistorySection,
  SectionTitle,
  TransactionList,
  TransactionCard,
  TransactionHeader,
  TransactionDestination,
  TransactionDate,
  SplitBreakdown,
  SplitRow,
  SecureBadge,
} from './styles';

export interface DriverWalletProps {
  onBack: () => void;
}

export function DriverWallet({ onBack }: DriverWalletProps) {
  const { wallet } = walletData;

  const handleWithdraw = () => {
    // In production, redirect to Mercado Pago dashboard
    window.open('https://www.mercadopago.com.br/activities', '_blank');
  };

  return (
    <WalletWrapper>
      <WalletHeader>
        <HeaderTitle>
          <BackButton onClick={onBack}>
            <ArrowLeft size={24} />
          </BackButton>
          Carteira Digital
        </HeaderTitle>

        <BalanceCard>
          <BalanceLabel>
            <HandCoins size={16} />
            Saldo Disponível no Mercado Pago
          </BalanceLabel>
          <BalanceAmount>{formatCurrency(wallet.balance)}</BalanceAmount>

          {wallet.pendingBalance > 0 && (
            <PendingBalance>
              + {formatCurrency(wallet.pendingBalance)} em processamento
            </PendingBalance>
          )}

          <SecureBadge>
            <Lock size={12} />
            Protegido por Mercado Pago
          </SecureBadge>

          <WithdrawButton onClick={handleWithdraw}>
            <ExternalLink size={18} />
            Sacar / Transferir
          </WithdrawButton>
        </BalanceCard>

        <StatsRow>
          <StatItem>
            <StatValue>{formatCurrency(wallet.totalEarnings)}</StatValue>
            <StatLabel>
              <TrendingUp size={12} style={{ marginRight: 4 }} />
              Total Ganho
            </StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{wallet.totalRides}</StatValue>
            <StatLabel>
              <Car size={12} style={{ marginRight: 4 }} />
              Corridas
            </StatLabel>
          </StatItem>
        </StatsRow>
      </WalletHeader>

      <HistorySection>
        <SectionTitle>Extrato de Corridas</SectionTitle>

        <TransactionList>
          {wallet.history.map((txn) => (
            <TransactionCard key={txn.id}>
              <TransactionHeader>
                <TransactionDestination>{txn.destination}</TransactionDestination>
                <TransactionDate>{txn.dateLabel}</TransactionDate>
              </TransactionHeader>

              <SplitBreakdown>
                <SplitRow $variant="gross">
                  <span>Total da Corrida</span>
                  <span>{formatCurrency(txn.gross)}</span>
                </SplitRow>
                <SplitRow $variant="net">
                  <span>✓ Você recebeu (70%)</span>
                  <span>{formatCurrency(txn.net)}</span>
                </SplitRow>
                <SplitRow $variant="fee">
                  <span>Taxa Voudpet (30%)</span>
                  <span>-{formatCurrency(txn.fee)}</span>
                </SplitRow>
              </SplitBreakdown>
            </TransactionCard>
          ))}
        </TransactionList>
      </HistorySection>
    </WalletWrapper>
  );
}
