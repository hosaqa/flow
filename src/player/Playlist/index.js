import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import PlaylistItem from './PlaylistItem';
import {
  getPlayerState,
  playToggle,
  play,
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

  const playerState = useSelector(getPlayerState) || {};
  const { playingNow, currentTrackID } = playerState;

  const playlistState = useSelector(getPlaylistByID(playlistID)) || {};
  const { isLoading, items } = playlistState;

  const setTrack = useCallback(
    trackID => {
      if (trackID === currentTrackID) {
        dispatch(playToggle());
      } else {
        dispatch(setCurrentPlaylistID(playlistID));
        dispatch(setCurrentTrackID(trackID));

        if (!playingNow) {
          dispatch(play());
        }
      }
    },
    [currentTrackID]
  );

  if (!isLoading && !items) return null;

  if (isLoading)
    return (
      <>
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

Playlist.propTypes = {
  playlistID: PropTypes.string,
  currentTrackID: PropTypes.string,
  playToggle: PropTypes.func,
  setCurrentTrackID: PropTypes.func,
  playingNow: PropTypes.bool,
};

export default Playlist;
