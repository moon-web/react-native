import { SUCCESS_REWARD_DETAIL, UPDATE_SUSPECTJSON_SUCCESS, UPDATE_ADDRESS_SUCCESS, UPDATE_LAW_SUCCESS } from '../../constants/task/rewardDetailTypes'

export default function (state = {}, action) {
    switch (action.type) {
        case SUCCESS_REWARD_DETAIL:
            return Object.assign({}, state, {
                detail: action.detail
            })
            break;
        case UPDATE_SUSPECTJSON_SUCCESS:
            return Object.assign({}, state, {
                suspectJson: action.suspectJson
            })
            break;
        case UPDATE_ADDRESS_SUCCESS:
            return Object.assign({}, state, {
                addressJson: action.addressJson
            })
            break;
        case UPDATE_LAW_SUCCESS:
            return Object.assign({}, state, {
                compensableDetail: action.compensableDetail
            })
            break;
        default:
            return state;
            break;
    }
}