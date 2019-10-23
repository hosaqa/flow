import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import OutsideClickHandler from 'react-outside-click-handler';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import Dropdown from '../app/common/UI/Dropdown';
import PlayerButton from '../app/common/UI/PlayerButton';
import Playlist from '../app/common/Playlist';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DropdownPlaylist = styled(Dropdown)`
  position: fixed;
  transform-origin: center bottom;
  bottom: calc(100% + ${({ theme }) => theme.spacing(4)});
  right: 0;
  left: 0;
  margin: auto;
  width: ${({ theme }) => theme.spacing(36)};
  height: calc(100vh - ${({ theme }) => theme.spacing(16)});
  max-height: 75vh;

  ${({ theme }) => theme.mediaQueries.up('lg')} {
    position: absolute;
    transform-origin: right bottom;
    bottom: calc(100% + ${({ theme }) => theme.spacing(4)});
    right: 0;
    left: auto;
    width: ${({ theme }) => theme.spacing(35)};
    height: ${({ theme }) => theme.spacing(22)};
  }
`;

const PlayerQueue = ({ playlist, className, isOpen, setVisibility }) => {
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
          disabled={!playlist}
          activated={isOpen}
        >
          <PlaylistPlayIcon />
        </PlayerButton>
        <DropdownPlaylist isOpen={isOpen} onClickOutside={handleClick}>
          <Playlist />
        </DropdownPlaylist>
      </OutsideClickHandler>
    </Wrapper>
  );
};

PlayerQueue.propTypes = {
  className: PropTypes.string,
  isOpen: PropTypes.bool,
  setVisibility: PropTypes.func,
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
  playingNow: PropTypes.bool,
};

export default connect(
  ({ player }) => player,
  null
)(PlayerQueue);
