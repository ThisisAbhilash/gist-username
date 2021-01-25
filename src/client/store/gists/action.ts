import { GistActionTypes } from './types';

import { ActionCreator, Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { ApplicationState } from '../index';
import { fetchGists, fetchGist } from '../../api';

export type AppThunk = ActionCreator<
  ThunkAction<void, ApplicationState, null, Action<string>>
>;

export interface SearchPayload {
  user_name: string;
}

export const fetchAllGists: AppThunk = (payload: SearchPayload) => {
  return async (
    dispatch: Dispatch
  ): Promise<Action> => {
    try {
      dispatch({
        type: GistActionTypes.FETCH_REQUEST,
      });
      const response = await fetchGists(payload);

      return dispatch({
        type: GistActionTypes.FETCH_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      return dispatch({
        type: GistActionTypes.FETCH_ERROR,
      });
    }
  };
};

export const fetchAGist: AppThunk = (gistId: string) => {
  return async (
    dispatch: Dispatch,
    getState: () => ApplicationState,
  ): Promise<Action> => {
    try {
      const response = await fetchGist(gistId);

      return dispatch({
        type: GistActionTypes.FETCH_GIST_SUCCESS,
        payload: { forks: response.data.forks, gistId },
      });
    } catch (e) {
      return dispatch({
        type: GistActionTypes.FETCH_ERROR,
      });
    }
  };
};
