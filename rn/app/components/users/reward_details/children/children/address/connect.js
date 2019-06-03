import { connect } from 'react-redux'
import Address from './address'
import { UPDATE_ADDRESS_SUCCESS } from '../../../../../../constants/task/rewardDetailTypes'
import API from '../../../../../../utils/index'
import { actionCreator } from '../../../../../../utils/util'
function mapStateToProps(state) {
    const { addressJson, compensableDetail } = state.rewardDetailReducer;
    return {
        addressJson: addressJson || [],
        compensableDetail: compensableDetail || {},
        userInfo: state.loginReducer.userInfo
    }
}
function mapDispatchToProps(dispatch, props) {
    return {
        updateAddress: (data, newData) => {
            // 更新 / 创建地址
            API.second_address_confirm(data).then(res => {
                if (res.success === true) {
                    // 更新数据到store
                    dispatch(actionCreator(UPDATE_ADDRESS_SUCCESS, {addressJson: newData}))
                }
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Address)