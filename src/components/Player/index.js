import ReactHowler from 'react-howler'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import raf from 'raf' // requestAnimationFrame polyfill
import styled from 'styled-components'

import Timeline from '../Timeline'
import VolumeBar from '../VolumeBar'
import TrackInfo from '../TrackInfo'


const PlayerWrapper = styled.div`
  position: fixed;
  background-color: #F2F2F2;
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
  padding: 0 8px;
  border: 0;
  outline: 0;
  background-color: transparent;
  color: #1F2023;
  transition: color .15s, transform .15s;

  &:active {
    color: ${props => props.theme.colorAccent};
  }
`

const PlayerTimeline = styled.div`
  padding: 0 20px;
`


class Player extends Component {
  state = {
    nowPlaying: false,
    volume: 1,
    muted: false,
    currentTrack: 0,
    currentTrackPosition: null
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

  handleChangeTrack(index) {
    if (this.props.playlist[this.state.currentTrack + index]) {
      this.setState({
        currentTrack: this.state.currentTrack + index,
        nowPlaying: this.state.nowPlaying,
        currentTrackPosition: null
      })
    }
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
    if (!this.props.playlist[this.state.currentTrack + 1]) {
      this.setState({
        nowPlaying: false,
        currentTrackPosition: null
      })
      
      this.clearRAF()
    } else {
      this.handleChangeTrack(1)
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
      volume: (value < 0) ? 0 : value
    })
  }

  muteToggle() {
    if (this.state.volume) {
      this.setState({
        muted: !this.state.muted
      })      
    }
  }

  render() {
    const track = this.props.playlist[this.state.currentTrack]
    
    return (
      <PlayerWrapper>
        <PlayerInner>
          <ReactHowler
            src={track.src}
            playing={this.state.nowPlaying}
            volume={this.state.volume}
            muted={this.state.muted}
            ref={(ref) => (this.player = ref)}
            onPlay={() => this.renderSeekPos()}
            onEnd={() => this.handleOnEnd()}
          />
          <PlayerButton onClick={() => this.handleChangeTrack(-1)}>
            <i className="material-icons">
              skip_previous
            </i>        
          </PlayerButton>
          <PlayerButton onClick={() => this.handleToggle()}>
            {!this.state.nowPlaying
              ? <i className="material-icons">play_arrow</i>
              : <i className="material-icons">pause</i>
            }        
          </PlayerButton>
          <PlayerButton onClick={() => this.handleChangeTrack(1)}>
            <i className="material-icons">
              skip_next
            </i>        
          </PlayerButton>
          <PlayerButton>
            <i className="material-icons">
              replay
            </i>
          </PlayerButton>
          <PlayerButton>
            <i className="material-icons">
              shuffle
            </i>
          </PlayerButton>
          <PlayerTimeline>
            <Timeline
              nowPlaying={this.state.nowPlaying}
              trackDuration={track.duration}
              currentTrackPosition={this.state.currentTrackPosition}  
              seek={(rewindTo) => this.setSeek(rewindTo)}
            />
          </PlayerTimeline>
          <VolumeBar
            volume={this.state.volume}
            muted={this.state.muted}
            muteToggle={() => this.muteToggle()}
            setVolume={(value) => this.setVolume(value)}
          />
          <TrackInfo
            track={track.track}
            artist={track.artist}
            album={track.album}
            img={track.img}
          />
        </PlayerInner>
      </PlayerWrapper> 
    )
  }
}

Player.propTypes = {
  playlist: PropTypes.arrayOf(PropTypes.object)
}

export default Player