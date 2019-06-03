import { connect } from 'react-redux'
import API from '../../../utils/index'
import { SUCCESS_REPORT_DETAIL } from '../../../constants/task/reportDetailTypes'
import { actionCreator, switchPlatform, switchGoods } from '../../../utils/util';
import WorkDetail from './index'
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
    status: ''
}
function mapStateToProps(state) {
    return {
        detail: state.reportDetailReducer.detail || initDetail,
        fetchDetail: state.reportDetailReducer.fetchDetail
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        getReportDetail: (data)=> {
            API.my_report_detail({id:data}).then((res => {
                if (res.success === true) {
                    res.dataObject.platformText = switchPlatform(res.dataObject.platformType);
                    res.dataObject.kind = switchGoods(res.dataObject.goodsType);
                    dispatch(actionCreator(SUCCESS_REPORT_DETAIL, { detail: res.dataObject }))
                } else {
                    Toast.message('获取举报详情失败')
                }
            }))
        },
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkDetail)