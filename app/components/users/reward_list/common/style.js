import { StyleSheet } from 'react-native'
import { ScreenUtil } from '../../../../utils/util'
const styles = StyleSheet.create({
    container:{
        paddingLeft:ScreenUtil.scaleSize(30),
        paddingRight:ScreenUtil.scaleSize(30),
    },
    rewardtask_item:{
        backgroundColor:'#fff',
        borderBottomWidth:1,
        borderTopWidth:1,
        borderLeftWidth:1,
        borderRightWidth:1,
        borderStyle:'solid',
        borderColor:'#e6e6e6',
        flexDirection:'column',
        marginBottom:ScreenUtil.scaleSize(30),
        borderRadius: ScreenUtil.scaleSize(20)
    },
    rewardtask_title_box:{
        paddingLeft:ScreenUtil.scaleSize(30),
        height: ScreenUtil.scaleSize(115),
        borderBottomWidth:1,
        borderStyle:'solid',
        borderBottomColor:'#e6e6e6',
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
    },
    rewardtask_title:{
        width:ScreenUtil.scaleSize(400),
        fontSize:20,
        color:'#292929',
    },
    rewardtask_title_task:{
        fontSize:16,
        flex: 1,
        textAlign: 'right',
        paddingRight:ScreenUtil.scaleSize(30)
    },
    rewardtask_state:{
        width: ScreenUtil.scaleSize(110),
        height: ScreenUtil.scaleSize(115),
    },
    rewardtask_item_con:{
        paddingLeft:ScreenUtil.scaleSize(30),
        paddingRight:ScreenUtil.scaleSize(30),
    },
    rewardtask_item_con_item_box:{
        flexDirection:'column',
        paddingTop:ScreenUtil.scaleSize(30),
    },
    rewardtask_item_con_item_box_border:{
        borderBottomColor:'#e6e6e6',
        borderStyle:'solid',
        borderBottomWidth:1
    },
    rewardtask_item_con_item_box_border_top:{
        borderTopColor:'#e6e6e6',
        borderStyle:'solid',
        borderTopWidth:1
    },
    rewardtask_item_con_item:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingBottom:ScreenUtil.scaleSize(30),
    },
    rewardtask_item_con_list:{
        flexDirection:'row',
        alignItems:'center',
    },
    rewardtask_item_con_bg:{
        width:ScreenUtil.scaleSize(40),
        height:ScreenUtil.scaleSize(40),
    },
    rewardtask_item_con_list_title:{
        fontSize:16,
        color:'#4d4d4d'
    },
    rewardtask_item_con_list_sing:{
        color:'#668fff',
        fontSize:14,
    },
    rewardtask_item_con_list_price:{
        color:'#668fff',
        fontSize:22,
    },
    rewardtask_item_con_list_time:{
        fontSize:16,
        color:'#808080'
    },
    rewardtask_item_con_list_casetype:{
        fontSize:16,
        color:'#f16464'
    },
    rewardtask_item_con_list_progress:{
        fontSize:16,
        color:'#668fff'
    }
})
export default styles