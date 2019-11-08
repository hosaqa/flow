import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled/macro';
import { useTheme } from 'emotion-theming';
import { Transition } from 'react-transition-group';

const Content = styled.div`
  visibility: ${({ state }) =>
    state === 'entering' || state === 'entered' ? 'visible' : 'hidden'};
  opacity: ${({ state }) =>
    state === 'entering' || state === 'entered' ? 1 : 0};
  transform: ${({ state }) =>
    state === 'entering' || state === 'entered' ? 'scale(1)' : 'scale(0.95)'};
  transition: ${({ theme }) =>
    `visibility ${theme.transitions.short}ms ease-in, opacity ${theme.transitions.short}ms ease-in, transform ${theme.transitions.short}ms ease-in`};
  position: absolute;
  border-radius: ${({ theme }) => theme.borderRadius(2)}px;
  background-color: ${({ theme }) => theme.palette.background.secondary};
  box-shadow: ${({ theme }) => theme.shadows.primary};
`;

const Popup = ({ className, children, isOpen }) => {
  const theme = useTheme();

  return (
    <Transition in={isOpen} timeout={theme.transitions.short}>
      {state => (
        <Content className={className} state={state}>
          {children}
        </Content>
      )}
    </Transition>
  );
};

Popup.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  isOpen: PropTypes.bool,
};

export default Popup;
