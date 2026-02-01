import { useState } from 'react';
import { X } from 'lucide-react';
import { useDriver } from '../../context';
import { Button } from '../Button';
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  ReadOnlyField,
} from './styles';

interface RegistrationStepProps {
  onClose: () => void;
  onComplete: () => void;
}

export function RegistrationStep({ onClose, onComplete }: RegistrationStepProps) {
  const { state } = useDriver();
  const { driver } = state;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onComplete();
    }, 1500);
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Cadastro Inicial</ModalTitle>
          <CloseButton onClick={onClose}>
            <X size={24} />
          </CloseButton>
        </ModalHeader>

        <ModalBody>
          <p style={{ marginBottom: 16, color: '#71717A' }}>
            Confirme seus dados cadastrais para continuar:
          </p>

          <FormGroup>
            <Label>Nome Completo</Label>
            <ReadOnlyField>{driver.name}</ReadOnlyField>
          </FormGroup>

          <FormGroup>
            <Label>E-mail</Label>
            <ReadOnlyField>{driver.email}</ReadOnlyField>
          </FormGroup>

          <FormGroup>
            <Label>Telefone</Label>
            <ReadOnlyField>{driver.phone}</ReadOnlyField>
          </FormGroup>

          <FormGroup>
            <Label>CPF</Label>
            <ReadOnlyField>{driver.cpf}</ReadOnlyField>
          </FormGroup>

          <FormGroup>
            <Label>CNH</Label>
            <ReadOnlyField>{driver.cnh} (Categoria {driver.cnhCategory})</ReadOnlyField>
          </FormGroup>

          <FormGroup>
            <Label>Veículo</Label>
            <ReadOnlyField>
              {driver.vehicle.model} {driver.vehicle.year} - {driver.vehicle.color}
              <br />
              Placa: {driver.vehicle.plate}
            </ReadOnlyField>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button fullWidth onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : 'Confirmar Dados'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
}
