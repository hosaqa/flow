import APIService from '../../services/api';
import { createReducer } from '../utils';

// action types
export const FETCH_GENRES_BEGIN = 'FETCH_GENRES_BEGIN';
export const FETCH_GENRES_SUCCESS = 'FETCH_GENRES_SUCCESS';
export const FETCH_GENRES_FAILURE = 'FETCH_GENRES_FAILURE';

// action creators
export const fetchGenresBegin = () => ({
  type: FETCH_GENRES_BEGIN,
});

export const fetchGenresSuccess = genresData => ({
  type: FETCH_GENRES_SUCCESS,
  payload: {
    genresData,
  },
});

export const fetchGenresFailure = error => ({
  type: FETCH_GENRES_FAILURE,
  payload: {
    error,
  },
});

export const fetchGenres = () => {
  return async dispatch => {
    dispatch(fetchGenresBegin());

    try {
      const genresData = await APIService.getGenres();

      dispatch(fetchGenresSuccess(genresData));
    } catch (error) {
      dispatch(fetchGenresFailure(error));
    }
  };
};

const initialState = {
  isLoading: false,
  fetchError: null,
  genresList: null,
};

const genresReducerMap = {
  [FETCH_GENRES_BEGIN]: state => ({
    ...state,
    isLoading: true,
    fetchError: null,
  }),
  [FETCH_GENRES_SUCCESS]: (state, action) => ({
    ...state,
    isLoading: false,
    genresList: action.payload.genresData,
  }),
  [FETCH_GENRES_FAILURE]: (state, action) => ({
    ...state,
    isLoading: false,
    fetchError: String(action.payload.error),
  }),
};

export const genresReducer = createReducer(initialState, genresReducerMap);

//selectors
export const getGenresState = state => state.genres;
