import { GET_USER_TASK_LIST_SUCCESS, SAVE_TASK_TYPE } from '../../constants/task/taskListTypes'

export default function(state = [], action) {
  switch (action.type) {
    case GET_USER_TASK_LIST_SUCCESS:
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
    case SAVE_TASK_TYPE:
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