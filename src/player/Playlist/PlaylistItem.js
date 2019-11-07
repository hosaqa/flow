import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled/macro';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

import PlayerButton from '../../app/common/UI/PlayerButton';
import TimeLabel from '../../app/common/UI/TimeLabel';
import TrackInfo from '../../app/common/UI/TrackInfo';

import { humanizeTrackTime } from '../../utils';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.palette.background.overlay};
  transition: opacity ${({ theme }) => theme.transitions.short}ms,
    visibility ${({ theme }) => theme.transitions.short}ms;
  opacity: ${({ visible }) => (visible ? '1' : '0')};
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};

  ${Wrapper}:hover & {
    opacity: 1;
    visibility: visible;
  }
`;

const TimeLabelStyled = styled(TimeLabel)`
  margin-left: auto;
`;

const PlaylistItem = ({
  className,
  track,
  currentTrackID,
  playToggle,
  setTrack,
  playingNow,
}) => {
  const handleButtonClick = () => {
    if (currentTrackID === track.id) {
      playToggle();
    } else {
      setTrack(track.id, true);
    }
  };

  return (
    <Wrapper className={className}>
      <TrackInfo {...track}>
        {track ? (
          <ButtonWrapper visible={currentTrackID === track.id}>
            <PlayerButton
              onClick={handleButtonClick}
              active={currentTrackID === track.id}
            >
              {playingNow && currentTrackID === track.id ? (
                <PauseIcon />
              ) : (
                <PlayArrowIcon />
              )}
            </PlayerButton>
          </ButtonWrapper>
        ) : null}
      </TrackInfo>
      <TimeLabelStyled disabled={!track}>
        {humanizeTrackTime(track ? track.duration : null)}
      </TimeLabelStyled>
    </Wrapper>
  );
};

PlaylistItem.propTypes = {
  className: PropTypes.string,
  track: PropTypes.shape({
    id: PropTypes.string,
    artist: PropTypes.string,
    trackname: PropTypes.string,
    album: PropTypes.string,
    src: PropTypes.string,
    img: PropTypes.string,
    duration: PropTypes.number,
  }),
  currentTrackID: PropTypes.string,
  playToggle: PropTypes.func,
  setTrack: PropTypes.func,
  playingNow: PropTypes.bool,
};

export default PlaylistItem;
