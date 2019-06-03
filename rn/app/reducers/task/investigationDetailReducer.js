import { SUCCESS_INVESTIGATION_DETAIL } from '../../constants/task/investigationDetailType'

export default function (state = {}, action) {
  switch (action.type) {
    case SUCCESS_INVESTIGATION_DETAIL:
      return Object.assign({}, state, {
        detail: action.detail
      })
      break;
    default:
      return state;
      break;
  }
}