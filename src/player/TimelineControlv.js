import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import { ThreeBounce } from 'styled-spinkit';

import Progress from '../app/common/UI/Progress';
import {
  getMousePosition,
  searchArrItemByID,
  isNumeric,
  formatSecondsToMMSS,
} from '../utils';

const TimeLineWrapper = styled.div`
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

const ProgressBarWrapper = styled.div`
  margin: 0 ${({ theme }) => theme.spacing(1)};
  width: 100%;
  height: ${({ theme }) => theme.spacing(5)};
  display: flex;
  align-items: center;
`;

const Preloader = styled.div`
  width: ${({ theme }) => theme.spacing(3)};
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: ${({ theme }) => theme.spacing(-3)};
`;

const TimelineControlv = ({
  className,
  trackPosition,
  playlist,
  nowPlaying,
  trackIsLoading,
  track,
  setTrackPosition,
}) => {
  const getTrackDuration = () => {
    return searchArrItemByID(playlist, track).duration;
  };

  const renderProgressBarSlider = (trackPosition, trackDuration) => {
    const _trackPosition = isNumeric(trackPosition) ? trackPosition : 0;
    const width = parseFloat(
      ((_trackPosition / trackDuration) * 100).toFixed(1)
    );

    const handleChange = val => {
      setTrackPosition((trackDuration / 100) * val);
    };

    return (
      <Progress
        disabled={!playlist}
        isLoading={trackIsLoading}
        active={nowPlaying}
        thumbShowOnHover
        thumbRadius={6}
        direction="horizontal"
        filled={width}
        onСhange={handleChange}
      />
    );
  };

  if (!playlist)
    return (
      <TimeLineWrapper className={className}>
        <TimerDisplay disabled>--:--</TimerDisplay>
        <ProgressBarWrapper>
          <Progress
            disabled
            active={nowPlaying}
            thumbShowOnHover
            thumbRadius={6}
            direction="horizontal"
          />
        </ProgressBarWrapper>
        <TimerDisplay disabled>--:--</TimerDisplay>
      </TimeLineWrapper>
    );

  const progressBar = renderProgressBarSlider(
    trackPosition,
    getTrackDuration()
  );

  trackPosition = isNumeric(trackPosition)
    ? formatSecondsToMMSS(trackPosition)
    : '0:00';

  return (
    <TimeLineWrapper className={className}>
      <TimerDisplay>{trackPosition || '--:--'}</TimerDisplay>
      <ProgressBarWrapper>
        {trackIsLoading && (
          <Preloader>
            <ThreeBounce color="#ff6b6b" size={25} />
          </Preloader>
        )}
        {progressBar}
      </ProgressBarWrapper>
      <TimerDisplay>{formatSecondsToMMSS(getTrackDuration())}</TimerDisplay>
    </TimeLineWrapper>
  );
};

TimelineControlv.propTypes = {
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

export default connect(({ player }) => player)(TimelineControlv);
