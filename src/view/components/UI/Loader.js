import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';

const animation = (initialColor, endingColor) => {
  return keyframes`
  0% {
    background-color: ${initialColor};
    transform: scale(1);
  }

  50% {
    background-color: ${endingColor};
    transform: scale(1.1);
  }

  100% {
    background-color: ${initialColor};
    transform: scale(1);
  }
`;
};

const Wrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  pointer-events: none;
`;

const Circle = styled.span`
  display: block;
  height: ${({ theme, size }) => theme.spacing(size)}px;
  width: ${({ theme, size }) => theme.spacing(size)}px;
  margin: 0 ${({ theme, size }) => theme.spacing(size / 2)}px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.palette.primary.light};
  animation-name: ${({ theme }) =>
    animation(theme.palette.primary.light, theme.palette.primary.normal)};
  animation-duration: 1400ms;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-delay: ${({ animationDelay }) =>
    animationDelay ? `${animationDelay}ms` : '0s'};
  animation-fill-mode: both;
`;

const Loader = ({ className, size = 1 }) => (
  <Wrapper className={className}>
    <Circle size={size} />
    <Circle size={size} animationDelay={200} />
    <Circle size={size} animationDelay={400} />
  </Wrapper>
);

Loader.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
};

export default Loader;
