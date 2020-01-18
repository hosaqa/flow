import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createBrowserHistory } from 'history';
import {
  playerReducer,
  moduleName as playerModuleName,
  playingNowState,
} from './ducks/player';
import {
  playlistsReducer,
  moduleName as playlistsModuleName,
} from './ducks/playlists';
import { genresReducer, moduleName as genresModuleName } from './ducks/genres';

export const history = createBrowserHistory();

const composeEnhancers = composeWithDevTools({});

const playerPersistConfig = {
  key: playerModuleName,
  storage,
  blacklist: [playingNowState],
};

const rootReducer = combineReducers({
  router: connectRouter(history),
  [playerModuleName]: persistReducer(playerPersistConfig, playerReducer),
  [playlistsModuleName]: playlistsReducer,
  [genresModuleName]: genresReducer,
});

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, routerMiddleware(history)))
);

export const persistor = persistStore(store);
