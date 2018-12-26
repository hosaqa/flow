import ReactHowler from 'react-howler'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import raf from 'raf' // requestAnimationFrame polyfill
import styled from 'styled-components'
import Grid from 'styled-components-grid';

import PlayerControls from './PlayerControls'
import Timeline from '../Timeline'
import VolumeBar from '../VolumeBar'
import PlayerQueue from './PlayerQueue'
import { playToggle, playlistFetch, setCurrentTrack, setTrackPosition, setVolume, muteToggle } from '../../actions/PlayerActions'
import { searchTrackByID, getRandomInt } from '../../utils'


const PlayerWrapper = styled.div`
  position: fixed;
  background-color: ${props => props.theme.colorMainBg};
  border-top: 1px solid #E6E6E6;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 15px 25px;
`

const Dashboard = styled.div`
  width: 1024px;
  margin: auto;
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
    const { playlist, track } = this.props

    if (!playlist) return false

    const currentTrack = searchTrackByID(playlist, track)
    const currentTrackIndex = playlist.indexOf(currentTrack)
    
    return playlist.includes(playlist[currentTrackIndex + index]) ? true : false
  }

  setCurrentTrackClosest (index) {
    const { playlist, track, setCurrentTrack } = this.props

    const currentTrack = searchTrackByID(playlist, track)
    const currentTrackIndex = playlist.indexOf(currentTrack)

    const nextTrackIndex = currentTrackIndex + index
    if (this.closestTrackIsExist(index)) setCurrentTrack(playlist[nextTrackIndex].id)
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

  shuffleToggle() {
    this.setState({
      playlistShuffled: !this.state.playlistShuffled,
      playlist: this.shufflePlaylist()
    })
  }

  shufflePlaylist = () => {
    if (this.state.playlistShuffled) return this.props.playlist

    const { playlist } = this.state
    const playlistLength = playlist.length

    let prevIndexesSequence = [...Array(playlistLength).keys()]
    let shuffledPlaylist = []

    while (prevIndexesSequence.length > 0) {
      let getRandomIndex = getRandomInt(1, prevIndexesSequence.length) - 1

      shuffledPlaylist.push(playlist[prevIndexesSequence[getRandomIndex]])
      prevIndexesSequence.splice(getRandomIndex, 1)
    }
    
    return shuffledPlaylist
  }

  clearRAF () {
    raf.cancel(this._raf)
  }

  render() {
    const { playingNow, playlist, track,  volume, muted } = this.props

    if (!playlist) return null

    return (
      <PlayerWrapper>
        <ReactHowler
          ref={(ref) => (this.player = ref)}
          src={searchTrackByID(playlist, track).src}
          playing={playingNow}
          onPlay={() => this.setSeekPos()}
          onEnd={() => this.handleOnEnd()}
          volume={volume}
          mute={muted}
        />
        <Dashboard>
          <Grid
            verticalAlign={'center'}
          >
            <Grid.Unit size={1/4}>
              <PlayerControls
                closestTrackIsExist={this.closestTrackIsExist.bind(this)}
                setCurrentTrackClosest={this.setCurrentTrackClosest.bind(this)}
              />
            </Grid.Unit>
            <Grid.Unit size={1/2}>
              <Timeline setTrackPosition={(value) => this.setSeek(value)} />
              <VolumeBar />
            </Grid.Unit>
            <Grid.Unit size={1/4}>
              <PlayerQueue />
            </Grid.Unit>
          </Grid>
        </Dashboard>
      </PlayerWrapper> 
    )
  }
}

Player.propTypes = {
  playlist: PropTypes.arrayOf(PropTypes.object)
}

export default connect(({player}) => player, {playToggle, playlistFetch, setCurrentTrack, setTrackPosition})(Player)