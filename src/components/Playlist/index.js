import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import PlayListItem from './PlayListItem'

const Playlist = ({playlist, currentTrackID, play}) => {
  return playlist.map(item => (
    <PlayListItem track={item} key={item.id}>{item.track}</PlayListItem>
  ))
}

export default Playlist

Playlist.propTypes = {
  playlist: PropTypes.arrayOf(PropTypes.object),
  currentTrackID: PropTypes.number,
  play: PropTypes.func
}