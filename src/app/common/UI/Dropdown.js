import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OutsideClickHandler from 'react-outside-click-handler';
import styled from '@emotion/styled';
import { TransitionGroup } from 'react-transition-group';
import transition from 'styled-transition-group';

const Wrapper = styled.div`
  position: relative;
`;

const Content = styled.div`
  display: block;
`;
const ContentAnimated = transition(Content).attrs({
  timeout: 200,
})`
  transform-origin: right bottom;

  &:enter {
    opacity: 0.01;
    transform: scale(.97);
  }

  &:enter-active {
    opacity: 1;
    transition: opacity 200ms ease-in, transform 200ms ease-in;
    transform: scale(1);
  }

  &:exit {
    opacity: 1;
    transform: scale(1);
  }
  
  &:exit-active {
    opacity: 0.01;
    transform: scale(.97);
    transition: opacity 150ms ease-in, transform 150ms ease-in;
  }
`;

const Dropdown = ({ children, isOpen, onClickOutside }) => {
  return (
    <OutsideClickHandler
      onOutsideClick={e => {
        console.log(e);
        onClickOutside();
      }}
      disabled={!isOpen}
      useCapture={true}
    >
      <Wrapper>
        <TransitionGroup timeout={200}>
          {isOpen && (
            <ContentAnimated timeout={200}>{children}</ContentAnimated>
          )}
        </TransitionGroup>
      </Wrapper>
    </OutsideClickHandler>
  );
};

Dropdown.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  onClickOutside: PropTypes.func,
};

export default Dropdown;
