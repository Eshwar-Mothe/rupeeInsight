import React from 'react';
import styled from 'styled-components';

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background-color: transparent;
  z-index: 9999;
`;

const LoadingBar = styled.div`
  height: 100%;
  width: 100%;
  background-color: rgb(9, 81, 93);
  animation: loading 1s infinite linear;

  @keyframes loading {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;

const LoadingBorder = () => (
  <LoadingContainer>
    <LoadingBar />
  </LoadingContainer>
);

export default LoadingBorder;