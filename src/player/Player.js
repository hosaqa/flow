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
import TimelineControlv from './TimelineControlv';
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
import { searchArrItemByID, isDesktop } from '../utils';

const Wrapper = styled.section`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: ${({ theme }) => theme.spacing(1)} 0
    ${({ theme }) => theme.spacing(2)};
  background-color: ${({ inactive, theme }) =>
    inactive ? theme.colors.contentPreload : theme.colors.content};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  transition: background-color ${({ theme }) => theme.transition},
    transform ${({ theme }) => theme.transition};
  transform: translateY(
    ${({ theme, additionalControlsIsVisibled }) =>
      additionalControlsIsVisibled ? 0 : theme.spacing(9)}
  );

  ${({ theme }) => theme.mediaQueries.up('lg')} {
    /* height: ${({ theme }) => theme.spacing(9)}; */
    transform: none;
    padding: ${({ theme }) => theme.spacing(1)} 0};
  }
`;

const Quene = styled(PlayerQueue)`
  ${({ theme }) => theme.mediaQueries.up('lg')} {
    order: 7;
  }
`;

const Inner = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.up('lg')} {
    justify-content: flex-start;
    flex-wrap: nowrap;
  }

  ${({ theme }) => theme.mediaQueries.up('xl')} {
    padding: 0 ${({ theme }) => theme.spacing(2)};
  }
`;

const PlayControlsStyled = styled(PlayControls)`
  margin: 0 0 0 auto;
  padding: 0 ${({ theme }) => theme.spacing(2)} 0
    ${({ theme }) => theme.spacing(1)};

  ${({ theme }) => theme.mediaQueries.up('lg')} {
    order: -1;
    padding: 0;
    margin: 0 ${({ theme }) => theme.spacing(4)} 0 0;
  }

  ${({ theme }) => theme.mediaQueries.up('xl')} {
    margin: 0 ${({ theme }) => theme.spacing(5)} 0 0;
  }
`;

const TimelineControlStyled = styled(TimelineControlv)`
  width: 100%;

  ${({ theme }) => theme.mediaQueries.up('lg')} {
    order: 4;
  }
`;

const ShuffleButton = styled(PlayerButton)`
  ${({ theme }) => theme.mediaQueries.up('lg')} {
    order: 3;
    margin: 0 ${({ theme }) => theme.spacing(8)} 0 0;
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
    margin: 0 0 0 ${({ theme }) => theme.spacing(2)};
  }
`;

const TrackInfoStyled = styled(TrackInfo)`
  ${({ theme }) => theme.mediaQueries.up('lg')} {
    order: 6;
    margin: 0 ${({ theme }) => theme.spacing(2)} 0
      ${({ theme }) => theme.spacing(3)};
  }
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
  repeatToggle,
  shuffleToggle,
}) => {
  const [trackPosition, setTrackPosition] = useState(null);
  const [
    additionalControlsIsVisibled,
    setAdditionalControlsVisibility,
  ] = useState(false);

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

  const handleSwipeUp = () => {
    setAdditionalControlsVisibility(true);
  };

  const interfaceDisabled = !playlist;

  const currentPlaylist = shuffledPlaylist || playlist;
  const currentTrack = playlist ? searchArrItemByID(playlist, track) : null;

  return (
    <OutsideClickHandler
      onOutsideClick={() => setAdditionalControlsVisibility(false)}
      disabled={isDesktop() || !additionalControlsIsVisibled}
    >
      <Swipe
        onSwipeUp={() => {
          handleSwipeUp();
        }}
        onSwipeDown={() => {
          setAdditionalControlsVisibility(false);
        }}
      >
        <Wrapper
          additionalControlsIsVisibled={additionalControlsIsVisibled}
          onClick={() => setAdditionalControlsVisibility(true)}
        >
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
            <Inner>
              <TrackInfoStyled {...currentTrack} />
              <PlayControlsStyled
                disabled={interfaceDisabled}
                closestTrackIsExist={closestTrackIsExist}
                setCurrentTrackClosest={setCurrentTrackClosest}
              />
              <TimelineControlStyled
                trackPosition={trackPosition}
                setTrackPosition={setSeek}
              />
              <RepeatButton
                onClick={repeatToggle}
                active={repeating}
                disabled={interfaceDisabled}
              >
                <RepeatIcon />
              </RepeatButton>
              <ShuffleButton
                onClick={shuffleToggle}
                active={!!shuffledPlaylist}
                disabled={interfaceDisabled}
              >
                <ShuffleIcon />
              </ShuffleButton>
              <VolumeControlStyled disabled={interfaceDisabled} />
              <Quene />
            </Inner>
          </Container>
        </Wrapper>
      </Swipe>
    </OutsideClickHandler>
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
