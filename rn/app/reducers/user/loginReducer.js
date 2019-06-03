import * as types from '../../constants/loginTypes';

export default function(state = {}, action) {
  switch (action.type) {
    case types.LOGIN:
      return Object.assign({}, state, {
        error: action.error,
        success: action.success,
        timestamp: new Date(),
      })
      break;
    case types.LOGINOUT: 
      return Object.assign({}, state, {
        userInfo: null,
      })
      break;
    case types.LOGIN_USER: 
      return Object.assign({}, state, {
        userInfo: action.userInfo,
      })
      break;
    default:
      return state;
      break;
  }
}