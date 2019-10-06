import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import ProgressBar from '../app/common/UI/ProgressBar';
import { humanizeTrackTime } from '../utils';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const TimerDisplay = styled.div`
  text-align: center;
  display: inline-block;
  vertical-align: middle;
  width: ${({ theme }) => theme.spacing(4)};
  user-select: none;
  font-size: 14px;
  transition: color ${({ theme }) => theme.transition};
  color: ${({ theme, disabled }) =>
    disabled ? theme.colors.buttonDisabled : theme.colors.fontPrimary};
`;

const ProgressBarStyled = styled(ProgressBar)`
  margin: 0 ${({ theme }) => theme.spacing(1)};
  width: 100%;
  height: ${({ theme }) => theme.spacing(5)};
  display: flex;
  align-items: center;
`;

const TimelineControl = ({
  className,
  trackPosition,
  nowPlaying,
  trackIsLoading,
  track,
  setTrackPosition,
}) => {
  const [nextTrackPosition, setNextTrackPosition] = useState(null);

  const trackDuration = track ? track.duration : null;

  const progress = parseFloat(
    ((trackPosition / trackDuration) * 100).toFixed(1)
  );

  const _setTrackPosition = nextPosition => {
    setTrackPosition((trackDuration / 100) * nextPosition);
  };

  const handleSwipeMove = nextPosition => {
    setNextTrackPosition((trackDuration / 100) * nextPosition);
  };

  const handleSwipeEnd = nextPosition => {
    setNextTrackPosition(null);
    _setTrackPosition(nextPosition);
  };

  const disabled = !track;

  return (
    <Wrapper className={className}>
      <TimerDisplay disabled={disabled}>
        {nextTrackPosition !== null
          ? humanizeTrackTime(nextTrackPosition)
          : humanizeTrackTime(trackPosition)}
      </TimerDisplay>
      <ProgressBarStyled
        loading={trackIsLoading}
        disabled={disabled}
        active={nowPlaying}
        thumbShowOnHover
        thumbRadius={6}
        axis="horizontal"
        progress={progress}
        onSwipeMove={handleSwipeMove}
        onSwipeEnd={handleSwipeEnd}
        onClick={_setTrackPosition}
      />
      <TimerDisplay disabled={disabled}>
        {humanizeTrackTime(trackDuration)}
      </TimerDisplay>
    </Wrapper>
  );
};

TimelineControl.propTypes = {
  className: PropTypes.string,
  nowPlaying: PropTypes.bool,
  trackIsLoading: PropTypes.bool,
  track: PropTypes.object,
  trackPosition: PropTypes.number,
  setTrackPosition: PropTypes.func,
};

export default connect(({ player }) => player)(TimelineControl);
