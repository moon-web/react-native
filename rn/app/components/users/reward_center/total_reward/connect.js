import { connect } from 'react-redux'
import TotalReward from './index'
import API from '../../../../utils/index'
import { actionCreator, union } from '../../../../utils/util'
import { REWARD_TOTAL} from '../../../../constants/users/rewardTypes'
// 重新组织订单列表数据
const organizeTasks = (oldTasks, newTasks) => {
    let taskList = [];
    oldTasks = oldTasks || [];
    newTasks = newTasks || [];
    taskList = union(oldTasks, newTasks);
    return taskList;
};

function mapStateToProps(state){
    const { isFetching, oldListResult, newListResult, pageNo, total, money  } = state.rewardCenterReducer;
    const rewardApplyList = organizeTasks(oldListResult, newListResult);
    return{
        userInfo:state.loginReducer.userInfo,
        isFetching,
        rewardApplyList,
        newRewardList:newListResult || [],
        pageNo,
        total,
        money,
    }
}
function mapDispatchToProps(dispatch,props){
    return{
        TotalReward:(data,oldRewardResult,callback) => {
            API.total_reward(data).then(res => {
                if(res.success === true){
                    if(typeof callback === 'function') {
                        callback()
                    }
                    dispatch(actionCreator(REWARD_TOTAL,{newRewardResult: res.result, oldRewardResult, pageNo:data.pageNo, total: res.totalPages,money:res.msg}))
                }
            })
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(TotalReward)