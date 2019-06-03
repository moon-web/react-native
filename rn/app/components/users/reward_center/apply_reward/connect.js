import { connect } from 'react-redux'
import ApplyReward from './index'
import API from '../../../../utils/index'
import { actionCreator } from '../../../../utils/util'
import * as types from '../../../../constants/users/applyRewardTypes'
function mapStateToProps(state){
    return{
        userInfo:state.loginReducer.userInfo,
        applyRewardBackInfo:state.applyRewardReducer.applyRewardBackInfo||{}
    }
}
function mapDispatchToProps(dispatch,props){
    // 这里将分发更新数据的方法转化为组件的props 使用方法是通过组件的props来调用
    const navigation = props.navigation;
    return{
        ApplyReward:(data) => {
            API.apply_reward(data).then(res => {
                if(res.success === true){
                    // 跳转
                    navigation.navigate("TotalReward")
                }
            })
        },
        ApplyRewardBackinfo:(data,callback) => {
            API.total_reward(data).then(res => {
                if(res.success === true){
                    if(res.result && res.result.length>0){
                        let obj = {
                            id:res.result[0].id
                        }
                        API.apply_reward_backinfo(obj).then(res => {
                            if(res.success === true) {
                                dispatch(actionCreator(types.APPLY_REWARD_BACKINFO, {applyRewardBackInfo: res.dataObject}))
                                if(typeof callback === 'function'){
                                    callback()
                                }
                            }
                        })
                    }
                }
            })

        },
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ApplyReward)