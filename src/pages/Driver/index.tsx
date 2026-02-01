import { useState } from 'react';
import { AlertTriangle, Power, Star, Wallet } from 'lucide-react';
import { DriverProvider, useDriver } from '../../context';
import {
  OnboardingTimeline,
  TrainingPlayer,
  IncomingRequest,
  ActiveRideManager,
  DriverWallet,
  type IncomingRide,
} from '../../components';
import {
  RegistrationStep,
  EmpathyTestStep,
  PaymentStep,
  KitInstallationStep,
} from '../../components/OnboardingSteps';
import rideOperationData from '../../services/ride-operation.mock.json';
import {
  DashboardWrapper,
  DashboardHeader,
  DriverAvatar,
  DriverInfo,
  DriverName,
  DriverStatus,
  DashboardContent,
  SectionTitle,
  OnlineToggleWrapper,
  OnlineToggleRow,
  OnlineToggleLabel,
  OnlineIcon,
  OnlineText,
  OnlineTitle,
  OnlineSubtext,
  ToggleSwitch,
  BlockedMessage,
  StatsGrid,
  StatCard,
  StatValue,
  StatLabel,
} from './styles';
import styled from 'styled-components';

type View = 'dashboard' | 'training' | 'wallet' | 'active_ride';
type StepModal = 'registration' | 'empathyTest' | 'payment' | 'kitInstallation' | null;

const WalletButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: linear-gradient(135deg, #1E3A8A, #3B82F6);
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  cursor: pointer;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const SimulateButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text.secondary};
  border: 2px dashed ${({ theme }) => theme.colors.text.tertiary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

function DriverDashboardContent() {
  const { state, setOnline, completeStep, canGoOnline, isTrainingComplete } = useDriver();
  const { driver, driverStatus, isOnline } = state;

  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [activeStepModal, setActiveStepModal] = useState<StepModal>(null);
  const [showIncomingRequest, setShowIncomingRequest] = useState(false);
  const [activeRide, setActiveRide] = useState<IncomingRide | null>(null);

  const handleToggleOnline = () => {
    if (!canGoOnline) return;
    setOnline(!isOnline);
  };

  const handleStartTraining = () => {
    setCurrentView('training');
  };

  const handleTrainingComplete = () => {
    setCurrentView('dashboard');
  };

  const handleStepAction = (step: string) => {
    if (step === 'training') {
      setCurrentView('training');
    } else {
      setActiveStepModal(step as StepModal);
    }
  };

  const handleStepComplete = (step: StepModal) => {
    if (step) {
      completeStep(step);
    }
    setActiveStepModal(null);
  };

  const getStatusVariant = (): 'onboarding' | 'active' | 'online' => {
    if (isOnline) return 'online';
    if (driverStatus === 'active' || driverStatus === 'offline') return 'active';
    return 'onboarding';
  };

  const getStatusText = (): string => {
    if (isOnline) return 'Online';
    if (driverStatus === 'active' || driverStatus === 'offline') return 'Disponível';
    return 'Em aprovação';
  };

  // Simulate incoming ride
  const handleSimulateRide = () => {
    setShowIncomingRequest(true);
  };

  const handleAcceptRide = (rideId: string) => {
    console.log('Ride accepted:', rideId);
    setShowIncomingRequest(false);
    setActiveRide(rideOperationData.incomingRide as IncomingRide);
    setCurrentView('active_ride');
  };

  const handleDeclineRide = (rideId: string) => {
    console.log('Ride declined:', rideId);
    setShowIncomingRequest(false);
  };

  const handleRideComplete = () => {
    setActiveRide(null);
    setCurrentView('dashboard');
  };

  // Training View
  if (currentView === 'training') {
    return (
      <TrainingPlayer
        onBack={() => setCurrentView('dashboard')}
        onComplete={handleTrainingComplete}
      />
    );
  }

  // Wallet View
  if (currentView === 'wallet') {
    return <DriverWallet onBack={() => setCurrentView('dashboard')} />;
  }

  // Active Ride View
  if (currentView === 'active_ride' && activeRide) {
    return (
      <DashboardWrapper>
        <DashboardHeader>
          <DriverAvatar src={driver.photo} alt={driver.name} />
          <DriverInfo>
            <DriverName>Em corrida</DriverName>
            <DriverStatus $variant="online">Ocupado</DriverStatus>
          </DriverInfo>
        </DashboardHeader>

        <ActiveRideManager
          ride={activeRide}
          onComplete={handleRideComplete}
        />
      </DashboardWrapper>
    );
  }

  // Dashboard View
  return (
    <>
      <DashboardWrapper>
        {/* Header */}
        <DashboardHeader>
          <DriverAvatar src={driver.photo} alt={driver.name} />
          <DriverInfo>
            <DriverName>Olá, {driver.name.split(' ')[0]}!</DriverName>
            <DriverStatus $variant={getStatusVariant()}>
              {getStatusText()}
            </DriverStatus>
          </DriverInfo>

          {isTrainingComplete && (
            <WalletButton onClick={() => setCurrentView('wallet')}>
              <Wallet size={16} />
              Carteira
            </WalletButton>
          )}
        </DashboardHeader>

        <DashboardContent>
          {/* Online Toggle */}
          <OnlineToggleWrapper>
            <OnlineToggleRow>
              <OnlineToggleLabel>
                <OnlineIcon $isOnline={isOnline}>
                  <Power size={24} />
                </OnlineIcon>
                <OnlineText>
                  <OnlineTitle>{isOnline ? 'Você está online' : 'Ficar Online'}</OnlineTitle>
                  <OnlineSubtext>
                    {isOnline ? 'Recebendo corridas' : 'Comece a receber corridas'}
                  </OnlineSubtext>
                </OnlineText>
              </OnlineToggleLabel>

              <ToggleSwitch
                $isOn={isOnline}
                $disabled={!canGoOnline}
                onClick={handleToggleOnline}
                aria-label={isOnline ? 'Ficar offline' : 'Ficar online'}
              />
            </OnlineToggleRow>

            {!canGoOnline && (
              <BlockedMessage>
                <AlertTriangle size={20} />
                <p>Complete todas as etapas para ficar online.</p>
              </BlockedMessage>
            )}
          </OnlineToggleWrapper>

          {/* Show onboarding timeline if not complete */}
          {!isTrainingComplete && (
            <>
              <SectionTitle>Etapas de Aprovação</SectionTitle>
              <OnboardingTimeline
                onStartTraining={handleStartTraining}
                onStepAction={handleStepAction}
              />
            </>
          )}

          {/* Show stats if active */}
          {isTrainingComplete && (
            <>
              <SectionTitle>Suas Estatísticas</SectionTitle>
              <StatsGrid>
                <StatCard>
                  <StatValue>0</StatValue>
                  <StatLabel>Corridas Hoje</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue>R$ 0</StatValue>
                  <StatLabel>Ganhos Hoje</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue>
                    <Star size={20} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                    5.0
                  </StatValue>
                  <StatLabel>Avaliação</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue>0</StatValue>
                  <StatLabel>Pets Transportados</StatLabel>
                </StatCard>
              </StatsGrid>

              {isOnline && (
                <SimulateButton onClick={handleSimulateRide}>
                  🔔 Simular Nova Corrida (Demo)
                </SimulateButton>
              )}
            </>
          )}
        </DashboardContent>
      </DashboardWrapper>

      {/* Incoming Request Overlay */}
      {showIncomingRequest && (
        <IncomingRequest
          ride={rideOperationData.incomingRide as IncomingRide}
          onAccept={handleAcceptRide}
          onDecline={handleDeclineRide}
        />
      )}

      {/* Step Modals */}
      {activeStepModal === 'registration' && (
        <RegistrationStep
          onClose={() => setActiveStepModal(null)}
          onComplete={() => handleStepComplete('registration')}
        />
      )}

      {activeStepModal === 'empathyTest' && (
        <EmpathyTestStep
          onClose={() => setActiveStepModal(null)}
          onComplete={() => handleStepComplete('empathyTest')}
        />
      )}

      {activeStepModal === 'payment' && (
        <PaymentStep
          onClose={() => setActiveStepModal(null)}
          onComplete={() => handleStepComplete('payment')}
        />
      )}

      {activeStepModal === 'kitInstallation' && (
        <KitInstallationStep
          onClose={() => setActiveStepModal(null)}
          onComplete={() => handleStepComplete('kitInstallation')}
        />
      )}
    </>
  );
}

// Export with Provider
export function Driver() {
  return (
    <DriverProvider>
      <DriverDashboardContent />
    </DriverProvider>
  );
}
