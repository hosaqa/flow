import APIService from '../../../services/api';

// action types
export const FETCH_PLAYLIST_BEGIN = 'FETCH_PLAYLIST_BEGIN';
export const FETCH_PLAYLIST_SUCCESS = 'FETCH_PLAYLIST_SUCCESS';
export const FETCH_PLAYLIST_FAILURE = 'FETCH_PLAYLIST_FAILURE';

// action creators
export const fetchPlaylistBegin = ({ location, options }) => ({
  type: FETCH_PLAYLIST_BEGIN,
  payload: {
    location,
    options,
  },
});

export const fetchPlaylistSuccess = ({ location, ID, items }) => ({
  type: FETCH_PLAYLIST_SUCCESS,
  payload: {
    location,
    ID,
    items,
  },
});

export const fetchPlaylistFailure = ({ location, error }) => ({
  type: FETCH_PLAYLIST_SUCCESS,
  payload: {
    location,
    error,
  },
});

export const fetchPlaylist = ({ location, options = {} }) => {
  const { limit, genre, artist } = options;

  return async dispatch => {
    dispatch(fetchPlaylistBegin({ location, options }));

    try {
      const playlist = await APIService.getTracks({
        limit,
        genre,
        artist,
      });

      dispatch(
        fetchPlaylistSuccess({
          location,
          ID: playlist.ID,
          items: playlist.items,
        })
      );
    } catch (error) {
      dispatch(fetchPlaylistFailure({ location, error }));
    }
  };
};

// reducer
const initialState = {
  inPlayerLocation: null,
  inPageLocation: null,
};

const playlistsReducerMap = {
  [FETCH_PLAYLIST_BEGIN]: (state, action) => {
    return {
      ...state,
      [action.payload.location]: {
        ...state[action.payload.location],
        options: action.payload.options,
        isLoading: true,
        fetchError: null,
      },
    };
  },
  [FETCH_PLAYLIST_SUCCESS]: (state, action) => {
    return {
      ...state,
      [action.payload.location]: {
        ...state[action.payload.location],
        ID: action.payload.ID,
        items: action.payload.items,
        isLoading: false,
      },
    };
  },
  [FETCH_PLAYLIST_FAILURE]: (state, action) => {
    return {
      ...state,
      [action.payload.location]: {
        ...state[action.payload.location],
        fetchError: action.payload.error,
        isLoading: false,
      },
    };
  },
};

export const playlistsReducer = (state = initialState, action) => {
  const reducer = playlistsReducerMap[action.type];

  if (!reducer) return state;

  return reducer(state, action);
};
