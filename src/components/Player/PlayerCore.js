import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ReactHowler from 'react-howler'

import { toggle, fetchPlaylist } from '../../actions/PlayerActions'

class PlayerCore extends Component {



  render() {
    const { playingNow, playlist, track, time } = this.props

    const getSrc = () => {
      if (playlist) {
        return playlist[1].src
      } else {
        return 'lil_uzi-xo_tour.mp3'
      }
    }
    console.log(getSrc())
    return (
      <div>
        <button onClick={this.props.fetchPlaylist}>
          Click
        </button>
        <ReactHowler
          src={getSrc()}
          playing={playingNow}
        />
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

export default connect(({player}) => player, {toggle, fetchPlaylist})(PlayerCore)