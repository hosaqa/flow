import {
  PLAY_TOGGLE,
  SET_CURRENT_TRACK,
  FETCH_PLAYLIST_BEGIN,
  FETCH_PLAYLIST_SUCCESS,
  FETCH_PLAYLIST_FAILURE,
} from './actionTypes';

const initialState = {
  playlistIsLoading: false,
  fetchPlaylistError: null,
  playlist: null,

  playingNow: false,
  currentTrackID: null,
};

export const playerReducerMap = {
  [PLAY_TOGGLE]: state => ({
    ...state,
    playingNow: !state.playingNow,
  }),
  [SET_CURRENT_TRACK]: (state, action) => ({
    ...state,
    currentTrackID: action.payload.id,
    playingNow: action.payload.playingNow || state.playingNow, //TODO: это для того, чтоб сразу проиграть, перепискать нужно как-то
  }),
  // [FETCH_PLAYLIST_BEGIN]: state => ({
  //   ...state,
  //   playlistIsLoading: true,
  //   fetchPlaylistError: null,
  // }),
  // [FETCH_PLAYLIST_SUCCESS]: (state, action) => ({
  //   ...state,
  //   playlist: action.payload.playlist,
  //   currentTrackID: action.payload.playlist[0]._id,
  //   playlistIsLoading: false,
  // }),
  // [FETCH_PLAYLIST_FAILURE]: (state, action) => ({
  //   fetchPlaylistError: action.payload.error,
  //   playlistIsLoading: false,
  // }),
};

export const playerReducer = (state = initialState, action) => {
  const reducer = playerReducerMap[action.type];

  if (!reducer) return state;

  return reducer(state, action);
};
