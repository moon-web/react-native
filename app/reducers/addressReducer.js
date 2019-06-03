import { UPDATE_ADDRESS } from '../constants/users/addressTypes'

export default function(state = {}, action) {
  switch (action.type) {
    case UPDATE_ADDRESS:
      return Object.assign({}, state, {
        currentAddress: action.currentAddress,
        address: action.address
      })
      break;
    default:
      return state;
      break;
  }
}