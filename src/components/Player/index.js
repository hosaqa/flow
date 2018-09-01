import ReactHowler from 'react-howler'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import raf from 'raf' // requestAnimationFrame polyfill
import './Player.css'

import Timeline from '../Timeline'


class Player extends Component {

  state = {
    nowPlaying: false,
    volume: 1,
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

  handleOnPlay () {
    this.setState({
      nowPlaying: true
    })
    this.renderSeekPos()
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

  render() {
    const track = this.props.playlist[this.state.currentTrack]

    return (
      <div className='player'>
        <ReactHowler
          src={track.src}
          playing={this.state.nowPlaying}
          ref={(ref) => (this.player = ref)}

          onPlay={() => this.handleOnPlay()}
          onEnd={() => this.handleOnEnd()}
        />
        <button onClick={() => this.handleChangeTrack(-1)}>
          <i className="material-icons">
            skip_previous
          </i>        
        </button>
        <button onClick={() => this.handleToggle()}>
          {!this.state.nowPlaying
            ? <i className="material-icons">play_arrow</i>
            : <i className="material-icons">pause</i>
          }        
        </button>
        <button onClick={() => this.handleChangeTrack(1)}>
          <i className="material-icons">
            skip_next
          </i>        
        </button>
        <Timeline player={this.player} onSeek={(rewindTo) => this.setSeek(rewindTo)} trackDuration={track.duration} currentTrackPosition={this.state.currentTrackPosition} nowPlaying={this.state.nowPlaying} />
        <div>
          <button onClick={() => this.letsSeek()}>GOGOGO</button>
        </div>
      </div> 

    );
  }
}

Player.propTypes = {
  playlist: PropTypes.arrayOf(PropTypes.object)
}

export default Player