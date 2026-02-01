import styled from 'styled-components';

export const SheetWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.xxl} ${({ theme }) => theme.borderRadius.xxl} 0 0;
  box-shadow: ${({ theme }) => theme.shadows.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  padding-bottom: calc(env(safe-area-inset-bottom, 0px) + ${({ theme }) => theme.spacing.xl});
  z-index: 50;
`;

export const SheetHandle = styled.div`
  width: 36px;
  height: 4px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  margin: 0 auto ${({ theme }) => theme.spacing.lg};
`;

export const SheetTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const Divider = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  
  &::before {
    content: '';
    position: absolute;
    left: 26px;
    top: -12px;
    height: calc(100% + 24px);
    width: 2px;
    background: ${({ theme }) => `linear-gradient(
      to bottom,
      ${theme.colors.primary},
      ${theme.colors.secondary}
    )`};
    z-index: 1;
  }
`;
