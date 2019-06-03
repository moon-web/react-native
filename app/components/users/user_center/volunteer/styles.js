import { StyleSheet } from 'react-native'
import { ScreenUtil } from '../../../../utils/util';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  },
  statusBar: {
    height: ScreenUtil.scaleSize(40),
    backgroundColor: '#fff'
  },
  statusBarAndroid: {
    height: 0
  },
  content: {
      flex: 1
  },
  PersonalInfo: {
      height: ScreenUtil.scaleSize(402),
      padding: ScreenUtil.scaleSize(30),
      backgroundColor: '#fff',
  },
  PersonalInfoData: {
      flexDirection: 'row',
      height: ScreenUtil.scaleSize(174),
      paddingLeft: ScreenUtil.scaleSize(30),
      paddingRight: ScreenUtil.scaleSize(30),
      paddingBottom: ScreenUtil.scaleSize(30),
      backgroundColor: '#f2f2f2'
  },
  PersonalInfoDataLeft: {
      paddingTop: ScreenUtil.scaleSize(40),
      flex: 1
  },
  PersonalInfoDataLeftData: {
      flex: 1,
      flexDirection: 'row'
  },
  PersonalName: {
      fontSize: ScreenUtil.setSpText(20),
      height: ScreenUtil.scaleSize(60),
      color: '#292929',
      marginRight: ScreenUtil.scaleSize(30)
  },
  PersonalStatus: {

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
  PersonalData_box1: {
      height: ScreenUtil.scaleSize(150),
      marginTop: ScreenUtil.scaleSize(10),
      marginBottom: ScreenUtil.scaleSize(20),
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      paddingTop: ScreenUtil.scaleSize(24),
      paddingBottom: ScreenUtil.scaleSize(26),
  },
  PersonalData_box1_item: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: ScreenUtil.scaleSize(30),
      height: ScreenUtil.scaleSize(100)
  },
  PersonalData_box1_item_border: {
      borderRightWidth: 1,
      borderStyle: 'solid',
      borderRightColor: '#e6e6e6'
  },
  PersonalData_box1_tiltle: {
      fontSize: ScreenUtil.setSpText(18),
      color: '#292929',
      marginRight: ScreenUtil.scaleSize(30),
      marginLeft: ScreenUtil.scaleSize(20),
      fontWeight: '600'
  },
  PersonalData_box1_img: {
      width: ScreenUtil.scaleSize(50),
      height: ScreenUtil.scaleSize(50),
  },
  PersonalData_box1_num: {
      fontSize: ScreenUtil.setSpText(20),
      color: '#668fff',
  },
  PersonalData_box2: {
      height: ScreenUtil.scaleSize(400),
      marginBottom: ScreenUtil.scaleSize(20),
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#fff',
  },
  PersonalData_box2_item_box: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
  },
  PersonalData_box2_item_box_border_b: {
      borderBottomWidth: 1,
      borderStyle: 'solid',
      borderBottomColor: '#e6e6e6'
  },
  PersonalData_box2_item: {
      flex: 1,
      height: ScreenUtil.scaleSize(150),
      flexDirection: 'column',
      alignItems: 'center',
  },
  PersonalData_box2_item_other : {
      flex: 1,
      height: ScreenUtil.scaleSize(150),
      flexDirection: 'column',
      alignItems: 'center',
      paddingBottom: ScreenUtil.scaleSize(20),
      paddingTop: ScreenUtil.scaleSize(20),
  },
  PersonalData_box2_tiltle: {
      fontSize: ScreenUtil.setSpText(14),
      color: '#4d4d4d',
      marginTop: ScreenUtil.scaleSize(5),
      marginBottom: ScreenUtil.scaleSize(7),
  },
  PersonalData_box2_img: {
      width: ScreenUtil.scaleSize(50),
      height: ScreenUtil.scaleSize(50),
  },
  PersonalData_box2_num: {
      fontSize: ScreenUtil.setSpText(14),
      color: '#668fff',
  },
  PersonalData_box3: {
      height: ScreenUtil.scaleSize(290),
      backgroundColor: '#fff',
      paddingLeft: ScreenUtil.scaleSize(30),
      paddingRight: ScreenUtil.scaleSize(30),
  },
  PersonalData_box3_title_box: {
      height: ScreenUtil.scaleSize(90),
      borderBottomColor: '#f2f2f2',
      borderStyle: 'solid',
      borderBottomWidth: 1,
      flexDirection: 'row',
      alignItems: 'center'
  },
  PersonalData_box3_title_image: {
      width: ScreenUtil.scaleSize(50),
      height: ScreenUtil.scaleSize(50),
      marginRight: ScreenUtil.scaleSize(20)
  },
  PersonalData_box3_title: {
      fontSize: ScreenUtil.setSpText(18),
      color: '#292929',
      marginRight: ScreenUtil.scaleSize(30),
      marginLeft: ScreenUtil.scaleSize(20),
      fontWeight: '600'
  },
  PersonalData_box3_item_box: {
      height: ScreenUtil.scaleSize(200),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
  },
  PersonalData_box3_item : {
      flex: 1,
      height: ScreenUtil.scaleSize(150),
      paddingLeft: ScreenUtil.scaleSize(60)
  },
  PersonalData_box3_money : {
      color: '#fabb2b',
      fontSize: ScreenUtil.setSpText(22),
      fontWeight: '600',
      height: ScreenUtil.scaleSize(50),
  },
  PersonalData_box3_money_data : {
      flex: 1,
      height: ScreenUtil.scaleSize(100),
      paddingRight: ScreenUtil.scaleSize(30),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
  },
  PersonalData_box3_money_data_describe : {
      flex: 1,
  },
  PersonalData_box3_text : {
      fontSize: ScreenUtil.setSpText(14),
      color: '#4d4d4d'
  },
  PersonalData_box3_text_total : {
      fontSize: ScreenUtil.setSpText(14),
      color: '#808080'
  },
  PersonalData_box3_text_active :{
      fontSize: ScreenUtil.setSpText(14),
      color: '#7d8edb'
  },
  PersonalData_box3_money_data_img : {
      width: ScreenUtil.scaleSize(50),
      height: ScreenUtil.scaleSize(50),
  },

  PersonalOrdinary_box1: {
      marginTop: ScreenUtil.scaleSize(20),
      paddingLeft: ScreenUtil.scaleSize(30),
      backgroundColor: '#fff',
      height: ScreenUtil.scaleSize(120)
  },
  PersonalOrdinary_box1_item: {
      height: ScreenUtil.scaleSize(120),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
  },
  PersonalOrdinary_box1_item_box: {
      width: ScreenUtil.scaleSize(645),
      height: ScreenUtil.scaleSize(120),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'

  },
  PersonalOrdinary_box1_item_box_title: {
      fontSize: ScreenUtil.setSpText(18),
      lineHeight: ScreenUtil.scaleSize(120),
      color: '#4d4d4d',
      fontWeight: '600'
  },
  PersonalOrdinary_box1_item_box_loginout: {
      width: ScreenUtil.scaleSize(645),
      height: ScreenUtil.scaleSize(120),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
  },
})

export default styles;