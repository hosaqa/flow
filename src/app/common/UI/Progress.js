import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Swipe from 'react-easy-swipe';
import styled from '@emotion/styled/macro';

const Track = styled.div`
  height: ${({ direction }) => (direction === 'horizontal' ? '4px' : '100%')};
  width: ${({ direction }) => (direction === 'vertical' ? '4px' : '100%')};
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  border-radius: 2px;
  background-color: ${({ disabled, theme }) =>
    disabled ? theme.colors.buttonDisabled : theme.colors.colorDraggableBg};
  box-shadow: ${({ active }) =>
    active ? '2px 2px 2px rgba(0, 0, 0, .1)' : 'none'};
  transition: box-shadow 0.35s, background-color 0.25s;
`;

const Filled = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: ${({ direction, filled }) =>
    direction === 'horizontal' ? '4px' : filled};
  width: ${({ direction, filled }) =>
    direction === 'vertical' ? '4px' : filled};
  background-image: linear-gradient(
    154deg,
    ${({ theme }) => theme.colors.accentPrimary},
    ${({ theme }) => theme.colors.accentSecondary}
  );
  border-radius: 2px;
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
`;

const ThumbHoverShown = styled(Thumb)`
  transition: transform 0.12s;
  transform: ${({ isSwiping }) => (isSwiping ? 'scale(1)' : 'scale(0)')};
`;

const Wrapper = styled.div`
  height: ${({ direction, thumbRadius }) =>
    direction === 'horizontal' ? `${thumbRadius * 2}px` : '100%'};
  width: 100%;
  position: relative;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};

  &:hover ${ThumbHoverShown} {
    transform: scale(1);
  }
`;

const Progress = ({
  filled,
  disabled,
  active,
  direction,
  thumbRadius,
  thumbShowOnHover,
  onSwipe = () => {},
  onСhange = () => {},
}) => {
  const trackRef = useRef(null);
  const [filledWhenSwipe, setFilledWhenSwipe] = useState(null);

  const setPosition = (e, isSwiping, callback) => {
    const {
      top,
      left,
      width,
      height,
    } = trackRef.current.getBoundingClientRect();

    const size = direction === 'horizontal' ? width : height;
    const mousePosition =
      direction === 'horizontal'
        ? e.clientX - left
        : height - (e.clientY - top);

    const nextPosition = size / mousePosition;

    let nextPositionPerCent = Math.trunc(100 / nextPosition);
    nextPositionPerCent = Math.min(100, Math.trunc(100 / nextPosition));
    nextPositionPerCent = Math.max(nextPositionPerCent, 0);

    if (isSwiping) setFilledWhenSwipe(nextPositionPerCent);

    if (callback) callback(nextPositionPerCent);
  };

  const handleClick = e => {
    setPosition(e, false, onСhange);
  };

  const handleSwipeStart = e => {
    document.body.style.userSelect = 'none';
    setPosition(e, true, onSwipe);
  };

  const handleSwipeMove = (position, e) => {
    setPosition(e, true, onSwipe);
  };

  const handleSwipeEnd = e => {
    document.body.style.userSelect = '';
    setPosition(e, false, onСhange);
    setFilledWhenSwipe(null);
  };

  return (
    <Wrapper
      disabled={disabled}
      direction={direction}
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
          disabled={disabled}
          active={active}
          direction={direction}
        >
          {!disabled && (
            <Filled
              direction={direction}
              filled={`${filledWhenSwipe || filled}%`}
            >
              {thumbShowOnHover ? (
                <ThumbHoverShown
                  isSwiping={filledWhenSwipe !== null}
                  thumbRadius={thumbRadius}
                />
              ) : (
                <Thumb thumbRadius={thumbRadius} />
              )}
            </Filled>
          )}
        </Track>
      </Swipe>
    </Wrapper>
  );
};

Progress.propTypes = {
  filled: PropTypes.number,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  direction: PropTypes.string,
  thumbRadius: PropTypes.number,
  thumbShowOnHover: PropTypes.bool,
  onSwipe: PropTypes.func,
  onСhange: PropTypes.func,
};

export default Progress;
