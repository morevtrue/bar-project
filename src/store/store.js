import { legacy_createStore as createStore } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import reducerCurrentEmotions from "./reducers/reducerCurrentEmotions";
import initialState from "./initialState";

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducerCurrentEmotions);

const store = createStore(persistedReducer, initialState);

const persistor = persistStore(store);

export { store, persistor };