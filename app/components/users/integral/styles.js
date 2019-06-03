import { StyleSheet } from 'react-native'
import { ScreenUtil } from '../../../utils/util'
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: ScreenUtil.scaleSize(750),
        backgroundColor: '#fafbfc',
        paddingBottom:ScreenUtil.scaleSize(20),
        display: 'flex',
        flexDirection: 'column',
    },
    intrgralImg:{
        width:ScreenUtil.scaleSize(750),
        height:ScreenUtil.scaleSize(260),
        backgroundColor:'#686f78',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingLeft:ScreenUtil.scaleSize(80),
        paddingRight:ScreenUtil.scaleSize(80),
    },
    intrgralImg_Inf:{
        width:ScreenUtil.scaleSize(390),
        minHeight:ScreenUtil.scaleSize(260),
        paddingTop:ScreenUtil.scaleSize(30),
    },
    intrgralImgtitles:{
        fontSize:ScreenUtil.setSpText(16),
        color:'#fff',
    },
    intrgralMoney:{
        fontSize:ScreenUtil.setSpText(60),
        color:'#fff',
        marginTop:ScreenUtil.scaleSize(20),
    },
    img:{
        width:ScreenUtil.scaleSize(228),
        height:ScreenUtil.scaleSize(202),
    },
    PersonalOrdinary_box1_item_image:{
        width:ScreenUtil.scaleSize(228),
        height:ScreenUtil.scaleSize(202),
    },
    titlename:{
        width:ScreenUtil.scaleSize(750),
        height:ScreenUtil.scaleSize(60),
        paddingLeft:ScreenUtil.scaleSize(80),
    },
    wrapper:{
        width:ScreenUtil.scaleSize(750),
        paddingBottom:ScreenUtil.scaleSize(20),
        flex: 1,
        backgroundColor:'#fff',
    },
    name:{
        fontSize:ScreenUtil.setSpText(14),
        color:'#b3b3b3',
        lineHeight:ScreenUtil.scaleSize(60),
    },
    wrapper_box: {
        paddingLeft:ScreenUtil.scaleSize(80),
        paddingRight:ScreenUtil.scaleSize(80),
    },
    wrappermoney:{
        height:ScreenUtil.scaleSize(100),
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderBottomColor:'#e6e6e6',
        borderBottomWidth:1,
    },
    wrappermoneyname:{
        fontSize:ScreenUtil.setSpText(16),
        color:'#5d5d5d',
        lineHeight:ScreenUtil.scaleSize(100),
    },
    mon:{
        color:'#686f78'
    },
    end : {
        textAlign:'center',
        lineHeight:ScreenUtil.scaleSize(100),
        fontSize:ScreenUtil.setSpText(16),
        color:'#808080'
    }
})
export default styles