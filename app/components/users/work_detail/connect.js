import { connect } from 'react-redux'
import API from '../../../utils/index'
import { SUCCESS_WORK_DETAIL } from '../../../constants/task/workDetailTypes'
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
        userInfo: state.loginReducer.userInfo,
        detail: state.workDetailReducer.detail || initDetail,
        fetchDetail: state.workDetailReducer.fetchDetail
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        getWorkDetail: (data)=> {
            API.TASKWORKDetils({id:data}).then((res => {
                if (res.success === true) {
                    res.dataObject.platformText = switchPlatform(res.dataObject.platformType);
                    res.dataObject.goodsText = switchGoods(res.dataObject.goodsType);
                    dispatch(actionCreator(SUCCESS_WORK_DETAIL, { detail: res.dataObject }))
                } else {
                    Toast.message('获取作业详情失败')
                }
            }))
        },
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkDetail)