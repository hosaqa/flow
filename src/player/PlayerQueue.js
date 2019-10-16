import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import Dropdown from '../app/common/UI/Dropdown';
import PlayerButton from '../app/common/UI/PlayerButton';
import Playlist from '../app/common/Playlist';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
      <Dropdown isOpen={isOpen} onClickOutside={handleClick}>
        <Playlist />
      </Dropdown>
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
