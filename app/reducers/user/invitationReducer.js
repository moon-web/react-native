import {INVITATION_LIST} from '../../constants/users/invitationTypes'

export default function(state = {}, action) {
    switch (action.type) {
        case INVITATION_LIST:
            return Object.assign({}, state, {
                newListResult:action.newListResult,
                isFetching: false,
                oldListResult: action.oldResult,
                pageNo: action.pageNo !== undefined ? action.pageNo : state.pageNo,
                total: action.total !== undefined ? action.total : state.total,
            })
            break;
        default:
            return state;
            break;
    }
}