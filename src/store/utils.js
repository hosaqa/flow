export const createReducer = (initialState, map) => (
  state = initialState,
  action
) => {
  const reducer = map[action.type];

  if (!reducer) return state;

  return reducer(state, action);
};
