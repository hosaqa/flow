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
  text-align: left;
  border-radius: ${props => props.theme.borderRadiusMain};
  background-color: ${props => props.theme.colorMainBg};
  box-shadow: ${props => props.theme.shadowMain};
`

const Playlist = ({playlist, currentTrackID, play}) => {
  return (
    <PlaylistWrapper>
      <PlaylistBody>
        {playlist.map(item => (
          <PlayListItem play={play} track={item} key={item.id}>{item.track}</PlayListItem>
        ))}
      </PlaylistBody>
    </PlaylistWrapper>
  )
}

export default Playlist

Playlist.propTypes = {
  playlist: PropTypes.arrayOf(PropTypes.object),
  currentTrackID: PropTypes.number,
  play: PropTypes.func
}