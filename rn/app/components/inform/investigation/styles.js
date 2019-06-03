import { StyleSheet } from 'react-native'
import { ScreenUtil } from '../../../utils/util'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  investigationName: {
    height: ScreenUtil.scaleSize(270),
    backgroundColor: '#7d8dbd',
    paddingLeft: ScreenUtil.scaleSize(80),
    paddingRight: ScreenUtil.scaleSize(80)
  },
  title: {
    height: ScreenUtil.scaleSize(60),
    lineHeight: ScreenUtil.scaleSize(60),
    color: '#fff',
    fontSize: ScreenUtil.setSpText(16),
    fontWeight: '600'
  },
  inputWrap_name: {
    paddingTop: ScreenUtil.scaleSize(28),
    flexDirection: 'row',
    borderBottomWidth: ScreenUtil.scaleSize(1),
    borderBottomColor: '#fff',
    paddingLeft: ScreenUtil.scaleSize(10),
    height: ScreenUtil.scaleSize(88),
    alignItems: 'center'
  },
  setName: {
    flex: 1,
    borderWidth: 0,
    color: '#fff',
    fontSize: ScreenUtil.setSpText(14)
  },
  close: {
    width: ScreenUtil.scaleSize(48),
    height: ScreenUtil.scaleSize(48)
  },
  btn_wrap: {
    paddingLeft: ScreenUtil.scaleSize(80),
    paddingRight: ScreenUtil.scaleSize(80),
    paddingTop: ScreenUtil.scaleSize(40),
    paddingBottom: ScreenUtil.scaleSize(40),
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  btn: {
    height: ScreenUtil.scaleSize(80),
    width: ScreenUtil.scaleSize(280),
    borderRadius: ScreenUtil.scaleSize(40),
    backgroundColor: '#668fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: ScreenUtil.scaleSize(30)
  },
  btnText: {
    color: '#fff',
    fontSize: ScreenUtil.setSpText(18),
    fontWeight: '900'
  }
})

export default styles;