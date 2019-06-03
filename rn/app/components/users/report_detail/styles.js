import { StyleSheet } from 'react-native'
import { ScreenUtil } from '../../../utils/util'
const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    reportDetail_box : {
        flex: 1,
        paddingLeft: ScreenUtil.scaleSize(30),
        paddingRight: ScreenUtil.scaleSize(30),
        marginTop: ScreenUtil.scaleSize(30),
    },
    reportDetail: {
        backgroundColor: '#fff',
        paddingTop: ScreenUtil.scaleSize(30),
        paddingBottom: ScreenUtil.scaleSize(30),
        paddingLeft: ScreenUtil.scaleSize(30),
        paddingRight: ScreenUtil.scaleSize(30),
        position: 'relative'
    },
    reportDetail_item : {
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: '#e6e6e6',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        paddingTop: ScreenUtil.scaleSize(20),
        paddingBottom: ScreenUtil.scaleSize(20)
    },
    reportDetail_item_other : {
        flexDirection:'column',
        marginTop: ScreenUtil.scaleSize(20)
    },
    reportDetail_item_title : {
        fontSize: ScreenUtil.setSpText(14),
        lineHeight: ScreenUtil.scaleSize(60)
    },
    reportDetail_item_title_other : {
        fontSize: ScreenUtil.setSpText(14),
        lineHeight: ScreenUtil.scaleSize(60),
        height: ScreenUtil.scaleSize(60)
    },
    reportDetail_item_con : {
        flex: 1,
        fontSize: ScreenUtil.setSpText(16)
    },
    reportDetail_item_con_other : {
        fontSize: ScreenUtil.setSpText(16),
        backgroundColor: '#e6e6e6',
        paddingTop: ScreenUtil.scaleSize(20),
        paddingBottom: ScreenUtil.scaleSize(20),
        paddingLeft: ScreenUtil.scaleSize(20),
        paddingRight: ScreenUtil.scaleSize(20),
    },
    statusImg : {
        position: 'absolute',
        top: ScreenUtil.scaleSize(30),
        right: ScreenUtil.scaleSize(100),
        width: ScreenUtil.scaleSize(200),
        height: ScreenUtil.scaleSize(150)
    },
    reportDetail_item_con_img : {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    reportItem_Img : {
        width: ScreenUtil.scaleSize(160),
        height: ScreenUtil.scaleSize(160),
        marginLeft: ScreenUtil.scaleSize(10),
        marginTop: ScreenUtil.scaleSize(10),
        borderRadius: ScreenUtil.scaleSize(10),
    }
})
export default styles