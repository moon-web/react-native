import { connect } from 'react-redux'
import UserCenter from './index'
import { actionCreator } from '../../../../utils/util'
import API from '../../../../utils/index'
import { LOGINOUT } from '../../../../constants/loginTypes'
import * as types from '../../../../constants/users/personalCountTypes'
import myStorage from '../../../../utils/myStorage'
myStorage._getStorage();

const mapStateToProps = (state) => {
  const userInfo = state.loginReducer.userInfo;
  const counts = state.personalCountReducer.counts;
  return {
    userInfo,
    counts
  }
}

const mapDispatchToProps = (dispatch, props) => {
  let navigation = props.navigation;
  return {
    getPersonalCount: (userId) => {
      API.personal_count({ userId: userId }).then(res => {
        if (res.success === true) {
          dispatch(actionCreator(types.GET_PERSONALCOUNT_SUCCESS, { counts: res.dataObject }))
        }
      })
    },
    loginOut: () => {
      myStorage._remove('user3')
      dispatch(actionCreator(LOGINOUT))
      navigation.navigate('Login')
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCenter)