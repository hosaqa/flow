import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline'

import PlayerButton from '../PlayerButton'
import TrackInfo from '../TrackInfo'

const PlaylistItem = ({track, play}) => {

  //const { tracks, artist, album, img } = track
  return (
    <div onClick={() => play(track.id)}>{track.name}
      <TrackInfo {...track} />
      <PlayerButton>
        <PlayCircleOutlineIcon />
      </PlayerButton>
    </div>
  )
}

export default PlaylistItem

PlaylistItem.propTypes = {
  track: PropTypes.object,
  play: PropTypes.func
}