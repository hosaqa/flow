import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineReducers } from 'redux';
import { playerReducer } from './ducks/player';
import { playlistsReducer } from './ducks/playlists';

const composeEnhancers = composeWithDevTools({});

export const rootReducer = combineReducers({
  player: playerReducer,
  playlists: playlistsReducer,
});

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
