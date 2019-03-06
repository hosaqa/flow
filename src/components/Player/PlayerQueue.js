import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay'
import ScrollArea from 'react-scrollbar'

import Dropdown from '../Dropdown'
import PlayerButton from '../PlayerButton'
import Playlist from '../Playlist'
import TrackInfo from '../TrackInfo'
import { playToggle, setCurrentTrack } from '../../actions/PlayerActions'
import { searchTrackByID } from '../../utils'

const StyledQueue = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const QueueBody = styled.div`
  position: absolute;
  bottom: 90px;
  right: 0;
  width: 290px;
  height: 190px;
  padding: 0;
  text-align: left;
  border-radius: ${props => props.theme.borderRadiusMain};
  background-color: ${({theme}) => theme.colors.contentPreload};
  box-shadow: ${({theme}) => theme.shadowPrimary};
`

const playQueueButton = (playlist) => {
  return (
    <PlayerButton
      disabled={!playlist ? true : false}
    >
      <PlaylistPlayIcon />
    </PlayerButton>
  )
}

const PlayerQueue = ({playlist = [], track, playingNow, playToggle, setCurrentTrack, shuffledPlaylist}) => {
  const currentPlaylist = (shuffledPlaylist) ? shuffledPlaylist : playlist
  const currentTrack = currentPlaylist ? searchTrackByID(currentPlaylist, track) : null

  return (
    <StyledQueue>

      <TrackInfo {...currentTrack}></TrackInfo>
      <Dropdown selector={playQueueButton(playlist)}>
        <QueueBody>
          <ScrollArea
            speed={0.8}
            smoothScrolling={true}
            className="area"
            contentClassName="content"
            horizontal={false}
            style={{
              padding: '0 10px 0 0',
              height: '190px'
            }}
            verticalContainerStyle={{
              opacity: '1',
              backgroundColor: '#ededed',
              width: '8px',
              borderRadius: '0 3px 3px 0'
            }}
            verticalScrollbarStyle={{
              borderRadius: '4px',
              backgroundColor: '#ff6b6b',
              marginLeft: '0'
            }}
          >
            <Playlist
              playlist={currentPlaylist}
              currentTrackID={track}
              playToggle={playToggle}
              setTrack={setCurrentTrack}
              playingNow={playingNow}
            />
          </ScrollArea>
        </QueueBody>
      </Dropdown>
    </StyledQueue>
  )
}

PlayerQueue.propTypes = {
  playlist: PropTypes.array,
  track: PropTypes.number,
  playingNow: PropTypes.bool
}

export default connect(({player}) => player, {playToggle, setCurrentTrack})(PlayerQueue)
