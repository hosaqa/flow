import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import PlaylistPageLayout from '../pageLayouts/PlaylistPageLayout';
import { fetchPlaylist, getPlaylistByID } from '../../store/ducks/playlists';

const PlaylistPage = ({ match }) => {
  const { params } = match;
  const { type, id } = params;

  const dispatch = useDispatch();

  const playlistState = useSelector(getPlaylistByID(id)) || {};
  const { items } = playlistState;

  const artCoverSrc = items && items.length ? items[0][type].img : null;

  useEffect(() => {
    dispatch(
      fetchPlaylist({
        type,
        ID: id,
      })
    );
  }, [type, id]);

  return <PlaylistPageLayout playlistID={id} artCoverSrc={artCoverSrc} />;
};

PlaylistPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      type: PropTypes.string,
      id: PropTypes.string,
    }),
  }),
};

export default withRouter(PlaylistPage);
