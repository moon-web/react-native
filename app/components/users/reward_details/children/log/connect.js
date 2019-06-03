import { connect } from 'react-redux'
import Log from './log'
import { SUCCESS_TASK_LOGS_LIST, SAVE_TASK_LOGS_TYPE, UPDATE_TASK_LOGS_LIST } from '../../../../../constants/task/taskLogTypes'
import API from '../../../../../utils/index'
import { actionCreator, union } from '../../../../../utils/util'

// 重新组织订单列表数据
const organizeTasks = (oldTasks, newTasks) => {
  let taskList = [];
  oldTasks = oldTasks || [];
  newTasks = newTasks || [];
  taskList = union(oldTasks, newTasks);
  return taskList;
};

function mapStateToProps(state) {
  const { compensableDetail } = state.rewardDetailReducer;
  const { fetchTaskList, getTaskListStatus, oldTaskListResult, newTaskListResult, hasError, pageNo, taskType, total, newTaskType, refreshTaskList } = state.taskLogsReducer;
  const taskList = organizeTasks(oldTaskListResult, newTaskListResult);
  return {
    compensableDetail,
    userInfo: state.loginReducer.userInfo,
    isFetching: fetchTaskList,
    getTaskListStatus,
    taskList,
    newTaskList: newTaskListResult || [],
    hasError,
    taskType: taskType,
    newTaskType: newTaskType || '',
    pageNo,
    total,
    refreshTaskList
  }
}

function mapDispatchToProps(dispatch, props) {
  const pageSize = 20;
  return {
    getTaskLogs: (id, pageNo, oldTaskList, taskType) => {
      API.SECOND_RIZHI({
        compensableId: id,
        pageNo,
        pageSize,
        nickName: taskType
      }).then((res) => {
        if (res.success === true) { 
          dispatch(actionCreator(SAVE_TASK_LOGS_TYPE, { newTaskType: taskType, refreshTaskList: false }))
          dispatch(actionCreator(SUCCESS_TASK_LOGS_LIST, {newTaskList: res.result, oldTaskList, taskType, pageNo, total: res.totalPages}))
        }
      })
    },
    addTaskLog: (data, callback) => {
      API.SECOND_ADDRIZHI(data).then((res) => {
        if (res.success === true) {
          typeof callback === 'function' && callback()
        } 
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Log)