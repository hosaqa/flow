import appConfig from '../../appConfig';
import { createReducer } from '../utils';

//constants
export const moduleName = 'player';
const prefix = `${appConfig.appName}/${moduleName}`;
export const playingNowState = 'playingNow';

//action types
export const PLAY = `${prefix}/PLAY`;
export const PLAY_TOGGLE = `${prefix}/PLAY_TOGGLE`;
export const SET_CURRENT_TRACK_ID = `${prefix}/SET_CURRENT_TRACK_ID`;

export const SET_CURRENT_PLAYLIST = `${prefix}/SET_CURRENT_PLAYLIST`;

export const FETCH_PLAYLIST_BEGIN = `${prefix}/FETCH_PLAYLIST_BEGIN`;
export const FETCH_PLAYLIST_SUCCESS = `${prefix}/FETCH_PLAYLIST_SUCCESS`;
export const FETCH_PLAYLIST_FAILURE = `${prefix}/FETCH_PLAYLIST_FAILURE`;

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

export const setCurrentPlaylist = ({ ID, type }) => ({
  type: SET_CURRENT_PLAYLIST,
  payload: {
    ID,
    type,
  },
});

//reducer
const initialState = {
  currentPlaylistID: null,
  currentPlaylistType: null,
  [playingNowState]: false,
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
  [SET_CURRENT_PLAYLIST]: (state, action) => ({
    ...state,
    currentPlaylistID: action.payload.ID,
    currentPlaylistType: action.payload.type,
  }),
};

export const playerReducer = createReducer(initialState, playerReducerMap);

//selectors
export const getCurrentTrackID = state => state[moduleName].currentTrackID;
export const getPlayerState = state => state[moduleName];
export const getPlayingNow = state => state[moduleName].playingNow;
