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

import PlayerButton from '../PlayerButton'

import Timeline from '../Timeline'
import VolumeBar from '../VolumeBar'
import TrackInfo from '../TrackInfo'
import Playlist from '../Playlist'


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
    shufflePlaylist: false
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

  setCurrentTrackPrev = () => {
    const currentTrackIndex = this.searchTrackArrayIndex(this.state.currentTrackID)

    return (currentTrackIndex !== 0 ) ? this.setCurrentTrack(this.state.playlist[currentTrackIndex - 1].id) : false
  }

  setCurrentTrackNext = () => {
    const currentTrackIndex = this.searchTrackArrayIndex(this.state.currentTrackID)
    const { playlist } = this.state

    return (currentTrackIndex !== playlist.length - 1) ? this.setCurrentTrack(playlist[currentTrackIndex + 1].id) : false
  } 

  handleChangeTrack = (id, nowPlay) => {
    this.setState({
      currentTrack: id,
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

  handleToggle () {
    this.setState({
      nowPlaying: !this.state.nowPlaying
    })
  }

  handleOnEnd () {
    if (!this.state.repeatTrack) {
      if (!this.state.playlist[this.state.currentTrack + 1]) {
        this.setState({
          nowPlaying: false,
          currentTrackPosition: null
        })
        
        this.clearRAF()
      } else {
        this.handleChangeTrack(this.state.playlist[this.state.currentTrack + 1].id)
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

  getCurrentTrackIndex(){

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

  render() {
    const { playlist, nowPlaying, volume, muted, currentTrackID, currentTrackPosition, repeatingTrack, shufflePlaylist } = this.state

    const currentTrack = this.seachTrackByID(currentTrackID)
    
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
          {/* /PLAYER CORE REACT HOWLER */}

          <PlayButtonsGroup>
            <PlayerButton
              onClick={this.setCurrentTrackPrev}
              iconSize={28}
              pseudoSelActive
              disabled={() => !this.setCurrentTrackPrev()}
            >
              <SkipPreviousIcon />
            </PlayerButton>
            <PlayerButton
              onClick={() => this.handleToggle()}
              iconSize={32}
              pseudoSelActive
            >
              {!nowPlaying
                ? <PlayCircleOutlineIcon /> 
                : <PauseCircleOutlineIcon /> 
              }        
            </PlayerButton>
            <PlayerButton
              onClick={this.setCurrentTrackNext}
              iconSize={28}
              pseudoSelActive
              disabled={() => !this.setCurrentTrackNext()}
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
              <PlayerButton>
                <ShuffleIcon /> 
              </PlayerButton>
            </div>
          </PlayButtonsGroup>
          {/* /PLAY BUTTONS GROUP */}


          {/* <Timeline
            nowPlaying={this.state.nowPlaying}
            trackDuration={track.duration}
            currentTrackPosition={this.state.currentTrackPosition}  
            seek={(rewindTo) => this.setSeek(rewindTo)}
          />
          <VolumeBar
            volume={this.state.volume}
            muted={this.state.muted}
            muteToggle={() => this.muteToggle()}
            setVolume={(value) => this.setVolume(value)}
          /> */}

          {/* PLAYLIST ELEMENTS GROUP */}
          {/* <PlaylistElementsGroup>
            <TrackInfo {...track}/>
            <div style={{marginLeft: 'auto'}}>
              <PlayerButton>
                <FavoriteBorderIcon />
              </PlayerButton>
              <PlayerButton >
                <PlaylistAddIcon />
              </PlayerButton>
              <PlayerButton >
                <PlaylistPlayIcon />
                <Playlist
                  playlist={this.state.playlist}
                  currentTrackID={this.state.playlist[this.state.currentTrack].id}
                  play={this.handleChangeTrack}
                  nowPlaying={this.state.nowPlaying}
                />
              </PlayerButton>
            </div>
          </PlaylistElementsGroup> */}
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