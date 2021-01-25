export interface Gist {
  id: string;
  html_url: string;
  files?: any;
  description: string;
  created_at: string;
  comments?: any;
}

export enum GistActionTypes {
  FETCH_REQUEST = '@@gist/FETCH_REQUEST',
  FETCH_SUCCESS = '@@gist/FETCH_SUCCESS',
  FETCH_GIST_SUCCESS = '@@gist/FETCH_GIST_SUCCESS',
  FETCH_ERROR = '@@gist/FETCH_ERROR'
}

export interface GistState {
  readonly loading: boolean;
  readonly allGists: Gist[];
  readonly errors?: string;
  readonly userName?: string;
  readonly gistFork?: any;
}
