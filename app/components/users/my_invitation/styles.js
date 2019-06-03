import { ScreenUtil } from '../../../utils/util'
import { StyleSheet } from 'react-native'
const styles= StyleSheet.create({
    container:{
        flex:1
    },
    top_box: {
        backgroundColor: '#ffffff'
    },
    myInvitation_top : {
        height: ScreenUtil.scaleSize(370),
        backgroundColor: '#7b8bb9',
        paddingLeft: ScreenUtil.scaleSize(80),
        paddingTop: ScreenUtil.scaleSize(60),
        zIndex:1
    },
    myInvitation_top_text: {
        fontSize: 30,
        color:'#fff',
    },
    myInvitation_container:{
        backgroundColor: '#fff',
        paddingLeft:ScreenUtil.scaleSize(50),
        paddingRight:ScreenUtil.scaleSize(50),
        height:ScreenUtil.scaleSize(350),
    },
    myInvitation_code:{
        backgroundColor: '#fff',
        paddingBottom:ScreenUtil.scaleSize(30),
        paddingTop:ScreenUtil.scaleSize(30),
        paddingLeft:ScreenUtil.scaleSize(30),
        paddingRight:ScreenUtil.scaleSize(30),
    },
    invitation_img:{
        height:ScreenUtil.scaleSize(400),
        width:ScreenUtil.scaleSize(400),
    },
    myInvitation_box:{
        position:'absolute',
        height:ScreenUtil.scaleSize(340),
        backgroundColor:'#fafbfc',
        borderRadius: ScreenUtil.scaleSize(20),
        top: ScreenUtil.scaleSize(200),
        paddingLeft: ScreenUtil.scaleSize(30),
        paddingRight: ScreenUtil.scaleSize(30),
        paddingTop: ScreenUtil.scaleSize(30),
        paddingBottom: ScreenUtil.scaleSize(30),
        zIndex:99,
        left:ScreenUtil.scaleSize(50),
        width:ScreenUtil.scaleSize(650),
    },
    myInvitation_box_item:{
        marginTop:ScreenUtil.scaleSize(30),
        height:ScreenUtil.scaleSize(110),
        borderBottomColor:'#e1e1e1',
        borderBottomWidth:1,
        borderStyle:'solid'
    },
    myInvitation_box_item_title:{
        fontSize: 14,
        color:'#4d4d4d',
        marginBottom:ScreenUtil.scaleSize(10)
    },
    myInvitation_input:{
      paddingLeft:0,
      lineHeight: ScreenUtil.scaleSize(66),
      height: ScreenUtil.scaleSize(66)
    },
    myInvitation_box_btn:{
        height: ScreenUtil.scaleSize(88),
        backgroundColor:'#668fff',
        borderRadius:ScreenUtil.scaleSize(50),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginTop:ScreenUtil.scaleSize(230),
        marginBottom:ScreenUtil.scaleSize(30),
    },
    myInvitation_box_btn_text:{
        fontSize: 18,
        color:'#fff'
    },
    myInvitation_list_box:{
        backgroundColor:'#fff',
        flex:1
    },
    myInvitation_list_deiscrible_box:{
        paddingLeft:ScreenUtil.scaleSize(80),
        paddingRight:ScreenUtil.scaleSize(80),
    },
    myInvitation_list_deiscrible: {
        fontSize:14,
        color:'#7d8ebd'
    },
    myInvitation_list_title_box: {
        height: ScreenUtil.scaleSize(65),
        backgroundColor:'#fafbfc',
        paddingLeft:ScreenUtil.scaleSize(80),
        paddingRight:ScreenUtil.scaleSize(80),
        flexDirection:'row',
        alignItems:'center'
    },
    myInvitation_list_title:{
        fontSize:14,
        color:'#b3b3b3',
    },
    myInvitation_list:{
        backgroundColor:'#fff',
        flex:1
    },
    myInvitation_list_item_box:{
        paddingLeft:ScreenUtil.scaleSize(80),
        paddingRight:ScreenUtil.scaleSize(80),
        flexDirection:'row',
    },
    myInvitation_list_item:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        height: ScreenUtil.scaleSize(100),
        borderBottomWidth: 1,
        borderStyle:'solid',
        borderBottomColor:'#e6e6e6'
    },
    myInvitation_list_item_title:{
        fontSize: 16,
        color:'#7d8edb',
    },
    myInvitation_list_item_phone:{
        fontSize: 14,
        color:'#808080'
    },
    myInvitation_list_item_time:{
        fontSize: 14,
        color:'#b3b3b3'
    }

})
export default styles