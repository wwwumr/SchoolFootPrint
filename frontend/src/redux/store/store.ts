import { AppReducer } from './../reducer/reducer';
import { persistStore } from 'redux-persist';
import { createStore } from 'redux';

export const store = createStore(AppReducer);
export const persistor = persistStore(store);
