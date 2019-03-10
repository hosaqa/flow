import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import PlayListItem from './PlayListItem';
import { searchTrackByID } from '../../utils';
import { playToggle, setCurrentTrack } from '../../actions/PlayerActions';

const List = styled.div`
  position: relative;
`;

const Playlist = ({nonDefaultPlaylist, track, playlist, shuffledPlaylist, playToggle, playingNow, setCurrentTrack}) => {
  let currentPlaylist = nonDefaultPlaylist || playlist;
  currentPlaylist = (!nonDefaultPlaylist && shuffledPlaylist) ? shuffledPlaylist : playlist;
  const currentTrack = searchTrackByID(playlist, track).id;
  
  return (
    <List>
      {currentPlaylist.map(item => (
        <PlayListItem
          playToggle={playToggle}
          setTrack={setCurrentTrack}
          track={item}
          currentTrackID={currentTrack}
          playingNow={playingNow}
          key={item.id}
        >
          {item.track}
        </PlayListItem>
      ))}
    </List>
  );
};

Playlist.propTypes = {
  playlist: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    artist: PropTypes.string,
    trackname: PropTypes.string,
    album: PropTypes.string,
    src: PropTypes.string,
    img: PropTypes.string,
    duration: PropTypes.shape({
      minutes: PropTypes.number,
       seconds: PropTypes.number
    })
  })),
  track: PropTypes.number,
  playToggle: PropTypes.func,
  setCurrentTrack: PropTypes.func,
  playingNow: PropTypes.bool
};

export default connect(({player}) => player, {playToggle, setCurrentTrack})(Playlist);