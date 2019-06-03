import { StyleSheet } from 'react-native'
import { ScreenUtil } from '../../../utils/util'

const styles = StyleSheet.create({
  container : {
      flex: 1,
      width:ScreenUtil.scaleSize(750),
      backgroundColor: '#f2f2f2',
  },
  reportDetail_box : {
      flex: 1,
      paddingLeft: ScreenUtil.scaleSize(30),
      paddingRight: ScreenUtil.scaleSize(30),
      paddingBottom:ScreenUtil.scaleSize(30),
      marginTop: ScreenUtil.scaleSize(30),
      backgroundColor: '#fff',
  },
  reportDetail: {
      width:ScreenUtil.scaleSize(690),
      backgroundColor: '#fff',
      paddingTop: ScreenUtil.scaleSize(30),
      paddingBottom: ScreenUtil.scaleSize(30),
      paddingLeft: ScreenUtil.scaleSize(30),
      paddingRight: ScreenUtil.scaleSize(30),
      position: 'relative'
  },
  reportDetail_item : {
      width:ScreenUtil.scaleSize(620),
      flexDirection:'row',
      flexWrap:'nowrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomColor: '#e6e6e6',
      borderBottomWidth: 1,
      borderStyle: 'solid',
      marginTop: ScreenUtil.scaleSize(20),
      position:'relative',

  },
  workWrapper:{
      flexDirection:'column',
      flexWrap:'nowrap',
      alignItems: 'flex-start',
  },
  reportDetail_item_title : {
      fontSize: ScreenUtil.setSpText(16),
      lineHeight: ScreenUtil.scaleSize(60)
  },
  reportDetail_item_con : {
      fontSize: ScreenUtil.setSpText(16),
      lineHeight: ScreenUtil.scaleSize(80)
  },
  Input:{
      width: ScreenUtil.scaleSize(300),
      height:ScreenUtil.scaleSize(59),
      lineHeight:ScreenUtil.scaleSize(40),
      backgroundColor:'#fff',
      textAlign:'right',
      fontSize:ScreenUtil.setSpText(16),
      paddingRight:ScreenUtil.scaleSize(10)
  },
  TextArea:{
      height:ScreenUtil.scaleSize(300),
      width: ScreenUtil.scaleSize(620),
      textAlign:'left',
      fontSize:ScreenUtil.setSpText(16),
      lineHeight:ScreenUtil.scaleSize(60),
      backgroundColor:'#e6e6e6'
  },
  btns:{
      width: ScreenUtil.scaleSize(500),
      height:ScreenUtil.scaleSize(80),
      backgroundColor:'#668fff',
      borderRadius:ScreenUtil.scaleSize(50),
      marginBottom:ScreenUtil.scaleSize(20),
  },
  btnWraps:{
      width: ScreenUtil.scaleSize(750),
      paddingLeft:ScreenUtil.scaleSize(40),
      paddingRight:ScreenUtil.scaleSize(40),
      alignItems:'center',
      justifyContent:'center',
      marginTop: ScreenUtil.scaleSize(40)
  },
  btntitle:{
      fontSize:ScreenUtil.setSpText(16),
      color:'#fff',
      textAlign:'center',
      lineHeight:ScreenUtil.scaleSize(80),
  },
  iconInput:{
      paddingLeft:ScreenUtil.scaleSize(10),
      fontSize:ScreenUtil.setSpText(16),
  },
  workAddress:{
      position:'absolute',
      width:ScreenUtil.scaleSize(40),
      height:ScreenUtil.scaleSize(40),
      left:ScreenUtil.scaleSize(155),
      top:ScreenUtil.scaleSize(10),
  },
  platformsTyles:{
      width:ScreenUtil.scaleSize(50),
  },
  imgWarp: {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
  },
  addItem: {
      marginBottom: ScreenUtil.scaleSize(15),
      marginRight: ScreenUtil.scaleSize(15),
  },
  uploadImag: {
      width: ScreenUtil.scaleSize(150),
      height: ScreenUtil.scaleSize(150),
  },
  uploadText: {
      fontSize: ScreenUtil.setSpText(14),
      textAlign: 'center',
      height: ScreenUtil.scaleSize(40),
      lineHeight: ScreenUtil.scaleSize(40)
  },
})

export default styles;
