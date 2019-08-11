import {
  PLAY_TOGGLE,
  SET_CURRENT_TRACK,
  REPEAT_TOGGLE,
  SHUFFLE_PLAYLIST_TOGGLE,
  SET_VOLUME,
  MUTE_TOGGLE,
  FETCH_TRACK_EXECUTED,
  FETCH_PLAYLIST_BEGIN,
  FETCH_PLAYLIST_SUCCESS,
  FETCH_PLAYLIST_FAILURE,
} from './constants';

import { searchArrItemByID, getRandomInt } from '../../utils';

const initialState = {
  playlistIsLoading: false,
  fetchPlaylistError: null,
  playlist: null,

  trackIsLoading: false,
  fetchTrackError: null,

  playingNow: false,
  track: null,
  trackPosition: null,
  volume: 1,
  muted: false,
  repeating: false,
  shuffledPlaylist: null,
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
        trackIsLoading: true,
        fetchTrackError: null,
      };
    }

    case SET_VOLUME:
      return { ...state, volume: action.payload.value };

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

    case FETCH_TRACK_EXECUTED:
      console.log(action.payload.error);
      return {
        ...state,
        trackIsLoading: false,
        fetchTrackError: action.payload.error ? action.payload.error : null,
      };

    case FETCH_PLAYLIST_BEGIN:
      return {
        ...state,
        playlistIsLoading: true,
        fetchPlaylistError: null,
      };

    case FETCH_PLAYLIST_SUCCESS: {
      return {
        ...state,
        playlist: action.payload.playlist,
        track: action.payload.playlist[0].id,
        playlistIsLoading: false,
      };
    }

    case FETCH_PLAYLIST_FAILURE:
      return {
        ...state,
        fetchPlaylistError: action.payload.error,
        playlistIsLoading: false,
      };

    default:
      return state;
  }
}
