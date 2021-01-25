import { Reducer } from 'redux';
import { GistActionTypes, GistState } from './types';

export const initialState: GistState = {
  allGists: [],
  errors: undefined,
  loading: false,
};

const reducer: Reducer<GistState> = (state = initialState, action) => {
  switch (action.type) {
    case GistActionTypes.FETCH_REQUEST: {
      return { ...state, loading: true };
    }
    case GistActionTypes.FETCH_SUCCESS: {
      return {
        ...state,
        loading: false,
        userName: action.payload.user_name,
        allGists: action.payload.gists,
      };
    }
    case GistActionTypes.FETCH_GIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        gistFork: { gistId: action.payload.gistId, forkData: action.payload.forks }
      };
    }
    case GistActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload };
    }

    default: {
      return state;
    }
  }
};

export { reducer as GistReducer };
