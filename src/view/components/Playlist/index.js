import React, { useState, useEffect, useCallback } from 'react';
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
} from '../../../store/ducks/player';
import { getPlaylistByID } from '../../../store/ducks/playlists';
import { randomizeArray } from '../../../utils';

const PlaylistItemStyled = styled(PlaylistItem)`
  &:not(:last-child) {
    margin: 0 0 ${({ theme }) => theme.spacing(1)}px;
  }
`;

const Playlist = ({ playlistID, shuffled }) => {
  const [shuffledPlaylist, setShuffledPlaylist] = useState(null);

  const dispatch = useDispatch();

  const playerState = useSelector(getPlayerState) || {};
  const { playingNow, currentTrackID } = playerState;

  const playlistState = useSelector(getPlaylistByID(playlistID)) || {};

  const { isLoading, items } = playlistState;

  useEffect(() => {
    items && setShuffledPlaylist(randomizeArray(items));
  }, [shuffled]);

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

  const tracksList = shuffled ? shuffledPlaylist : items;

  return (
    <>
      {tracksList.map(track => (
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
  shuffled: PropTypes.bool,
};

export default Playlist;
