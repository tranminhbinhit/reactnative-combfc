import {combineReducers} from 'redux';

import authReducer from '../authentication/reducers';
import settingReducer from '../setting/reducers';

const rootReducer = combineReducers({
  auth: authReducer,
  setting: settingReducer,
});

export default rootReducer;
