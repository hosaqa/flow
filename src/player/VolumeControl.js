import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled/macro';
import { css } from '@emotion/core';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import ProgressBar from '../app/common/UI/ProgressBar';
import PlayerButton from '../app/common/UI/PlayerButton';
import Dropdown from '../app/common/UI/Dropdown';

const Wrapper = styled.div`
  padding: 0;
  position: relative;
`;

const VolumeDropdown = styled(Dropdown)`
  bottom: calc(100% + ${({ theme }) => theme.spacing(4)});
  height: ${({ theme }) => theme.spacing(16)};
  width: ${({ theme }) => theme.spacing(4)};
  transform-origin: center bottom;
`;

const VolumeDropdownInner = styled.div`
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
  muteToggle,
}) => {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  // const handleOnWheel = e => {
  //   if (!mouseButtonPressed) {
  //     const ONE_MOUSE_SCROLL_DELTA = 53;
  //     const volumeCoeff = Math.abs(e.deltaY / ONE_MOUSE_SCROLL_DELTA);

  //     let volumeDelta = volumeCoeff * 0.025;
  //     volumeDelta = parseFloat(volumeDelta.toFixed(2));

  //     if (e.deltaY < 0) {
  //       if (volume < 1)
  //         _setVolume(parseFloat((volume + volumeDelta).toFixed(2)));
  //     } else if (volume > 0)
  //       _setVolume(parseFloat((volume - volumeDelta).toFixed(2)));
  //   }
  // };
  const handleMouseOver = () => setDropdownIsOpen(true);

  const handleMouseLeave = () => setDropdownIsOpen(false);

  return (
    <Wrapper
      className={className}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <PlayerButton onClick={() => muteToggle()} disabled={disabled}>
        {!muted ? (
          <>{volume > 0.4 ? <VolumeUpIcon /> : <VolumeDownIcon />}</>
        ) : (
          <VolumeOffIcon />
        )}
      </PlayerButton>
      <VolumeDropdown isOpen={dropdownIsOpen} disabled={disabled}>
        <VolumeDropdownInner>
          <VolumePropgressBar
            progress={volume * 100}
            onSwipeStart={nextPosition => {
              setDropdownIsOpen(true);
              setVolume(nextPosition / 100);
            }}
            onSwipeMove={nextPosition => setVolume(nextPosition / 100)}
            onSwipeEnd={() => {
              setDropdownIsOpen(false);
            }}
            axis="vertical"
          />
        </VolumeDropdownInner>
      </VolumeDropdown>
    </Wrapper>
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

export default VolumeControl;
