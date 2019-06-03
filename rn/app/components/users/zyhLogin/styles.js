import { StyleSheet } from 'react-native'
import { ScreenUtil } from '../../../utils/util'

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#fff'
    },
    login_logo : {
        width: ScreenUtil.scaleSize(120),
        height: ScreenUtil.scaleSize(180),
        marginTop: ScreenUtil.scaleSize(180),
        marginBottom: ScreenUtil.scaleSize(90)
    },
    login_box : {
        paddingLeft: ScreenUtil.scaleSize(80),
        paddingRight: ScreenUtil.scaleSize(80),
        alignItems: 'center',
        flexDirection: 'column'
    },
    login_box_item : {
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: '#ababab',
        height: ScreenUtil.scaleSize(100),
        flexDirection: 'row',
    },
    login_box_item_other : {
        borderBottomWidth: 0,
    },
    login_input : {
        height: ScreenUtil.scaleSize(90),
        width: ScreenUtil.scaleSize(540),
        fontSize: ScreenUtil.setSpText(20),
        textAlign: 'left',
        paddingLeft:ScreenUtil.scaleSize(30),
    },
    login_del : {
        width: ScreenUtil.scaleSize(50),
        height: ScreenUtil.scaleSize(50),
        marginTop: ScreenUtil.scaleSize(30)
    },
    login_login_box: {
        height: ScreenUtil.scaleSize(90),
        marginTop: ScreenUtil.scaleSize(80)
    },
    login_btn : {
        height: ScreenUtil.scaleSize(80),
        lineHeight: ScreenUtil.scaleSize(80),
        textAlign: 'center',
        color: '#fff',
        fontSize: ScreenUtil.setSpText(20),
        backgroundColor: '#be1111',
        borderRadius: ScreenUtil.scaleSize(10),
        width:ScreenUtil.scaleSize(690),
    },
    login_btn_other : {
        height: ScreenUtil.scaleSize(80),
        lineHeight: ScreenUtil.scaleSize(80),
        textAlign: 'center',
        color: '#fff',
        fontSize: ScreenUtil.setSpText(18),
        backgroundColor: '#dde6ff',
        borderRadius: ScreenUtil.scaleSize(50)
    },
    login_login_box_other: {
        height: ScreenUtil.scaleSize(65),
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: ScreenUtil.scaleSize(40)
    },
    forget_btn : {
        color: '#4d4d4d'
    },
    zyh_btn : {
        color: '#668fff'
    },
    login_login_rigister : {
        height: ScreenUtil.scaleSize(65),
        marginTop: ScreenUtil.scaleSize(60)
    },
    login_rigister_btn : {
        color: '#4d4d4d',
        textAlign: 'center',
        fontSize: ScreenUtil.setSpText(16),
        lineHeight: ScreenUtil.scaleSize(65),
    },
    zyhLoginHeader:{
        width:ScreenUtil.scaleSize(750),
        height:ScreenUtil.scaleSize(140),
        backgroundColor:'#fff',
        padding:ScreenUtil.scaleSize(40),
    },
    loginwrapper:{
        width:ScreenUtil.scaleSize(690),
        height:ScreenUtil.scaleSize(90),
        marginTop:ScreenUtil.scaleSize(60),
        borderColor:'#ccc',
        borderWidth:ScreenUtil.scaleSize(2),
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection: 'row',
    },
    loginicon:{
        top: ScreenUtil.scaleSize(6),
        width: ScreenUtil.scaleSize(96),
        height: ScreenUtil.scaleSize(60),
        borderRightWidth: ScreenUtil.scaleSize(2),
        borderRightColor:'#e5e5e5',
        paddingRight:ScreenUtil.scaleSize(20),
        paddingLeft:ScreenUtil.scaleSize(20),
        alignItems:'center',
        justifyContent:'center',
        flexDirection: 'row',
    },
    icon:{
        width: ScreenUtil.scaleSize(25),
    },
})
export default styles