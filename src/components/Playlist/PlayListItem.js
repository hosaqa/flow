import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const PlaylistItem = ({track, play}) => {
  return <div onClick={play}>{track.name}</div>
}

export default PlaylistItem

PlaylistItem.propTypes = {
  track: PropTypes.object,
  play: PropTypes.func
}