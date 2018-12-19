import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ReactHowler from 'react-howler'

import { toggle, playlistFetch } from '../../actions/PlayerActions'

class PlayerCore extends Component {



  render() {
    const { playlistIsLoading, playlistFetchFailed, trackIsLoading, playingNow, playlist, track, time } = this.props
    return (
      <div>
        {
          playlistIsLoading && 'playlist loading...'
        }
        <button onClick={this.props.playlistFetch}>
          Click
        </button>
        {
          playlist &&
          <ReactHowler
            src={playlist[0].src}
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
  track: PropTypes.object,
  time: PropTypes.number
}

export default connect(({player}) => player, {toggle, playlistFetch})(PlayerCore)