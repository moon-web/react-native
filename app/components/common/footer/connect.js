import { connect } from 'react-redux'
import * as types from '../../../constants/loginTypes'
import { UPDATE_ADDRESS } from '../../../constants/users/addressTypes'
import { GET_BRAND_LIST_SUCCESS, GET_BRAND_LIST_ERROR } from '../../../constants/commonTypes'
import Api from '../../../utils/index'
import { actionCreator } from '../../../utils/util';
import FooterBar from './index'
import myStorage from '../../../utils/myStorage'
myStorage._getStorage()
function mapStateToProps(state) {
  let userInfo = {type: 1, checkStatus: 1};
  return {
    userInfo: state.loginReducer.userInfo || userInfo
  }
}

function mapDispatchToProps(dispatch, props) {
  let navigation = props.navigation;
  return {
    getUserInfo: (userId)=> {
      Api.user_info({
        userId: userId
      }).then(res => {
        if (res.success) {
          dispatch(actionCreator(types.LOGIN_USER, {userInfo: res.dataObject}))
        } else {
          dispatch(actionCreator(types.LOGIN_USER, {userInfo: null}));
          myStorage._remove('user3');
          navigation.navigate('Login');
        }
      })
    },

    // 保存地址数据
    saveLocation: (userId, address, callback)=> {
      dispatch(actionCreator(UPDATE_ADDRESS, address))
      Api.PERSONALDATA({ userId, currentAddress: address.currentAddress })
      .then(res => {
        if (res.success !== true && typeof callback === 'function') {
          callback(userId, address, callback)
        }
      })
    },
    getBrandList: data => {
      Api.getBrandList(data).then(res => {
        if (res.success) {
          dispatch(actionCreator(GET_BRAND_LIST_SUCCESS, {brandList: res.result}))
        } else {
          dispatch(actionCreator(GET_BRAND_LIST_ERROR))
        }
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (FooterBar)