import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { playerReducer } from './ducks/player';
import { playlistsReducer } from './ducks/playlists';
import { genresReducer } from './ducks/genres';

export const history = createBrowserHistory();

const composeEnhancers = composeWithDevTools({});

const rootReducer = combineReducers({
  router: connectRouter(history),
  player: playerReducer,
  playlists: playlistsReducer,
  genres: genresReducer,
});

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, routerMiddleware(history)))
);
