import { StyleSheet } from 'react-native'
import { ScreenUtil } from '../../../../utils/util'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff'
    },
    apply_reward_title:{
        height:ScreenUtil.scaleSize(170),
        paddingTop:ScreenUtil.scaleSize(70),
        backgroundColor:'#fff',
        paddingLeft:ScreenUtil.scaleSize(60),
        paddingRight:ScreenUtil.scaleSize(60),
    },
    apply_reward_text:{
        fontSize:30,
        color:'#668fff'
    },
    apply_reward_box:{
        paddingLeft:ScreenUtil.scaleSize(60),
        paddingRight:ScreenUtil.scaleSize(60),
    },
    apply_reward_money:{
        height:ScreenUtil.scaleSize(90),
        flexDirection:'column',
        backgroundColor:'#f1f1f1'
    },
    apply_input_money:{
        flex:1,
        textAlign:'center',
        fontSize:20
    },
    apply_reward_item:{
        height:ScreenUtil.scaleSize(155),
        borderStyle:'solid',
        borderBottomWidth:1,
        borderBottomColor:'#e6e6e6',
        flexDirection:'column',
        paddingTop:ScreenUtil.scaleSize(30),
        paddingBottom:ScreenUtil.scaleSize(30),
    },
    apply_reward_item_text:{
        fontSize:16,
        color:'#4d4d4d',
        marginBottom:ScreenUtil.scaleSize(20)
    },
    apply_input:{
        fontSize:18,
        paddingLeft:0,
        height: ScreenUtil.scaleSize(70),
        lineHeight: ScreenUtil.scaleSize(70)
    },
    apply_reward_item_img:{
        flexDirection:'column',
        paddingTop:ScreenUtil.scaleSize(30),
        paddingBottom:ScreenUtil.scaleSize(30),
    },
    imgWarp: {
        marginTop:ScreenUtil.scaleSize(20),
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    addItem: {
        marginBottom: ScreenUtil.scaleSize(15),
        marginRight: ScreenUtil.scaleSize(15),
    },
    uploadImag: {
        width: ScreenUtil.scaleSize(150),
        height: ScreenUtil.scaleSize(150),
    },

    apply_btn:{
        backgroundColor:'#fff',
        paddingTop:ScreenUtil.scaleSize(60),
        paddingBottom:ScreenUtil.scaleSize(60),
        paddingLeft:ScreenUtil.scaleSize(60),
        paddingRight:ScreenUtil.scaleSize(60),
        height:ScreenUtil.scaleSize(200)
    },
    apply_btn_box:{
        flex:1,
        backgroundColor:'#668fff',
        borderRadius:ScreenUtil.scaleSize(50),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    apply_btn_text:{
        fontSize:20,
        color:'#fff'
    }
})
export default styles