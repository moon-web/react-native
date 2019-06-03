import * as types from '../../constants/users/applyRewardTypes'

export default function(state = {}, action) {
    switch (action.type) {
        case types.APPLY_REWARD:
            return Object.assign({}, state, {

            })
            break;
        case types.APPLY_REWARD_BACKINFO:
            return Object.assign({}, state, {
                applyRewardBackInfo: action.applyRewardBackInfo
            })
            break;
        default:
            return state;
            break;
    }
}