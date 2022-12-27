import actions from '../../constants/actionType';
import request from '../../utils/request';
import {
  startAppLoading,
  stopAppLoading,
  setGeneralError,
} from '../../setting/action';
import {isSuccess} from '../../utils/utils';
import {pingLocationUser} from '../../setting/action';

export function setLoginPending(isLoginPending) {
  return {
    type: actions.SET_LOGIN_PENDING,
    response: {
      isLoginPending,
    },
  };
}

export function loginUser(reqModel) {
  return dispatch => {
    dispatch(startAppLoading());
    dispatch(setLoginPending(true));
    return request.postAPI('/app/auth/login', reqModel).then(response => {
      dispatch(setLoginPending(false));
      if (isSuccess(response)) {
        dispatch({
          type: actions.LOGIN_SUCCESSFULLY,
          response: {
            user: response.result,
          },
        });
        dispatch(pingLocationUser());
      } else {
        setGeneralError(response.result.Messsage);
      }
      return dispatch(stopAppLoading());
    });
  };
}
