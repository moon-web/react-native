import { StyleSheet } from 'react-native'
import { ScreenUtil } from '../../../utils/util';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    padding: ScreenUtil.scaleSize(20),
    paddingTop: ScreenUtil.scaleSize(40),
  },
  from: {
    backgroundColor: '#fff',
    borderRadius: ScreenUtil.scaleSize(12),
    padding: ScreenUtil.scaleSize(24),
  },
  cell: {
    paddingTop: ScreenUtil.scaleSize(40),
    borderBottomColor: '#f1f1f1',
    borderBottomWidth: ScreenUtil.scaleSize(1),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    height: ScreenUtil.scaleSize(80),
    width: ScreenUtil.scaleSize(150),
    fontSize: ScreenUtil.setSpText(14),
    lineHeight: ScreenUtil.scaleSize(80),
    color: '#5d5d5d'
  },
  inputWarp: {
    flex: 1,
    height: ScreenUtil.scaleSize(80),
  },
  input: {
    height: ScreenUtil.scaleSize(80),
    textAlign: 'right'
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
  labelNote: {
    height: ScreenUtil.scaleSize(80),
    lineHeight: ScreenUtil.scaleSize(80),
    color: '#5d5d5d'
  },
  noteInputWrap: {
    padding: ScreenUtil.scaleSize(20),
    backgroundColor: '#e6e6e6',
    borderRadius: ScreenUtil.scaleSize(14)
  },
  noteInput: {
    height: ScreenUtil.scaleSize(200),
  },
  btnWrap: {
    paddingTop: ScreenUtil.scaleSize(30),
    paddingBottom: ScreenUtil.scaleSize(30),
    alignItems: 'center',
  },
  submitBtn: {
    height: ScreenUtil.scaleSize(100),
    width: ScreenUtil.scaleSize(610),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#668fff',
    borderRadius: ScreenUtil.scaleSize(50)
  },
  btnText: {
    color: '#fff',
    fontSize: ScreenUtil.setSpText(16)
  },
  picker: {
    height: ScreenUtil.scaleSize(80),
    overflow: 'hidden',
  }
})

export default styles;