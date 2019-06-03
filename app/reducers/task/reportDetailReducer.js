import { SUCCESS_REPORT_DETAIL } from '../../constants/task/reportDetailTypes'

export default function (state = {}, action) {
  switch (action.type) {
    case SUCCESS_REPORT_DETAIL:
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