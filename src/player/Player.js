import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactHowler from 'react-howler';
import raf from 'raf'; // requestAnimationFrame polyfill
import styled from '@emotion/styled';
import { Container, Row, Col, BaseCSS } from 'styled-bootstrap-grid';
import PlayerControls from './PlayerControls';
import TimelineControl from './TimelineControl';
import VolumeControl from './VolumeControl';
import PlayerQueue from './PlayerQueue';
import {
  playToggle,
  setCurrentTrack,
  fetchTrackResult,
  fetchPlaylist,
} from './actions';
import { searchArrItemByID } from '../utils';

const PlayerWrapper = styled.div`
  position: fixed;
  background-color: ${({ inactive, theme }) =>
    inactive ? theme.colors.contentPreload : theme.colors.content};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  bottom: 0;
  left: 0;
  width: 100%;
  transition: background-color 0.3s;
  height: ${({ theme }) => theme.spacing(9)}px;
  display: flex;
  align-items: center;
`;

const DraggableControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Player = ({
  muted,
  playingNow,
  playlist,
  repeating,
  shuffledPlaylist,
  track,
  volume,
  playToggle,
  fetchPlaylist,
  setCurrentTrack,
  fetchTrackResult,
}) => {
  const [trackPosition, setTrackPosition] = useState(null);
  const playerRef = useRef(null);
  let playerRaf = null;

  useEffect(() => {
    fetchPlaylist();
  }, []);

  const setSeek = rewindTo => {
    setTrackPosition(rewindTo);
    playerRef.current.seek(rewindTo);
  };

  const setSeekPos = () => {
    setTrackPosition(playerRef.current.seek());

    playerRaf = raf(() => setSeekPos());

    // if (playingNow) {
    //   playerRaf = raf(() => setSeekPos());
    // }
  };

  const closestTrackIsExist = index => {
    const currentPlaylist = shuffledPlaylist || playlist;

    const currentTrack = searchArrItemByID(currentPlaylist, track);
    const currentTrackIndex = currentPlaylist.indexOf(currentTrack);

    return !!currentPlaylist.includes(
      currentPlaylist[currentTrackIndex + index]
    );
  };

  const setCurrentTrackClosest = index => {
    const currentPlaylist = shuffledPlaylist || playlist;

    const currentTrack = searchArrItemByID(currentPlaylist, track);
    const currentTrackIndex = currentPlaylist.indexOf(currentTrack);

    const nextTrackIndex = currentTrackIndex + index;
    if (closestTrackIsExist(index))
      setCurrentTrack(currentPlaylist[nextTrackIndex].id);
  };

  const handleOnEnd = () => {
    if (!repeating) {
      const nextTrackExist = closestTrackIsExist(1);

      if (!nextTrackExist) {
        playToggle();

        clearRAF();
      } else {
        setCurrentTrackClosest(1);
      }
    }
  };

  const clearRAF = () => {
    raf.cancel(playerRaf);
  };

  const interfaceDisabled = !playlist;

  const currentPlaylist = shuffledPlaylist || playlist;
  //console.log(trackPosition);
  return (
    <PlayerWrapper>
      <BaseCSS />
      {!interfaceDisabled && (
        <ReactHowler
          ref={playerRef}
          src={searchArrItemByID(currentPlaylist, track).src}
          playing={playingNow}
          onPlay={setSeekPos}
          onEnd={handleOnEnd}
          onLoad={fetchTrackResult}
          onLoadError={() => fetchTrackResult('Loading error')}
          volume={volume}
          mute={muted}
        />
      )}
      <Container>
        <Row alignItems="center">
          <Col col xl="3">
            <PlayerControls
              disabled={interfaceDisabled}
              closestTrackIsExist={closestTrackIsExist}
              setCurrentTrackClosest={setCurrentTrackClosest}
            />
          </Col>
          <Col col xl="6">
            <DraggableControls>
              <TimelineControl
                rr={trackPosition}
                trackPosition={trackPosition}
                setTrackPosition={setSeek}
              />
              <span style={{ marginLeft: 'auto' }}>
                <VolumeControl disabled={interfaceDisabled} />
              </span>
            </DraggableControls>
          </Col>
          <Col col xl="3">
            <PlayerQueue />
          </Col>
        </Row>
      </Container>
    </PlayerWrapper>
  );
};

Player.propTypes = {
  muted: PropTypes.bool,
  playingNow: PropTypes.bool,
  playlist: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      artist: PropTypes.string,
      trackname: PropTypes.string,
      album: PropTypes.string,
      src: PropTypes.string,
      img: PropTypes.string,
      duration: PropTypes.number,
    })
  ),
  repeating: PropTypes.bool,
  shuffledPlaylist: PropTypes.array,
  track: PropTypes.number,
  volume: PropTypes.number,
  playToggle: PropTypes.func,
  fetchPlaylist: PropTypes.func,
  setCurrentTrack: PropTypes.func,
  fetchTrackResult: PropTypes.func,
};

export default connect(
  ({ player }) => ({ ...player }),
  {
    playToggle,
    fetchPlaylist,
    setCurrentTrack,
    fetchTrackResult,
  }
)(Player);
