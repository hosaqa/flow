import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ReactHowler from 'react-howler'

import { toggle, playlistFetch, setCurrentTrack } from '../../actions/PlayerActions'

class PlayerCore extends Component {



  render() {
    console.log(this.props)
    const { playlistIsLoading, playlistFetchFailed, trackIsLoading, playingNow, playlist, track, trackPosition } = this.props
    return (
      <div>
        {
          playlistIsLoading && 'playlist loading...'
        }
        <button onClick={this.props.toggle}>
          Toggle
        </button>
        <button onClick={this.props.playlistFetch}>
          Click
        </button>
        <button onClick={() => this.props.setCurrentTrack(2)}>
          change
        </button>
        
        {
          playlist &&
          <ReactHowler
            src={track || playlist[0].src}
            playing={playingNow}
          />
        }
      </div>
    );
  }
}

PlayerCore.propTypes = {
  playingNow: PropTypes.bool,
  playlist: PropTypes.arrayOf(PropTypes.object),
  track: PropTypes.string,
  time: PropTypes.number
}

export default connect(({player}) => player, {toggle, playlistFetch, setCurrentTrack})(PlayerCore)