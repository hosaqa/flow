import React from 'react'
import { connect } from 'react-redux'
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious'
import SkipNextIcon from '@material-ui/icons/SkipNext'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline'
import { playToggle, playlistFetch, setCurrentTrack } from '../../actions/PlayerActions'
import { searchTrackByID } from '../../utils'
import PlayerButton from '../PlayerButton'


function _PlayerControls(props) {
  const closestTrackIsExist = (index) => {
    const { playlist, track } = props

    if (!playlist) return false

    const currentTrack = searchTrackByID(playlist, track)
    const currentTrackIndex = playlist.indexOf(currentTrack)
    
    return playlist.includes(playlist[currentTrackIndex + index]) ? true : false
  }

  const setCurrentTrackClosest = (index) => {
    const { playlist, track, setCurrentTrack } = props
    const currentTrack = searchTrackByID(playlist, track)
    const currentTrackIndex = playlist.indexOf(currentTrack)

    const nextTrackIndex = currentTrackIndex + index
    if (closestTrackIsExist(index)) setCurrentTrack(playlist[nextTrackIndex].id)
  }
  const { playlistIsLoading, playlistFetchFailed, trackIsLoading, playingNow, playlist, track, trackPosition } = this.props
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
    </div>
  )
}

// export default connect(({player}) => player, {playToggle, playlistFetch, setCurrentTrack})(PlayerControls)

const PlayerControls = connect(({player}) => player, {playToggle, playlistFetch, setCurrentTrack})(_PlayerControls);

export default PlayerControls;