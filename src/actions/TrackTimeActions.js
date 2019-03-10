export const SET_TRACK_POSITION = 'SET_TRACK_POSITION';


export function setTrackPosition(position) {
  return {
    type: SET_TRACK_POSITION,
    payload: position
  };
}