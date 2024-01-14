import { createStore, compose, applyMiddleware } from 'redux';
import { rootReducer } from './root-reducer';
import thunk from 'redux-thunk';
import axios from 'axios';
import * as api from './../config';
import { loadState, saveState } from './local-storage';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const configureSore = () => {
  const persistedState = loadState();

  const store = createStore(
    rootReducer,
    persistedState,
    composeEnhancers(
      applyMiddleware(
        thunk.withExtraArgument({
          client: axios,
          api,
        })
      )
    )
  );

  store.subscribe(() => {
    saveState(store.getState());
  });

  return store;
};
