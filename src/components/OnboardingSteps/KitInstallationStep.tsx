import { useState } from 'react';
import { Camera, Check, X } from 'lucide-react';
import { Button } from '../Button';
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
  ModalFooter,
  UploadZone,
  UploadIcon,
  UploadText,
  UploadHint,
  PreviewImage,
  SuccessCheck,
  SuccessTitle,
  SuccessMessage,
  Spinner,
  LoadingText,
} from './styles';
import styled from 'styled-components';

interface KitInstallationStepProps {
  onClose: () => void;
  onComplete: () => void;
}

const ChecklistItem = styled.div<{ $checked: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} 0;
  color: ${({ $checked, theme }) =>
    $checked ? theme.colors.success : theme.colors.text.secondary};
`;

const Checkbox = styled.div<{ $checked: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 2px solid ${({ $checked, theme }) =>
    $checked ? theme.colors.success : theme.colors.surface};
  background-color: ${({ $checked, theme }) =>
    $checked ? theme.colors.success : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

type KitState = 'upload' | 'reviewing' | 'approved';

const KIT_ITEMS = [
  'Cinto de segurança pet instalado',
  'Caixa de transporte disponível',
  'Tapete higiênico no veículo',
  'Saquinhos para resíduos',
];

// Mock kit photo
const MOCK_KIT_PHOTO = 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=300&fit=crop';

export function KitInstallationStep({ onClose, onComplete }: KitInstallationStepProps) {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(KIT_ITEMS.map(() => false));
  const [hasPhoto, setHasPhoto] = useState(false);
  const [kitState, setKitState] = useState<KitState>('upload');

  const allItemsChecked = checkedItems.every(Boolean);

  const toggleItem = (index: number) => {
    setCheckedItems((prev) => {
      const newChecked = [...prev];
      newChecked[index] = !newChecked[index];
      return newChecked;
    });
  };

  const handleUpload = () => {
    // Simulate photo upload
    setHasPhoto(true);
  };

  const handleSubmit = () => {
    setKitState('reviewing');
    // Simulate review process
    setTimeout(() => {
      setKitState('approved');
    }, 2000);
  };

  if (kitState === 'reviewing') {
    return (
      <ModalOverlay>
        <ModalContent>
          <ModalBody style={{ paddingTop: 48, paddingBottom: 48 }}>
            <Spinner />
            <LoadingText>Analisando foto do kit...</LoadingText>
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    );
  }

  if (kitState === 'approved') {
    return (
      <ModalOverlay>
        <ModalContent>
          <ModalBody style={{ paddingTop: 32, paddingBottom: 32 }}>
            <SuccessCheck>
              <Check size={40} />
            </SuccessCheck>
            <SuccessTitle>Kit Aprovado!</SuccessTitle>
            <SuccessMessage>
              Seu kit de segurança foi verificado e aprovado. Você está quase lá!
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
          <ModalTitle>Kit de Segurança</ModalTitle>
          <CloseButton onClick={onClose}>
            <X size={24} />
          </CloseButton>
        </ModalHeader>

        <ModalBody>
          <p style={{ fontSize: 14, marginBottom: 16, color: '#71717A' }}>
            Confirme que você possui todos os itens do kit:
          </p>

          {KIT_ITEMS.map((item, index) => (
            <ChecklistItem
              key={index}
              $checked={checkedItems[index]}
              onClick={() => toggleItem(index)}
              style={{ cursor: 'pointer' }}
            >
              <Checkbox $checked={checkedItems[index]}>
                {checkedItems[index] && <Check size={12} />}
              </Checkbox>
              {item}
            </ChecklistItem>
          ))}

          <div style={{ marginTop: 24 }}>
            <p style={{ fontSize: 14, marginBottom: 12, color: '#71717A' }}>
              Envie uma foto do kit instalado no seu veículo:
            </p>

            {hasPhoto ? (
              <PreviewImage src={MOCK_KIT_PHOTO} alt="Kit instalado" />
            ) : (
              <UploadZone $hasFile={false} onClick={handleUpload}>
                <UploadIcon>
                  <Camera size={28} />
                </UploadIcon>
                <UploadText>Clique para enviar foto</UploadText>
                <UploadHint>JPG ou PNG, máximo 5MB</UploadHint>
              </UploadZone>
            )}
          </div>
        </ModalBody>

        <ModalFooter>
          <Button
            fullWidth
            onClick={handleSubmit}
            disabled={!allItemsChecked || !hasPhoto}
          >
            Enviar para Aprovação
          </Button>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
}
