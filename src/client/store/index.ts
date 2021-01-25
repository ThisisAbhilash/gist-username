import { combineReducers } from 'redux';

import { GistReducer } from './gists/reducer';
import { GistState } from './gists/types';

export interface ApplicationState {
  gists: GistState;
}


export const createRootReducer = () => combineReducers({
  gists: GistReducer,
})
