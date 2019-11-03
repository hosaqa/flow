import {
  PLAY_TOGGLE,
  SET_CURRENT_TRACK,
  REPEAT_TOGGLE,
  SHUFFLE_PLAYLIST_TOGGLE,
  FETCH_TRACK_EXECUTED,
  FETCH_PLAYLIST_BEGIN,
  FETCH_PLAYLIST_SUCCESS,
  FETCH_PLAYLIST_FAILURE,
} from './constants';

import { getRandomInt } from '../utils';

const initialState = {
  playlistIsLoading: false,
  fetchPlaylistError: null,
  playlist: null,

  trackIsLoading: false,
  fetchTrackError: null,

  playingNow: false,
  currentTrackID: null,

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
        currentTrackID: id,
        playingNow: playingNow || state.playingNow, ///что это за ????
        trackIsLoading: true,
        fetchTrackError: null,
      };
    }

    case SHUFFLE_PLAYLIST_TOGGLE: {
      //надо разобраться
      // const { shuffledPlaylist, playlist, track } = state;
      // if (shuffledPlaylist) {
      //   const closestTracks = getClosestTracks(track.id, playlist);
      //   return {
      //     ...state,
      //     shuffledPlaylist: null,
      //     track: {
      //       ...track,
      //       prevTrack: closestTracks.prevTrack,
      //       nextTrack: closestTracks.nextTrack,
      //     },
      //   };
      // }
      // const currentPlaylist = playlist;
      // const playlistLength = currentPlaylist.length;
      // const prevIndexesSequence = [...Array(playlistLength).keys()];
      // const nextPlaylist = [];
      // while (prevIndexesSequence.length > 0) {
      //   const getRandomIndex = getRandomInt(1, prevIndexesSequence.length) - 1;
      //   nextPlaylist.push(currentPlaylist[prevIndexesSequence[getRandomIndex]]);
      //   prevIndexesSequence.splice(getRandomIndex, 1);
      // }
      // const closestTracks = getClosestTracks(track.id, nextPlaylist);
      // return {
      //   ...state,
      //   shuffledPlaylist: nextPlaylist,
      //   currentTrackID: {
      //     ...track,
      //     prevTrack: closestTracks.prevTrack,
      //     nextTrack: closestTracks.nextTrack,
      //   },
      // };
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
        playlist: playlist,
        currentTrackID: playlist[0].id,
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
