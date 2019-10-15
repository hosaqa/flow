import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';

const animation = (initialColor, endingColor) => {
  return keyframes`
  0% {
    background-color: ${initialColor};
  }

  50% {
    background-color: ${endingColor};
  }

  100% {
    background-color: ${initialColor};
  }
`;
};

const Wrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
`;

const Circle = styled.span`
  display: block;
  height: ${({ theme, size }) => theme.spacing(size)};
  width: ${({ theme, size }) => theme.spacing(size)};
  margin: 0 ${({ theme, size }) => theme.spacing(size / 2)};
  border-radius: 50%;
  background-color: ${({ theme }) => theme.palette.primary.translucent};
  animation-name: ${({ theme }) =>
    animation(theme.palette.primary.translucent, theme.palette.primary.normal)};
  animation-duration: 1400ms;

  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-delay: ${({ animationDelay }) =>
    animationDelay ? `${animationDelay}ms` : '0s'};
  animation-fill-mode: both;
`;

const Loader = ({ size = 1 }) => {
  return (
    <Wrapper>
      <Circle size={size} />
      <Circle size={size} animationDelay={200} />
      <Circle size={size} animationDelay={400} />
    </Wrapper>
  );
};

Loader.propTypes = {
  size: PropTypes.number,
};

export default Loader;
