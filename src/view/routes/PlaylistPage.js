import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import PlaylistPageLayout from '../pageLayouts/PlaylistPageLayout';
import { fetchPlaylist, getPlaylistByID } from '../../store/ducks/playlists';
import appConfig from '../../appConfig';

const PlaylistPage = ({ match }) => {
  const { params } = match;
  const { type, id } = params;

  const dispatch = useDispatch();

  const playlistState = useSelector(getPlaylistByID(id)) || {};
  const { items, title } = playlistState;

  const artCoverSrc = items && items.length ? items[0][type].img : null;

  useEffect(() => {
    if (!items) {
      dispatch(
        fetchPlaylist({
          type,
          ID: id,
        })
      );
    }
  }, [type, id, items, dispatch]);

  return (
    <>
      <Helmet>
        <title>
          {title ? title : ''} | {appConfig.appName}
        </title>
      </Helmet>
      <PlaylistPageLayout playlistID={id} artCoverSrc={artCoverSrc} />
    </>
  );
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
