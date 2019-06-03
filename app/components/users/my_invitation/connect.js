import {connect} from 'react-redux'
import * as types from '../../../constants/users/invitationTypes'
import API from '../../../utils/index'
import {actionCreator, union} from '../../../utils/util';
import MyInvitation from './my_invitation'
import {Toast} from 'teaset'


// 重新组织订单列表数据
const organizeTasks = (oldTasks, newTasks) => {
    let taskList = [];
    oldTasks = oldTasks || [];
    newTasks = newTasks || [];
    taskList = union(oldTasks, newTasks);
    return taskList;
};

function mapStateToProps(state) {
    const {isFetching, oldListResult, newListResult, pageNo, total} = state.invitationReducer;
    const invitationList = organizeTasks(oldListResult, newListResult);
    return {
        userInfo: state.loginReducer.userInfo,
        isFetching,
        invitationData: newListResult || [],
        invitationList,
        pageNo,
        total,
    }
}

function mapDispatchToProps(dispatch,) {
    return {
        //我的邀请列表
        MyInvitation: (data, oldResult, callback) => {
            API.my_myInvitation(data).then(res => {
                if (res.success === true) {
                    if (res.result && res.result.length > 0) {
                        dispatch(actionCreator(types.INVITATION_LIST, {
                            newListResult: res.result,
                            oldResult,
                            pageNo: data.pageNo,
                            total: res.totalPages,
                        }))
                    }
                    if (typeof callback === 'function') {
                        callback()
                    }
                } else {
                    Toast.fail(res.msg)
                }
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyInvitation)