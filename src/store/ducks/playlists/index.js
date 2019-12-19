import APIService from '../../../services/api';

// action types
export const FETCH_PLAYLIST_BEGIN = 'FETCH_PLAYLIST_BEGIN';
export const FETCH_PLAYLIST_SUCCESS = 'FETCH_PLAYLIST_SUCCESS';
export const FETCH_PLAYLIST_FAILURE = 'FETCH_PLAYLIST_FAILURE';

// action creators
export const fetchPlaylistBegin = options => ({
  type: FETCH_PLAYLIST_BEGIN,
  payload: {
    options,
  },
});

export const fetchPlaylistSuccess = (ID, tracksData) => ({
  type: FETCH_PLAYLIST_BEGIN,
  payload: {
    ID,
    tracksData,
  },
});

export const fetchPlaylist = (options = {}) => {
  const { limit, genre, artist } = options;

  return async dispatch => {
    dispatch(fetchPlaylistBegin());

    try {
      const playlist = await APIService.getTracks({
        limit,
        genre,
        artist,
      });

      FETCH_PLAYLIST_SUCCESS({
        ID: playlist.ID,
        tracksData: playlist.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

// reducer
const initialState = {
  playlists: null,
};

const playlistsReducerMap = {
  [FETCH_PLAYLIST_BEGIN]: (state, action) => {
    return {
      ...state,
      playlists: [
        ...state.playlists,
        {
          ID: action.payload.ID,
        },
      ],
    };
  },
};

export const playlistsReducer = (state = initialState, action) => {
  const reducer = playlistsReducerMap[action.type];

  if (!reducer) return state;

  return reducer(state, action);
};
