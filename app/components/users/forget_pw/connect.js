import {connect} from 'react-redux'
import * as types from '../../../constants/users/forgetpwTypes'
import API from '../../../utils/index'
import {actionCreator} from '../../../utils/util';
import ForgetPw from './forget_pw'
import {Toast} from 'teaset'

function mapStateToProps(state) {
    return {
        checkId: state.forgetpwReducer.checkId,
        /*Step: state.forgetpwReducer.Step || true*/
    }
}

function mapDispatchToProps(dispatch, props) {
    const navigation = props.navigation;
    return {
        // 获取验证码
        ForgetGetCode: (data) => {
            API.forget_identifying(data).then(res => {
                if (res.success === true) {

                } else {
                    Toast.fail(res.msg)
                }
            })
        },
        //验证验证码
        ForgetCode: (data,callbcak) => {
            API.forget_code(data).then(res => {
                if (res.success === true) {
                    dispatch(actionCreator(types.FORGET_CODE, {checkId: res.dataObject}))
                    if (typeof callbcak === 'function'){
                        callbcak()
                    }
                } else {
                    Toast.fail(res.msg)
                }
            })
        },
        ForgetPw: (data) => {
            API.forget(data).then(res => {
                if (res.success === true) {
                    navigation.navigate('Login')
                } else {
                    Toast.fail(res.msg)
                }
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPw)