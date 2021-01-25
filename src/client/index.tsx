import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Routes from './route';
import configureStore from './configure-store';
import { ApplicationState } from './store';
import './index.css';

const initialState: ApplicationState = {
  gists: {
    allGists: [],
    errors: undefined,
    loading: false,
    userName: '',
    gistFork: undefined
  },
};

const store = configureStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root'),
);
