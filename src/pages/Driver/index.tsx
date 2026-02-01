import { useState } from 'react';
import { AlertTriangle, Power, Star } from 'lucide-react';
import { DriverProvider, useDriver } from '../../context';
import { OnboardingTimeline, TrainingPlayer } from '../../components';
import {
  RegistrationStep,
  EmpathyTestStep,
  PaymentStep,
  KitInstallationStep,
} from '../../components/OnboardingSteps';
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

type View = 'dashboard' | 'training';
type StepModal = 'registration' | 'empathyTest' | 'payment' | 'kitInstallation' | null;

function DriverDashboardContent() {
  const { state, setOnline, completeStep, canGoOnline, isTrainingComplete } = useDriver();
  const { driver, driverStatus, isOnline } = state;

  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [activeStepModal, setActiveStepModal] = useState<StepModal>(null);

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

  // Training View
  if (currentView === 'training') {
    return (
      <TrainingPlayer
        onBack={() => setCurrentView('dashboard')}
        onComplete={handleTrainingComplete}
      />
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
            </>
          )}
        </DashboardContent>
      </DashboardWrapper>

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
