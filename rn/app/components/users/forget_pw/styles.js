import { StyleSheet } from 'react-native'
import { ScreenUtil } from '../../../utils/util'
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    changepw_title: {
        paddingLeft: ScreenUtil.scaleSize(60),
        paddingRight: ScreenUtil.scaleSize(60),
        fontSize: ScreenUtil.setSpText(30),
        color: '#292929',
        marginTop: ScreenUtil.scaleSize(120)
    },
    changepw_title_other: {
        paddingLeft: ScreenUtil.scaleSize(60),
        paddingRight: ScreenUtil.scaleSize(60),
        fontSize: ScreenUtil.setSpText(14),
        color: '#292929',
        marginTop: ScreenUtil.scaleSize(70)
    },
    changepw_box: {
        paddingLeft: ScreenUtil.scaleSize(60),
        paddingRight: ScreenUtil.scaleSize(60),
        marginTop: ScreenUtil.scaleSize(80)
    },
    changepw_box_other: {
        paddingLeft: ScreenUtil.scaleSize(60),
        paddingRight: ScreenUtil.scaleSize(60),
        marginTop: ScreenUtil.scaleSize(20)
    },
    changepw_item: {
        flexDirection: 'column',
        marginBottom: ScreenUtil.scaleSize(20)
    },
    changepw_item_title: {
        fontSize: ScreenUtil.setSpText(16)
    },
    changepw_item_box: {
        borderBottomColor: '#181818',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        height: ScreenUtil.scaleSize(90),
        flexDirection: 'row',
    },
    changepw_item_number: {
        height: ScreenUtil.scaleSize(40),
        lineHeight: ScreenUtil.scaleSize(40),
        marginTop: ScreenUtil.scaleSize(30),
        borderRightColor: '#181818',
        borderRightWidth: 1,
        borderStyle: 'solid',
        flex: 1
    },
    changepw_item_input: {
        flex: 3,
        height: ScreenUtil.scaleSize(60),
        marginTop: ScreenUtil.scaleSize(20),
        textAlign: 'left',
        fontSize: ScreenUtil.setSpText(16),
    },
    passwordEyes: {
        width: ScreenUtil.scaleSize(40),
        height: ScreenUtil.scaleSize(40),
        marginTop: ScreenUtil.scaleSize(40)
    },
    changepw_item_code: {
        color: '#668fff',
        borderRightWidth: 0,
    },
    changepw_item_protocol: {
        flexDirection: 'row',
    },
    changepw_item_protocol_con: {
        flexDirection: 'row',
    },
    changepw_item_protocol_title: {
        fontSize: ScreenUtil.setSpText(14)
    },
    changepw_item_protocol_pro: {
        color: '#668fff',
        fontSize: ScreenUtil.setSpText(14)
    },
    changepw_changepw: {
        height: ScreenUtil.scaleSize(90),
        marginTop: ScreenUtil.scaleSize(90)
    },
    changepw_changepw_btn: {
        height: ScreenUtil.scaleSize(80),
        lineHeight: ScreenUtil.scaleSize(80),
        textAlign: 'center',
        color: '#fff',
        fontSize: ScreenUtil.setSpText(18),
        backgroundColor: '#668fff',
        borderRadius: ScreenUtil.scaleSize(50)
    },
    changepw_changepw_btn_other: {
        height: ScreenUtil.scaleSize(80),
        lineHeight: ScreenUtil.scaleSize(80),
        textAlign: 'center',
        color: '#fff',
        fontSize: ScreenUtil.setSpText(18),
        backgroundColor: '#dde6ff',
        borderRadius: ScreenUtil.scaleSize(50)
    }
})
export default styles