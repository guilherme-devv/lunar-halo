import { useState } from 'react';
import { ArrowLeft, Check, Play, Trophy } from 'lucide-react';
import { useDriver, type TrainingModule } from '../../context';
import { Button } from '../Button';
import {
  PlayerWrapper,
  PlayerHeader,
  BackButton,
  HeaderTitle,
  ProgressBadge,
  VideoContainer,
  PlayButton,
  VideoTitle,
  VideoTitleText,
  VideoDuration,
  PlaylistContainer,
  PlaylistTitle,
  ModuleItem,
  ModuleNumber,
  ModuleContent,
  ModuleName,
  ModuleDuration,
  CompleteSection,
  CompleteButton,
  ModalOverlay,
  ModalCard,
  SuccessIcon,
  ModalTitle,
  ModalMessage,
} from './styles';

export interface TrainingPlayerProps {
  onBack: () => void;
  onComplete: () => void;
}

export function TrainingPlayer({ onBack, onComplete }: TrainingPlayerProps) {
  const { state, completeModule } = useDriver();
  const { modules, completedModules, totalModules } = state.onboarding.steps.training;

  const [activeModuleId, setActiveModuleId] = useState<string>(() => {
    // Start with first incomplete module
    const firstIncomplete = modules.find((m) => !m.completed);
    return firstIncomplete?.id || modules[0]?.id || '';
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const activeModule = modules.find((m) => m.id === activeModuleId);

  const handlePlay = () => {
    setIsPlaying(true);
    // Simulate video playing (in a real app, this would control a video player)
  };

  const handleSelectModule = (module: TrainingModule) => {
    setActiveModuleId(module.id);
    setIsPlaying(false);
  };

  const handleCompleteModule = () => {
    if (!activeModule || activeModule.completed) return;

    completeModule(activeModuleId);

    // Check if this was the last module
    const remainingModules = modules.filter((m) => !m.completed && m.id !== activeModuleId);

    if (remainingModules.length === 0) {
      // All modules complete!
      setShowSuccessModal(true);
    } else {
      // Move to next incomplete module
      const nextModule = remainingModules[0];
      setActiveModuleId(nextModule.id);
      setIsPlaying(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    onComplete();
  };

  const canCompleteCurrentModule = isPlaying && activeModule && !activeModule.completed;

  return (
    <PlayerWrapper>
      <PlayerHeader>
        <BackButton onClick={onBack} aria-label="Voltar">
          <ArrowLeft size={20} />
        </BackButton>
        <HeaderTitle>Capacitação</HeaderTitle>
        <ProgressBadge>
          {completedModules}/{totalModules}
        </ProgressBadge>
      </PlayerHeader>

      {/* Video Player Mock */}
      <VideoContainer>
        {!isPlaying ? (
          <PlayButton onClick={handlePlay} aria-label="Play">
            <Play size={32} fill="white" />
          </PlayButton>
        ) : (
          <div style={{ color: 'white', fontSize: 14 }}>
            🎬 Reproduzindo vídeo...
          </div>
        )}

        {activeModule && (
          <VideoTitle>
            <VideoTitleText>{activeModule.title}</VideoTitleText>
            <VideoDuration>Duração: {activeModule.duration}</VideoDuration>
          </VideoTitle>
        )}
      </VideoContainer>

      {/* Playlist */}
      <PlaylistContainer>
        <PlaylistTitle>Módulos do Curso</PlaylistTitle>
        {modules.map((module, index) => (
          <ModuleItem
            key={module.id}
            $isActive={module.id === activeModuleId}
            $isCompleted={module.completed}
            onClick={() => handleSelectModule(module)}
          >
            <ModuleNumber $isCompleted={module.completed}>
              {module.completed ? <Check size={14} /> : index + 1}
            </ModuleNumber>
            <ModuleContent>
              <ModuleName>{module.title}</ModuleName>
              <ModuleDuration>{module.duration}</ModuleDuration>
            </ModuleContent>
          </ModuleItem>
        ))}
      </PlaylistContainer>

      {/* Complete Button */}
      <CompleteSection>
        <CompleteButton
          $isEnabled={!!canCompleteCurrentModule}
          onClick={handleCompleteModule}
          disabled={!canCompleteCurrentModule}
        >
          {activeModule?.completed ? '✓ Aula Concluída' : 'Concluir Aula'}
        </CompleteButton>
      </CompleteSection>

      {/* Success Modal */}
      {showSuccessModal && (
        <ModalOverlay>
          <ModalCard>
            <SuccessIcon>
              <Trophy size={40} />
            </SuccessIcon>
            <ModalTitle>Parabéns! 🎉</ModalTitle>
            <ModalMessage>
              Você agora é um motorista Voudpet! Complete seu perfil e comece a aceitar corridas.
            </ModalMessage>
            <Button fullWidth size="lg" onClick={handleSuccessClose}>
              Começar a Dirigir
            </Button>
          </ModalCard>
        </ModalOverlay>
      )}
    </PlayerWrapper>
  );
}
