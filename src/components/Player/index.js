import ReactHowler from 'react-howler'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import raf from 'raf' // requestAnimationFrame polyfill
import styled from 'styled-components'
import { Container, Row, Col, BaseCSS } from 'styled-bootstrap-grid';
import PlayerControls from './PlayerControls'
import Timeline from '../Timeline'
import VolumeBar from '../VolumeBar'
import PlayerQueue from './PlayerQueue'
import { playToggle, playlistFetch, setCurrentTrack, setTrackPosition, setVolume, muteToggle } from '../../actions/PlayerActions'
import { searchTrackByID } from '../../utils'


const PlayerWrapper = styled.div`
  position: fixed;
  background-color: ${({playlist, theme}) => (
    !playlist ? theme.colors.contentPreload : theme.colors.content
  )};
  border-top: 1px solid ${({theme}) => theme.colors.border};
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 15px 25px;
  transition: background-color .3s;
`

const Dashboard = styled.div`
  width: 1024px;
  margin: auto;
`

const DraggableControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: spabe-between;
`

class Player extends Component {
  componentDidMount() {
    this.props.playlistFetch()
  }

  componentWillUnmount () {
    this.clearRAF()
  }

  setSeek (rewindTo) {
    this.props.setTrackPosition(rewindTo)
    this.player.seek(rewindTo)
  }

  setSeekPos () {
    const { playingNow, setTrackPosition } = this.props

    setTrackPosition(this.player.seek())

    if (playingNow) {
      this._raf = raf(() => this.setSeekPos())
    }
  }

  closestTrackIsExist (index) {
    const { playlist, track, shuffledPlaylist } = this.props
    
    if (!playlist) return false

    const currentPlaylist = (shuffledPlaylist) ? shuffledPlaylist : playlist

    const currentTrack = searchTrackByID(currentPlaylist, track)
    const currentTrackIndex = currentPlaylist.indexOf(currentTrack)

    return currentPlaylist.includes(currentPlaylist[currentTrackIndex + index]) ? true : false
  }

  setCurrentTrackClosest (index) {
    const { playlist, track, setCurrentTrack, shuffledPlaylist } = this.props

    const currentPlaylist = (shuffledPlaylist) ? shuffledPlaylist : playlist

    const currentTrack = searchTrackByID(currentPlaylist, track)
    const currentTrackIndex = currentPlaylist.indexOf(currentTrack)

    const nextTrackIndex = currentTrackIndex + index
    if (this.closestTrackIsExist(index)) setCurrentTrack(currentPlaylist[nextTrackIndex].id)
  }

  handleOnEnd () {
    const { playToggle, repeating } = this.props

    if (!repeating) {
      const nextTrackExist = this.closestTrackIsExist(1)

      if (!nextTrackExist) {
        playToggle()
        
        this.clearRAF()
      } else {
        this.setCurrentTrackClosest(1)
      }
    }
  }

  clearRAF () {
    raf.cancel(this._raf)
  }

  render() {
    const { playingNow, playlist, track,  volume, muted, shuffledPlaylist } = this.props

    const currentPlaylist = (shuffledPlaylist) ? shuffledPlaylist : playlist

    return (
      <PlayerWrapper>
        {
          playlist &&
          <ReactHowler
            ref={(ref) => (this.player = ref)}
            src={searchTrackByID(currentPlaylist, track).src}
            playing={playingNow}
            onPlay={() => this.setSeekPos()}
            onEnd={() => this.handleOnEnd()}
            volume={volume}
            mute={muted}
          />
        } 
        <BaseCSS /> 
        <Container>
          <Row alignItems="center">
            <Col col xl="3">
              <PlayerControls
                closestTrackIsExist={this.closestTrackIsExist.bind(this)}
                setCurrentTrackClosest={this.setCurrentTrackClosest.bind(this)}
              />
            </Col>
            <Col col xl="6">
              <DraggableControls>
                <Timeline setTrackPosition={(value) => this.setSeek(value)} />
                <span style={{marginLeft: 'auto'}}><VolumeBar /></span>
              </DraggableControls>
            </Col>
            <Col col xl="3">
              <PlayerQueue />
            </Col>
          </Row>
        </Container>
      </PlayerWrapper> 
    )
  }
}

Player.propTypes = {
  playlist: PropTypes.arrayOf(PropTypes.object)
}

export default connect(({player}) => player, {playToggle, playlistFetch, setCurrentTrack, setTrackPosition})(Player)