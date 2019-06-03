import { StyleSheet } from 'react-native'
import { ScreenUtil } from '../../../utils/util'
const styles = StyleSheet.create({
    industryItem: {
        marginBottom: ScreenUtil.scaleSize(20),
        marginRight: ScreenUtil.scaleSize(20),
        height: ScreenUtil.scaleSize(68),
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    industryWrap: {
        height: ScreenUtil.scaleSize(68),
        borderRadius: ScreenUtil.scaleSize(10),
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderColor: '#668fff',
    },
    industryText: {
        lineHeight: ScreenUtil.scaleSize(64),
        fontSize: ScreenUtil.setSpText(18),
        paddingLeft: ScreenUtil.scaleSize(30),
        paddingRight: ScreenUtil.scaleSize(30),
        color: '#668fff',
    },
    industryOn: {
        position: 'absolute',
        top: ScreenUtil.scaleSize(-20),
        right: ScreenUtil.scaleSize(-20),
    },
    industryDel:{
        width: ScreenUtil.scaleSize(48),
        height: ScreenUtil.scaleSize(48),
    },
})
export default styles