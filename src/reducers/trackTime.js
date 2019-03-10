import {
  SET_TRACK_POSITION
} from '../actions/TrackTimeActions';

export const initialState = {
  trackPosition: null
};

export function trackTimeReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TRACK_POSITION:
      return { ...state, trackPosition: action.payload };

    default:
      return state;
  }
}
