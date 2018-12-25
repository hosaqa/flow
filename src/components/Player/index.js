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
import { playToggle, playlistFetch, setCurrentTrack, setTrackPosition } from '../../actions/PlayerActions'
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

  handleOnEnd () {
    if (!this.state.repeatingTrack) {
      const nextTrackExist = this.closestTrackExist(1)

      if (!nextTrackExist) {
        this.setState({
          nowPlaying: false,
          currentTrackPosition: null
        })
        
        this.clearRAF()
      } else {
        this.setCurrentTrackClosest(1)
      }
    }
  }

  clearRAF () {
    raf.cancel(this._raf)
  }

  // ok
  setVolume(value) {
    this.setState({
      muted: false,
      volume: value
    })
  }

  muteToggle() {
    if (this.state.volume) {
      this.setState({
        muted: !this.state.muted
      })
    }
  }

  repeatToggle() {
    this.setState({
      repeatingTrack: !this.state.repeatingTrack
    })
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



  render() {
    const { playlistIsLoading, playlistFetchFailed, trackIsLoading, playingNow, playlist, track, trackPosition } = this.props

    if (!playlist) return null

    


    return (
      <PlayerWrapper>
        <ReactHowler
          ref={(ref) => (this.player = ref)}
          src={searchTrackByID(playlist, track).src}
          playing={playingNow}
          onPlay={() => this.setSeekPos()}
        />
        <Dashboard>
          <Grid
            verticalAlign={'center'}
          >
            <Grid.Unit size={1/4}>
              <PlayerControls />
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