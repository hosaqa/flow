import { searchTrackByID } from '../utils';

import {
  PLAY_TOGGLE,
  SET_CURRENT_TRACK,
  REPEAT_TOGGLE,
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
  trackPosition: null,
  volume: 1,
  muted: false,
  repeating: false,
  playlistShuffled: false
};

export function playerReducer(state = initialState, action) {
  switch (action.type) {
    case REPEAT_TOGGLE:
      return { ...state, repeating: !state.repeating };

    case PLAY_TOGGLE:
      return { ...state, playingNow: !state.playingNow };

    case SET_CURRENT_TRACK:
      const { id, playingNow } = action.payload;

      return {
        ...state,
        track: searchTrackByID(state.playlist, id).id,
        playingNow: playingNow || state.playingNow,
        trackPosition: null
      };

    case PLAYLIST_IS_LOADING:
      return { ...state, playlistIsLoading: action.payload };

    case PLAYLIST_FETCH_SUCCESS:
      const playlist = action.payload;
      return { ...state, playlist, track: playlist[0].id };

    case PLAYLIST_FETCH_FAILED:
      return { ...state, playlistFetchFailed: action.payload };

    default:
      return state;
  }
}
