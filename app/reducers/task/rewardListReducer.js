import { SUCCESS_REWARD_TASK_LIST, SAVE_REWARD_TASK_TYPE } from '../../constants/task/rewardListTypes'

export default function(state = {}, action) {
    switch (action.type) {
        case SUCCESS_REWARD_TASK_LIST:
            return Object.assign({}, state, {
                isFetching: false,
                oldListResult: action.oldRewardResult,
                newListResult: action.rewardTaskData,
                pageNo: action.pageNo !== undefined ? action.pageNo : state.pageNo,
                total: action.total !== undefined ? action.total : state.total,
            })
            break;
        case SAVE_REWARD_TASK_TYPE:
            return Object.assign({}, state, {

            });
            break;
        default:
            return state;
            break;
    }
}