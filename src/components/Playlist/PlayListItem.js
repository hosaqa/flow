import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

import PlayerButton from '../UI/PlayerButton';
import TrackInfo from '../UI/TrackInfo';

import { formatSecondsToMMSS } from '../../utils';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 8px;
  position: relative;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 37px;
  width: 37px;
  background-color: rgba(255, 255, 255, .8);
  transition: opacity .2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  opacity: ${({visible}) => visible ? '1' : '0'};

  ${Wrapper}:hover & {
    opacity: 1;
  }
`;

const TimeLabel = styled.div`
  width: 50px;
  display: block;
  text-align: right;
  font-size: 14px;
  margin-left: auto;
`;



const getTrackTime = ({minutes, seconds}) => {
  seconds = (`${seconds}`).length < 2 ? `0${seconds}` : seconds;

  return `${minutes}:${seconds}`;
};

const PlaylistItem = ({track, currentTrackID, playToggle, setTrack, playingNow}) => {
  if (!track) {
    return (
      <Wrapper>
        <TrackInfo/>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
    <ButtonWrapper
      visible={(currentTrackID === track.id)}
    >
      <PlayerButton
        onClick={() => {
          if (currentTrackID === track.id) {
            playToggle();
          } else {
            setTrack(track.id, true);
          }
        }}
        active={currentTrackID === track.id}
      >
        {playingNow && currentTrackID === track.id
          ? <PauseIcon />
          : <PlayArrowIcon />
        }
      </PlayerButton>
    </ButtonWrapper>
    <TrackInfo
      {...track}
      withoutImage
    />
    <TimeLabel>{formatSecondsToMMSS(track.duration)}</TimeLabel>
    </Wrapper>
  );

};

PlaylistItem.propTypes = {
  track: PropTypes.shape({
    id: PropTypes.number,
    artist: PropTypes.string,
    trackname: PropTypes.string,
    album: PropTypes.string,
    src: PropTypes.string,
    img: PropTypes.string,
    duration: PropTypes.number
  }),
  currentTrackID: PropTypes.number,
  playToggle: PropTypes.func,
  setTrack: PropTypes.func,
  playingNow: PropTypes.bool
};

export default PlaylistItem;