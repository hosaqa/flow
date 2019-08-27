import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled/macro';

const ProgressBarEmpty = styled.div`
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

const ProgressBarFill = styled.div`
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
  transform: scale(0);
`;

const StyledProgressBar = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};

  &:hover ${ThumbHoverShown} {
    transform: scale(1);
  }
`;

const ProgressBar = ({
  disabled,
  active,
  direction,
  filled,
  thumbRadius,
  thumbShowOnHover,
}) => (
  <StyledProgressBar disabled={disabled}>
    <ProgressBarEmpty disabled={disabled} active={active} direction={direction}>
      {!disabled && (
        <ProgressBarFill direction={direction} filled={`${filled}%`}>
          {thumbShowOnHover ? (
            <ThumbHoverShown thumbRadius={thumbRadius} />
          ) : (
            <Thumb thumbRadius={thumbRadius} />
          )}
        </ProgressBarFill>
      )}
    </ProgressBarEmpty>
  </StyledProgressBar>
);

export default ProgressBar;

ProgressBar.propTypes = {
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  direction: PropTypes.string,
  filled: PropTypes.number,
  thumbRadius: PropTypes.number,
  thumbShowOnHover: PropTypes.bool,
};
