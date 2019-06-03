import { GET_BRAND_LIST_SUCCESS, GET_BRAND_LIST_ERROR } from '../constants/commonTypes'
const initState = {
    brandList: []
}
export default function(state = initState, action) {
  switch (action.type) {
    case GET_BRAND_LIST_SUCCESS:
      return Object.assign({}, state, {
        brandList: action.brandList
      })
    case GET_BRAND_LIST_ERROR:
      return Object.assign({}, state, {
        brandList: []
      })
    default:
      return state;
  }
}