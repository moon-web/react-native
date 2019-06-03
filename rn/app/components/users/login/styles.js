import { StyleSheet } from 'react-native'
import { ScreenUtil } from '../../../utils/util'

const styles = StyleSheet.create({
    box: {
        flex: 1,
        backgroundColor: '#fff'
    },
    container : {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: 'column'
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
        flex: 1
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
        height: ScreenUtil.scaleSize(60),
        width: ScreenUtil.scaleSize(580),
        fontSize: ScreenUtil.setSpText(20),
        marginTop: ScreenUtil.scaleSize(30),
        textAlign: 'center'
    },
    login_del : {
        width: ScreenUtil.scaleSize(50),
        height: ScreenUtil.scaleSize(50),
        marginTop: ScreenUtil.scaleSize(30)
    },
    login_login_box: {
        height: ScreenUtil.scaleSize(90),
        marginTop: ScreenUtil.scaleSize(40)
    },
    login_btn : {
        height: ScreenUtil.scaleSize(80),
        backgroundColor: '#668fff',
        borderRadius: ScreenUtil.scaleSize(50),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    login_btn_text:{
        lineHeight: ScreenUtil.scaleSize(80),
        textAlign: 'center',
        color: '#fff',
        fontSize: ScreenUtil.setSpText(18),
    },
    login_btn_other : {
        height: ScreenUtil.scaleSize(80),
        backgroundColor: '#dde6ff',
        borderRadius: ScreenUtil.scaleSize(50),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
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
    }
})
export default styles