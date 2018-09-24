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

const PlayerButton = styled.button`
  -webkit-user-select: none;
  -webkit-appearance: none;
  position: relative;
  padding: 0 6px;
  border: 0;
  outline: 0;
  background-color: transparent;
  color: ${props => props.active ? props.theme.colorAccent : props.theme.colorButtons};
  transition: color .15s, transform .15s;

  & > svg {
    font-size: ${props => props.iconSize ? props.iconSize : '24px'};
  }

  &:active {
    & > svg {
      color: ${props => props.theme.colorAccent};
    }
  }
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
    nowPlaying: false,
    volume: 1,
    muted: false,
    currentTrack: 0,
    currentTrackPosition: null,
    repeatTrack: false,
    shufflePlaylist: false
  }

  componentWillUnmount () {
    this.clearRAF()
  }

  handlePlay() {
    this.setState({
      nowPlaying: !this.state.nowPlaying
    })
    this.renderSeekPos()
  }

  handleChangeTrack = (id) => {
    this.props.playlist.forEach((track, index) => {
      if (track.id === id) this.setState({
        currentTrack: index,
        nowPlaying: this.state.nowPlaying,
        currentTrackPosition: null
      })
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
      if (!this.props.playlist[this.state.currentTrack + 1]) {
        this.setState({
          nowPlaying: false,
          currentTrackPosition: null
        })
        
        this.clearRAF()
      } else {
        this.handleChangeTrack(this.props.playlist[this.state.currentTrack + 1].id)
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
      repeatTrack: !this.state.repeatTrack
    }) 
  }

  render() {
    const track = this.props.playlist[this.state.currentTrack]

    return (
      <PlayerWrapper>
        <PlayerInner>
          {/* PLAYER CORE REACT HOWLER */}
          <ReactHowler
            src={track.src}
            playing={this.state.nowPlaying}
            volume={this.state.volume}
            mute={this.state.muted}
            ref={(ref) => (this.player = ref)}
            onPlay={() => this.renderSeekPos()}
            onEnd={() => this.handleOnEnd()}
          />
          {/* /PLAYER CORE REACT HOWLER */}

          {/* PLAY BUTTONS GROUP */}
          <PlayButtonsGroup>
            <PlayerButton
              onClick={() => {
                if (this.props.playlist[this.state.currentTrack - 1]) {
                  this.handleChangeTrack(this.props.playlist[this.state.currentTrack - 1].id)
                }
              }}
              iconSize={'28px'}
            >
              <SkipPreviousIcon />
            </PlayerButton>
            <PlayerButton
              onClick={() => this.handleToggle()}
              iconSize={'32px'}  
            >
              {!this.state.nowPlaying
                ? <PlayCircleOutlineIcon /> 
                : <PauseCircleOutlineIcon /> 
              }        
            </PlayerButton>
            <PlayerButton
              onClick={() => {
                if (this.props.playlist[this.state.currentTrack + 1]) {
                  this.handleChangeTrack(this.props.playlist[this.state.currentTrack + 1].id)
                }
              }}
              iconSize={'28px'}
              style={{marginRight: '25px'}}
            >
              <SkipNextIcon />
            </PlayerButton>
            <PlayerButton
              onClick={() => this.repeatToggle()}
              active={this.state.repeatTrack}
            >
              <RepeatIcon /> 
            </PlayerButton>
            <PlayerButton>
              <ShuffleIcon /> 
            </PlayerButton>
          </PlayButtonsGroup>
          {/* /PLAY BUTTONS GROUP */}


          <Timeline
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
          />

          {/* PLAYLIST ELEMENTS GROUP */}
          <PlaylistElementsGroup>
            <TrackInfo
              track={track.name}
              artist={track.artist}
              album={track.album}
              img={track.img}
            />
            <PlayerButton style={{marginLeft: 'auto'}}>
              <FavoriteBorderIcon />
            </PlayerButton>
            <PlayerButton >
              <PlaylistAddIcon />
            </PlayerButton>
            <PlayerButton >
              <PlaylistPlayIcon />
              <Playlist
                playlist={this.props.playlist}
                currentTrackID={this.props.playlist[this.state.currentTrack].id}
                play={this.handleChangeTrack}
              />
            </PlayerButton>
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