import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import RepeatIcon from '@material-ui/icons/Repeat';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import PlayerButton from '../UI/PlayerButton';
import {
  playToggle,
  setCurrentTrack,
  repeatToggle,
  shuffleToggle,
} from './actions';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 -6px;
`;

const SecondGroup = styled.span`
  margin: 0 auto;
`;

const PlayerControls = ({
  playingNow,
  playlist,
  repeating,
  shuffledPlaylist,
  playToggle,
  repeatToggle,
  closestTrackIsExist,
  setCurrentTrackClosest,
  shuffleToggle,
}) => (
  <Wrapper>
    <PlayerButton
      onClick={() => setCurrentTrackClosest(-1)}
      iconSize={28}
      pseudoSelActive
      disabled={!closestTrackIsExist(-1)}
    >
      <SkipPreviousIcon />
    </PlayerButton>
    <PlayerButton
      onClick={() => playToggle()}
      iconSize={32}
      disabled={!playlist}
      pseudoSelActive
    >
      {!playingNow ? <PlayCircleOutlineIcon /> : <PauseCircleOutlineIcon />}
    </PlayerButton>
    <PlayerButton
      onClick={() => setCurrentTrackClosest(1)}
      iconSize={28}
      pseudoSelActive
      disabled={!closestTrackIsExist(1)}
    >
      <SkipNextIcon />
    </PlayerButton>
    <SecondGroup>
      <PlayerButton
        onClick={repeatToggle}
        active={repeating}
        disabled={!playlist}
      >
        <RepeatIcon />
      </PlayerButton>
      <PlayerButton
        onClick={shuffleToggle}
        active={!!shuffledPlaylist}
        disabled={!playlist}
      >
        <ShuffleIcon />
      </PlayerButton>
    </SecondGroup>
  </Wrapper>
);

export default connect(
  ({ player }) => player,
  { playToggle, setCurrentTrack, repeatToggle, shuffleToggle }
)(PlayerControls);
