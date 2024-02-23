import { createAPI } from '../service/api';
import { productsSlice } from './products';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

export const api = createAPI();

export const reducer = combineReducers({
  products: productsSlice.reducer
});

export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      }
    })
});
