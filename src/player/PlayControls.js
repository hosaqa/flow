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
  margin: 0 ${({ theme }) => theme.spacing(-0.5)};
`;

const PlayControls = ({
  playingNow,
  disabled,
  playToggle,
  closestTrackIsExist,
  setCurrentTrackClosest,
}) => (
  <ButtonsRow>
    <PlayerButton
      onClick={() => setCurrentTrackClosest(-1)}
      pseudoSelActive
      disabled={disabled || !closestTrackIsExist(-1)}
    >
      <SkipPreviousIcon />
    </PlayerButton>
    <PlayerButton
      onClick={() => playToggle()}
      iconSize={32}
      disabled={disabled}
      pseudoSelActive
    >
      {!playingNow ? <PlayCircleOutlineIcon /> : <PauseCircleOutlineIcon />}
    </PlayerButton>
    <PlayerButton
      onClick={() => setCurrentTrackClosest(1)}
      pseudoSelActive
      disabled={disabled || !closestTrackIsExist(1)}
    >
      <SkipNextIcon />
    </PlayerButton>
  </ButtonsRow>
);

PlayControls.propTypes = {
  playingNow: PropTypes.bool,
  disabled: PropTypes.bool,
  playToggle: PropTypes.func,
  closestTrackIsExist: PropTypes.func,
  setCurrentTrackClosest: PropTypes.func,
};

export default connect(
  ({ player }) => player,
  { playToggle, setCurrentTrack }
)(PlayControls);
