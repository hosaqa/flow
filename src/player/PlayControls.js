import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import PlayerButton from '../common/UI/PlayerButton';

const ButtonsRow = styled.div`
  display: inline-flex;
  align-items: center;
  margin: 0 ${({ theme }) => theme.spacing(-0.5)}px;
`;

const PlayControls = ({
  className,
  disabled,
  playingNow,
  prevTrackID,
  nextTrackID,
  playToggle,
  setCurrentTrackID,
}) => (
  <div className={className}>
    <ButtonsRow
      onClick={event => {
        event.stopPropagation();
      }}
    >
      <PlayerButton
        onClick={() => setCurrentTrackID(prevTrackID)}
        disabled={disabled || !prevTrackID}
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
        onClick={() => setCurrentTrackID(nextTrackID)}
        disabled={disabled || !nextTrackID}
      >
        <SkipNextIcon />
      </PlayerButton>
    </ButtonsRow>
  </div>
);

PlayControls.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  playingNow: PropTypes.bool,
  prevTrackID: PropTypes.string,
  nextTrackID: PropTypes.string,
  playToggle: PropTypes.func,
  setCurrentTrackID: PropTypes.func,
};

export default PlayControls;
