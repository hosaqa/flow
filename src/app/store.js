import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { playerReducer } from '../player/reducer';

export const rootReducer = combineReducers({
  player: playerReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
