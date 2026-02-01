import { useState } from 'react';
import { AlertCircle, Check, X } from 'lucide-react';
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
import styled from 'styled-components';

interface RegistrationStepProps {
  onClose: () => void;
  onComplete: () => void;
}

const VehicleSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.surface};
`;

const SectionLabel = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.md};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CheckboxRow = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm} 0;
`;

const Checkbox = styled.div<{ $checked: boolean }>`
  width: 22px;
  height: 22px;
  border-radius: 4px;
  border: 2px solid ${({ $checked, theme }) =>
    $checked ? theme.colors.primary : theme.colors.surface};
  background-color: ${({ $checked, theme }) =>
    $checked ? theme.colors.primary : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.2s;
`;

const CheckboxLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.md};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Select = styled.select`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.sizes.md};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ValidationMessage = styled.div<{ $valid: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  background-color: ${({ $valid }) => $valid ? '#F0FDF4' : '#FEF2F2'};
  color: ${({ $valid }) => $valid ? '#166534' : '#991B1B'};
`;

const MIN_VEHICLE_YEAR = 2012;

export function RegistrationStep({ onClose, onComplete }: RegistrationStepProps) {
  const { state } = useDriver();
  const { driver } = state;
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Vehicle form state
  const [vehicleYear, setVehicleYear] = useState(driver.vehicle.year);
  const [vehicleDoors, setVehicleDoors] = useState(4);
  const [hasAirConditioning, setHasAirConditioning] = useState(true);

  // Validation rules:
  // - Year >= 2012 OR has air conditioning
  // - AND must be 4 doors
  const isYearValid = vehicleYear >= MIN_VEHICLE_YEAR;
  const is4Doors = vehicleDoors === 4;
  const meetsYearOrAC = isYearValid || hasAirConditioning;
  const isVehicleValid = meetsYearOrAC && is4Doors;

  const getValidationMessage = (): string => {
    if (!is4Doors) {
      return 'O veículo deve ter 4 portas para transporte de pets.';
    }
    if (!meetsYearOrAC) {
      return `Veículos anteriores a ${MIN_VEHICLE_YEAR} precisam ter ar-condicionado.`;
    }
    if (isVehicleValid) {
      return 'Veículo aprovado para o Voudpet!';
    }
    return '';
  };

  const handleSubmit = () => {
    if (!isVehicleValid) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onComplete();
    }, 1500);
  };

  // Generate year options (2005 to current year)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from(
    { length: currentYear - 2004 },
    (_, i) => currentYear - i
  );

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

          {/* Vehicle Section with Validation */}
          <VehicleSection>
            <SectionLabel>🚗 Dados do Veículo</SectionLabel>

            <FormGroup>
              <Label>Modelo</Label>
              <ReadOnlyField>
                {driver.vehicle.model} - {driver.vehicle.color}
              </ReadOnlyField>
            </FormGroup>

            <FormGroup>
              <Label>Placa</Label>
              <ReadOnlyField>{driver.vehicle.plate}</ReadOnlyField>
            </FormGroup>

            <FormGroup>
              <Label>Ano do Veículo *</Label>
              <Select
                value={vehicleYear}
                onChange={(e) => setVehicleYear(Number(e.target.value))}
              >
                {yearOptions.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>Número de Portas *</Label>
              <Select
                value={vehicleDoors}
                onChange={(e) => setVehicleDoors(Number(e.target.value))}
              >
                <option value={2}>2 portas</option>
                <option value={4}>4 portas</option>
              </Select>
            </FormGroup>

            <CheckboxRow onClick={() => setHasAirConditioning(!hasAirConditioning)}>
              <Checkbox $checked={hasAirConditioning}>
                {hasAirConditioning && <Check size={14} />}
              </Checkbox>
              <CheckboxLabel>Possui ar-condicionado</CheckboxLabel>
            </CheckboxRow>

            {/* Validation Feedback */}
            <ValidationMessage $valid={isVehicleValid}>
              {isVehicleValid ? <Check size={18} /> : <AlertCircle size={18} />}
              {getValidationMessage()}
            </ValidationMessage>
          </VehicleSection>
        </ModalBody>

        <ModalFooter>
          <Button
            fullWidth
            onClick={handleSubmit}
            disabled={isSubmitting || !isVehicleValid}
          >
            {isSubmitting ? 'Salvando...' : 'Confirmar Dados'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
}
