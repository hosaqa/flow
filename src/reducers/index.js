import { combineReducers } from 'redux';

import { playerReducer } from './player';
import { trackTimeReducer } from './trackTime';

export const rootReducer = combineReducers({
  player: playerReducer,
  trackTime: trackTimeReducer
});
