import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactHowler from 'react-howler';
import Swipe from 'react-easy-swipe';
import OutsideClickHandler from 'react-outside-click-handler';
import raf from 'raf'; // requestAnimationFrame polyfill
import styled from '@emotion/styled';
import { Container } from 'styled-bootstrap-grid';
import RepeatIcon from '@material-ui/icons/Repeat';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import TrackInfo from '../app/common/UI/TrackInfo';
import PlayerButton from '../app/common/UI/PlayerButton';
import PlayControls from './PlayControls';
import TimelineControl from './TimelineControl';
import VolumeControl from './VolumeControl';
import PlayerQueue from './PlayerQueue';
import {
  playToggle,
  setCurrentTrack,
  fetchTrackResult,
  fetchPlaylist,
  repeatToggle,
  shuffleToggle,
} from './actions';
import { isDesktop, isNumeric } from '../utils';

const Wrapper = styled.section`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing(1)}px 0 ${theme.spacing(2)}px`};
  background-color: ${({ theme }) => theme.palette.background.primary};
  border-top: 1px solid ${({ theme }) => theme.palette.border.primary};
  transition: background-color ${({ theme }) => theme.transitions.default}ms,
    transform ${({ theme }) => theme.transitions.default}ms;
  transform: translateY(
    ${({ theme, additionalControlsIsVisible }) =>
      additionalControlsIsVisible ? 0 : `${theme.spacing(9)}px`}
  );

  ${({ theme }) => theme.mediaQueries.up('lg')} {
    transform: none;
    padding: ${({ theme }) => `${theme.spacing(2)}px 0`};
  }
`;

const Quene = styled(PlayerQueue)`
  ${({ theme }) => theme.mediaQueries.up('lg')} {
    order: 7;
  }
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.up('lg')} {
    justify-content: flex-start;
    flex-wrap: nowrap;
  }

  ${({ theme }) => theme.mediaQueries.up('xl')} {
    padding: 0 ${({ theme }) => theme.spacing(2)}px;
  }
`;

const PlayControlsStyled = styled(PlayControls)`
  margin: 0 0 0 auto;
  padding: ${({ theme }) => `0 ${theme.spacing(2)}px 0 ${theme.spacing(1)}px`}
    ${({ theme }) => theme.mediaQueries.up('lg')} {
    order: -1;
    padding: 0;
    margin: 0 ${({ theme }) => theme.spacing(4)}px 0 0;
  }

  ${({ theme }) => theme.mediaQueries.up('xl')} {
    margin: 0 ${({ theme }) => theme.spacing(5)}px 0 0;
  }
`;

const TimelineControlStyled = styled(TimelineControl)`
  width: 100%;
  margin: ${({ theme }) => theme.spacing(1.5)}px 0;

  ${({ theme }) => theme.mediaQueries.up('lg')} {
    order: 4;
    margin: 0;
  }
`;

const ShuffleButton = styled(PlayerButton)`
  ${({ theme }) => theme.mediaQueries.up('lg')} {
    order: 3;
    margin: 0 ${({ theme }) => theme.spacing(8)}px 0 0;
  }
`;

const RepeatButton = styled(PlayerButton)`
  ${({ theme }) => theme.mediaQueries.up('lg')} {
    order: 2;
  }
`;

const VolumeControlStyled = styled(VolumeControl)`
  ${({ theme }) => theme.mediaQueries.up('lg')} {
    order: 5;
    margin: 0 0 0 ${({ theme }) => theme.spacing(2)}px;
  }
`;

const CurrentTrackInfo = styled(TrackInfo)`
  ${({ theme }) => theme.mediaQueries.up('lg')} {
    order: 6;
    margin: 0 ${({ theme }) => theme.spacing(2)}px 0
      ${({ theme }) => theme.spacing(3)}px;
  }
`;

const Player = ({
  trackIsLoading,
  playingNow,
  repeating,
  playlist,
  shuffledPlaylist,
  currentTrackID,
  playToggle,
  fetchPlaylist,
  setCurrentTrack,
  fetchTrackResult,
  repeatToggle,
  shuffleToggle,
}) => {
  const [trackPosition, setTrackPosition] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMute] = useState(false);

  const currentPlaylist = playlist
    ? shuffledPlaylist
      ? shuffledPlaylist
      : playlist
    : null;

  const currentTrack = currentPlaylist
    ? currentPlaylist.find(track => track.id === currentTrackID)
    : null;
  const currentTrackIndex = currentTrack
    ? currentPlaylist.indexOf(currentTrack)
    : null;

  const prevTrack = currentTrack
    ? currentPlaylist[currentTrackIndex - 1]
    : null;
  const nextTrack = currentTrack
    ? currentPlaylist[currentTrackIndex + 1]
    : null;

  const prevTrackID = prevTrack ? prevTrack.id : null;
  const nextTrackID = nextTrack ? nextTrack.id : null;

  useEffect(() => {
    // wtf?
    setTrackPosition(0);
  }, [playlist]);

  const [
    additionalControlsIsVisible,
    setAdditionalControlsVisibility,
  ] = useState(false);

  const [queneIsVisible, setQueneVisibility] = useState(false);

  const playerRef = useRef(null);
  let playerRAF = null;

  useEffect(() => {
    fetchPlaylist();
  }, []);

  const setSeek = rewindTo => {
    setTrackPosition(rewindTo);
    playerRef.current.seek(rewindTo);
  };

  const setSeekPos = () => {
    let trackPosition = playerRef.current.seek();
    trackPosition = isNumeric(trackPosition) ? trackPosition : 0;

    setTrackPosition(trackPosition);

    playerRAF = raf(() => setSeekPos());
  };

  const clearRAF = () => {
    raf.cancel(playerRAF);
  };

  const handleOnEnd = () => {
    if (!repeating) {
      if (!nextTrackID) {
        playToggle();

        clearRAF();
      } else {
        setCurrentTrack(nextTrackID);
      }
    }
  };

  const handleSwipeUp = () => {
    setAdditionalControlsVisibility(true);
  };

  const interfaceDisabled = !currentPlaylist;

  return (
    <OutsideClickHandler
      onOutsideClick={() => setAdditionalControlsVisibility(false)}
      disabled={isDesktop() || !additionalControlsIsVisible || queneIsVisible}
    >
      <Swipe
        onSwipeUp={() => {
          handleSwipeUp();
        }}
        onSwipeDown={() => {
          if (!queneIsVisible) setAdditionalControlsVisibility(false);
        }}
      >
        <Wrapper
          additionalControlsIsVisible={additionalControlsIsVisible}
          onClick={() => setAdditionalControlsVisibility(true)}
        >
          {!interfaceDisabled && (
            <ReactHowler
              ref={playerRef}
              src={currentTrack.src}
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
            <Row>
              <CurrentTrackInfo {...currentTrack} />
              <PlayControlsStyled
                disabled={interfaceDisabled}
                playingNow={playingNow}
                prevTrackID={prevTrackID}
                nextTrackID={nextTrackID}
                setCurrentTrack={setCurrentTrack}
                playToggle={playToggle}
              />
              <TimelineControlStyled
                disabled={interfaceDisabled}
                trackIsLoading={trackIsLoading}
                currentTrack={currentTrack}
                trackPosition={trackPosition}
                setTrackPosition={setSeek}
              />
              <RepeatButton
                onClick={repeatToggle}
                activated={repeating}
                disabled={interfaceDisabled}
              >
                <RepeatIcon />
              </RepeatButton>
              <ShuffleButton
                onClick={shuffleToggle}
                activated={!!shuffledPlaylist}
                disabled={interfaceDisabled}
              >
                <ShuffleIcon />
              </ShuffleButton>
              <VolumeControlStyled
                disabled={interfaceDisabled}
                volume={volume}
                setVolume={setVolume}
                muted={muted}
                setMute={setMute}
              />

              <Quene
                disabled={interfaceDisabled}
                playlist={currentPlaylist}
                isOpen={queneIsVisible}
                setVisibility={setQueneVisibility}
              />
            </Row>
          </Container>
        </Wrapper>
      </Swipe>
    </OutsideClickHandler>
  );
};

Player.propTypes = {
  trackIsLoading: PropTypes.bool,
  playingNow: PropTypes.bool,
  repeating: PropTypes.bool,
  playlist: PropTypes.array, // TODO: описание типов!
  shuffledPlaylist: PropTypes.array,
  currentTrackID: PropTypes.string,

  playToggle: PropTypes.func,
  fetchPlaylist: PropTypes.func,
  setCurrentTrack: PropTypes.func,
  fetchTrackResult: PropTypes.func,
  repeatToggle: PropTypes.func,
  shuffleToggle: PropTypes.func,
};

export default connect(
  ({ player }) => ({ ...player }),
  {
    playToggle,
    fetchPlaylist,
    setCurrentTrack,
    fetchTrackResult,
    repeatToggle,
    shuffleToggle,
  }
)(Player);
