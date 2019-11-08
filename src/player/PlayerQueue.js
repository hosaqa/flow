import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import OutsideClickHandler from 'react-outside-click-handler';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import PopupOverflow from '../common/UI/PopupOverflow';
import PlayerButton from '../common/UI/PlayerButton';
import Playlist from './Playlist';

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
  playlist,
  setVisibility,
}) => {
  const visibilityToggle = () => setVisibility(!isOpen);

  const handleClick = () => {
    visibilityToggle();
  };

  return (
    <Wrapper className={className}>
      <OutsideClickHandler
        onOutsideClick={() => setVisibility(false)}
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
            <Playlist playlist={playlist} />
          </PlaylistWrapper>
        </PlaylistPopup>
      </OutsideClickHandler>
    </Wrapper>
  );
};

PlayerQueue.propTypes = {
  disabled: PropTypes.bool,
  className: PropTypes.string,
  playlist: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      artist: PropTypes.string,
      trackname: PropTypes.string,
      album: PropTypes.string,
      src: PropTypes.string,
      img: PropTypes.string,
      duration: PropTypes.number,
    })
  ),
  isOpen: PropTypes.bool,
  setVisibility: PropTypes.func,
};

export default PlayerQueue;
