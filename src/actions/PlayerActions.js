export const TOGGLE_PLAYER = 'TOGGLE_PLAYER';
export const PLAYLIST_FETCH = 'PLAYLIST_FETCH';
export const PLAYLIST_IS_LOADING = 'PLAYLIST_IS_LOADING';
export const PLAYLIST_FETCH_SUCCESS = 'PLAYLIST_FETCH_SUCCESS';
export const PLAYLIST_FETCH_FAILED = 'PLAYLIST_FETCH_FAILED';

export function toggle() {
  return {
    type: TOGGLE_PLAYER
  };
}

export function fetchPlaylist() {
  return dispatch => {
    dispatch({
      type: PLAYLIST_FETCH,
      payload: null
    });

    fetch('/data.json')
      .then(response => {
        if (response.status !== 200) {
          return Promise.reject(new Error(response.statusText));
        }
        return Promise.resolve(response);
      })
      .then(response => response.json())
      .then(playlist => {
        dispatch(fetchPlaylistSuccess(playlist));
      })
      .then(() => {
        dispatch(toggle());
      })
      .catch(error => {
        console.log('error', error);
      });
  };
}

export function fetchPlaylistSuccess(playlist) {
  return {
    type: PLAYLIST_FETCH_SUCCESS,
    payload: playlist
  };
}
