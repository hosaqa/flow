import {
  PLAY_TOGGLE,
  SET_CURRENT_TRACK,
  FETCH_TRACK_EXECUTED,
  FETCH_PLAYLIST_BEGIN,
  FETCH_PLAYLIST_SUCCESS,
  FETCH_PLAYLIST_FAILURE,
} from './constants';

export const playToggle = () => ({
  type: PLAY_TOGGLE,
});

export const setCurrentTrack = (id, playingNow) => ({
  type: SET_CURRENT_TRACK,
  payload: {
    id,
    playingNow,
    trackPosition: null,
  },
});

export const fetchTrackResult = error => ({
  type: FETCH_TRACK_EXECUTED,
  payload: {
    error,
  },
});

const fetchPlaylistBegin = () => ({
  type: FETCH_PLAYLIST_BEGIN,
});

export const fetchPlaylistSuccess = playlist => ({
  type: FETCH_PLAYLIST_SUCCESS,
  payload: { playlist },
});

export const fetchPlaylistFailed = error => ({
  type: FETCH_PLAYLIST_FAILURE,
  payload: {
    error,
  },
});

const checkFetchStatus = response => {
  if (!response.ok) {
    throw response.status;
  }
  return response.json();
};

export const fetchPlaylist = () => {
  return dispatch => {
    dispatch(fetchPlaylistBegin());

    fetch('/data.json')
      .then(checkFetchStatus)
      .then(playlist => {
        dispatch(fetchPlaylistSuccess(playlist));
      })
      .catch(error => {
        dispatch(fetchPlaylistFailed(error));
      });
  };
};
