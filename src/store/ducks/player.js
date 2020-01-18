import { createReducer } from '../utils';

//action types
export const PLAY = 'PLAY';
export const PLAY_TOGGLE = 'PLAY_TOGGLE';
export const SET_CURRENT_TRACK_ID = 'SET_CURRENT_TRACK_ID';

export const SET_CURRENT_PLAYLIST_ID = 'SET_CURRENT_PLAYLIST_ID';

export const FETCH_PLAYLIST_BEGIN = 'FETCH_PLAYLIST_BEGIN';
export const FETCH_PLAYLIST_SUCCESS = 'FETCH_PLAYLIST_SUCCESS';
export const FETCH_PLAYLIST_FAILURE = 'FETCH_PLAYLIST_FAILURE';

//action creators
export const play = () => ({
  type: PLAY,
});

export const playToggle = () => ({
  type: PLAY_TOGGLE,
});

export const setCurrentTrackID = ID => ({
  type: SET_CURRENT_TRACK_ID,
  payload: {
    ID,
  },
});

export const setCurrentPlaylistID = ID => ({
  type: SET_CURRENT_PLAYLIST_ID,
  payload: {
    ID,
  },
});

//reducer
const initialState = {
  currentPlaylistID: null,
  playingNow: false,
  currentTrackID: null,
};

export const playerReducerMap = {
  [PLAY]: state => ({
    ...state,
    playingNow: true,
  }),
  [PLAY_TOGGLE]: state => ({
    ...state,
    playingNow: !state.playingNow,
  }),
  [SET_CURRENT_TRACK_ID]: (state, action) => ({
    ...state,
    currentTrackID: action.payload.ID,
  }),
  [SET_CURRENT_PLAYLIST_ID]: (state, action) => ({
    ...state,
    currentPlaylistID: action.payload.ID,
  }),
};

export const playerReducer = createReducer(initialState, playerReducerMap);

//selectors
export const getCurrentTrackID = state => state.player.currentTrackID;
export const getPlayerState = state => state.player;
export const getPlayingNow = state => state.player.playingNow;
