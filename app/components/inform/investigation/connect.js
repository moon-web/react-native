import { connect } from 'react-redux'
import Investigation from './index'
import { actionCreator } from '../../../utils/util'
import { UPDATE_PERSONALCOUNT } from '../../../constants/users/personalCountTypes'
import API from '../../../utils/index'
import { Toast } from 'teaset'

function mapStateToProps (state) {
    // 这里是将reducer中的数据转化为组建的props 使用方法是通过组件的props来调用
    let address = state.addressReducer.currentAddress,
        userInfo = state.loginReducer.userInfo,
        counts = state.personalCountReducer.counts;
    return {
        address,
        userInfo,
        counts
    }
}

function mapDispatchToProps (dispatch, props) {
    // 这里将分发更新数据的方法转化为组件的props 使用方法是通过组件的props来调用
    const navigation = props.navigation;
    return {
        createInvestigation: (data, counts, callback) => {
            API.second_clue(data).then(res => {
                if (res.success) {
                    let result = Object.assign({}, counts);
                    result.count1 += 1;
                    dispatch(actionCreator(UPDATE_PERSONALCOUNT, {counts: result}))
                    navigation.navigate('InformSuccess', {type: 3})
                    typeof callback === 'function' && callback()
                } else {
                    Toast.message('举报失败')
                }
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Investigation);