import { StyleSheet } from 'react-native'
import { ScreenUtil } from '../../../../utils/util'
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    goback:{
        fontSize:ScreenUtil.setSpText(18),
        lineHeight:ScreenUtil.scaleSize(60),
        color:'#363636',
        marginRight:ScreenUtil.scaleSize(30),
    },
    register_title: {
        paddingLeft: ScreenUtil.scaleSize(60),
        paddingRight: ScreenUtil.scaleSize(60),
        fontSize: ScreenUtil.setSpText(30),
        color: '#292929',
        marginTop: ScreenUtil.scaleSize(120)
    },
    register_box: {
        paddingLeft: ScreenUtil.scaleSize(60),
        paddingRight: ScreenUtil.scaleSize(60),
        marginTop: ScreenUtil.scaleSize(80)
    },
    register_item: {
        flexDirection: 'column',
        marginBottom: ScreenUtil.scaleSize(20)
    },
    register_item_title: {
        fontSize: ScreenUtil.setSpText(16)
    },
    register_item_box: {
        borderBottomColor: '#181818',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        height: ScreenUtil.scaleSize(90),
        flexDirection: 'row',
    },
    register_item_number: {
        height: ScreenUtil.scaleSize(40),
        lineHeight: ScreenUtil.scaleSize(40),
        marginTop: ScreenUtil.scaleSize(30),
        borderRightColor: '#181818',
        borderRightWidth: 1,
        borderStyle: 'solid',
        flex: 1
    },
    register_item_input: {
        flex: 3,
        height: ScreenUtil.scaleSize(60),
        marginTop: ScreenUtil.scaleSize(20),
        textAlign: 'left',
        fontSize: ScreenUtil.setSpText(16),
    },
    passwordEyes : {
        width: ScreenUtil.scaleSize(40),
        height: ScreenUtil.scaleSize(40),
        marginTop: ScreenUtil.scaleSize(40)
    },
    register_item_code: {
        color: '#668fff',
        borderRightWidth: 0,
    },
    register_item_protocol : {
        flexDirection: 'row',
    },
    register_item_protocol_con : {
        flexDirection: 'row',
    },
    register_item_protocol_title: {
        fontSize : ScreenUtil.setSpText(14)
    },
    register_item_protocol_pro : {
        color: '#668fff',
        fontSize : ScreenUtil.setSpText(14)
    },
    register_register : {
        height: ScreenUtil.scaleSize(90),
        marginTop: ScreenUtil.scaleSize(90)
    },
    register_register_btn : {
        height: ScreenUtil.scaleSize(80),
        backgroundColor: '#668fff',
        borderRadius: ScreenUtil.scaleSize(50),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    register_register_btn_other : {
        height: ScreenUtil.scaleSize(80),
        backgroundColor: '#dde6ff',
        borderRadius: ScreenUtil.scaleSize(50),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    register_register_btn_text:{
        color: '#fff',
        fontSize: ScreenUtil.setSpText(18),
    }
})
export default styles