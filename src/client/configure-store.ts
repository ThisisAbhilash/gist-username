import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { ApplicationState, createRootReducer } from './store';

export default function configureStore(initialState: ApplicationState): any {
  const w: any = window as any;
  const devtools: any = w.devToolsExtension
    ? w.devToolsExtension()
    : (f: any) => f;

  const middleware = applyMiddleware(thunk);
  const store: any = middleware(devtools(createStore))(
    createRootReducer(),
    initialState,
  );
  return store;
}
