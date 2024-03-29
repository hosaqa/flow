import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import OutsideClickHandler from 'react-outside-click-handler';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import PopupOverflow from '../UI/PopupOverflow';
import PlayerButton from '../UI/PlayerButton';
import Playlist from '../Playlist';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PlaylistPopup = styled(PopupOverflow)`
  position: fixed;
  transform-origin: center bottom;
  bottom: calc(100% + ${({ theme }) => theme.spacing(4)}px);
  right: 0;
  left: 0;
  margin: auto;
  width: ${({ theme }) => theme.spacing(36)}px;
  height: calc(100vh - ${({ theme }) => theme.spacing(16)}px);
  max-height: 55vh;

  ${({ theme }) => theme.mediaQueries.up('lg')} {
    position: absolute;
    transform-origin: right bottom;
    bottom: calc(100% + ${({ theme }) => theme.spacing(4)}px);
    right: 0;
    left: auto;
    width: ${({ theme }) => theme.spacing(42)}px;
    height: ${({ theme }) => theme.spacing(28)}px;
    max-height: none;
  }
`;

const PlaylistWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing(1)}px;
`;

const PlayerQueue = ({
  className,
  disabled,
  isOpen,
  playlistID,
  shuffled,
  setVisibility,
}) => {
  const handleClick = useCallback(() => {
    setVisibility(!isOpen);
  }, [isOpen, setVisibility]);

  const handleOutsideClick = useCallback(() => {
    setVisibility(false);
  }, [setVisibility]);

  return (
    <Wrapper className={className}>
      <OutsideClickHandler
        onOutsideClick={handleOutsideClick}
        disabled={!isOpen}
      >
        <PlayerButton
          onClick={handleClick}
          disabled={disabled}
          activated={isOpen}
        >
          <PlaylistPlayIcon />
        </PlayerButton>
        <PlaylistPopup isOpen={isOpen} onClickOutside={handleClick}>
          <PlaylistWrapper>
            <Playlist playlistID={playlistID} shuffled={shuffled} />
          </PlaylistWrapper>
        </PlaylistPopup>
      </OutsideClickHandler>
    </Wrapper>
  );
};

PlayerQueue.propTypes = {
  disabled: PropTypes.bool,
  className: PropTypes.string,
  playlistID: PropTypes.string,
  shuffled: PropTypes.bool,
  isOpen: PropTypes.bool,
  setVisibility: PropTypes.func,
};

export default memo(PlayerQueue);
