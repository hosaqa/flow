import {
  TOGGLE_PLAYER,
  PLAYLIST_FETCH,
  PLAYLIST_IS_LOADING,
  PLAYLIST_FETCH_SUCCESS,
  PLAYLIST_FETCH_FAILED
} from '../actions/PlayerActions';

export const initialState = {
  playingNow: false,
  playlist: null,
  track: null,
  time: null
};

export function playerReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_PLAYER:
      return { ...state, playingNow: !state.playingNow };

    case PLAYLIST_FETCH_SUCCESS:
      console.log(action.payload);
      return { ...state, playlist: action.payload };

    default:
      return state;
  }
}
