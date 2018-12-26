export const PLAY_TOGGLE = 'PLAY_TOGGLE';
export const SET_CURRENT_TRACK = 'SET_CURRENT_TRACK';
export const CLOSEST_TRACK_IS_EXIST = 'CLOSEST_TRACK_IS_EXIST';
export const SET_CURRENT_TRACK_CLOSEST = 'SET_CURRENT_TRACK_CLOSEST';
export const REPEAT_TOGGLE = 'REPEAT_TOGGLE';

export const SET_TRACK_POSITION = 'SET_TRACK_POSITION';

export const SET_VOLUME = 'SET_VOLUME';
export const MUTE_TOGGLE = 'MUTE_TOGGLE';

export const PLAYLIST_IS_LOADING = 'PLAYLIST_IS_LOADING';
export const PLAYLIST_FETCH_SUCCESS = 'PLAYLIST_FETCH_SUCCESS';
export const PLAYLIST_FETCH_FAILED = 'PLAYLIST_FETCH_FAILED';

export function playToggle() {
  return {
    type: PLAY_TOGGLE
  };
}

export function repeatToggle() {
  return {
    type: REPEAT_TOGGLE
  };
}

export function playlistFetch() {
  return dispatch => {
    dispatch(playlistIsLoading(true));

    fetch('/data.json')
      .then(response => {
        if (response.status !== 200) {
          return Promise.reject(new Error(response.statusText));
        }

        dispatch(playlistIsLoading(false));

        return Promise.resolve(response);
      })
      .then(response => response.json())
      .then(playlist => {
        dispatch(playlistFetchSuccess(playlist));
      })
      .catch(() => {
        dispatch(playlistFetchFailed(true));
      });
  };
}

export function playlistIsLoading(bool) {
  return {
    type: PLAYLIST_IS_LOADING,
    payload: bool
  };
}

export function playlistFetchSuccess(playlist) {
  return {
    type: PLAYLIST_FETCH_SUCCESS,
    payload: playlist
  };
}

export function playlistFetchFailed(bool) {
  return {
    type: PLAYLIST_FETCH_FAILED,
    payload: bool
  };
}

export function setCurrentTrack(id, playingNow) {
  return {
    type: SET_CURRENT_TRACK,
    payload: {
      id,
      playingNow,
      trackPosition: null
    }
  };
}

export function closestTrackIsExist(index) {
  return {
    type: CLOSEST_TRACK_IS_EXIST,
    payload: index
  };
}

export function setCurrentTrackClosest(index) {
  return {
    type: SET_CURRENT_TRACK_CLOSEST,
    payload: index
  };
}

export function setTrackPosition(position) {
  return {
    type: SET_TRACK_POSITION,
    payload: position
  };
}

export function setVolume(value) {
  return {
    type: SET_VOLUME,
    payload: value
  };
}

export function muteToggle() {
  return {
    type: MUTE_TOGGLE
  };
}
