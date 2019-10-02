import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import PlayListItem from './PlayListItem';
import { playToggle, setCurrentTrack } from '../../../player/actions';

const List = styled.div`
  position: relative;
`;

const Playlist = ({
  data,
  track,
  playlist,
  shuffledPlaylist,
  playToggle,
  playingNow,
  setCurrentTrack,
}) => {
  if (!data && !playlist)
    return (
      <List>
        <PlayListItem />
        <PlayListItem />
        <PlayListItem />
        <PlayListItem />
        <PlayListItem />
        <PlayListItem />
      </List>
    );

  let currentPlaylist = data || playlist;
  currentPlaylist = !data && shuffledPlaylist ? shuffledPlaylist : playlist;
  const currentTrack = track.id;

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

const playlistProp = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.number,
    artist: PropTypes.string,
    trackname: PropTypes.string,
    album: PropTypes.string,
    src: PropTypes.string,
    img: PropTypes.string,
    duration: PropTypes.number,
  })
);

Playlist.propTypes = {
  data: playlistProp,
  playlist: playlistProp,
  shuffledPlaylist: playlistProp,
  track: PropTypes.object,
  playToggle: PropTypes.func,
  setCurrentTrack: PropTypes.func,
  playingNow: PropTypes.bool,
};

export default connect(
  ({ player }) => player,
  { playToggle, setCurrentTrack }
)(Playlist);
