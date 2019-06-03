import { connect } from 'react-redux'
import Login from './login'
import * as login from '../../../constants/loginTypes'
import { actionCreator } from '../../../utils/util'
import API from '../../../utils/index'
import myStorage from '../../../utils/myStorage'
import { Toast } from 'teaset'

function mapStateToProps (state) {
    // 这里是将reducer中的数据转化为组建的props 使用方法是通过组件的props来调用
    return {
        success: state.loginReducer.success,
        error: state.loginReducer.error,
        timestamp: state.loginReducer.error
    }
}

function mapDispatchToProps (dispatch, props) {
    // 这里将分发更新数据的方法转化为组件的props 使用方法是通过组件的props来调用
    const navigation = props.navigation;
    return {
        login: (data, callback) => {
            API.login(data).then(res => {
                if (res.success) {
                    dispatch(actionCreator(login.LOGIN, {success: true}))
                    // 如果有回调函数的时候执行
                    if (typeof callback === 'function') {
                        callback(res.dataObject.userId)
                    }
                    let storage = {
                        idNo: res.dataObject.idNo,
                        type: res.dataObject.type,
                        userId: res.dataObject.userId,
                        checkStatus: res.dataObject.checkStatus
                    }
                    myStorage._sava('user3', storage)
                    // 跳转
                    navigation.navigate("Home")
                } else {
                    dispatch(actionCreator(login.LOGIN, {error: true}))
                    myStorage._remove('user3')
                    Toast.fail(res.msg);
                }
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);