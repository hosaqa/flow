import React from 'react'
import { connect } from 'react-redux'
import { playToggle, setCurrentTrack, repeatToggle, shuffleToggle } from '../../actions/PlayerActions'
import styled from 'styled-components'
import PlayerButton from '../PlayerButton'
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious'
import SkipNextIcon from '@material-ui/icons/SkipNext'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline'
import RepeatIcon from '@material-ui/icons/Repeat'
import ShuffleIcon from '@material-ui/icons/Shuffle'


const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 -6px;
`

const SecondGroup = styled.span`
  margin: 0 auto;
`

function PlayerControls({ playingNow, playlist, repeating, shuffledPlaylist, playToggle, repeatToggle, closestTrackIsExist, setCurrentTrackClosest, shuffleToggle}) {

  return (
    <Wrapper>
      <PlayerButton
        onClick={() => setCurrentTrackClosest(-1)}
        iconSize={28}
        pseudoSelActive
        disabled={closestTrackIsExist(-1) ? false : true}
      >
        <SkipPreviousIcon />
      </PlayerButton>
      <PlayerButton
        onClick={() => playToggle()}
        iconSize={32}
        disabled={!playlist}
        pseudoSelActive
      >
        {!playingNow
          ? <PlayCircleOutlineIcon />
          : <PauseCircleOutlineIcon />
        }        
      </PlayerButton>
      <PlayerButton
        onClick={() => setCurrentTrackClosest(1)}
        iconSize={28}
        pseudoSelActive
        disabled={closestTrackIsExist(1) ? false : true}
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
          active={!!shuffledPlaylist ? true : false}
          disabled={!playlist}
        >
          <ShuffleIcon /> 
        </PlayerButton>
      </SecondGroup>
    </Wrapper>
  )
}


export default connect(({player}) => player, {playToggle, setCurrentTrack, repeatToggle, shuffleToggle})(PlayerControls);