import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled/macro';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import ProgressBar from '../app/common/UI/ProgressBar';
import PlayerButton from '../app/common/UI/PlayerButton';
import Popup from '../app/common/UI/Popup';

const Wrapper = styled.div`
  padding: 0;
  position: relative;
`;

const PopupStyled = styled(Popup)`
  bottom: calc(100% + ${({ theme }) => theme.spacing(4)});
  height: ${({ theme }) => theme.spacing(16)};
  width: ${({ theme }) => theme.spacing(4)};
  transform-origin: center bottom;

  &:before {
    content: '';
    display: block;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: ${({ theme }) => theme.spacing(4)};
    background-color: transparent;
  }
`;

const Inner = styled.div`
  height: 100%;
  padding: ${({ theme }) => theme.spacing(1.5)} 0;
`;

const VolumePropgressBar = styled(ProgressBar)`
  margin-left: auto;
  margin-right: auto;
  padding: 0 ${({ theme }) => theme.spacing(2)};
`;

const VolumeControl = ({
  className,
  disabled,
  volume,
  muted,
  setVolume,
  setMute,
}) => {
  const [popupIsVisible, setPopupVisibility] = useState(false);
  const [isSwiping, setIsSwiping] = useState(false);

  const setMuteEnchanded = nextValue => {
    if (nextValue === false && volume === 0) setVolume(0.7);

    setMute(nextValue);
  };

  const muteToggle = () => setMuteEnchanded(!muted);

  const setVolumeEnchanced = nextValue => {
    if (nextValue !== 0 && muted) setMute(false);

    if (nextValue === 0) setMute(true);

    setVolume(Math.max(0, Math.min(nextValue, 1)));
  };

  const handleMouseOver = () => setPopupVisibility(true);

  const handleMouseLeave = () => {
    if (!isSwiping) setPopupVisibility(false);
  };

  return (
    <Wrapper
      className={className}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <PlayerButton onClick={() => muteToggle()} disabled={disabled}>
        {!muted && volume !== 0 ? (
          <>{volume > 0.4 ? <VolumeUpIcon /> : <VolumeDownIcon />}</>
        ) : (
          <VolumeOffIcon />
        )}
      </PlayerButton>
      <PopupStyled isOpen={popupIsVisible} disabled={disabled}>
        <Inner>
          <VolumePropgressBar
            progress={muted ? 0 : volume * 100}
            onSwipeStart={nextPosition => {
              setPopupVisibility(true);
              setIsSwiping(true);
              setVolumeEnchanced(nextPosition / 100);
            }}
            onSwipeMove={nextPosition => setVolumeEnchanced(nextPosition / 100)}
            onSwipeEnd={() => {
              setPopupVisibility(false);
              setIsSwiping(false);
            }}
            axis="vertical"
          />
        </Inner>
      </PopupStyled>
    </Wrapper>
  );
};

VolumeControl.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  volume: PropTypes.number,
  setVolume: PropTypes.func,
  muted: PropTypes.bool,
  setMute: PropTypes.func,
};

export default VolumeControl;
