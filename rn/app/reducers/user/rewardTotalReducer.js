import { REWARD_TOTAL } from '../../constants/users/rewardTypes';

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
                money: action.money !== undefined ? action.money : state.money,
            })
            break;
        default:
            return state;
            break;
    }
}