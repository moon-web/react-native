import { SUCCESS_REPORT_LIST, SAVE_REPORT_TYPE } from '../../constants/task/reportListTypes'

export default function(state = [], action) {
  switch (action.type) {
    case SUCCESS_REPORT_LIST:
      return Object.assign({}, state, {
        fetchTaskList: false,
        getTaskListStatus: true,
        oldTaskListResult: action.oldTaskList,
        newTaskListResult: action.newTaskList,
        hasError: false,
        pageNo: action.pageNo !== undefined ? action.pageNo : state.pageNo,
        taskType: action.taskType !== undefined ? action.taskType : state.taskType,
        total: action.total !== undefined ? action.total : state.total,
      });
      break;
    case SAVE_REPORT_TYPE:
      return Object.assign({}, state, {
        newTaskType: action.newTaskType !== undefined ? action.newTaskType : state.newTaskType,
        refreshTaskList: action.refreshTaskList,
      });
      break;
    default:
      return state;
      break;
  }
}