import {
  PLAY_TOGGLE,
  SET_CURRENT_TRACK,
  FETCH_TRACK_EXECUTED,
  FETCH_PLAYLIST_BEGIN,
  FETCH_PLAYLIST_SUCCESS,
  FETCH_PLAYLIST_FAILURE,
} from './constants';

const initialState = {
  playlistIsLoading: false,
  fetchPlaylistError: null,
  playlist: null,

  trackIsLoading: false,
  fetchTrackError: null,

  playingNow: false,
  currentTrackID: null,
};

export function playerReducer(state = initialState, action) {
  switch (action.type) {
    case PLAY_TOGGLE:
      return { ...state, playingNow: !state.playingNow };

    case SET_CURRENT_TRACK: {
      const { id, playingNow } = action.payload;

      return {
        ...state,
        currentTrackID: id,
        playingNow: playingNow || state.playingNow, //TODO: это для того, чтоб сразу проиграть, перепискать нужно как-то
        trackIsLoading: true,
        fetchTrackError: null,
      };
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
