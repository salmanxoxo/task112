import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userReducer from './userReducer';

const persistConfig = {
  timeout: 0,
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  userData: userReducer,
});

export default persistReducer(persistConfig, rootReducer);
