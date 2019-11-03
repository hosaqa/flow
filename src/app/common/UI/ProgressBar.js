import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Swipe from 'react-easy-swipe';
import styled from '@emotion/styled/macro';

const Wrapper = styled.div`
  height: ${({ axis, thumbRadius }) =>
    axis === 'horizontal' ? `${thumbRadius * 2}px` : '100%'};
  width: ${({ axis, thumbRadius }) =>
    axis === 'vertical' ? `${thumbRadius * 2}px` : '100%'};
  position: relative;
  pointer-events: ${({ isDisabled }) => (isDisabled ? 'none' : 'auto')};
`;

const Track = styled.div`
  height: ${({ axis, theme }) =>
    axis === 'horizontal' ? `${theme.spacing(0.5)}px` : '100%'};
  width: ${({ axis, theme }) =>
    axis === 'vertical' ? `${theme.spacing(0.5)}px` : '100%'};
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  border-radius: ${({ theme }) => theme.borderRadius(1)}px;
  background-color: ${({ isDisabled, theme }) =>
    isDisabled
      ? theme.palette.action.disabled
      : theme.palette.primary.translucent};
  transition: background-color ${({ theme }) => theme.transitions.default}ms;
`;

const FilledSpace = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: ${({ axis, progress, theme }) =>
    axis === 'horizontal' ? `${theme.spacing(0.5)}px` : progress};
  width: ${({ axis, progress, theme }) =>
    axis === 'vertical' ? `${theme.spacing(0.5)}px` : progress};
  background: ${({ theme }) =>
    `linear-gradient(154deg, ${theme.palette.primary.normal}, ${theme.palette.secondary})`};
  border-radius: ${({ theme }) => theme.borderRadius(1)}px;
`;

const Thumb = styled.div`
  position: absolute;
  right: ${({ thumbRadius }) =>
    thumbRadius ? -(thumbRadius * 2 - 4) / 2 : -2}px;
  top: ${({ thumbRadius }) =>
    thumbRadius ? -(thumbRadius * 2 - 4) / 2 : -2}px;
  width: ${({ thumbRadius }) => (thumbRadius ? thumbRadius * 2 : 8)}px;
  height: ${({ thumbRadius }) => (thumbRadius ? thumbRadius * 2 : 8)}px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.palette.white};
  box-shadow: ${({ theme }) => theme.shadows.around};
  transition: transform ${({ theme }) => theme.transitions.short}ms;
  transform: ${({ isSwiping, thumbShowOnHover }) =>
    thumbShowOnHover && !isSwiping
      ? 'scale(0)'
      : thumbShowOnHover && isSwiping
      ? 'scale(1)'
      : 'none'};

  ${Wrapper}:hover & {
    transform: ${({ thumbShowOnHover }) =>
      thumbShowOnHover ? 'scale(1)' : 'none'};
  }
`;

const ProgressBar = ({
  className,
  axis,
  progress,
  loading,
  disabled,
  thumbRadius = 4,
  thumbShowOnHover,
  onSwipeStart = () => {},
  onSwipeMove = () => {},
  onSwipeEnd = () => {},
}) => {
  const trackRef = useRef(null);
  const [progressWhenSwipe, setProgressWhenSwipe] = useState(null);

  const setPosition = (e, isSwiping, callback) => {
    const {
      top,
      left,
      width,
      height,
    } = trackRef.current.getBoundingClientRect();

    const size = axis === 'horizontal' ? width : height;

    const clientX = e.clientX ? e.clientX : e.changedTouches[0].clientX;
    const clientY = e.clientY ? e.clientY : e.changedTouches[0].clientY;

    const clientPosition =
      axis === 'horizontal' ? clientX - left : height - (clientY - top);

    const nextPosition = size / clientPosition;

    let nextPositionPerCent = Math.trunc(100 / nextPosition);
    nextPositionPerCent = Math.min(100, Math.trunc(100 / nextPosition));
    nextPositionPerCent = Math.max(nextPositionPerCent, 0);

    if (isSwiping) setProgressWhenSwipe(nextPositionPerCent);

    if (callback) callback(nextPositionPerCent);
  };

  const handleSwipeStart = e => {
    if (loading || disabled) return false;

    e.stopPropagation();

    document.body.style.userSelect = 'none';
    setPosition(e, true, onSwipeStart);
  };

  const handleSwipeMove = (position, e) => {
    if (loading || disabled) return false;

    e.stopPropagation();

    setPosition(e, true, onSwipeMove);
  };

  const handleSwipeEnd = e => {
    if (loading || disabled) return false;

    e.stopPropagation();

    document.body.style.userSelect = '';
    setPosition(e, false, onSwipeEnd);
    setProgressWhenSwipe(null);
  };

  return (
    <Wrapper
      className={className}
      isDisabled={disabled || loading}
      axis={axis}
      thumbRadius={thumbRadius}
    >
      <Swipe
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          left: '0',
          top: '0',
        }}
        allowMouseEvents={true}
        onSwipeStart={handleSwipeStart}
        onSwipeMove={handleSwipeMove}
        onSwipeEnd={handleSwipeEnd}
      >
        <Track
          ref={trackRef}
          isLoading={loading}
          isDisabled={disabled}
          axis={axis}
        >
          {!disabled && !loading && (
            <FilledSpace
              axis={axis}
              progress={`${
                progressWhenSwipe !== null ? progressWhenSwipe : progress
              }%`}
            >
              <Thumb
                thumbShowOnHover={thumbShowOnHover}
                thumbRadius={thumbRadius}
                isSwiping={progressWhenSwipe !== null}
              />
            </FilledSpace>
          )}
        </Track>
      </Swipe>
    </Wrapper>
  );
};

ProgressBar.propTypes = {
  className: PropTypes.string,
  progress: PropTypes.number,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  axis: PropTypes.string,
  thumbRadius: PropTypes.number,
  thumbShowOnHover: PropTypes.bool,
  onSwipeStart: PropTypes.func,
  onSwipeMove: PropTypes.func,
  onSwipeEnd: PropTypes.func,
};

export default ProgressBar;
