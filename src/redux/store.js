import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';

const persistConfig = {
  key: 'root',
  //storage: storage,
  storage: AsyncStorage,
  whitelist: ['auth', 'setting'],
};

const loggerMiddleware = createLogger({
  predicate: () => __DEV__,
});

const middleWares = [thunk, loggerMiddleware];

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer, applyMiddleware(...middleWares));
export const persistor = persistStore(store);
