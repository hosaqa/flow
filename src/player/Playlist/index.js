import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import PlaylistItem from './PlaylistItem';
import {
  playerSelector,
  playToggle,
  setCurrentTrackID,
  setCurrentPlaylistID,
} from '../../store/ducks/player';
import { getPlaylistByID } from '../../store/ducks/playlists';

const PlaylistItemStyled = styled(PlaylistItem)`
  &:not(:last-child) {
    margin: 0 0 ${({ theme }) => theme.spacing(1)}px;
  }
`;

const Playlist = ({ playlistID }) => {
  const dispatch = useDispatch();

  const player = useSelector(state => playerSelector(state)) || {};

  const { playingNow, currentTrackID } = player;

  const playlist = useSelector(getPlaylistByID(playlistID)) || {};
  const { isLoading, items } = playlist;

  const setTrack = () => {
    dispatch(setCurrentPlaylistID(playlistID));
    dispatch(setCurrentTrackID(currentTrackID));
  };

  //TODO: rename func
  const toogle = () => dispatch(playToggle());

  if (!isLoading && !items) return null;

  if (isLoading)
    return (
      <>
        <PlaylistItemStyled />
        <PlaylistItemStyled />
        <PlaylistItemStyled />
        <PlaylistItemStyled />
        <PlaylistItemStyled />
        <PlaylistItemStyled />
      </>
    );
  return (
    <>
      {items.map(track => (
        <PlaylistItemStyled
          playToggle={toogle}
          setTrack={setTrack}
          track={track}
          currentTrackID={currentTrackID}
          playingNow={playingNow}
          key={track._id}
        />
      ))}
    </>
  );
};

// const playlistProp = PropTypes.arrayOf(
//   PropTypes.shape({
//     _id: PropTypes.string,
//     artist: {
//       _id: PropTypes.string,
//       name: PropTypes.string,
//       img: PropTypes.string,
//     },
//     trackname: PropTypes.string,
//     src: PropTypes.string,
//     duration: PropTypes.number,
//   })
// );

Playlist.propTypes = {
  playlistID: PropTypes.string,
  currentTrackID: PropTypes.string,
  playToggle: PropTypes.func,
  setCurrentTrackID: PropTypes.func,
  playingNow: PropTypes.bool,
};

export default Playlist;
