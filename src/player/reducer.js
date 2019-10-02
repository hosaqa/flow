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

import { searchArrItemByID, getRandomInt } from '../utils';

const initialState = {
  playlistIsLoading: false,
  fetchPlaylistError: null,
  playlist: null,

  trackIsLoading: false,
  fetchTrackError: null,

  playingNow: false,
  track: null,
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
      const { playlist } = state;
      const { id, playingNow } = action.payload;

      const currentTrack = searchArrItemByID(playlist, id);
      const currentTrackIndex = playlist.indexOf(currentTrack);

      let prevTrack = playlist[currentTrackIndex - 1];
      prevTrack = prevTrack ? prevTrack : null;

      let nextTrack = playlist[currentTrackIndex + 1];
      nextTrack = nextTrack ? nextTrack : null;

      return {
        ...state,
        track: { ...currentTrack, prevTrack: prevTrack, nextTrack: nextTrack },
        playingNow: playingNow || state.playingNow, ///что это за ????
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
      const { playlist } = action.payload;

      return {
        ...state,
        playlist: action.payload.playlist,
        track: { ...playlist[0], prevTrack: null, nextTrack: playlist[1] },
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