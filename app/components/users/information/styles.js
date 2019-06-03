import { StyleSheet } from 'react-native'
import { ScreenUtil } from '../../../utils/util';

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  PersonalInfo: {
      height: ScreenUtil.scaleSize(402),
      paddingTop: ScreenUtil.scaleSize(88),
      paddingLeft: ScreenUtil.scaleSize(30),
      paddingRight: ScreenUtil.scaleSize(30),
      paddingBottom: ScreenUtil.scaleSize(40),
      backgroundColor: '#fff',
  },
  PersonalInfoData: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: ScreenUtil.scaleSize(174),
      paddingLeft: ScreenUtil.scaleSize(30),
      paddingRight: ScreenUtil.scaleSize(30),
      paddingBottom: ScreenUtil.scaleSize(30),
      backgroundColor: '#f2f2f2'
  },
  PersonalInfoDataLeft: {
      paddingTop: ScreenUtil.scaleSize(40),
  },
  PersonalInfoDataLeftData: {
      flex: 1
  },
  PersonalName: {
      fontSize: ScreenUtil.setSpText(20),
      height: ScreenUtil.scaleSize(60),
      color: '#292929',
      marginRight: ScreenUtil.scaleSize(50)
  },
  PersonalNi: {
      fontSize: ScreenUtil.setSpText(12),
      color: '#292929',
      marginTop: ScreenUtil.scaleSize(16),
      height: ScreenUtil.scaleSize(40),
      lineHeight: ScreenUtil.scaleSize(40),
      marginRight: ScreenUtil.scaleSize(10)
  },
  PersonalStatus: {
      borderWidth: 1,
      paddingRight: ScreenUtil.scaleSize(10),
      paddingLeft: ScreenUtil.scaleSize(10),
      marginTop: ScreenUtil.scaleSize(10),
  },
  PersonalAddress: {
      height: ScreenUtil.scaleSize(36),
      lineHeight: ScreenUtil.scaleSize(36),
      color: 'gray',
      fontSize: ScreenUtil.setSpText(12),
      overflow: 'hidden',
      maxWidth: ScreenUtil.scaleSize(500),
  },
  PersonalInfoDataRight: {
      width: ScreenUtil.scaleSize(130),
      paddingTop: ScreenUtil.scaleSize(40),
      flexDirection: 'row',
      justifyContent: 'flex-end',
  },
  PersonalInfoImg: {
      width: ScreenUtil.scaleSize(100),
      height: ScreenUtil.scaleSize(100),
      borderRadius: ScreenUtil.scaleSize(50),
  },
  PersonalInfoDetail: {
      backgroundColor: '#f2f2f2',
      height: ScreenUtil.scaleSize(100),
      paddingLeft: ScreenUtil.scaleSize(30),
      paddingRight: ScreenUtil.scaleSize(30),
  },
  PersonalInfoDetailInfo: {
      borderTopColor: '#e6e6e6',
      borderTopWidth: 1,
      borderStyle: 'solid',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
  },
  PersonaInfoLook: {
      fontSize: ScreenUtil.setSpText(14),
      color: '#4d4d4d',
  },
  PersonalInfoDetailInfo_img: {
      width: ScreenUtil.scaleSize(50),
      height: ScreenUtil.scaleSize(50),
  },
  PersonalOrdinary_box: {},
  PersonalOrdinary_box1: {
      marginTop: ScreenUtil.scaleSize(20),
      paddingLeft: ScreenUtil.scaleSize(30),
      backgroundColor: '#fff'
  },
  PersonalOrdinary_box1_item: {
      height: ScreenUtil.scaleSize(120),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
  },
  PersonalOrdinary_box1_item_image: {
      width: ScreenUtil.scaleSize(50),
      height: ScreenUtil.scaleSize(50),
  },
  PersonalOrdinary_box1_item_box: {
      width: ScreenUtil.scaleSize(645),
      height: ScreenUtil.scaleSize(120),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'

  },
  PersonalOrdinary_box1_item_box_border: {
      borderBottomColor: '#f2f2f2',
      borderBottomWidth: 1,
      borderStyle: 'solid',
  },
  PersonalOrdinary_box1_item_box_title: {
      fontSize: ScreenUtil.setSpText(18),
      lineHeight: ScreenUtil.scaleSize(120),
      color: '#4d4d4d',
      fontWeight: '600'
  },
  PersonalOrdinary_box1_item_num_box: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingRight: ScreenUtil.scaleSize(60)
  },
  PersonalOrdinary_box1_item_box_num: {
      fontSize: ScreenUtil.setSpText(20),
      color: '#668fff',
  },
  PersonalOrdinary_box1_item_box_num_more: {
      fontSize: ScreenUtil.setSpText(18),
      color: '#b3b3b3',
  },
  PersonalOrdinary_box1_item_box_loginout: {
      width: ScreenUtil.scaleSize(645),
      height: ScreenUtil.scaleSize(120),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
  },
  goback:{
      fontSize:ScreenUtil.setSpText(18),
      lineHeight:ScreenUtil.scaleSize(60),
      color:'#363636',
      marginRight:ScreenUtil.scaleSize(30),
  },
  Modifyinformation:{
      width:ScreenUtil.scaleSize(750),
      height:ScreenUtil.scaleSize(200),
      backgroundColor:'#fff',
      marginTop:ScreenUtil.scaleSize(10),
      paddingLeft:ScreenUtil.scaleSize(20),
      paddingRight:ScreenUtil.scaleSize(20),
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between'
  },
  Modifyinformation_Title:{
      fontSize:ScreenUtil.setSpText(20),
      lineHeight:ScreenUtil.scaleSize(109),
  },
  Modifyinformation_imgwrapper:{
      width:ScreenUtil.scaleSize(200),
      height:ScreenUtil.scaleSize(144),
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between'
  },
  Modifyinformation_imgwrapperimg:{
      width:ScreenUtil.scaleSize(144),
      height:ScreenUtil.scaleSize(144),
  },
  Modifyinformation_imgwrappernext:{
      width:ScreenUtil.scaleSize(24),
      height:ScreenUtil.scaleSize(48),
  },
  Modifyinformation_inf:{
      width:ScreenUtil.scaleSize(750),
      backgroundColor:'#fff',
      marginTop:ScreenUtil.scaleSize(20),
      paddingLeft:ScreenUtil.scaleSize(30),
      paddingBottom:ScreenUtil.scaleSize(20),
  },
  Modifyinformation_infinput:{
      width:ScreenUtil.scaleSize(720),
      height:ScreenUtil.scaleSize(84),
      backgroundColor:'#fff',
      borderBottomWidth:2,
      borderBottomColor:'rgb(203, 203, 203)',
      display:'flex',
      flexDirection:'row',
      justifyContent:'flex-start',
      alignItems:'center'
  },
  Modifyinformation_nickName:{
      width:ScreenUtil.scaleSize(150),
      height:ScreenUtil.scaleSize(84),
      lineHeight:ScreenUtil.scaleSize(84),
      fontSize:ScreenUtil.setSpText(18),
  },
  Inputs:{
      width:ScreenUtil.scaleSize(500),
      height:ScreenUtil.scaleSize(60),
      fontSize:ScreenUtil.setSpText(18),
  },
  radioGroups:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'flex-start',
      alignItems:'center',
      width:ScreenUtil.scaleSize(500),
      height:ScreenUtil.scaleSize(60),
  },
  img:{
      width:ScreenUtil.scaleSize(40),
      height:ScreenUtil.scaleSize(40),
  }

})

export default styles;