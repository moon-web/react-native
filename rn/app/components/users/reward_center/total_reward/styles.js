import {StyleSheet} from 'react-native'
import {ScreenUtil} from '../../../../utils/util'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafbfc',
        display: 'flex',
        flexDirection: 'column',
    },
    rewardBox:{
        backgroundColor:'#fff',
        flex: 1,
        display: 'flex',
    },
    reward_total_num: {
        height: ScreenUtil.scaleSize(260),
        backgroundColor: '#7c8ebc',
        flexDirection: 'column',
        paddingLeft: ScreenUtil.scaleSize(80),
        paddingRight: ScreenUtil.scaleSize(80),
        paddingTop: ScreenUtil.scaleSize(60)
    },
    reward_total_text: {
        fontSize: ScreenUtil.setSpText(16),
        color: '#fff',
    },
    reward_total_money: {
        fontSize: ScreenUtil.setSpText(40),
        color: '#fff',
        marginTop: ScreenUtil.scaleSize(30),
    },
    reward_title:{
        height:ScreenUtil.scaleSize(60),
        paddingLeft:ScreenUtil.scaleSize(60),
        paddingRight:ScreenUtil.scaleSize(60),
        flexDirection:'row',
        alignItems:'center'
    },
    reward_title_text:{
        fontSize:14,
        color:'#b3b3b3'
    }
})
export default styles