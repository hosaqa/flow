import ReactHowler from 'react-howler';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import raf from 'raf'; // requestAnimationFrame polyfill
import styled from 'styled-components';
import { Container, Row, Col, BaseCSS } from 'styled-bootstrap-grid';
import PlayerControls from './PlayerControls';
import Timeline from '../Timeline';
import VolumeBar from '../VolumeBar';
import PlayerQueue from './PlayerQueue';
import { playToggle, playlistFetch, setCurrentTrack, trackLoadSuccess } from '../../actions/PlayerActions';
import { setTrackPosition } from '../../actions/TrackTimeActions';
import { searchTrackByID } from '../../utils';


const PlayerWrapper = styled.div`
  position: fixed;
  background-color: ${({inactive, theme}) => 
    inactive ? theme.colors.contentPreload : theme.colors.content
  };
  border-top: 1px solid ${({theme}) => theme.colors.border};
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 15px 25px;
  transition: background-color .3s;
`;

const DraggableControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

class Player extends Component {
  constructor(props) {
    super(props);
    this.closestTrackIsExist = this.closestTrackIsExist.bind(this);
    this.setCurrentTrackClosest = this.setCurrentTrackClosest.bind(this);
  }

  componentDidMount() {
    const {playlistFetch} = this.props;
    playlistFetch();
  }

  componentWillUnmount () {
    this.clearRAF();
  }


  setSeek (rewindTo) {
    const {setTrackPosition} = this.props;
    setTrackPosition(rewindTo);
    this.player.seek(rewindTo);
  }

  setSeekPos () {
    const { playingNow, setTrackPosition } = this.props;

    setTrackPosition(this.player.seek());

    if (playingNow) {
      this._raf = raf(() => this.setSeekPos());
    }
  }

  closestTrackIsExist (index) {
    const { playlist, track, shuffledPlaylist } = this.props;
    
    if (!playlist) return false;

    const currentPlaylist = (shuffledPlaylist) || playlist;

    const currentTrack = searchTrackByID(currentPlaylist, track);
    const currentTrackIndex = currentPlaylist.indexOf(currentTrack);

    return !!currentPlaylist.includes(currentPlaylist[currentTrackIndex + index]);
  }

  setCurrentTrackClosest (index) {
    const { playlist, track, setCurrentTrack, shuffledPlaylist } = this.props;

    const currentPlaylist = (shuffledPlaylist) || playlist;

    const currentTrack = searchTrackByID(currentPlaylist, track);
    const currentTrackIndex = currentPlaylist.indexOf(currentTrack);

    const nextTrackIndex = currentTrackIndex + index;
    if (this.closestTrackIsExist(index)) setCurrentTrack(currentPlaylist[nextTrackIndex].id);
  }

  handleOnEnd () {
    const { playToggle, repeating } = this.props;

    if (!repeating) {
      const nextTrackExist = this.closestTrackIsExist(1);

      if (!nextTrackExist) {
        playToggle();
        
        this.clearRAF();
      } else {
        this.setCurrentTrackClosest(1);
      }
    }
  }

  clearRAF () {
    raf.cancel(this._raf);
  }

  render() {
    const { playingNow, playlist, track,  volume, muted, shuffledPlaylist, trackLoadSuccess } = this.props;
    
    const currentPlaylist = (shuffledPlaylist) || playlist;

    return (
      <PlayerWrapper
        inactive={!playlist}
      >
        {
          playlist &&
          <ReactHowler
            ref={ref => {this.player = ref;}}
            src={searchTrackByID(currentPlaylist, track).src}
            playing={playingNow}
            preload
            onPlay={() => this.setSeekPos()}
            onEnd={() => this.handleOnEnd()}
            onLoad={() => trackLoadSuccess(true)}
            // onLoad={()=>{console.log('bee');}}
            volume={volume}
            mute={muted}
          />
        } 
        <BaseCSS /> 
        <Container>
          <Row alignItems="center">
            <Col col xl="3">
              <PlayerControls
                closestTrackIsExist={this.closestTrackIsExist}
                setCurrentTrackClosest={this.setCurrentTrackClosest}
              />
            </Col>
            <Col col xl="6">
              <DraggableControls>
                <Timeline
                  setTrackPosition={(value) => this.setSeek(value)}
                />
                <span style={{marginLeft: 'auto'}}><VolumeBar /></span>
              </DraggableControls>
            </Col>
            <Col col xl="3">
              <PlayerQueue />
            </Col>
          </Row>
        </Container>
      </PlayerWrapper> 
    );
  }
}

Player.propTypes = {
  playlist: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    artist: PropTypes.string,
    trackname: PropTypes.string,
    album: PropTypes.string,
    src: PropTypes.string,
    img: PropTypes.string,
    duration: PropTypes.shape({
      minutes: PropTypes.number,
       seconds: PropTypes.number
    })
  })),
};

export default connect(({player}) => player, {playToggle, playlistFetch, setCurrentTrack, setTrackPosition, trackLoadSuccess})(Player);