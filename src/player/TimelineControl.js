import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import ProgressBar from '../app/common/UI/ProgressBar';
import { searchArrItemByID, humanizeTrackTime } from '../utils';

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
  playlist,
  nowPlaying,
  trackIsLoading,
  track,
  setTrackPosition,
}) => {
  const getTrackDuration = () => {
    const currentTrack = searchArrItemByID(playlist, track);

    if (currentTrack) return currentTrack.duration;
  };

  const progress = parseFloat(
    ((trackPosition / getTrackDuration()) * 100).toFixed(1)
  );

  const handleChange = val => {
    setTrackPosition((getTrackDuration() / 100) * val);
  };

  const disabled = !playlist;

  return (
    <Wrapper className={className}>
      <TimerDisplay disabled={disabled}>
        {humanizeTrackTime(trackPosition)}
      </TimerDisplay>
      <ProgressBarStyled
        loading={trackIsLoading}
        disabled={disabled}
        active={nowPlaying}
        thumbShowOnHover
        thumbRadius={6}
        axis="horizontal"
        progress={progress}
        onSwipeEnd={handleChange}
        onClick={handleChange}
      />
      <TimerDisplay disabled={disabled}>
        {humanizeTrackTime(getTrackDuration())}
      </TimerDisplay>
    </Wrapper>
  );
};

TimelineControl.propTypes = {
  className: PropTypes.string,
  playlist: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      artist: PropTypes.string,
      trackname: PropTypes.string,
      album: PropTypes.string,
      src: PropTypes.string,
      img: PropTypes.string,
      duration: PropTypes.number,
    })
  ),
  nowPlaying: PropTypes.bool,
  trackIsLoading: PropTypes.bool,
  track: PropTypes.number,
  trackPosition: PropTypes.number,
  setTrackPosition: PropTypes.func,
};

export default connect(({ player }) => player)(TimelineControl);
