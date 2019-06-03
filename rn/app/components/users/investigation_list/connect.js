import { connect } from 'react-redux'
import InvestigationList from './index'
import { SUCCESS_INVESTIGATION_LIST, SAVE_INVESTIGATION_TYPE } from '../../../constants/task/investigationListType'
import API from '../../../utils/index'
import { union, actionCreator } from '../../../utils/util'
import Toast from 'teaset/components/Toast/Toast';

// 重新组织订单列表数据
const organizeTasks = (oldTasks, newTasks) => {
  let taskList = [];
  oldTasks = oldTasks || [];
  newTasks = newTasks || [];
  taskList = union(oldTasks, newTasks);
  return taskList;
};

function mapStateToProps(state) {
  const { fetchTaskList, getTaskListStatus, oldTaskListResult, newTaskListResult, hasError, pageNo, taskType, total, newTaskType, refreshTaskList } = state.investigationListReducer;
  const taskList = organizeTasks(oldTaskListResult, newTaskListResult);
  return {
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
  const pageSize = 10;
  return {
    loadTaskList: (userId, pageNo, oldTaskList, taskType, callback) => {
      let data = { userId, pageNo, pageSize, status: taskType };
      API.second_square_pay_task(data).then(res => {
        if (res.success === true) {
          if (!res.result.length) {
            res.result = []
          }
          dispatch(actionCreator(SAVE_INVESTIGATION_TYPE, { newTaskType: taskType, refreshTaskList: false }))
          dispatch(actionCreator(SUCCESS_INVESTIGATION_LIST, { newTaskList: res.result, oldTaskList, taskType, pageNo, total: res.totalPages }))
        } else {
          Toast.message(res.msg)
        }
        typeof callback === 'function' && callback()
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvestigationList)