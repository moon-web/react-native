import { REWARD_TOTAL,REWARD_INCOME } from '../../constants/users/rewardTypes';

export default function(state = {}, action) {
    switch (action.type) {
        case REWARD_TOTAL:
            return Object.assign({}, state, {
                isFetching: false,
                oldListResult: action.oldRewardResult,
                newListResult: action.newRewardResult,
                totalReward: action.totalReward,
                pageNo: action.pageNo !== undefined ? action.pageNo : state.pageNo,
                total: action.total !== undefined ? action.total : state.total,
            })
            break;
        case REWARD_INCOME:
            return Object.assign({},state,{
                isFetching: false,
                oldListResult: action.oldRewardResult,
                newListResult: action.newRewardResult,
                totalReward: action.totalReward,
                pageNo: action.pageNo !== undefined ? action.pageNo : state.pageNo,
                total: action.total !== undefined ? action.total : state.total,
                incomeMoney: action.incomeMoney !== undefined ? action.incomeMoney : state.incomeMoney,
            })
        default:
            return state;
            break;
    }
}