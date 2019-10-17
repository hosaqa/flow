import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import styled from '@emotion/styled';
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
  padding: 0;
  border-radius: ${({ theme }) => theme.borderRadius(2)};
  background-color: ${({ theme }) => theme.palette.background.secondary};
  box-shadow: ${({ theme }) => theme.shadows.primary};
`;

const ScrollTrack = styled.div`
  visibility: ${({ scrollBarEnabled }) =>
    scrollBarEnabled ? 'visible' : 'hidden'};
  position: absolute;
  right: 0;
  bottom: 0;
  top: 0;
  width: ${({ theme }) => theme.spacing(1)};
  border-radius: ${({ theme }) =>
    `0 ${theme.borderRadius(2)} ${theme.borderRadius(2)} 0`};
  background-color: ${({ theme }) => theme.palette.background.alt};
`;

const ScrollThumb = styled.div`
  background-color: ${({ theme }) => theme.palette.primary.normal};
  border-radius: ${({ theme }) => theme.borderRadius(2)};
`;

const ScrollView = styled.div`
  padding-right: ${({ theme, scrollBarEnabled }) =>
    scrollBarEnabled ? theme.spacing(2) : '0'};
`;

const Dropdown = ({ className, children, isOpen }) => {
  const refScrollArea = useRef(null);
  const theme = useTheme();

  const instanceScrollArea = (refScrollArea || {}).current || {};
  const infoScrollArea =
    (instanceScrollArea.getValues && instanceScrollArea.getValues()) || {};

  const scrollBarEnabled =
    infoScrollArea.clientHeight < infoScrollArea.scrollHeight ? true : false;

  const touchEventStopPropagation = e => e.stopPropagation();

  return (
    <Transition in={isOpen} timeout={theme.transitions.short}>
      {state => (
        <Content className={className} state={state}>
          <Scrollbars
            onTouchMove={touchEventStopPropagation}
            onTouchStart={touchEventStopPropagation}
            onTouchEnd={touchEventStopPropagation}
            ref={refScrollArea}
            renderTrackVertical={({ style, ...props }) => (
              <ScrollTrack
                scrollBarEnabled={scrollBarEnabled}
                className="track"
                style={style}
                {...props}
              />
            )}
            renderThumbVertical={({ style, ...props }) => (
              <ScrollThumb className="thumb" {...props} style={style} />
            )}
            renderView={({ style, ...props }) => (
              <ScrollView
                scrollBarEnabled={scrollBarEnabled}
                style={style}
                {...props}
                className="view"
              />
            )}
          >
            {children}
          </Scrollbars>
        </Content>
      )}
    </Transition>
  );
};

Dropdown.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  height: PropTypes.number,
  width: PropTypes.number,
};

export default Dropdown;
