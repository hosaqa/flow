export const TOGGLE_PLAYER = 'TOGGLE_PLAYER';
export const PLAYLIST_IS_LOADING = 'PLAYLIST_IS_LOADING';
export const PLAYLIST_FETCH_SUCCESS = 'PLAYLIST_FETCH_SUCCESS';
export const PLAYLIST_FETCH_FAILED = 'PLAYLIST_FETCH_FAILED';

export function toggle() {
  return {
    type: TOGGLE_PLAYER
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
