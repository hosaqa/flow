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
    transform: none;
    padding: ${({ theme }) => theme.spacing(1)} 0;
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

const TimelineControlStyled = styled(TimelineControl)`
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
  const [trackPosition, setTrackPosition] = useState(0);

  useEffect(() => {
    setTrackPosition(0);
  }, [track]);

  const [
    additionalControlsIsVisibled,
    setAdditionalControlsVisibility,
  ] = useState(false);

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
      const nextTrack = track.nextTrack;

      if (!nextTrack) {
        playToggle();

        clearRAF();
      } else {
        setCurrentTrack(nextTrack.id);
      }
    }
  };

  const handleSwipeUp = () => {
    setAdditionalControlsVisibility(true);
  };

  const interfaceDisabled = !track;

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
              src={track.src}
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
              <TrackInfoStyled {...track} />
              <PlayControlsStyled disabled={interfaceDisabled} />
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
            </Row>
          </Container>
        </Wrapper>
      </Swipe>
    </OutsideClickHandler>
  );
};

Player.propTypes = {
  muted: PropTypes.bool,
  playingNow: PropTypes.bool,
  repeating: PropTypes.bool,
  shuffledPlaylist: PropTypes.array,
  track: PropTypes.object,
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