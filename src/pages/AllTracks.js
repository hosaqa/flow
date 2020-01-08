import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PlaylistPage from '../common/pageLayouts/PlaylistPage';
import { fetchPlaylist } from '../store/ducks/playlists';

const AllTracksPage = () => {
  // const f = useDispatch();

  // useEffect(() => {
  //   f(fetchPlaylist());
  // }, []);

  return <PlaylistPage />;
};

export default AllTracksPage;
