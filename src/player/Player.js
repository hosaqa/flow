import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactHowler from 'react-howler';
import onClickOutside from 'react-onclickoutside';
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
import { searchArrItemByID } from '../utils';

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

const PlayControlsWrap = styled.div`
  display: inline-block;
  margin: 0 0 0 auto;
  padding: 0 ${({ theme }) => theme.spacing(2)} 0
    ${({ theme }) => theme.spacing(1)};

  ${({ theme }) => theme.mediaQueries.up('lg')} {
    order: -1;
    padding: 0;
    margin: 0 ${({ theme }) => theme.spacing(4)} 0 0;
  }

  ${({ theme }) => theme.mediaQueries.up('xl')} {
    margin: 0 ${({ theme }) => theme.spacing(6)} 0 0;
  }
`;

const TimelineControlWrap = styled.div`
  width: 100%;
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

  const interfaceDisabled = !playlist;

  const currentPlaylist = shuffledPlaylist || playlist;
  const currentTrack = playlist ? searchArrItemByID(playlist, track) : null;

  Wrapper.handleClickOutside = () => setAdditionalControlsVisibility(false);

  return (
    <Wrapper
      disableOnClickOutside={true}
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
          <TrackInfo {...currentTrack} />
          <PlayControlsWrap>
            <PlayControls
              disabled={interfaceDisabled}
              closestTrackIsExist={closestTrackIsExist}
              setCurrentTrackClosest={setCurrentTrackClosest}
            />
          </PlayControlsWrap>
          <TimelineControlWrap>
            <TimelineControl
              trackPosition={trackPosition}
              setTrackPosition={setSeek}
            />
          </TimelineControlWrap>
          <PlayerButton
            onClick={repeatToggle}
            active={repeating}
            disabled={interfaceDisabled}
          >
            <RepeatIcon />
          </PlayerButton>
          <PlayerButton
            onClick={shuffleToggle}
            active={!!shuffledPlaylist}
            disabled={interfaceDisabled}
          >
            <ShuffleIcon />
          </PlayerButton>
          <VolumeControl disabled={interfaceDisabled} />
          <PlayerQueue />
        </Inner>
      </Container>
    </Wrapper>
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

const clickOutsideConfig = {
  handleClickOutside: () => Wrapper.handleClickOutside,
};

export default onClickOutside(
  connect(
    ({ player }) => ({ ...player }),
    {
      playToggle,
      fetchPlaylist,
      setCurrentTrack,
      fetchTrackResult,
      repeatToggle,
      shuffleToggle,
    }
  )(Player),
  clickOutsideConfig
);
