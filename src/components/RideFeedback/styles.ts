import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

export const FeedbackWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg};
  animation: ${fadeIn} 0.3s ease-out;
`;

export const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #10B981, #059669);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
`;

export const FeedbackTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  text-align: center;
`;

export const FeedbackSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;

export const RatingSection = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const RatingLabel = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.md};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const StarsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const StarButton = styled.button<{ $isActive: boolean }>`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs};
  transition: transform ${({ theme }) => theme.transitions.fast};
  
  svg {
    color: ${({ $isActive }) => ($isActive ? '#FBBF24' : '#E5E7EB')};
    fill: ${({ $isActive }) => ($isActive ? '#FBBF24' : 'transparent')};
    transition: all ${({ theme }) => theme.transitions.fast};
  }
  
  &:hover {
    transform: scale(1.2);
    
    svg {
      color: #FBBF24;
    }
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

export const FeedbackInput = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.sizes.md};
  color: ${({ theme }) => theme.colors.text.primary};
  resize: none;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(234, 98, 11, 0.1);
  }
`;

export const TipSection = styled.div`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const TipLabel = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.md};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-align: center;
`;

export const TipOptions = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const TipButton = styled.button<{ $isSelected: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: 2px solid ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.primary : theme.colors.surface};
  background-color: ${({ $isSelected, theme }) =>
    $isSelected ? 'rgba(234, 98, 11, 0.1)' : theme.colors.background};
  color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.primary : theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ButtonsRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing.md};
`;
