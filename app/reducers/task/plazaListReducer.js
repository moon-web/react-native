import { GET_PLAZA_TASK_LIST_SUCCESS, GET_REWARD_TASK_LIST_SUCCESS } from '../../constants/task/plazaListTypes'

export default function(state = {}, action) {
  switch (action.type) {
    case GET_PLAZA_TASK_LIST_SUCCESS:
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
    case GET_REWARD_TASK_LIST_SUCCESS:
      return Object.assign({}, state, {
        oldRewardTaskList: action.oldRewardTaskList,
        newRewardTaskList: action.newRewardTaskList,
      });
    default:
      return state;
  }
}