import { StyleSheet } from 'react-native'
import { ScreenUtil } from '../../../../../utils/util';

const styles = StyleSheet.create({
  log_content: {
    padding: ScreenUtil.scaleSize(40)
  },
  suspect: {
    borderWidth: ScreenUtil.scaleSize(1),
    borderRadius: ScreenUtil.scaleSize(10),
    borderColor: '#b2b2b2',
    padding: ScreenUtil.scaleSize(30),
    marginBottom: ScreenUtil.scaleSize(30)
  },
  suspect_title: {
    height: ScreenUtil.scaleSize(70),
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: ScreenUtil.scaleSize(1),
    borderBottomColor: '#f2f2f2'
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row'
  },
  suspect_name: {
    width: ScreenUtil.scaleSize(160),
    fontSize: ScreenUtil.setSpText(14),
    color: '#4d4d4d'
  },
  suspect_time: {
    fontSize: ScreenUtil.setSpText(12),
    color: '#b3b3b3',
    textAlign: 'right',
    flex: 1
  },
  suspect_detail: {
    paddingTop: ScreenUtil.scaleSize(20),
    paddingBottom: ScreenUtil.scaleSize(20)
  },
  suspect_item: {
    flexDirection: 'row'
  },
  label: {
    width: ScreenUtil.scaleSize(160)
  },
  label_text: {
    lineHeight: ScreenUtil.scaleSize(60)
  },
  item_text: {
    lineHeight: ScreenUtil.scaleSize(60),
    flex: 1
  },
  btn_wrap: {
    paddingBottom: ScreenUtil.scaleSize(40)
  },
  add_btn: {
    height: ScreenUtil.scaleSize(88),
    borderRadius: ScreenUtil.scaleSize(80),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7d8edb',
  },
  btn_text: {
    color: '#fff',
    fontSize: ScreenUtil.setSpText(18),
    fontWeight: '900'
  },
  tabs: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingLeft: ScreenUtil.scaleSize(40),
    paddingRight: ScreenUtil.scaleSize(40)
  },
  tab: {
    paddingLeft: ScreenUtil.scaleSize(20),
    paddingRight: ScreenUtil.scaleSize(20),
    height: ScreenUtil.scaleSize(60),
    minWidth: ScreenUtil.scaleSize(90),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: ScreenUtil.scaleSize(1),
    borderColor: '#fff'
  },
  tab_text: {
    fontSize: ScreenUtil.setSpText(14),
    color: '#989898'
  },
  tab_active: {
    borderColor: '#337ab7'
  },
  tab_active_text: {
    color: '#337ab7'
  },
  no_data: {
    height: ScreenUtil.scaleSize(150),
    alignItems: 'center',
    justifyContent: 'center'
  },
  no_data_text: {
    color: '#668fff'
  }
})

export default styles;