import * as types from '../../constants/users/forgetpwTypes'

export default function(state = {}, action) {
    switch (action.type) {
        case types.FORGET_GETCODE:
            return Object.assign({}, state, {

            })
            break;
        case types.FORGET_CODE:
            return Object.assign({}, state, {
                checkId: action.checkId
            })
            break;
        case types.FORGET_PW:
            return Object.assign({}, state, {
            })
            break;
        default:
            return state;
            break;
    }
}