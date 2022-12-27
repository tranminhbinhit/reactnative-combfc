import actions from '../constants/actionType';
const initialState = {
  metadata: {},
  user: {},
  notification: {
    message: '',
  },
  token: '',
  isLoginSuccess: false,
};
export default function authReducer(state = initialState, action) {
  const {response, type} = action;
  switch (type) {
    case actions.SET_LOGIN_PENDING:
      const {isLoginPending} = response;
      return {
        ...state,
        isLoginPending,
      };
    case actions.LOGIN_SUCCESSFULLY:
      const {user} = response;
      const {AccessTocken} = user;
      return {
        ...state,
        isLoginSuccess: true,
        user,
        token: AccessTocken,
      };
    case actions.RESET_AUTHENTICATION:
      return initialState;
    default:
      return state;
  }
}
