import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import PlaylistPageLayout from '../pageLayouts/PlaylistPage';
import { fetchPlaylist, getPlaylistByID } from '../../store/ducks/playlists';

const PlaylistPage = ({ match }) => {
  const { type, id } = match.params;

  const dispatch = useDispatch();
  const playlist = useSelector(getPlaylistByID(id));

  useEffect(() => {
    dispatch(
      fetchPlaylist({
        type,
        ID: id,
      })
    );
  }, []);

  return <PlaylistPageLayout playlistID={id} />;
};

export default withRouter(PlaylistPage);
