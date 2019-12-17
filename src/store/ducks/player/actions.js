import {
  PLAY_TOGGLE,
  SET_CURRENT_TRACK,
  FETCH_PLAYLIST_BEGIN,
  FETCH_PLAYLIST_SUCCESS,
  FETCH_PLAYLIST_FAILURE,
} from './actionTypes';
import APIService from '../../../services/api';

export const playToggle = () => ({
  type: PLAY_TOGGLE,
});

export const setCurrentTrack = (id, playingNow) => ({
  type: SET_CURRENT_TRACK,
  payload: {
    id,
    playingNow,
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

export const fetchPlaylist = () => async dispatch => {
  dispatch(fetchPlaylistBegin());

  try {
    const tracksData = await APIService.getTracks();

    dispatch(fetchPlaylistSuccess(tracksData));
  } catch (error) {
    dispatch(fetchPlaylistFailed(error));
  }
};
