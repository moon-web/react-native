import { connect } from 'react-redux'
import RewardCompletDetail from './index'
import { SUCCESS_REWARD_DETAIL, UPDATE_SUSPECTJSON_SUCCESS, UPDATE_ADDRESS_SUCCESS, UPDATE_LAW_SUCCESS } from '../../../constants/task/rewardDetailTypes'
import { SUCCESS_REWARD_TASK_LIST } from '../../../constants/task/rewardListTypes'
import API from '../../../utils/index'
import { actionCreator, switchStateText, switchState } from '../../../utils/util'
import Toast from 'teaset/components/Toast/Toast';
function mapStateToProps(state) {
    const { detail, suspectJson, addressJson, compensableDetail } = state.rewardDetailReducer;
    const { newListResult } = state.rewardTaskReducer;
    const { userInfo } = state.loginReducer;
    let users, result = [];
    // 组团人员
    if (compensableDetail) {
        let data = [].concat(compensableDetail.allot || [], compensableDetail.team || []);
        for (let i = 0; i < data.length; i++) {
            let flag = true;
            for (let j = 0; j < result.length; j++) {
                if (data[i].nickName == result[j].nickName) {
                    flag = false;
                }
            }
            if (flag) {
                result.push(data[i]);
            };
        }
        users = result;
        for (let i = 0; i < users.length; i++) {
            const element = users[i];
            if (userInfo.type === 4 && element.nickName === userInfo.chargeNick) {
                compensableDetail.isShow = element.isShow;
            } else if (element.nickName === userInfo.nickName) {
                compensableDetail.isShow = element.isShow;
            }
        }
    }
    return {
        detail: detail || {},
        suspectJson: suspectJson || [],
        addressJson: addressJson || [],
        compensableDetail: compensableDetail || {},
        userInfo: userInfo,
        users: users || [],
        newListResult
    }
}
function mapDispatchToProps(dispatch, props) {
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
                        if (element.compensableDetail) {
                            if (element.compensableDetail.allot) {
                                // 组团人员信息
                                element.compensableDetail.allot = JSON.parse(element.compensableDetail.allot)
                            }
                            if (element.compensableDetail.team) {
                                // 组团人员信息
                                element.compensableDetail.team = JSON.parse(element.compensableDetail.team)
                            }
                            if (element.compensableDetail.suspectJson) {
                                // 嫌疑人信息
                                let suspectJson = JSON.parse(element.compensableDetail.suspectJson)
                                dispatch(actionCreator(UPDATE_SUSPECTJSON_SUCCESS, { suspectJson }))
                            } else {
                                dispatch(actionCreator(UPDATE_SUSPECTJSON_SUCCESS, { suspectJson: [] }))
                            }
                            if (element.compensableDetail.addressJson) {
                                // 举报地址信息
                                let addressJson = JSON.parse(element.compensableDetail.addressJson)
                                dispatch(actionCreator(UPDATE_ADDRESS_SUCCESS, { addressJson }))
                            } else {
                                dispatch(actionCreator(UPDATE_ADDRESS_SUCCESS, { addressJson: [] }))
                            }
                            if (element.compensableDetail.userInfo) {
                                // 执法资源信息
                                element.compensableDetail.userInfo = JSON.parse(element.compensableDetail.userInfo)
                            }
                            element.compensableDetail.notice = element.compensableDetail.notice.split(',');
                            element.compensableDetail.law = element.compensableDetail.law.split(',');
                            element.compensableDetail.move = element.compensableDetail.move.split(',');
                            // 更新数据到store
                            dispatch(actionCreator(UPDATE_LAW_SUCCESS, { compensableDetail: element.compensableDetail }))
                        }
                    }
                    dispatch(actionCreator(SUCCESS_REWARD_DETAIL, { detail: element }))
                }
            })
        },
        getCompanayUsers: (data, callback) => {
            // 获取公司成员
            API.my_companyMembers(data).then((res) => {
                if (res.success === true) {
                    typeof callback === 'function' && callback(res)
                }
            })
        },
        updateAllot: (data, newDetail) => {
            // 分配接口
            API.SECOND_FENPEI(data).then((res) => {
                if (res.success) {
                    dispatch(actionCreator(UPDATE_LAW_SUCCESS, { compensableDetail: newDetail }))
                    Toast.message('分配任务成功')
                }
            })
        },
        checkZuTuanStatus: (data, callback) => {
            // 校验组团人员
            API.SECOND_USERNAME(data).then((res) => {
                typeof callback === 'function' && callback(res)
            })
        },
        zutuanusers: (data, newDetail, callback, type, newListResult) => {
            API.SECOND_ZUTUAN(data).then((res) => {
                if (res.success) {
                    dispatch(actionCreator(UPDATE_LAW_SUCCESS, { compensableDetail: newDetail }))
                    if (type === 'reject') {

                        dispatch(actionCreator(SUCCESS_REWARD_TASK_LIST, { rewardTaskData: newListResult }))
                    }
                    typeof callback === 'function' && callback()
                }
            })
        },
        applyFinish: (data, newDetail) => {
            API.FINSHTASK(data).then((res) => {
                if (res.success == true) {
                    Toast.success('已经成功提交后台，请等待审核')
                    dispatch(actionCreator(UPDATE_LAW_SUCCESS, { compensableDetail: newDetail }))
                } else {
                    Toast.fail(res.msg)
                }
            })
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RewardCompletDetail)