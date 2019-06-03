import { connect } from 'react-redux'
import API from '../../../utils/index'
import { actionCreator, union, time2Date, switchPlatform, switchGoods } from '../../../utils/util';
import TaskList from './index'
import { GET_USER_TASK_LIST_SUCCESS, SAVE_TASK_TYPE } from '../../../constants/task/taskListTypes';

// 重新组织订单列表数据
const organizeTasks = (oldTasks, newTasks) => {
  let taskList = [];
  oldTasks = oldTasks || [];
  newTasks = newTasks || [];
  taskList = union(oldTasks, newTasks);
  return taskList;
};

function mapStateToProps(state) {
  const { fetchTaskList, getTaskListStatus, oldTaskListResult, newTaskListResult, hasError, pageNo, taskType, total, newTaskType, refreshTaskList } = state.taskListReducer;
  const taskList = organizeTasks(oldTaskListResult, newTaskListResult);
  return {
    userInfo: state.loginReducer.userInfo,
    isFetching: fetchTaskList,
    getTaskListStatus,
    taskList,
    newTaskList: newTaskListResult || [],
    hasError,
    taskType: taskType,
    newTaskType: newTaskType || 0,
    pageNo,
    total,
    refreshTaskList
  }
}

function mapDispatchToProps(dispatch, props) {
  const pageSize = 10;
  return {
    loadTaskList: (userId, pageNo, oldTaskList, taskType, callback)=> {
      let data = { userId, pageNo, pageSize, status: taskType };
      if (taskType === 0) {
        API.MY_TaskAllData({userId, pageNo, pageSize}).then(res => {
          if(res.success) {
            if(typeof callback === 'function') {
              callback()
            }
            let data = [];
            for (let i = 0; i < res.result.length; i++) {
              const element = res.result[i];
              if (element.endTime) {
                let endTime = time2Date(element.endTime) - Date.now();
                let days = parseInt(endTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
                let hours = parseInt(endTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时
                if (endTime <= 0) {
                  element.endTime = '已过期'
                } else {
                  element.endTime = `${days}天${hours}小时`
                  data.push(element)
                }
              }
            }
            dispatch(actionCreator(SAVE_TASK_TYPE, { newTaskType: taskType, refreshTaskList: false }))
            dispatch(actionCreator(GET_USER_TASK_LIST_SUCCESS, {newTaskList: data, oldTaskList, taskType, pageNo, total: res.totalPages}))
          }
        })
      } else {
        API.MYTASKWORK(data).then(res => {
          if(res.success) {
            let data = [];
            if(typeof callback === 'function') {
              callback()
            }
            if (res.result) {
              for (let i = 0; i < res.result.length; i++) {
                const element = res.result[i];
                if (element.platformType) {
                  element.platformName =  switchPlatform(element.platformType);
                }
                if (element.goodsType) {
                  element.kind =  switchGoods(element.goodsType);
                }
                data.push(element);
              }
            }
            dispatch(actionCreator(SAVE_TASK_TYPE, { newTaskType: taskType, refreshTaskList: false }))
            dispatch(actionCreator(GET_USER_TASK_LIST_SUCCESS, {newTaskList: data, oldTaskList, taskType, pageNo, total: res.totalPages}))
          }
        })
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList)