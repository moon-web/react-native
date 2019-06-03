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
    register_step: {
        paddingLeft: ScreenUtil.scaleSize(60),
        paddingRight: ScreenUtil.scaleSize(60),
        backgroundColor:'#fafbfc',
        height: ScreenUtil.scaleSize(58),
        flexDirection: 'row',
        alignItems:'center'
    },
    register_step_item:{
        flex:1,
        flexDirection: 'row',
        alignItems:'center'
    },
    register_step_box:{
        width:ScreenUtil.scaleSize(40),
        height:ScreenUtil.scaleSize(40),
        borderRadius: ScreenUtil.scaleSize(20),
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#292929',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center'
    },
    register_step_box_active: {
        width:ScreenUtil.scaleSize(40),
        height:ScreenUtil.scaleSize(40),
        borderRadius: ScreenUtil.scaleSize(20),
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#668fff',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center'
    },
    register_step_num: {
        textAlign: 'center',
        color:'#292929',
        fontSize: ScreenUtil.setSpText(18),
        lineHeight: ScreenUtil.scaleSize(40)
    },
    register_step_num_active: {
        textAlign: 'center',
        color:'#668fff',
        fontSize: ScreenUtil.setSpText(18),
        lineHeight: ScreenUtil.scaleSize(40)
    },
    register_step_title_active:{
        color:'#668fff',
        fontSize:ScreenUtil.setSpText(18),
    },
    register_step_title:{
        color:'#292929',
        fontSize:ScreenUtil.setSpText(18),
    },
    register_title: {
        paddingLeft: ScreenUtil.scaleSize(60),
        paddingRight: ScreenUtil.scaleSize(60),
        fontSize: ScreenUtil.setSpText(26),
        color: '#292929',
        marginTop: ScreenUtil.scaleSize(60)
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
    register_item_index : {
        width: ScreenUtil.scaleSize(35),
        height: ScreenUtil.scaleSize(35),
        borderRadius: ScreenUtil.scaleSize(18),
        marginTop: ScreenUtil.scaleSize(35),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#ccc'
    },
    register_item_index_text:{
        fontSize: ScreenUtil.setSpText(16),
        color:'#fff'
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
        marginTop: ScreenUtil.scaleSize(90),
        marginBottom: ScreenUtil.scaleSize(90),
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
    },
    imgWarp: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: ScreenUtil.scaleSize(30)
    },
    uploadImage:{
        width: ScreenUtil.scaleSize(150),
        height: ScreenUtil.scaleSize(150),
    },
    addItemImage: {
        width: ScreenUtil.scaleSize(124),
        height: ScreenUtil.scaleSize(68)
    },
    addBox:{
        paddingLeft: ScreenUtil.scaleSize(30),
        paddingRight: ScreenUtil.scaleSize(30),
        backgroundColor: '#fff',
        width: ScreenUtil.scaleSize(550),
        borderRadius: ScreenUtil.scaleSize(15),
    },
    addInput: {
        height:ScreenUtil.scaleSize(100),
        borderBottomColor: '#808080',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        height: ScreenUtil.scaleSize(80)
    },
    addDelImg:{
        position: 'absolute',
        right: 0,
        top:0,
        width:ScreenUtil.scaleSize(48),
        height:ScreenUtil.scaleSize(48),
    },
    addMake:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: ScreenUtil.scaleSize(10),
        alignItems: 'center'
    },
    addMakeItem: {
        color: '#668fff',
        height:ScreenUtil.scaleSize(100),
        lineHeight:ScreenUtil.scaleSize(100),
        fontSize: ScreenUtil.setSpText(18),
        width: ScreenUtil.scaleSize(130),
        textAlign: 'center'
    },
    register_source: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: ScreenUtil.scaleSize(20)
    },
    owenSource_active: {
        height: ScreenUtil.scaleSize(168),
        lineHeight: ScreenUtil.scaleSize(168),
        width: ScreenUtil.scaleSize(280),
        backgroundColor: '#668fff',
        color: '#fff',
        fontSize: ScreenUtil.setSpText(30),
        borderRadius: ScreenUtil.scaleSize(30),
        textAlign: 'center'
    },
    owenSource: {
        height: ScreenUtil.scaleSize(168),
        lineHeight: ScreenUtil.scaleSize(168),
        width: ScreenUtil.scaleSize(280),
        backgroundColor: '#e6e6e6',
        color: '#b6b6b6',
        fontSize: ScreenUtil.setSpText(30),
        borderRadius: ScreenUtil.scaleSize(30),
        textAlign: 'center'
    },
})
export default styles