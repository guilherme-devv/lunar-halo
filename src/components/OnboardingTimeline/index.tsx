import { Check, Circle, CreditCard, FileCheck, GraduationCap, Play, UserCheck } from 'lucide-react';
import { useDriver } from '../../context';
import { formatCurrency } from '../../services/pricing.mock';
import {
  TimelineWrapper,
  TimelineItem,
  TimelineIcon,
  TimelineContent,
  TimelineTitle,
  TimelineDescription,
  TimelineStatus,
  ActionButton,
  ProgressBar,
  ProgressFill,
  ProgressText,
} from './styles';

export interface OnboardingTimelineProps {
  onStartTraining: () => void;
}

interface StepConfig {
  id: number;
  key: string;
  title: string;
  description: string;
  icon: typeof Check;
}

const STEPS: StepConfig[] = [
  {
    id: 1,
    key: 'registration',
    title: 'Cadastro Inicial',
    description: 'Seus dados pessoais e do veículo foram registrados.',
    icon: UserCheck,
  },
  {
    id: 2,
    key: 'empathyTest',
    title: 'Teste de Empatia',
    description: 'Avaliação de perfil para trabalhar com animais.',
    icon: FileCheck,
  },
  {
    id: 3,
    key: 'payment',
    title: 'Taxa de Adesão',
    description: `Pagamento de ${formatCurrency(300)} via Mercado Pago.`,
    icon: CreditCard,
  },
  {
    id: 4,
    key: 'kitInstallation',
    title: 'Instalação do Kit de Segurança',
    description: 'Cinto pet, caixa de transporte e tapete higiênico.',
    icon: Check,
  },
  {
    id: 5,
    key: 'training',
    title: 'Capacitação & Treinamento',
    description: 'Complete as aulas obrigatórias para começar.',
    icon: GraduationCap,
  },
];

export function OnboardingTimeline({ onStartTraining }: OnboardingTimelineProps) {
  const { state, trainingProgress } = useDriver();
  const { onboarding } = state;

  const getStepStatus = (step: StepConfig) => {
    const stepData = onboarding.steps[step.key as keyof typeof onboarding.steps];
    if (!stepData) return 'pending';

    if (stepData.status === 'completed' || stepData.status === 'approved') {
      return 'completed';
    }
    if (stepData.status === 'in_progress' || onboarding.currentStep === step.id) {
      return 'active';
    }
    return 'pending';
  };

  const getStatusBadge = (step: StepConfig) => {
    const status = getStepStatus(step);

    if (status === 'completed') {
      return <TimelineStatus $variant="success">✓ Concluído</TimelineStatus>;
    }

    if (step.key === 'payment') {
      const payment = onboarding.steps.payment;
      if (payment.status === 'approved') {
        return <TimelineStatus $variant="success">✓ Pago</TimelineStatus>;
      }
    }

    if (step.key === 'kitInstallation') {
      const kit = onboarding.steps.kitInstallation;
      if (kit.status === 'approved') {
        return <TimelineStatus $variant="success">✓ Aprovado</TimelineStatus>;
      }
    }

    if (status === 'active') {
      return <TimelineStatus $variant="warning">Em andamento</TimelineStatus>;
    }

    return <TimelineStatus $variant="pending">Pendente</TimelineStatus>;
  };

  return (
    <TimelineWrapper>
      {STEPS.map((step) => {
        const status = getStepStatus(step);
        const isCompleted = status === 'completed';
        const isActive = status === 'active';
        const Icon = step.icon;

        return (
          <TimelineItem key={step.id} $isActive={isActive} $isCompleted={isCompleted}>
            <TimelineIcon $isActive={isActive} $isCompleted={isCompleted}>
              {isCompleted ? <Check size={16} /> : isActive ? <Circle size={16} /> : <Icon size={16} />}
            </TimelineIcon>

            <TimelineContent>
              <TimelineTitle $isActive={isActive} $isCompleted={isCompleted}>
                {step.title}
              </TimelineTitle>
              <TimelineDescription>{step.description}</TimelineDescription>

              {getStatusBadge(step)}

              {/* Training specific content */}
              {step.key === 'training' && isActive && (
                <>
                  <ProgressBar>
                    <ProgressFill $progress={trainingProgress} />
                  </ProgressBar>
                  <ProgressText>
                    {onboarding.steps.training.completedModules} de{' '}
                    {onboarding.steps.training.totalModules} aulas concluídas
                  </ProgressText>
                  <ActionButton onClick={onStartTraining}>
                    <Play size={16} />
                    Continuar Aulas
                  </ActionButton>
                </>
              )}
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </TimelineWrapper>
  );
}
