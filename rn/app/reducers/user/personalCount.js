import { GET_PERSONALCOUNT_SUCCESS, GET_PERSONALCOUNT_ERROR, UPDATE_PERSONALCOUNT } from '../../constants/users/personalCountTypes';
const initState = {
  counts: {
    count1: 0, count2: 0, count3: 0, count4: 0, count5: 0, count6: 0, count7: 0, count8: 0, count9: 0, count10: 0
  }
}

export default function(state = initState, action) {
  switch (action.type) {
    case GET_PERSONALCOUNT_SUCCESS:
      return Object.assign({}, state, {
        counts: action.counts,
      })
    case GET_PERSONALCOUNT_ERROR: 
      return Object.assign({}, state, {
        counts: {
          count1: 0, count2: 0, count3: 0, count4: 0, count5: 0, count6: 0, count7: 0, count8: 0, count9: 0, count10: 0
        },
      })
    case UPDATE_PERSONALCOUNT: 
      return Object.assign({}, state, {
        counts: action.counts,
      })
    default:
      return state;
  }
}