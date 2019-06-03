import { connect } from 'react-redux'
import API from '../../../utils/index'
import { actionCreator, union, time2Date } from '../../../utils/util';
import Plaza from './index'
import { GET_PLAZA_TASK_LIST_SUCCESS, GET_REWARD_TASK_LIST_SUCCESS } from '../../../constants/task/plazaListTypes';

// 重新组织订单列表数据
const organizeTasks = (oldTasks, newTasks) => {
  let taskList = [];
  oldTasks = oldTasks || [];
  newTasks = newTasks || [];
  taskList = union(oldTasks, newTasks);
  return taskList;
};

function mapStateToProps(state) {
  const { fetchTaskList, getTaskListStatus, oldTaskListResult, newTaskListResult, hasError, pageNo, total, refreshTaskList, oldRewardTaskList, newRewardTaskList } = state.PlazaListReducer;
  const { address } = state.addressReducer;
  const resultTaskList  = organizeTasks(oldTaskListResult, newTaskListResult);
  const rewardTaskList = organizeTasks(oldRewardTaskList, newRewardTaskList);
  const taskList = organizeTasks(resultTaskList, rewardTaskList)
  return {
    isFetching: fetchTaskList,
    getTaskListStatus,
    taskList,
    newTaskList: newTaskListResult || [],
    hasError,
    pageNo,
    total,
    refreshTaskList,
    address,
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
    loadTaskList: (data, oldTaskList, callback) => {
      API.TASKSQUARESLIST(data).then(res => {
        if (res.success) {
          let data = [];
          if (res.result && res.result.length > 0) {
            res.result.map((item, index) => {
              let endTimeMs = time2Date(item.endTime);
              item.taskStatus = endTimeMs - Date.now();
              let days = parseInt((item.taskStatus / 1000 / 60 / 60 / 24), 10)
              let hours = parseInt((item.taskStatus / 1000 / 60 / 60 % 24), 10)
              item.outTime = `${days}天${hours}小时`
              if (item.taskStatus > 0) {
                data.push(item);
              }
            })
          }
          let result = oldTaskList.concat(data)
          dispatch(actionCreator(GET_PLAZA_TASK_LIST_SUCCESS, { newTaskList: result, oldTaskList, pageNo: data.pageNo, total: res.totalPages }))
          typeof callback === 'function' && callback()
        }
      })
    },
    queryRewardTask: (data, oldTaskList, callback) => {
      API.second_square_pay_task(data).then(res => {
        if (res.success) {
          let result = [];
          if (res.result && res.result.length > 0) {
            result = oldTaskList.concat(res.result)
          }
          dispatch(actionCreator(GET_REWARD_TASK_LIST_SUCCESS, { oldTaskList, newRewardTaskList: result }))
          typeof callback === 'function' && callback()
        }
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Plaza)