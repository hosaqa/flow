import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'

import PlayListItem from './PlayListItem'

const PlaylistWrapper = styled.div`
  position: absolute;
  bottom: 90px;
  right: 0;
`

const PlaylistBody = styled.div`
  width: 450px;
  height: 300px;
  padding: 5px 5px 5px 0;
  text-align: left;
  border-radius: ${props => props.theme.borderRadiusMain};
  background-color: ${props => props.theme.colorMainBg};
  box-shadow: ${props => props.theme.shadowMain};
`

const Playlist = ({playlist, currentTrackID, playToggle, setTrack, nowPlaying}) => (
  <PlaylistWrapper>
    <PlaylistBody>
      {playlist.map(item => (
        <PlayListItem
          playToggle={playToggle}
          setTrack={setTrack}
          track={item}
          currentTrackID={currentTrackID}
          nowPlaying={nowPlaying}
          key={item.id}
        >
          {item.track}
        </PlayListItem>
      ))}
    </PlaylistBody>
  </PlaylistWrapper>
)

Playlist.propTypes = {
  playlist: PropTypes.arrayOf(PropTypes.object),
  currentTrackID: PropTypes.number,
  playToggle: PropTypes.func,
  setTrack: PropTypes.func,
  nowPlaying: PropTypes.bool
}

export default Playlist