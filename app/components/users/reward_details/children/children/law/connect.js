import { connect } from 'react-redux'
import Law from './law'
import { UPDATE_LAW_SUCCESS } from '../../../../../../constants/task/rewardDetailTypes'
import API from '../../../../../../utils/index'
import { actionCreator } from '../../../../../../utils/util'
function mapStateToProps(state) {
    const { compensableDetail } = state.rewardDetailReducer;
    return {
        compensableDetail: compensableDetail || {},
        userInfo: state.loginReducer.userInfo
    }
}
function mapDispatchToProps(dispatch, props) {
    return {
        updateLaw: (data, newData) => {
            // 更新 / 添加执法信息
            API.second_caseProgress(data).then(res => {
                if (res.success === true) {
                    // 更新数据到store
                    dispatch(actionCreator(UPDATE_LAW_SUCCESS, {compensableDetail: newData}))
                }
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Law)