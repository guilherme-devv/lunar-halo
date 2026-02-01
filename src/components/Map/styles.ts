import styled from 'styled-components';

export const MapWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 65vh;
  min-height: 350px;
  z-index: 1;
  
  .maplibregl-map {
    font-family: inherit;
  }
  
  .maplibregl-ctrl-group {
    background: ${({ theme }) => theme.colors.background};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    box-shadow: ${({ theme }) => theme.shadows.lg};
    border: none;
    overflow: hidden;
  }
  
  .maplibregl-ctrl-group button {
    width: 36px;
    height: 36px;
    border: none;
    
    &:hover {
      background-color: ${({ theme }) => theme.colors.surface};
    }
  }
  
  .maplibregl-ctrl-attrib {
    font-size: 10px;
    background: transparent;
  }
  
  .maplibregl-marker {
    cursor: pointer;
  }
`;

export const MapOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: linear-gradient(
    to top,
    ${({ theme }) => theme.colors.background} 0%,
    ${({ theme }) => theme.colors.background}00 100%
  );
  pointer-events: none;
  z-index: 2;
`;
