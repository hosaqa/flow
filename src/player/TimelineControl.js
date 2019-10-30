import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import ProgressBar from '../app/common/UI/ProgressBar';
import Loader from '../app/common/UI/Loader';
import { humanizeTrackTime } from '../utils';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const TimeDisplay = styled.div`
  text-align: center;
  display: inline-block;
  vertical-align: middle;
  width: ${({ theme }) => theme.spacing(4)};
  user-select: none;
  font-size: 14px;
  transition: color ${({ theme }) => theme.transitions.short};
  color: ${({ theme, disabled }) =>
    disabled ? theme.palette.action.disabled : theme.palette.text.primary};
`;

const ProgressBarStyled = styled(ProgressBar)`
  margin: 0 ${({ theme }) => theme.spacing(1)};
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
  trackPosition,
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
      <TimeDisplay disabled={disabled}>
        {nextTrackPosition !== null
          ? humanizeTrackTime(nextTrackPosition)
          : humanizeTrackTime(trackPosition)}
      </TimeDisplay>
      <ProgressBarStyled
        loading={trackIsLoading}
        disabled={disabled}
        thumbShowOnHover
        thumbRadius={6}
        axis="horizontal"
        progress={progress}
        onSwipeMove={handleSwipeMove}
        onSwipeEnd={handleSwipeEnd}
      />
      {trackIsLoading && <LoaderStyled size={0.5} />}
      <TimeDisplay disabled={disabled}>
        {humanizeTrackTime(trackDuration)}
      </TimeDisplay>
    </Wrapper>
  );
};

TimelineControl.propTypes = {
  className: PropTypes.string,
  trackIsLoading: PropTypes.bool,
  track: PropTypes.object,
  trackPosition: PropTypes.number,
  setTrackPosition: PropTypes.func,
};

export default connect(({ player }) => player)(TimelineControl);
