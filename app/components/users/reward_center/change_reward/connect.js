import {connect} from 'react-redux'
import ChangeReward from './index'
import API from '../../../../utils/index'
import {actionCreator, union} from '../../../../utils/util'
import {REWARD_TOTAL, REWARD_INCOME} from '../../../../constants/users/rewardTypes'
// 重新组织订单列表数据
const organizeTasks = (oldTasks, newTasks) => {
    let taskList = [];
    oldTasks = oldTasks || [];
    newTasks = newTasks || [];
    taskList = union(oldTasks, newTasks);
    return taskList;
};

function mapStateToProps(state) {
    const {isFetching, oldListResult, newListResult, pageNo, total, incomeMoney} = state.rewardReducer;
    const rewardApplyList = organizeTasks(oldListResult, newListResult);
    return {
        userInfo: state.loginReducer.userInfo,
        isFetching,
        rewardApplyList,
        newRewardList: newListResult || [],
        pageNo,
        total,
        incomeMoney,
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        TotalReward: (data, oldRewardResult, type, callback) => {
            if (type === 1) {
                API.total_reward(data).then(res => {
                    if (res.success === true) {
                        if (typeof callback === 'function') {
                            callback()
                        }
                        dispatch(actionCreator(REWARD_TOTAL, {
                            newRewardResult: res.result,
                            oldRewardResult,
                            pageNo: data.pageNo,
                            total: res.totalPages,
                        }))
                    }
                })
            } else {
                API.income_reward(data).then(res => {
                    if (res.success === true) {
                        if (typeof callback === 'function') {
                            callback()
                        }
                        dispatch(actionCreator(REWARD_INCOME, {
                            newRewardResult: res.result,
                            oldRewardResult,
                            pageNo: data.pageNo,
                            total: res.totalPages,
                            incomeMoney: res.msg
                        }))
                    }
                })
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeReward)