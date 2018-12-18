import ReactHowler from 'react-howler'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import raf from 'raf' // requestAnimationFrame polyfill
import styled from 'styled-components'

import SkipPreviousIcon from '@material-ui/icons/SkipPrevious'
import SkipNextIcon from '@material-ui/icons/SkipNext'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline'
import RepeatIcon from '@material-ui/icons/Repeat'
import ShuffleIcon from '@material-ui/icons/Shuffle'

import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd'
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'

import PlayerCore from './PlayerCore'

import PlayerButton from '../PlayerButton'

import Timeline from '../Timeline'
import VolumeBar from '../VolumeBar'
import TrackInfo from '../TrackInfo'
import Playlist from '../Playlist'
import PlaylistQueue from './PlaylistQueue'
import Dropdown from '../Dropdown'


const PlayerWrapper = styled.div`
  position: fixed;
  background-color: ${props => props.theme.colorMainBg};
  border-top: 1px solid #E6E6E6;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 15px 25px;
`

const PlayerInner = styled.div`
  width: 1190px;
  margin: auto;
  display: flex;
  align-items: center;
`

const PlayButtonsGroup = styled.div`
  margin-right: auto;
  display: flex;
  align-items: center;
  width: 25%;
  max-width: 25%;
  flex-basis: 25%;
`

const PlaylistElementsGroup = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  width: 25%;
  max-width: 25%;
  flex-basis: 25%;
`


class Player extends Component {
  state = {
    playlist: this.props.playlist,
    nowPlaying: false,
    volume: 1,
    muted: false,
    currentTrackID: this.props.playlist[0].id,
    currentTrackPosition: null,
    repeatingTrack: false,
    playlistShuffled: false
  }

  componentWillUnmount () {
    this.clearRAF()
  }

  seachTrackByID = (id) => (
    this.state.playlist.find(track => track.id === id)
  )

  searchTrackArrayIndex = (id) => (
    this.state.playlist.indexOf(this.seachTrackByID(id))
  )

  setCurrentTrack = (id) => {
    this.setState({
      currentTrackID: id
    })
  }

  closestTrackExist = (index) => {
    const { playlist, currentTrackID } = this.state
    const currentTrack = this.seachTrackByID(currentTrackID)
    const currentTrackIndex = playlist.indexOf(currentTrack)
    
    return playlist.includes(playlist[currentTrackIndex + index]) ? true : false
  }

  setCurrentTrackClosest = (index) => {
    const { playlist, currentTrackID } = this.state
    const currentTrack = this.seachTrackByID(currentTrackID)
    const currentTrackIndex = playlist.indexOf(currentTrack)

    const nextTrackIndex = currentTrackIndex + index

    if (this.closestTrackExist(index)) this.handleChangeTrack(playlist[nextTrackIndex].id)
  }

  handleChangeTrack = (id, nowPlay) => {
    this.setState({
      currentTrackID: id,
      nowPlaying: nowPlay ? nowPlay : this.state.nowPlaying,
      currentTrackPosition: null
    })
  }

  renderSeekPos () {
    this.setState({
      currentTrackPosition: this.player.seek()
    })
    if (this.state.nowPlaying) {
      this._raf = raf(() => this.renderSeekPos())
    }
  }

  handlePlayToggle = () => {
    this.setState({
      nowPlaying: !this.state.nowPlaying
    })
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

  setSeek (rewindTo) {
    this.setState({
      currentTrackPosition: this.player.seek(rewindTo)
    })
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
      let getRandomIndex = this.getRandomInt(1, prevIndexesSequence.length) - 1

      shuffledPlaylist.push(playlist[prevIndexesSequence[getRandomIndex]])
      prevIndexesSequence.splice(getRandomIndex, 1)
    }
    
    return shuffledPlaylist
  }


  getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  render() {
    const { playlist, nowPlaying, volume, muted, currentTrackID, currentTrackPosition, repeatingTrack, playlistShuffled } = this.state

    const currentTrack = this.seachTrackByID(currentTrackID)
    const playQueueButton = <PlayerButton ><PlaylistPlayIcon /></PlayerButton>

    return (
      <PlayerWrapper>
        <PlayerInner>
          {/* PLAYER CORE REACT HOWLER */}
          <ReactHowler
            src={currentTrack.src}
            playing={nowPlaying}
            volume={volume}
            mute={muted}
            ref={(ref) => (this.player = ref)}
            onPlay={() => this.renderSeekPos()}
            onEnd={() => this.handleOnEnd()}
          />
          <PlayerCore />
          {/* /PLAYER CORE REACT HOWLER */}

          <PlayButtonsGroup>
            <PlayerButton
              onClick={() => this.setCurrentTrackClosest(-1)}
              iconSize={28}
              pseudoSelActive
              disabled={this.closestTrackExist(-1) ? false : true}
            >
              <SkipPreviousIcon />
            </PlayerButton>
            <PlayerButton
              onClick={() => this.handlePlayToggle()}
              iconSize={32}
              pseudoSelActive
            >
              {!nowPlaying
                ? <PlayCircleOutlineIcon />
                : <PauseCircleOutlineIcon />
              }        
            </PlayerButton>
            <PlayerButton
              onClick={() => this.setCurrentTrackClosest(1)}
              iconSize={28}
              pseudoSelActive
              disabled={this.closestTrackExist(1) ? false : true}
            >
              <SkipNextIcon />
            </PlayerButton>
            <div style={{marginLeft: '25px'}}>
              <PlayerButton
                onClick={() => this.repeatToggle()}
                active={repeatingTrack}
              >
                <RepeatIcon /> 
              </PlayerButton>
              <PlayerButton
                onClick={() => this.shuffleToggle()}
                active={playlistShuffled}
              >
                <ShuffleIcon /> 
              </PlayerButton>
            </div>
          </PlayButtonsGroup>
          {/* /PLAY BUTTONS GROUP */}

          <Timeline
            nowPlaying={nowPlaying}
            trackDuration={currentTrack.duration}
            currentTrackPosition={currentTrackPosition}
            seek={(rewindTo) => this.setSeek(rewindTo)}
          />
          <VolumeBar
            volume={volume}
            muted={muted}
            muteToggle={() => this.muteToggle()}
            setVolume={(value) => this.setVolume(value)}
          />

          {/* PLAYLIST ELEMENTS GROUP */}
          <PlaylistElementsGroup>
            <TrackInfo {...currentTrack}/>
            <div style={{marginLeft: 'auto'}}>
              <div style={{display: 'inline-block'}}>
                <Dropdown selector={playQueueButton}>
                  <PlaylistQueue>
                    <Playlist
                      playlist={playlist}
                      currentTrackID={currentTrackID}
                      setTrack={this.handleChangeTrack}
                      playToggle={this.handlePlayToggle}
                      nowPlaying={nowPlaying}
                    />
                  </PlaylistQueue>
                </Dropdown>
              </div>
            </div>
          </PlaylistElementsGroup>
          {/* /PLAYLIST ELEMENTS GROUP */}

        </PlayerInner>
      </PlayerWrapper> 
    )
  }
}

Player.propTypes = {
  playlist: PropTypes.arrayOf(PropTypes.object)
}

export default Player