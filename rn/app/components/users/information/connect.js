import { connect } from 'react-redux'
import { Toast } from 'teaset'
import ModifyInformation from './ModifyInformation'
import { actionCreator } from '../../../utils/util'
import API from '../../../utils/index'
import { LOGIN_USER } from '../../../constants/loginTypes'

const mapStateToProps = (state) => {
  return {
    userInfo: state.loginReducer.userInfo
  }
}

const mapDispatchToProps = (dispatch, props) => {
  let navigation = props.navigation;
  return {
    updateUserInfo: (data) => {
      API.PERSONALDATA(data).then(res => {
        if (res.success === true) {
          Toast.message('修改信息成功')
          dispatch(actionCreator(LOGIN_USER, { userInfo: data }))
          navigation.goBack()
        } else {
          Toast.fail(res.msg)
        }
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModifyInformation)