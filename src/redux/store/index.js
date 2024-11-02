import {legacy_createStore as createStore, applyMiddleware} from 'redux';
import {persistStore} from 'redux-persist';
import rootReducer from '../reducers';
import logger from 'redux-logger';

export const store = createStore(rootReducer, applyMiddleware(logger));
export const persistor = persistStore(store);
