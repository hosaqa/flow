import React, { memo, useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import raf from 'raf'; // requestAnimationFrame polyfill
import styled from '@emotion/styled';
import ProgressBar from '../UI/ProgressBar';
import Loader from '../UI/Loader';
import TimeLabel from '../UI/TimeLabel';
import { humanizeTrackTime } from '../../../utils';
import { isNumeric } from '../../../utils';

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
  playingNow,
  currentTrackID,
  trackIsLoading,
  trackDuration,
  playerInstance,
}) => {
  const [nextTrackPosition, setNextTrackPosition] = useState(null);
  const [trackPosition, setTrackPosition] = useState(0);

  let playerRAF = useRef(null);

  const setSeek = useCallback(
    rewindTo => {
      setTrackPosition(rewindTo);

      playerInstance.seek(rewindTo);
    },
    [playerInstance]
  );

  const clearRAF = () => {
    raf.cancel(playerRAF.current);
  };

  useEffect(() => {
    const setSeekPos = playingNow => {
      let trackPosition = playerInstance.seek();
      trackPosition = isNumeric(trackPosition) ? trackPosition : 0;

      setTrackPosition(trackPosition);

      if (playingNow) playerRAF.current = raf(() => setSeekPos(playingNow));
    };

    if (typeof playerInstance.seek === 'function') {
      if (playingNow) {
        setSeekPos(playingNow);
      } else {
        clearRAF();
      }
    }
  }, [playingNow, playerInstance]);

  useEffect(() => {
    setTrackPosition(0);
  }, [currentTrackID]);

  useEffect(() => () => clearRAF(), []);

  const progress = parseFloat(
    ((trackPosition / trackDuration) * 100).toFixed(1)
  );

  const handleSwipeMove = useCallback(
    nextPosition => {
      setNextTrackPosition((trackDuration / 100) * nextPosition);
    },
    [trackDuration]
  );

  const handleSwipeEnd = useCallback(
    nextPosition => {
      setNextTrackPosition(null);

      setSeek((trackDuration / 100) * nextPosition);
    },
    [trackDuration, setSeek]
  );

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
      {!disabled && trackIsLoading && <LoaderStyled size={0.5} />}
      <TimeLabel disabled={disabled}>
        {humanizeTrackTime(trackDuration)}
      </TimeLabel>
    </Wrapper>
  );
};

TimelineControl.propTypes = {
  className: PropTypes.string,
  playingNow: PropTypes.bool,
  currentTrackID: PropTypes.string,
  disabled: PropTypes.bool,
  trackIsLoading: PropTypes.bool,
  trackDuration: PropTypes.number,
  trackPosition: PropTypes.number,
  playerInstance: PropTypes.shape({
    seek: PropTypes.func,
  }),
};

export default memo(TimelineControl);
