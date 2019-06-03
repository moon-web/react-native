import { connect } from 'react-redux'
import API from '../../../utils/index'
import { actionCreator, switchStateText, switchState, union } from '../../../utils/util';
import RewardTask from './reward_task'
import { SUCCESS_REWARD_TASK_LIST } from '../../../constants/task/rewardListTypes';
// 重新组织订单列表数据
const organizeTasks = (oldTasks, newTasks) => {
    let taskList = [];
    oldTasks = oldTasks || [];
    newTasks = newTasks || [];
    taskList = union(oldTasks, newTasks);
    return taskList;
};
function mapStateToProps(state) {
    const { isFetching, oldListResult, newListResult, pageNo, total } = state.rewardTaskReducer;
    const rewardList = organizeTasks(oldListResult, newListResult);
    return{
        userInfo:state.loginReducer.userInfo,
        isFetching,
        rewardList,
        rewardListData:newListResult || [],
        pageNo,
        total
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        loadRewardTask:(data,oldRewardResult,callback) => {
            API.rewardList(data).then(res => {
                if(res.success === true) {
                    if(res.result && res.result.length>0) {
                        let data = [];
                        for (let i = 0; i < res.result.length; i++) {
                            const element = res.result[i];
                            if (element.status) {
                                element.statusText = switchStateText(element.status)
                                element.statusTaskText = switchState(element.status)
                            }
                            data.push(element)
                        }
                        dispatch(actionCreator(SUCCESS_REWARD_TASK_LIST, {rewardTaskData: data,oldRewardResult,pageNo:data.pageNo, total: res.totalPages}))
                    }
                    if (typeof callback === 'function') {
                        callback()
                    }
                }
            })
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RewardTask)