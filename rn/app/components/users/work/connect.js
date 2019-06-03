import { connect } from 'react-redux'
import { Toast } from 'teaset'
import WorkDatalis from './index'
import API from '../../../utils/index'

function mapStateToProps(state, ownProps) {
  return {
    userInfo: state.loginReducer.userInfo,
    currentAddress: state.addressReducer.currentAddress
  }
}

function mapDispatchToProps(dispatch, props) {
  const navigation = props.navigation;
  return {
    createTaskWork: (data, index, callback) => {
      API.CREATETASKWORK(data).then((res => {
        if (res.success === true) {
            if (index === '1') {
              callback()
              Toast.message('已提交成功，请继续提交')
            } else {
              navigation.navigate('TaskSuccessful')
            }
        } else {
          Toast.message(res.msg)
        }
    }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (WorkDatalis)