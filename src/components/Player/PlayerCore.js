import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ReactHowler from 'react-howler'

import { playToggle, playlistFetch, setCurrentTrack } from '../../actions/PlayerActions'

import { searchTrackByID } from '../../utils'

class PlayerCore extends Component {
  componentDidMount() {
    this.props.playlistFetch()
  }

  setSeek (rewindTo) {
    this.player.seek(rewindTo)
  }

  render() {
    const { playlistIsLoading, playlistFetchFailed, trackIsLoading, playingNow, playlist, track, trackPosition } = this.props
  
    if (!playlist) return null

    return (
      <div>
      <ReactHowler
        ref={(ref) => (this.player = ref)}
        src={searchTrackByID(playlist, track).src}
        playing={playingNow}
      />
      <button onClick={() => this.setSeek(25)}
      >click</button>
      </div>

    );
  }
}

PlayerCore.propTypes = {
  playingNow: PropTypes.bool,
  playlist: PropTypes.arrayOf(PropTypes.object),
  track: PropTypes.number,
  time: PropTypes.number
}

export default connect(({player}) => player, {playlistFetch})(PlayerCore)