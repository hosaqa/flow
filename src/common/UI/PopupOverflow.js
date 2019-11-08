import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import { isMobile } from 'react-device-detect';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';
import styled from '@emotion/styled';
import Popup from './Popup';

const ScrollTrack = styled.div`
  visibility: ${({ scrollBarEnabled }) =>
    scrollBarEnabled ? 'visible' : 'hidden'};
  position: absolute;
  right: 0;
  bottom: 0;
  top: 0;
  width: ${({ theme }) => theme.spacing(1)}px;
  border-radius: ${({ theme }) =>
    `0 ${theme.borderRadius(2)}px ${theme.borderRadius(2)}px 0`};
  background-color: ${({ theme }) => theme.palette.background.alt};
`;

const ScrollThumb = styled.div`
  background-color: ${({ theme }) => theme.palette.primary.normal};
  border-radius: ${({ theme }) => theme.borderRadius(2)}px;
`;

const ScrollView = styled.div`
  padding-right: ${({ theme, scrollBarEnabled }) =>
    scrollBarEnabled && !isMobile ? `${theme.spacing(1)}px` : '0'};
  -webkit-overflow-scrolling: touch;
`;

const PopupOverflow = ({ className, children, isOpen }) => {
  const refScrollArea = useRef(null);

  useEffect(() => {
    if (isMobile) {
      if (isOpen) {
        disableBodyScroll(refScrollArea.current.view);
      } else {
        enableBodyScroll(refScrollArea.current.view);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      clearAllBodyScrollLocks();
    };
  }, []);

  const instanceScrollArea = (refScrollArea || {}).current || {};
  const infoScrollArea =
    (instanceScrollArea.getValues && instanceScrollArea.getValues()) || {};

  const scrollBarEnabled =
    infoScrollArea.clientHeight < infoScrollArea.scrollHeight ? true : false;

  const eventStopPropagation = e => e.stopPropagation();

  return (
    <Popup className={className} isOpen={isOpen}>
      <Scrollbars
        onScroll={eventStopPropagation}
        onTouchMove={eventStopPropagation}
        onTouchStart={eventStopPropagation}
        onTouchEnd={eventStopPropagation}
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
    </Popup>
  );
};

PopupOverflow.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  isOpen: PropTypes.bool,
};

export default PopupOverflow;
