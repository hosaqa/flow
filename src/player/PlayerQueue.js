import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import ScrollArea from 'react-scrollbar';

import Dropdown from '../app/common/UI/Dropdown';
import PlayerButton from '../app/common/UI/PlayerButton';
import Playlist from '../app/common/Playlist';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const QueueBody = styled.div`
  position: absolute;
  bottom: 90px;
  right: 0;
  width: 290px;
  height: 190px;
  padding: 0;
  text-align: left;
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.colors.contentPreload};
  box-shadow: ${({ theme }) => theme.shadows.primary};
`;

const PlayerQueue = ({ playlist, className }) => {
  const [isOpen, setVisibility] = useState(false);

  const visibilityToggle = () => setVisibility(!isOpen);

  const handleClick = e => {
    visibilityToggle();
  };

  return (
    <Wrapper className={className}>
      <PlayerButton onClick={handleClick} disabled={!playlist}>
        <PlaylistPlayIcon />
      </PlayerButton>
      <Dropdown isOpen={isOpen} onClickOutside={handleClick}>
        <QueueBody>
          <ScrollArea
            speed={0.8}
            smoothScrolling
            className="area"
            contentClassName="content"
            horizontal={false}
            style={{
              padding: '0 10px 0 0',
              height: '190px',
            }}
            verticalContainerStyle={{
              opacity: '1',
              backgroundColor: '#ededed',
              width: '8px',
              borderRadius: '0 3px 3px 0',
            }}
            verticalScrollbarStyle={{
              borderRadius: '4px',
              backgroundColor: '#ff6b6b',
              marginLeft: '0',
            }}
          >
            <Playlist />
          </ScrollArea>
        </QueueBody>
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
