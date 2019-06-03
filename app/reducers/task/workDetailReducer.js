import { SUCCESS_WORK_DETAIL } from '../../constants/task/workDetailTypes'

export default function (state = {}, action) {
  switch (action.type) {
    case SUCCESS_WORK_DETAIL:
      return Object.assign({}, state, {
        fetchDetail: true,
        detail: action.detail
      })
      break;
    default:
      return state;
      break;
  }
}