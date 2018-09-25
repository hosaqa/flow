import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline'

import PlayerButton from '../PlayerButton'
import TrackInfo from '../TrackInfo'
import { duration } from '@material-ui/core/styles/transitions';

const StyledPlaylistItem = styled.div`
  display: flex;
  align-items: center;
  padding: 3px 5px;
`

const TimeLable = styled.div`
  width: 50px;
  display: block;
  text-align: right;
  font-size: 14px;
  margin-left: auto;
`

const getTrackTime = ({minutes, seconds}) => {
  seconds = (`${seconds}`).length < 2 ? `0${seconds}` : seconds

  return `${minutes}:${seconds}`
}

const PlaylistItem = ({track, currentTrackID, play, nowPlaying}) => (
  <StyledPlaylistItem>
    <PlayerButton
      onClick={() => play(track.id, true)}
      active={currentTrackID === track.id ? true : false}
    >
      {nowPlaying && currentTrackID === track.id
        ? <PauseCircleOutlineIcon />
        : <PlayCircleOutlineIcon />
      }
    </PlayerButton>
    <TrackInfo
      {...track}
      withoutImage
    />
    <TimeLable>{getTrackTime(track.duration)}</TimeLable>
  </StyledPlaylistItem>
)

PlaylistItem.propTypes = {
  track: PropTypes.object,
  currentTrackID: PropTypes.number,
  play: PropTypes.func,
  nowPlaying: PropTypes.bool
}

export default PlaylistItem