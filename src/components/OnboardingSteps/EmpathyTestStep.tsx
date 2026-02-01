import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '../Button';
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
  ModalFooter,
  QuestionCard,
  QuestionNumber,
  QuestionText,
  OptionButton,
  ProgressIndicator,
  ProgressDot,
  SuccessCheck,
  SuccessTitle,
  SuccessMessage,
} from './styles';

interface EmpathyTestStepProps {
  onClose: () => void;
  onComplete: () => void;
}

interface Question {
  id: string;
  text: string;
  options: { id: string; text: string; points: number }[];
}

const QUESTIONS: Question[] = [
  {
    id: 'q1',
    text: 'Um cachorro começa a chorar durante a viagem. O que você faz?',
    options: [
      { id: 'a', text: 'Paro o carro imediatamente', points: 2 },
      { id: 'b', text: 'Falo com voz calma e procuro um local seguro', points: 5 },
      { id: 'c', text: 'Ignoro e continuo dirigindo', points: 0 },
    ],
  },
  {
    id: 'q2',
    text: 'O tutor esquece a guia do pet. O que você faz?',
    options: [
      { id: 'a', text: 'Recuso a viagem', points: 1 },
      { id: 'b', text: 'Ofereço uma guia reserva do kit', points: 5 },
      { id: 'c', text: 'Faço a viagem assim mesmo', points: 0 },
    ],
  },
  {
    id: 'q3',
    text: 'Um gato parece estressado na caixa de transporte. O que você faz?',
    options: [
      { id: 'a', text: 'Cubro parcialmente a caixa com um pano', points: 5 },
      { id: 'b', text: 'Abro a caixa para ele respirar', points: 0 },
      { id: 'c', text: 'Ligo o ar-condicionado no máximo', points: 2 },
    ],
  },
  {
    id: 'q4',
    text: 'O pet fez xixi no banco. Como você reage?',
    options: [
      { id: 'a', text: 'Fico irritado com o tutor', points: 0 },
      { id: 'b', text: 'Uso o tapete higiênico e limpo com calma', points: 5 },
      { id: 'c', text: 'Peço para o tutor limpar', points: 1 },
    ],
  },
];

export function EmpathyTestStep({ onClose, onComplete }: EmpathyTestStepProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [score, setScore] = useState(0);

  const question = QUESTIONS[currentQuestion];
  const selectedOption = answers[question?.id];

  const handleSelect = (optionId: string) => {
    setAnswers((prev) => ({ ...prev, [question.id]: optionId }));
  };

  const handleNext = () => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      // Calculate score
      let totalScore = 0;
      QUESTIONS.forEach((q) => {
        const selectedOpt = q.options.find((o) => o.id === answers[q.id]);
        if (selectedOpt) {
          totalScore += selectedOpt.points;
        }
      });
      setScore(totalScore);
      setIsComplete(true);
    }
  };

  const handleFinish = () => {
    onComplete();
  };

  if (isComplete) {
    const passed = score >= 15;

    return (
      <ModalOverlay onClick={onClose}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalBody style={{ paddingTop: 32, paddingBottom: 32 }}>
            <SuccessCheck>
              <Check size={40} />
            </SuccessCheck>
            <SuccessTitle>
              {passed ? 'Parabéns!' : 'Continue Estudando'}
            </SuccessTitle>
            <SuccessMessage>
              Você obteve <strong>{score} pontos</strong> de 20.
              {passed
                ? ' Você demonstrou ótima empatia com os pets!'
                : ' Revise as boas práticas no treinamento.'}
            </SuccessMessage>
            <Button fullWidth onClick={handleFinish}>
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
          <ModalTitle>Teste de Empatia</ModalTitle>
          <CloseButton onClick={onClose}>
            <X size={24} />
          </CloseButton>
        </ModalHeader>

        <ModalBody>
          <ProgressIndicator>
            {QUESTIONS.map((q, i) => (
              <ProgressDot
                key={q.id}
                $active={i === currentQuestion}
                $completed={i < currentQuestion}
              />
            ))}
          </ProgressIndicator>

          <QuestionCard>
            <QuestionNumber>Pergunta {currentQuestion + 1} de {QUESTIONS.length}</QuestionNumber>
            <QuestionText>{question.text}</QuestionText>

            {question.options.map((option) => (
              <OptionButton
                key={option.id}
                $selected={selectedOption === option.id}
                onClick={() => handleSelect(option.id)}
              >
                {option.text}
              </OptionButton>
            ))}
          </QuestionCard>
        </ModalBody>

        <ModalFooter>
          <Button fullWidth onClick={handleNext} disabled={!selectedOption}>
            {currentQuestion < QUESTIONS.length - 1 ? 'Próxima' : 'Finalizar'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
}
