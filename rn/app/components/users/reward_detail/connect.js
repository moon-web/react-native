import { connect } from 'react-redux'
import RewardDetail from './index'
import { SUCCESS_REWARD_DETAIL } from '../../../constants/task/rewardDetailTypes'
import { SUCCESS_REWARD_TASK_LIST } from '../../../constants/task/rewardListTypes';
import API from '../../../utils/index'
import { Toast } from 'teaset'
import { actionCreator, switchStateText, switchState } from '../../../utils/util'
function mapStateToProps(state) {
    return {
        userInfo: state.loginReducer.userInfo,
        compensableDetail: state.rewardDetailReducer.compensableDetail || {},
        rewardList: state.rewardTaskReducer.rewardList,
        detail: state.rewardDetailReducer.detail || {}
    }
}
function mapDispatchToProps(dispatch, props) {
    // 这里将分发更新数据的方法转化为组件的props 使用方法是通过组件的props来调用
    const navigation = props.navigation;
    return {
        rewardDeatil: (data) => {
            API.rewardDetail(data).then(res => {
                if (res.success === true) {
                    const element = res.dataObject;
                    if (element.compensableDetail.status) {
                        element.statusText = switchStateText(element.compensableDetail.status)
                        element.statusTaskText = switchState(element.compensableDetail.status)
                        element.suspect = JSON.parse(element.suspect)
                        element.taobao = JSON.parse(element.taobao)
                        element._mainPics = JSON.parse(element._mainPics)
                    }
                    dispatch(actionCreator(SUCCESS_REWARD_DETAIL, { detail: element }))
                }
            })
        },
        ApplyTask:(data,callback) => {
            API.applyTask(data).then(res => {
                if(res.success === true){
                    if(typeof callback === 'function'){
                        callback()
                    }
                }
            })
        },
        ConsultTask:(data,callback) => {
            API.cunsult(data).then(res => {
                if(res.success === true){
                    Toast.success('协商金额提交成功，请等待审核')
                    if(typeof callback === 'function'){
                        callback()
                    }
                }
            })
        },
        GiveUpTask:(data,callback) => {
            API.giveUp_task(data).then(res => {
                if(res.success === true){
                    if(typeof callback === 'function'){
                        callback()
                    }
                }
            })
        },
        loadRewardTask:(data,oldRewardResult,callback) => {
            API.rewardList(data).then(res => {
                if(res.success === true) {
                    if(res.result && res.result.length>0) {
                        let data = [];
                        for (let i = 0; i < res.result.length; i++) {
                            const element = res.result[i];
                            if (element.status) {
                                element.statusText = switchStateText(element.status)
                                element.statusTaskText = switchState(element.status)
                            }
                            data.push(element)
                        }
                        dispatch(actionCreator(SUCCESS_REWARD_TASK_LIST, {rewardTaskData: data,oldRewardResult,pageNo:data.pageNo, total: res.totalPages}))
                    }
                    if(typeof callback === 'function'){
                        callback()
                    }
                }
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RewardDetail)