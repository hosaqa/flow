import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactHowler from 'react-howler';
import Swipe from 'react-easy-swipe';
import OutsideClickHandler from 'react-outside-click-handler';
import { useMediaQuery } from 'react-responsive';
import styled from '@emotion/styled';
import { Container } from 'styled-bootstrap-grid';
import RepeatIcon from '@material-ui/icons/Repeat';
import ShuffleIcon from '@material-ui/icons/Shuffle';

import { useLocalStorage } from '../../hooks';
import TrackInfo from '../UI/TrackInfo';
import PlayerButton from '../UI/PlayerButton';
import PlayControls from './PlayControls';
import TimelineControl from './TimelineControl';
import VolumeControl from './VolumeControl';
import PlayerQueue from './PlayerQueue';
import {
  playToggle,
  setCurrentTrackID,
  getPlayerState,
} from '../../../store/ducks/player';
import { getPlaylistByID, getTrackByID } from '../../../store/ducks/playlists';

import { gridTheme } from '../../theme';

const Wrapper = styled.section`
  z-index: 1000;
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

const Player = () => {
  const dispatch = useDispatch();

  const playerState = useSelector(getPlayerState) || {};
  const { playingNow, currentTrackID, currentPlaylistID } = playerState;

  const playlistState = useSelector(getPlaylistByID(currentPlaylistID)) || {};
  const { isLoading, items } = playlistState;

  const [trackIsLoading, setTrackLoading] = useState(true);

  const [volume, setVolume] = useLocalStorage({
    key: 'volume',
    initialState: 1,
  });
  const setVolumeMemoized = useCallback(value => setVolume(value), [setVolume]);

  const [muted, setMute] = useLocalStorage({
    key: 'muted',
    initialState: false,
  });
  const setMuteMemoized = useCallback(value => setMute(value), [setMute]);

  const [repeat, setRepeat] = useState(false);
  const [isShuffled, setShuffled] = useState(null);

  const toggleShuffle = useCallback(() => setShuffled(!isShuffled), [
    isShuffled,
  ]);

  useEffect(() => {
    setShuffled(false);
  }, [currentPlaylistID]);

  const [
    additionalControlsIsVisible,
    setAdditionalControlsVisibility,
  ] = useState(false);

  const [queneIsVisible, setQueneVisibility] = useState(false);

  const playerRef = useRef(null);

  useEffect(() => {
    setTrackLoading(true);
  }, [currentTrackID]);

  const isDesktop = useMediaQuery({ minWidth: gridTheme.breakpoints.lg });

  const currentPlaylist = items;

  const currentTrack = useSelector(
    getTrackByID({ playlistID: currentPlaylistID, trackID: currentTrackID })
  );

  const currentTrackIndex = currentTrack
    ? currentPlaylist.indexOf(currentTrack)
    : null;

  const prevTrack = currentTrack
    ? currentPlaylist[currentTrackIndex - 1]
    : null;
  const nextTrack = currentTrack
    ? currentPlaylist[currentTrackIndex + 1]
    : null;

  const prevTrackID = prevTrack ? prevTrack._id : null;
  const nextTrackID = nextTrack ? nextTrack._id : null;

  const setCurrentTrackIDMemoized = useCallback(
    nextTrackID => dispatch(setCurrentTrackID(nextTrackID)),
    [dispatch]
  );

  const playToggleMemoized = useCallback(() => {
    dispatch(playToggle());
  }, [dispatch]);

  useEffect(() => {
    // dispatch!
    // fetchPlaylist({
    //   type: 'artist',
    //   ID: '5cec3aae4569f05f070ed329',
    // });
  }, []);

  const repeatToggle = useCallback(() => {
    setRepeat(!repeat);
  }, [repeat]);

  const handleOnEnd = useCallback(() => {
    if (!playerRef.current.props.repeat) {
      if (!nextTrackID) {
        dispatch(playToggle());
      } else {
        dispatch(setCurrentTrackID(nextTrackID));
      }
    }
  }, [dispatch, nextTrackID]);

  const handleSwipeUp = useCallback(() => {
    setAdditionalControlsVisibility(true);
  }, []);

  const handleSwipeDown = useCallback(() => {
    if (!queneIsVisible) setAdditionalControlsVisibility(false);
  }, [queneIsVisible]);

  const handleClickWrapper = useCallback(() => {
    setAdditionalControlsVisibility(true);
  }, []);

  const handleOutsideClick = useCallback(() => {
    setAdditionalControlsVisibility(false);
  }, []);

  const handleTrackLoad = useCallback(() => setTrackLoading(false), []);

  const handleTrackErrorLoad = useCallback(() => {
    setTrackLoading(false);
    console.log('Loading error');
  }, []);

  const interfaceDisabled = !currentPlaylist;

  if (!isLoading && !items) {
    return null;
  }

  const playerInstance = (playerRef || {}).current || {};

  return (
    <OutsideClickHandler
      onOutsideClick={handleOutsideClick}
      disabled={isDesktop || !additionalControlsIsVisible || queneIsVisible}
    >
      <Swipe onSwipeUp={handleSwipeUp} onSwipeDown={handleSwipeDown}>
        <Wrapper
          additionalControlsIsVisible={additionalControlsIsVisible}
          onClick={handleClickWrapper}
        >
          {!interfaceDisabled && (
            <ReactHowler
              ref={playerRef}
              loop={repeat}
              repeat={repeat}
              src={currentTrack.src}
              playing={playingNow}
              onEnd={handleOnEnd}
              onLoad={handleTrackLoad}
              onLoadError={handleTrackErrorLoad}
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
                setCurrentTrackID={setCurrentTrackIDMemoized}
                playToggle={playToggleMemoized}
              />
              <TimelineControlStyled
                disabled={interfaceDisabled}
                trackIsLoading={trackIsLoading}
                trackDuration={(currentTrack || {}).duration}
                playerInstance={playerInstance}
                playingNow={playingNow}
                currentTrackID={currentTrackID}
              />
              <RepeatButton
                onClick={repeatToggle}
                activated={repeat}
                disabled={interfaceDisabled}
              >
                <RepeatIcon />
              </RepeatButton>
              <ShuffleButton
                onClick={toggleShuffle}
                activated={!!isShuffled}
                disabled={interfaceDisabled}
              >
                <ShuffleIcon />
              </ShuffleButton>
              <VolumeControlStyled
                disabled={interfaceDisabled}
                volume={volume}
                setVolume={setVolumeMemoized}
                muted={muted}
                setMute={setMuteMemoized}
              />
              <Quene
                disabled={interfaceDisabled}
                playlistID={currentPlaylistID}
                shuffled={isShuffled}
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

export default Player;
