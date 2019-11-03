import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import PlayerButton from '../app/common/UI/PlayerButton';
import { playToggle, setCurrentTrack } from './actions';

const ButtonsRow = styled.div`
  display: inline-flex;
  align-items: center;
  margin: 0 ${({ theme }) => theme.spacing(-0.5)}px;
`;

const PlayControls = ({
  className,
  track,
  playingNow,
  disabled,
  playToggle,
  setCurrentTrack,
}) => (
  <div className={className}>
    <ButtonsRow
      onClick={e => {
        e.stopPropagation();
      }}
    >
      <PlayerButton
        onClick={() => setCurrentTrack(track.prevTrack.id)}
        disabled={disabled || !track.prevTrack}
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
        onClick={() => setCurrentTrack(track.nextTrack.id)}
        disabled={disabled || !track.nextTrack}
      >
        <SkipNextIcon />
      </PlayerButton>
    </ButtonsRow>
  </div>
);

PlayControls.propTypes = {
  className: PropTypes.string,
  track: PropTypes.object,
  playingNow: PropTypes.bool,
  disabled: PropTypes.bool,
  playToggle: PropTypes.func,
  setCurrentTrack: PropTypes.func,
};

export default connect(
  ({ player }) => player,
  { playToggle, setCurrentTrack }
)(PlayControls);
