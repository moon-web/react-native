import { connect } from 'react-redux'
import API from '../../../utils/index'
import { SUCCESS_INVESTIGATION_DETAIL } from '../../../constants/task/investigationDetailType'
import { actionCreator, switchStateText, switchState } from '../../../utils/util';
import InvestigationDetail from './index'
import { Toast } from 'teaset'

const initDetail = {
  type: '',
  brand: '',
  goodsType: '',
  goodsText: '',
  goodsLink: '',
  _mainPics: '',
  address: '',
  detailAddress: '',
  kind: '',
  platformName: '',
  platformText: '',
  reportTime: '',
  taskName: '',
  note: '',
  status: '',
  suspect: []
}
function mapStateToProps(state) {
  return {
    detail: state.investigationDetailReducer.detail || initDetail
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
    getInvestigationDetail: (data) => {
      API.rewardListsDetails(data).then((res) => {
        if (res.success === true) {
          const element = res.dataObject;
          if (element.compensableDetail.status) {
            element.statusText = switchStateText(element.compensableDetail.status)
            element.statusTaskText = switchState(element.compensableDetail.status)
          }
          element.suspect = JSON.parse(element.suspect)
          element.taobao = JSON.parse(element.taobao)
          element._mainPics = JSON.parse(element._mainPics)
          dispatch(actionCreator(SUCCESS_INVESTIGATION_DETAIL, { detail: element }))
        }
      })
    },

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvestigationDetail)