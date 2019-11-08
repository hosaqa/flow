import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import ProgressBar from '../common/UI/ProgressBar';
import Loader from '../common/UI/Loader';
import TimeLabel from '../common/UI/TimeLabel';
import { humanizeTrackTime } from '../utils';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const ProgressBarStyled = styled(ProgressBar)`
  margin: 0 ${({ theme }) => theme.spacing(1)}px;
  width: 100%;
  display: flex;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.up('lg')} {
  }
`;

const LoaderStyled = styled(Loader)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 100%;
`;

const TimelineControl = ({
  className,
  disabled,
  trackPosition,
  trackIsLoading,
  currentTrack,
  setTrackPosition,
}) => {
  const [nextTrackPosition, setNextTrackPosition] = useState(null);

  const trackDuration = currentTrack ? currentTrack.duration : null;

  const progress = parseFloat(
    ((trackPosition / trackDuration) * 100).toFixed(1)
  );

  const setTrackPositionEnchanced = nextPosition => {
    setTrackPosition((trackDuration / 100) * nextPosition);
  };

  const handleSwipeMove = nextPosition => {
    setNextTrackPosition((trackDuration / 100) * nextPosition);
  };

  const handleSwipeEnd = nextPosition => {
    setNextTrackPosition(null);
    setTrackPositionEnchanced(nextPosition);
  };

  return (
    <Wrapper className={className}>
      <TimeLabel disabled={disabled}>
        {nextTrackPosition !== null
          ? humanizeTrackTime(nextTrackPosition)
          : humanizeTrackTime(trackPosition)}
      </TimeLabel>
      <ProgressBarStyled
        loading={trackIsLoading}
        disabled={disabled}
        thumbShowOnHover
        thumbRadius={0.75}
        axis="horizontal"
        progress={progress}
        onSwipeMove={handleSwipeMove}
        onSwipeEnd={handleSwipeEnd}
      />
      {trackIsLoading && <LoaderStyled size={0.5} />}
      <TimeLabel disabled={disabled}>
        {humanizeTrackTime(trackDuration)}
      </TimeLabel>
    </Wrapper>
  );
};

TimelineControl.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  trackIsLoading: PropTypes.bool,
  currentTrack: PropTypes.shape({
    id: PropTypes.string,
    artist: PropTypes.string,
    trackname: PropTypes.string,
    album: PropTypes.string,
    src: PropTypes.string,
    img: PropTypes.string,
    duration: PropTypes.number,
  }),
  trackPosition: PropTypes.number,
  setTrackPosition: PropTypes.func,
};

export default TimelineControl;
