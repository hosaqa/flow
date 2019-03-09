import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Container, Row, Col, BaseCSS } from 'styled-bootstrap-grid';

import { searchTrackByID } from '../utils'
import { playToggle, playlistFetch, setCurrentTrack, setTrackPosition } from '../actions/PlayerActions'
import Playlist from './Playlist'

const Main = ({playingNow, playlist, track,  volume, muted, shuffledPlaylist}) => (
    <div>
      <BaseCSS />
      <Container>
        <div>1</div>
      { playlist &&
        <Playlist
          nonDefaultPlaylist={playlist}
        />
      }
      </Container>
    </div>
  )

export default connect(({player}) => player, {playToggle, playlistFetch, setCurrentTrack, setTrackPosition})(Main)