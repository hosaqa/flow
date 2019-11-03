import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import PlayerButton from '../app/common/UI/PlayerButton';

const ButtonsRow = styled.div`
  display: inline-flex;
  align-items: center;
  margin: 0 ${({ theme }) => theme.spacing(-0.5)}px;
`;

const PlayControls = ({
  className,
  disabled,
  playingNow,
  prevTrack,
  nextTrack,
  playToggle,
  setCurrentTrack,
}) => (
  <div className={className}>
    <ButtonsRow
      onClick={event => {
        event.stopPropagation();
      }}
    >
      <PlayerButton
        onClick={() => setCurrentTrack(prevTrack.id)}
        disabled={disabled || !prevTrack}
      >
        <SkipPreviousIcon />
      </PlayerButton>
      <PlayerButton
        onClick={() => playToggle()}
        iconSize={'large'}
        disabled={disabled}
      >
        {!playingNow ? <PlayCircleOutlineIcon /> : <PauseCircleOutlineIcon />}
      </PlayerButton>
      <PlayerButton
        onClick={() => setCurrentTrack(nextTrack.id)}
        disabled={disabled || !nextTrack}
      >
        <SkipNextIcon />
      </PlayerButton>
    </ButtonsRow>
  </div>
);

const trackProp = PropTypes.shape({
  id: PropTypes.number,
  artist: PropTypes.string,
  trackname: PropTypes.string,
  album: PropTypes.string,
  src: PropTypes.string,
  img: PropTypes.string,
  duration: PropTypes.number,
});

PlayControls.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  playingNow: PropTypes.bool,
  prevTrack: trackProp,
  nextTrack: trackProp,
  playToggle: PropTypes.func,
  setCurrentTrack: PropTypes.func,
};

export default PlayControls;
