import * as types from '../../constants/users/myCompanyTypes'

export default function(state = {},action){
    switch (action.type){
        case types.MYCOMPANY_LIST:
            return Object.assign({}, state, {
                isFetching:false,
                oldListResult:action.oldCompanyResult,
                newListResult:action.companyMember,
                pageNo: action.pageNo !== undefined ? action.pageNo : state.pageNo,
                total: action.total !== undefined ? action.total : state.total,
            })
            break;
        default:
            return state;
            break;
    }
}