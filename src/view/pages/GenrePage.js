import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PlaylistPage from '../pageLayouts/PlaylistPage';
import { fetchPlaylist, getPlaylistByID } from '../../store/ducks/playlists';

const GenrePage = () => {
  const f = useDispatch();
  const playlist = useSelector(getPlaylistByID('5cec3aae4569f05f070ed329'));

  useEffect(() => {
    f(
      fetchPlaylist({
        type: 'artist',
        ID: '5cec3aae4569f05f070ed329',
      })
    );
  }, []);

  return <PlaylistPage playlistID="5cec3aae4569f05f070ed329" />;
};

export default GenrePage;
