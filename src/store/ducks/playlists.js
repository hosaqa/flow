import { createSelector } from 'reselect';
import APIService from '../../services/api';
import { createReducer } from '../utils';

// action types
export const FETCH_PLAYLIST_BEGIN = 'FETCH_PLAYLIST_BEGIN';
export const FETCH_PLAYLIST_SUCCESS = 'FETCH_PLAYLIST_SUCCESS';
export const FETCH_PLAYLIST_FAILURE = 'FETCH_PLAYLIST_FAILURE';

// action creators
export const fetchPlaylistBegin = ({ type, ID }) => ({
  type: FETCH_PLAYLIST_BEGIN,
  payload: {
    type,
    ID,
  },
});

export const fetchPlaylistSuccess = ({ ID, uri, title, playlistData }) => ({
  type: FETCH_PLAYLIST_SUCCESS,
  payload: {
    ID,
    uri,
    title,
    playlistData,
  },
});

export const fetchPlaylistFailure = ({ ID, error }) => ({
  type: FETCH_PLAYLIST_FAILURE,
  payload: {
    ID,
    error,
  },
});

export const fetchPlaylist = (options = {}) => {
  const { type, ID } = options;

  return async dispatch => {
    dispatch(fetchPlaylistBegin({ type, ID }));

    try {
      const requestPlaylist = await APIService.getPlaylist(`${type}/${ID}`);
      const { uri, title, playlistData } = requestPlaylist;

      dispatch(
        fetchPlaylistSuccess({
          ID,
          uri,
          title,
          playlistData,
        })
      );
    } catch (error) {
      dispatch(fetchPlaylistFailure({ ID, error: String(error) }));
    }
  };
};

const initialState = {};

const playlistsReducerMap = {
  [FETCH_PLAYLIST_BEGIN]: (state, action) => ({
    ...state,
    [action.payload.ID]: {
      ...state[action.payload.ID],
      title: null,
      isLoading: true,
      fetchError: null,
    },
  }),
  [FETCH_PLAYLIST_SUCCESS]: (state, action) => ({
    ...state,
    [action.payload.ID]: {
      ...state[action.payload.ID],
      uri: action.payload.uri,
      title: action.payload.title,
      items: action.payload.playlistData,
      isLoading: false,
    },
  }),
  [FETCH_PLAYLIST_FAILURE]: (state, action) => ({
    ...state,
    [action.payload.ID]: {
      ...state[action.payload.ID],
      fetchError: action.payload.error,
      isLoading: false,
    },
  }),
};

export const playlistsReducer = createReducer(
  initialState,
  playlistsReducerMap
);

//selectors
export const getPlaylists = state => state.playlists;

export const getPlaylistByID = ID =>
  createSelector(getPlaylists, playlists => playlists[ID]);

export const getTrackByID = ({ playlistID, trackID }) =>
  createSelector(getPlaylistByID(playlistID), playlist => {
    if (playlist) return playlist.items.find(track => track._id === trackID);
  });
