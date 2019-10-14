import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Swipe from 'react-easy-swipe';
import styled from '@emotion/styled/macro';
import { keyframes } from '@emotion/core';

const Wrapper = styled.div`
  height: ${({ axis, thumbRadius }) =>
    axis === 'horizontal' ? `${thumbRadius * 2}px` : '100%'};
  width: ${({ axis, thumbRadius }) =>
    axis === 'vertical' ? `${thumbRadius * 2}px` : '100%'};
  position: relative;
  pointer-events: ${({ isDisabled }) => (isDisabled ? 'none' : 'auto')};
`;

const loadingAnimation = (firstColor, secondColor) => {
  return keyframes`
  0% {
    background-color: ${firstColor};
  }
  50% {
    background-color: ${secondColor};
  }
  100% {
    background-color: ${firstColor};
  }
`;
};

const Track = styled.div`
  height: ${({ axis, theme }) =>
    axis === 'horizontal' ? theme.spacing(0.5) : '100%'};
  width: ${({ axis, theme }) =>
    axis === 'vertical' ? theme.spacing(0.5) : '100%'};
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  border-radius: ${({ theme }) => theme.borderRadius(1)};
  background-color: ${({ isDisabled, theme }) =>
    isDisabled
      ? theme.palette.action.disabled
      : theme.palette.primary.translucent};
  transition: background-color ${({ theme }) => theme.transition.default}ms;

  &:before {
    content: '';
    display: ${({ isLoading }) => (isLoading ? '' : 'none')};
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: ${({ theme }) => theme.borderRadius(1)};
    background-color: transparent;
    transition: background-color ${({ theme }) => theme.transition.default}ms;
    animation: ${({ theme }) =>
        loadingAnimation(
          theme.colors.colorDraggableBg,
          theme.colors.accentSecondary
        )}
      1s ease infinite;
  }
`;

const FilledSpace = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: ${({ axis, progress, theme }) =>
    axis === 'horizontal' ? theme.spacing(0.5) : progress};
  width: ${({ axis, progress, theme }) =>
    axis === 'vertical' ? theme.spacing(0.5) : progress};
  background-color: ${({ theme }) => theme.palette.primary.normal};
  border-radius: ${({ theme }) => theme.borderRadius(1)};
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
  background-color: #fff;
  box-shadow: 1px 1px 1px rgba(20, 20, 20, 0.4),
    -1px -1px 1px rgba(96, 96, 96, 0.25);
  transition: transform 0.12s;
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
  active,
  thumbRadius = 4,
  thumbShowOnHover,
  onSwipeStart = () => {},
  onSwipeMove = () => {},
  onSwipeEnd = () => {},
  onClick = () => {},
}) => {
  const trackRef = useRef(null);
  const [progressWhenSwipe, setProgressWhenSwipe] = useState(null);

  const setPosition = (e, isSwiping, callback, ___name) => {
    const {
      top,
      left,
      width,
      height,
    } = trackRef.current.getBoundingClientRect();

    const size = axis === 'horizontal' ? width : height;

    console.log(e, ___name, e.targetTouch);

    const clientX = e.clientX ? e.clientX : e.changedTouches[0].clientX;
    const clientY = e.clientY ? e.clientY : e.changedTouches[0].clientY;

    const mousePosition =
      axis === 'horizontal' ? clientX - left : height - (clientY - top);

    const nextPosition = size / mousePosition;

    let nextPositionPerCent = Math.trunc(100 / nextPosition);
    nextPositionPerCent = Math.min(100, Math.trunc(100 / nextPosition));
    nextPositionPerCent = Math.max(nextPositionPerCent, 0);

    if (isSwiping) setProgressWhenSwipe(nextPositionPerCent);

    if (callback) callback(nextPositionPerCent);
  };

  const handleClick = e => {
    // if (loading || disabled) return false;
    // console.log('click');
    // setPosition(e, false, onClick);
  };

  const handleSwipeStart = e => {
    if (loading || disabled) return false;
    //console.log('start');
    document.body.style.userSelect = 'none';
    setPosition(e, true, onSwipeStart, 'start');
  };

  const handleSwipeMove = (position, e) => {
    if (loading || disabled) return false;
    //console.log('move');
    setPosition(e, true, onSwipeMove, 'move');
  };

  const handleSwipeEnd = e => {
    if (loading || disabled) return false;
    //console.log('end');
    document.body.style.userSelect = '';
    setPosition(e, false, onSwipeEnd, 'end');
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
        style={{ width: '100%', height: '100%' }}
        allowMouseEvents={true}
        onSwipeStart={handleSwipeStart}
        onSwipeMove={handleSwipeMove}
        onSwipeEnd={handleSwipeEnd}
      >
        <Track
          onClick={handleClick}
          ref={trackRef}
          isLoading={loading}
          isDisabled={disabled}
          active={active}
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
  active: PropTypes.bool,
  axis: PropTypes.string,
  thumbRadius: PropTypes.number,
  thumbShowOnHover: PropTypes.bool,
  onSwipeStart: PropTypes.func,
  onSwipeMove: PropTypes.func,
  onSwipeEnd: PropTypes.func,
  onClick: PropTypes.func,
};

export default ProgressBar;
