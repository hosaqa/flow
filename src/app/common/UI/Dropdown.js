import React from 'react';
import PropTypes from 'prop-types';
import ScrollArea from 'react-scrollbar';
import styled from '@emotion/styled';
import { useTheme } from 'emotion-theming';
import { Transition } from 'react-transition-group';
//import {} from '../../common/theme';

const Wrapper = styled.div`
  position: relative;
`;

const Content = styled.div`
  transform-origin: right bottom;
  opacity: ${({ state }) =>
    state === 'entering' || state === 'entered' ? 1 : 0};
  transform: ${({ state }) =>
    state === 'entering' || state === 'entered' ? 'scale(1)' : 'scale(0.95)'};
  transition: ${({ theme }) =>
    `opacity ${theme.transitions.short}ms ease-in, transform ${theme.transitions.short}ms ease-in`};
`;

const Dropdown = ({ children, isOpen }) => {
  const theme = useTheme();

  return (
    <Wrapper>
      <Transition in={isOpen} timeout={theme.transitions.short}>
        {state => (
          <Content state={state}>
            <ScrollArea
              speed={0.8}
              smoothScrolling
              className="area"
              contentClassName="content"
              horizontal={false}
              style={{
                padding: '0 10px 0 0',
                height: '190px',
              }}
              verticalContainerStyle={{
                opacity: '1',
                backgroundColor: '#ededed',
                width: '8px',
                borderRadius: '0 3px 3px 0',
              }}
              verticalScrollbarStyle={{
                borderRadius: '4px',
                backgroundColor: '#ff6b6b',
                marginLeft: '0',
              }}
            >
              {children}
            </ScrollArea>
          </Content>
        )}
      </Transition>
    </Wrapper>
  );
};

Dropdown.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool,
};

export default Dropdown;
