import { connect } from 'react-redux'
import API from '../../../utils/index'
import { actionCreator, union, switchPlatform, switchGoods } from '../../../utils/util';
import TaskList from './index'
import { SUCCESS_REPORT_LIST, SAVE_REPORT_TYPE } from '../../../constants/task/reportListTypes';

// 重新组织订单列表数据
const organizeTasks = (oldTasks, newTasks) => {
  let taskList = [];
  oldTasks = oldTasks || [];
  newTasks = newTasks || [];
  taskList = union(oldTasks, newTasks);
  return taskList;
};

function mapStateToProps(state) {
  const { fetchTaskList, getTaskListStatus, oldTaskListResult, newTaskListResult, hasError, pageNo, taskType, total, newTaskType, refreshTaskList } = state.reportListReducer;
  const taskList = organizeTasks(oldTaskListResult, newTaskListResult);
  return {
    userInfo: state.loginReducer.userInfo,
    isFetching: fetchTaskList,
    getTaskListStatus,
    taskList,
    newTaskList: newTaskListResult || [],
    hasError,
    taskType: taskType,
    newTaskType,
    pageNo,
    total,
    refreshTaskList
  }
}

function mapDispatchToProps(dispatch, props) {
  const pageSize = 10;
  return {
    loadTaskList: (userId, pageNo, oldTaskList, taskType, callback)=> {
      let data = { userId, pageNo, pageSize, type: taskType };
        API.my_report(data).then(res => {
          if(res.success) {
            if(typeof callback === 'function') {
              callback()
            }
            let data = [];
            for (let i = 0; i < res.result.length; i++) {
              const element = res.result[i];
              if (element.platformType) {
                element.platformName = switchPlatform(element.platformType)
              }
              if(element.goodsType) {
                element.kind = switchGoods(element.goodsType)
              }
              data.push(element)
            }
            dispatch(actionCreator(SAVE_REPORT_TYPE, { newTaskType: taskType, refreshTaskList: false }))
            dispatch(actionCreator(SUCCESS_REPORT_LIST, {newTaskList: data, oldTaskList, taskType, pageNo, total: res.totalPages}))
          }
        })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList)