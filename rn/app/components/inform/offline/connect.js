import { connect } from 'react-redux'
import { Toast } from 'teaset'
import Offline from './index'
import { actionCreator } from '../../../utils/util'
import API from '../../../utils/index'
import { UPDATE_PERSONALCOUNT } from '../../../constants/users/personalCountTypes'

const mapStateToProps = (state) => {
  let { brandList } = state.commonReducer;
  return {
    userInfo: state.loginReducer.userInfo,
    currentAddress: state.addressReducer.currentAddress,
    counts: state.personalCountReducer.counts,
    brandList
  }
}

const mapDispatchToProps = (dispatch, props) => {
  let navigation = props.navigation;
  return {
    inform:(data, counts, callback)=>{
      API.create_report(data).then(res => {
        if (res.success === true) {
          let result = Object.assign({}, counts);
          result.count4 += 1;
          dispatch(actionCreator(UPDATE_PERSONALCOUNT, {counts: result}))
          navigation.navigate('InformSuccess', {type: 2})
          typeof callback === 'function' && callback()
        } else {
          Toast.message(res.msg)
        }
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Offline)