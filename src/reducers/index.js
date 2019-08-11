import { combineReducers } from 'redux';

import { playerReducer } from '../components/Player/reducer';
import { trackTimeReducer } from './trackTime';

export const rootReducer = combineReducers({
  player: playerReducer,
  trackTime: trackTimeReducer,
});
