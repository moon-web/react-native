import { StyleSheet } from 'react-native'
import { ScreenUtil } from '../../../utils/util';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafbfc'
  },
  header: {
    backgroundColor: '#fff',
    marginBottom: ScreenUtil.scaleSize(20)
  },
  blue_container: {
    height: ScreenUtil.scaleSize(370),
    backgroundColor: '#7d8edc',
    paddingTop: ScreenUtil.scaleSize(40)
  },
  posi_header: {
    marginTop: ScreenUtil.scaleSize(-300),
    paddingBottom: ScreenUtil.scaleSize(40),
    width: ScreenUtil.scaleSize(750)
  },
  task_tabBar: {
    padding: ScreenUtil.scaleSize(40),
    backgroundColor: '#fff',
    marginBottom: ScreenUtil.scaleSize(20),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  task_tab: {
    width: ScreenUtil.scaleSize(120),
    height: ScreenUtil.scaleSize(200),
    alignItems: 'center'
  },
  tab_icon: {
    width: ScreenUtil.scaleSize(120),
    height: ScreenUtil.scaleSize(120)
  },
  tab_text_wrap: {
    height: ScreenUtil.scaleSize(80),
    borderBottomWidth: ScreenUtil.scaleSize(2),
    borderColor: '#fff'
  },
  tab_text: {
    lineHeight: ScreenUtil.scaleSize(80),
    color: '#4d4d4d'
  },
  tab_active: {
    borderColor: '#7d8edc'
  },
  finish: {
    padding: ScreenUtil.scaleSize(40),
    backgroundColor: '#fff',
    marginBottom: ScreenUtil.scaleSize(20),
  },
  finish_btn: {
    backgroundColor: '#b2c7ff',
    borderRadius: ScreenUtil.scaleSize(44),
    height: ScreenUtil.scaleSize(88),
    alignItems: 'center',
    justifyContent: 'center'
  },
  finish_btn_text: {
    color: '#fff',
    fontSize: ScreenUtil.setSpText(18),
    fontWeight: '900'
  }
})

export default styles;