import { searchArrItemByID, getRandomInt } from '../utils';

import {
  PLAY_TOGGLE,
  SET_CURRENT_TRACK,
  REPEAT_TOGGLE,
  PLAYLIST_IS_LOADING,
  PLAYLIST_FETCH_SUCCESS,
  PLAYLIST_FETCH_FAILED,
  SET_VOLUME,
  MUTE_TOGGLE,
  SHUFFLE_PLAYLIST_TOGGLE,
  TRACK_LOAD_SUCCESS
} from '../actions/PlayerActions';

export const initialState = {
  playlistIsLoading: false,
  playlistFetchFailed: false,
  trackIsLoaded: false,
  playingNow: false,
  playlist: null,
  track: null,
  trackPosition: null,
  volume: 1,
  muted: false,
  repeating: false,
  shuffledPlaylist: null
};

export function playerReducer(state = initialState, action) {
  switch (action.type) {
    case REPEAT_TOGGLE:
      return { ...state, repeating: !state.repeating };

    case PLAY_TOGGLE:
      return { ...state, playingNow: !state.playingNow };

    case SET_CURRENT_TRACK: {
      const { id, playingNow } = action.payload;

      return {
        ...state,
        track: searchArrItemByID(state.playlist, id).id,
        playingNow: playingNow || state.playingNow,
        trackPosition: null,
        trackIsLoaded: false
      };
    }


    case SET_VOLUME:
      return { ...state, volume: action.payload };

    case MUTE_TOGGLE:
      return { ...state, muted: !state.muted };

    case SHUFFLE_PLAYLIST_TOGGLE: {
      if (state.shuffledPlaylist) {
        return { ...state, shuffledPlaylist: null };
      }

      const oldPlaylist = state.playlist;
      const playlistLength = oldPlaylist.length;

      const prevIndexesSequence = [...Array(playlistLength).keys()];
      const shuffledPlaylist = [];

      while (prevIndexesSequence.length > 0) {
        const getRandomIndex = getRandomInt(1, prevIndexesSequence.length) - 1;

        shuffledPlaylist.push(oldPlaylist[prevIndexesSequence[getRandomIndex]]);
        prevIndexesSequence.splice(getRandomIndex, 1);
      }
      return { ...state, shuffledPlaylist };
    }

    case TRACK_LOAD_SUCCESS:
      return { ...state, trackIsLoaded: action.payload };

    case PLAYLIST_IS_LOADING:
      return { ...state, playlistIsLoading: action.payload };

    case PLAYLIST_FETCH_SUCCESS: {
      const playlist = action.payload;

      return { ...state, playlist, track: playlist[0].id };
    }

    case PLAYLIST_FETCH_FAILED:
      return { ...state, playlistFetchFailed: action.payload };

    default:
      return state;
  }
}
