import {
  TOGGLE_PLAYER,
  PLAYLIST_FETCH,
  PLAYLIST_IS_LOADING,
  PLAYLIST_FETCH_SUCCESS,
  PLAYLIST_FETCH_FAILED
} from '../actions/PlayerActions';

export const initialState = {
  playlistIsLoading: false,
  playlistFetchFailed: false,
  trackIsLoading: false,
  playingNow: false,
  playlist: null,
  track: null,
  time: null
};

export function playerReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_PLAYER:
      return { ...state, playingNow: !state.playingNow };

    case PLAYLIST_IS_LOADING:
      return { ...state, playlistIsLoading: action.payload };

    case PLAYLIST_FETCH_SUCCESS:
      return { ...state, playlist: action.payload };

    case PLAYLIST_FETCH_FAILED:
      return { ...state, playlistFetchFailed: action.payload };

    default:
      return state;
  }
}
