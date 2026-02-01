import { Check, Circle, CreditCard, FileCheck, GraduationCap, Play, UserCheck, Wrench } from 'lucide-react';
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
  onStepAction?: (step: string) => void;
}

interface StepConfig {
  id: number;
  key: 'registration' | 'empathyTest' | 'payment' | 'kitInstallation' | 'training';
  title: string;
  description: string;
  icon: typeof Check;
  actionLabel: string;
}

const STEPS: StepConfig[] = [
  {
    id: 1,
    key: 'registration',
    title: 'Cadastro Inicial',
    description: 'Preencha seus dados pessoais e do veículo.',
    icon: UserCheck,
    actionLabel: 'Completar Cadastro',
  },
  {
    id: 2,
    key: 'empathyTest',
    title: 'Teste de Empatia',
    description: 'Avaliação de perfil para trabalhar com animais.',
    icon: FileCheck,
    actionLabel: 'Iniciar Teste',
  },
  {
    id: 3,
    key: 'payment',
    title: 'Taxa de Adesão',
    description: `Pagamento de ${formatCurrency(300)} via Mercado Pago.`,
    icon: CreditCard,
    actionLabel: 'Pagar Agora',
  },
  {
    id: 4,
    key: 'kitInstallation',
    title: 'Instalação do Kit de Segurança',
    description: 'Cinto pet, caixa de transporte e tapete higiênico.',
    icon: Wrench,
    actionLabel: 'Enviar Foto do Kit',
  },
  {
    id: 5,
    key: 'training',
    title: 'Capacitação & Treinamento',
    description: 'Complete as aulas obrigatórias para começar.',
    icon: GraduationCap,
    actionLabel: 'Iniciar Aulas',
  },
];

export function OnboardingTimeline({ onStartTraining, onStepAction }: OnboardingTimelineProps) {
  const { state, trainingProgress } = useDriver();
  const { onboarding } = state;

  const getStepStatus = (step: StepConfig) => {
    const stepData = onboarding.steps[step.key];
    if (!stepData) return 'pending';

    if (stepData.status === 'completed' || stepData.status === 'approved') {
      return 'completed';
    }
    if (stepData.status === 'in_progress' || onboarding.currentStep === step.id) {
      return 'active';
    }
    return 'pending';
  };

  const handleStepAction = (step: StepConfig) => {
    if (step.key === 'training') {
      onStartTraining();
    } else if (onStepAction) {
      onStepAction(step.key);
    }
  };

  const getStatusBadge = (step: StepConfig) => {
    const status = getStepStatus(step);
    const stepData = onboarding.steps[step.key];

    if (status === 'completed') {
      if (step.key === 'empathyTest' && 'score' in stepData && stepData.score) {
        return <TimelineStatus $variant="success">✓ Aprovado ({stepData.score} pts)</TimelineStatus>;
      }
      if (step.key === 'payment') {
        return <TimelineStatus $variant="success">✓ Pago</TimelineStatus>;
      }
      if (step.key === 'kitInstallation') {
        return <TimelineStatus $variant="success">✓ Aprovado</TimelineStatus>;
      }
      return <TimelineStatus $variant="success">✓ Concluído</TimelineStatus>;
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
                </>
              )}

              {/* Action button for active step */}
              {isActive && !isCompleted && (
                <ActionButton onClick={() => handleStepAction(step)}>
                  <Play size={16} />
                  {step.key === 'training' && onboarding.steps.training.completedModules > 0
                    ? 'Continuar Aulas'
                    : step.actionLabel}
                </ActionButton>
              )}
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </TimelineWrapper>
  );
}
