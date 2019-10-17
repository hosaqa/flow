import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
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
  transform-origin: right bottom;
  bottom: 90px;
  right: 0;
  left: 0;
  margin: auto;
  width: ${({ theme }) => theme.spacing(36)};
  height: 75vh;

  ${({ theme }) => theme.mediaQueries.up('lg')} {
    transform-origin: right bottom;
    bottom: 90px;
    right: 0;
    width: 290px;
    height: 190px;
  }
`;

const PlayerQueue = ({ playlist, className }) => {
  const [isOpen, setVisibility] = useState(false);

  const visibilityToggle = () => setVisibility(!isOpen);

  const handleClick = () => {
    visibilityToggle();
  };

  return (
    <Wrapper className={className}>
      <PlayerButton onClick={handleClick} disabled={!playlist}>
        <PlaylistPlayIcon />
      </PlayerButton>
      <DropdownPlaylist isOpen={isOpen} onClickOutside={handleClick}>
        <Playlist />
      </DropdownPlaylist>
    </Wrapper>
  );
};

PlayerQueue.propTypes = {
  className: PropTypes.string,
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
