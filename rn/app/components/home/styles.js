import { StyleSheet, Dimensions } from 'react-native'
import { ScreenUtil } from '../../utils/util';
const { width } = Dimensions.get("screen");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  statusBar: {
    height: ScreenUtil.scaleSize(70)
  },
  swiperWrapper: {
    width: width,
    height: ScreenUtil.scaleSize(360)
  },
  slider: {
    width: width,
    height: ScreenUtil.scaleSize(360)
  },
  sliderImag: {
    width: width,
    height: ScreenUtil.scaleSize(360)
  },
  brannerWrap: {
    width: width,
    height: ScreenUtil.scaleSize(650),
    paddingTop: ScreenUtil.scaleSize(50),
  },
  branner: {
    width: width,
    height: ScreenUtil.scaleSize(650),
  }
})

export default styles;