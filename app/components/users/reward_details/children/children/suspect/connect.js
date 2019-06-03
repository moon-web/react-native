import { connect } from 'react-redux'
import Suspect from './suspect'
import { UPDATE_SUSPECTJSON_SUCCESS } from '../../../../../../constants/task/rewardDetailTypes'
import API from '../../../../../../utils/index'
import { actionCreator } from '../../../../../../utils/util'
function mapStateToProps(state) {
    const { suspectJson, compensableDetail } = state.rewardDetailReducer;
    return {
        suspectJson: suspectJson || [],
        compensableDetail: compensableDetail || {},
        userInfo: state.loginReducer.userInfo
    }
}
function mapDispatchToProps(dispatch, props) {
    return {
        updateSuspect: (data, newData) => {
            // 更新 / 创建嫌疑人
            API.second_suspect_confirm(data).then(res => {
                if (res.success === true) {
                    // 更新数据到store
                    dispatch(actionCreator(UPDATE_SUSPECTJSON_SUCCESS, {suspectJson: newData}))
                }
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Suspect)