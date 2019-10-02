import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineReducers } from 'redux';
import { playerReducer } from '../player/reducer';

const composeEnhancers = composeWithDevTools({});

export const rootReducer = combineReducers({
  player: playerReducer,
});

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
