import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'

import PlayListItem from './PlayListItem'

const PlaylistWrapper = styled.div`
  position: relative;
`

const Playlist = ({playlist, currentTrackID, playToggle, setTrack, playingNow}) => (
  <PlaylistWrapper>
    {playlist.map(item => (
      <PlayListItem
        playToggle={playToggle}
        setTrack={setTrack}
        track={item}
        currentTrackID={currentTrackID}
        playingNow={playingNow}
        key={item.id}
      >
        {item.track}
      </PlayListItem>
    ))}
  </PlaylistWrapper>
)

Playlist.propTypes = {
  playlist: PropTypes.arrayOf(PropTypes.object),
  currentTrackID: PropTypes.number,
  playToggle: PropTypes.func,
  setTrack: PropTypes.func,
  playingNow: PropTypes.bool
}

export default Playlist