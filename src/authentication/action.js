import actions from '../constants/actionType';
import {persistor} from '../redux/store';
import {pingLocationUser} from '../setting/action';

export function resetAuthentication() {
  return dispatch => {
    persistor.purge();
    dispatch({
      type: actions.RESET_AUTHENTICATION,
    });
    pingLocationUser();
  };
}
