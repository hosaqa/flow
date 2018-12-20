import React from 'react'
import { connect } from 'react-redux'
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious'
import SkipNextIcon from '@material-ui/icons/SkipNext'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline'
import RepeatIcon from '@material-ui/icons/Repeat'
import ShuffleIcon from '@material-ui/icons/Shuffle'
import { playToggle, setCurrentTrack, repeatToggle } from '../../actions/PlayerActions'
import { searchTrackByID } from '../../utils'
import PlayerButton from '../PlayerButton'


function PlayerControls({ playingNow, playlist, track, repeating, playlistShuffled, playToggle, repeatToggle, setCurrentTrack }) {
  const closestTrackIsExist = (index) => {
    if (!playlist) return false

    const currentTrack = searchTrackByID(playlist, track)
    const currentTrackIndex = playlist.indexOf(currentTrack)
    
    return playlist.includes(playlist[currentTrackIndex + index]) ? true : false
  }

  const setCurrentTrackClosest = (index) => {
    const currentTrack = searchTrackByID(playlist, track)
    const currentTrackIndex = playlist.indexOf(currentTrack)

    const nextTrackIndex = currentTrackIndex + index
    if (closestTrackIsExist(index)) setCurrentTrack(playlist[nextTrackIndex].id)
  }

  return (
    <div>
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
      <PlayerButton
        onClick={repeatToggle}
        active={repeating}
      >
        <RepeatIcon /> 
      </PlayerButton>
      <PlayerButton
        onClick={() => this.shuffleToggle()}
        active={playlistShuffled}
      >
        <ShuffleIcon /> 
      </PlayerButton>
    </div>
  )
}


export default connect(({player}) => player, {playToggle, setCurrentTrack, repeatToggle})(PlayerControls);