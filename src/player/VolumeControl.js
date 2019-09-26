import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled/macro';
import { css } from '@emotion/core';
import { connect } from 'react-redux';

import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';

import ProgressBar from '../app/common/UI/ProgressBar';
import PlayerButton from '../app/common/UI/PlayerButton';
import { setVolume, muteToggle } from './actions';
import { getMousePosition } from '../utils';

const Volume = styled.div`
  padding: 0;
  position: relative;
`;

const VolumeSlider = styled.div`
  position: absolute;
  bottom: calc(100% + 15px);
  height: 125px;
  width: 30px;
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.colors.content};
  box-shadow: ${({ theme }) => theme.shadows.primary};
  padding: 13px 0;
  opacity: 0;
  visibility: hidden;
  transform: scale(0);
  transform-origin: center bottom;
  transition: 0.2s opacity, 0.2s visibility, 0.12s transform;
  transition-delay: 0.28s;

  ${({ disabled }) =>
    !disabled &&
    css`
      ${Volume}:hover & {
        opacity: 1;
        visibility: visible;
        transform: scale(1);
      }
    `}
`;

const VolumeControl = ({
  className,
  disabled,
  volume,
  muted,
  setVolume,
  muteToggle,
}) => {
  const [mouseButtonPressed, setMouseButtonPressed] = useState(false);
  const volumeControlRef = useRef(null);

  const _setVolume = value => {
    value = value < 0 ? 0 : value > 1 ? 1 : value;
    setVolume(value);
  };

  const setVolumeFromPosition = (ev, ref) => {
    const { topPosition } = getMousePosition(ev, ref);

    setVolume(1 - parseFloat(topPosition.toFixed(2)));
  };

  const handleOnWheel = e => {
    if (!mouseButtonPressed) {
      const ONE_MOUSE_SCROLL_DELTA = 53;
      const volumeCoeff = Math.abs(e.deltaY / ONE_MOUSE_SCROLL_DELTA);

      let volumeDelta = volumeCoeff * 0.025;
      volumeDelta = parseFloat(volumeDelta.toFixed(2));

      if (e.deltaY < 0) {
        if (volume < 1)
          _setVolume(parseFloat((volume + volumeDelta).toFixed(2)));
      } else if (volume > 0)
        _setVolume(parseFloat((volume - volumeDelta).toFixed(2)));
    }
  };

  const handleOnClick = (ev, ref) => {
    setVolumeFromPosition(ev, ref);
  };

  const handleOnMouseMove = (ev, ref) => {
    if (mouseButtonPressed) setVolumeFromPosition(ev, ref);
  };

  const handleOnMouseDown = () => {
    setMouseButtonPressed(true);
  };

  const handleOnMouseUp = () => {
    setMouseButtonPressed(false);
  };

  const handleOnMouseLeave = () => {
    setMouseButtonPressed(false);
  };

  return (
    <Volume className={className} onWheel={ev => handleOnWheel(ev)}>
      <PlayerButton
        onClick={() => muteToggle()}
        hoverDisabled
        disabled={disabled}
      >
        {!muted && volume > 0.4 ? (
          <VolumeUpIcon />
        ) : !muted && volume !== 0 ? (
          <VolumeDownIcon />
        ) : (
          <VolumeOffIcon />
        )}
      </PlayerButton>
      <VolumeSlider
        disabled={disabled}
        ref={volumeControlRef}
        onClick={e => handleOnClick(e, volumeControlRef)}
        onMouseMove={ev => handleOnMouseMove(ev, volumeControlRef)}
        onMouseDown={() => handleOnMouseDown()}
        onMouseUp={() => handleOnMouseUp()}
        onMouseLeave={() => handleOnMouseLeave()}
      >
        <ProgressBar direction="vertical" filled={muted ? 0 : volume * 100} />
      </VolumeSlider>
    </Volume>
  );
};

VolumeControl.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  volume: PropTypes.number,
  setVolume: PropTypes.func,
  muted: PropTypes.bool,
  muteToggle: PropTypes.func,
};

export default connect(
  ({ player }) => player,
  { setVolume, muteToggle }
)(VolumeControl);
