import { StyleSheet } from 'react-native'
import { ScreenUtil } from '../../../utils/util'
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
    },
    company_top : {
        height: ScreenUtil.scaleSize(220),
        paddingLeft: ScreenUtil.scaleSize(80),
        paddingTop: ScreenUtil.scaleSize(60),
    },
    company_top_text: {
        fontSize: 30,
        color:'#292929',
    },
    company_list:{
        paddingLeft:ScreenUtil.scaleSize(80),
        flexDirection:'column',
        flex:1,
        paddingBottom:ScreenUtil.scaleSize(200)
    },
    company_add_btn_box:{
        paddingRight:ScreenUtil.scaleSize(80),
        paddingLeft:ScreenUtil.scaleSize(80),
        position:'absolute',
        bottom:ScreenUtil.scaleSize(60),
        width:ScreenUtil.scaleSize(750)
    },
    company_add_btn:{
        flex:1,
        height:ScreenUtil.scaleSize(88),
        backgroundColor:'#668fff',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        borderRadius:ScreenUtil.scaleSize(50)
    },
    company_add_img:{
        width:ScreenUtil.scaleSize(48),
        height:ScreenUtil.scaleSize(48),
    },
    company_add_text:{
        color:'#fff',
        fontSize:18
    }
})
export default styles
