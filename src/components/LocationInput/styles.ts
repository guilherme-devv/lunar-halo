import styled from 'styled-components';

export const LocationInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const InputField = styled.input`
  width: 100%;
  height: 52px;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  padding-left: 48px;
  font-size: ${({ theme }) => theme.typography.sizes.md};
  font-family: inherit;
  color: ${({ theme }) => theme.colors.text.primary};
  background-color: ${({ theme }) => theme.colors.surface};
  border: 2px solid transparent;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  outline: none;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
  
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

export const InputIconWrapper = styled.div<{ $color?: string }>`
  position: absolute;
  left: ${({ theme }) => theme.spacing.lg};
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $color, theme }) => $color || theme.colors.primary};
  pointer-events: none;
`;

export const ClearButton = styled.button`
  position: absolute;
  right: ${({ theme }) => theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  color: ${({ theme }) => theme.colors.text.secondary};
  background: none;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
    background-color: ${({ theme }) => theme.colors.surface};
  }
`;

export const SuggestionsList = styled.ul`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  max-height: 200px;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  z-index: 100;
  list-style: none;
`;

export const SuggestionItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  min-height: 48px;
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.surface};
  }
  
  &:first-child {
    border-radius: ${({ theme }) => theme.borderRadius.lg} ${({ theme }) => theme.borderRadius.lg} 0 0;
  }
  
  &:last-child {
    border-radius: 0 0 ${({ theme }) => theme.borderRadius.lg} ${({ theme }) => theme.borderRadius.lg};
  }
`;

export const SuggestionIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const SuggestionText = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ConnectionLine = styled.div`
  position: absolute;
  left: 33px;
  top: 52px;
  height: calc(100% - 104px);
  width: 2px;
  background: ${({ theme }) => `linear-gradient(
    to bottom,
    ${theme.colors.primary},
    ${theme.colors.secondary}
  )`};
  z-index: 1;
`;
