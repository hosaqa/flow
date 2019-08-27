import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import { ThreeBounce } from 'styled-spinkit';

import ProgressBar from '../app/common/UI/ProgressBar';
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
  width: 28px;
  user-select: none;
  font-size: 14px;
  transition: color 0.25s;
  color: ${({ theme, disabled }) =>
    disabled ? theme.colors.buttonDisabled : theme.colors.fontPrimary};
`;

const ProgressBarWrapper = styled.div`
  margin: 0 12px;
  width: 355px;
  height: 40px;
  display: flex;
  align-items: center;
`;

const Preloader = styled.div`
  width: 25px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -23px;
`;

const TimelineControl = ({
  trackPosition,
  playlist,
  nowPlaying,
  trackIsLoading,
  track,
  setTrackPosition,
}) => {
  const timelineRef = useRef(null);
  const [dummyLineProgress, setDummyLineProgress] = useState(null);
  const [dummyTime, setDummyTime] = useState(null);
  const [mouseDowned, setMouseDowned] = useState(false);

  const getTrackDuration = () => {
    return searchArrItemByID(playlist, track).duration;
  };

  const renderProgressBarSlider = (trackPosition, trackDuration) => {
    const _trackPosition = isNumeric(trackPosition) ? trackPosition : 0;
    const width = parseFloat(
      ((_trackPosition / trackDuration) * 100).toFixed(1)
    );

    return (
      <ProgressBar
        disabled={!playlist}
        isLoading={trackIsLoading}
        active={nowPlaying}
        thumbShowOnHover
        thumbRadius={6}
        direction="horizontal"
        filled={dummyLineProgress || width}
      />
    );
  };

  const getTouchedPosition = (e, ref) => {
    const { left, width } = getMousePosition(e, ref);

    return (e.clientX - Math.round(left)) / width;
  };

  const onMouseUpRewind = () => {
    const trackDuration = getTrackDuration();
    setTrackPosition((dummyLineProgress / 100) * trackDuration);

    setDummyLineProgress(null);
    setDummyTime(null);
    setMouseDowned(false);
  };

  const handleOnMouseDown = () => {
    setMouseDowned(true);
  };

  const handleOnMouseUp = () => {
    onMouseUpRewind();
  };

  const handleOnMouseLeave = () => {
    if (mouseDowned && dummyLineProgress) {
      onMouseUpRewind();
    }
  };

  const handleOnClick = (e, ref) => {
    const trackDuration = getTrackDuration();

    const touchedPosition = getTouchedPosition(e, ref);

    const rewindTo = Math.round(touchedPosition * trackDuration);
    setTrackPosition(rewindTo);
  };

  const handleOnMouseMove = (e, ref) => {
    if (mouseDowned) {
      const trackDuration = getTrackDuration();

      const touchedPosition = getTouchedPosition(e, ref);

      if (touchedPosition > 0 && touchedPosition < 1) {
        setDummyLineProgress(touchedPosition * 100);
        setDummyTime(touchedPosition * trackDuration);
      }
    }
  };

  if (!playlist)
    return (
      <TimeLineWrapper>
        <TimerDisplay disabled>--:--</TimerDisplay>
        <ProgressBarWrapper>
          <ProgressBar
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

  trackPosition = dummyTime || trackPosition;

  trackPosition = isNumeric(trackPosition)
    ? formatSecondsToMMSS(trackPosition)
    : '0:00';

  return (
    <TimeLineWrapper>
      <TimerDisplay>{trackPosition || '--:--'}</TimerDisplay>
      <ProgressBarWrapper
        ref={timelineRef}
        onClick={e => {
          handleOnClick(e, timelineRef);
        }}
        onMouseDown={handleOnMouseDown}
        onMouseUp={handleOnMouseUp}
        onMouseLeave={handleOnMouseLeave}
        onMouseMove={e => {
          handleOnMouseMove(e, timelineRef);
        }}
      >
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

TimelineControl.propTypes = {
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
