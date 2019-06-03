import { StyleSheet } from 'react-native'
import { ScreenUtil } from '../../../../utils/util'

const styles = StyleSheet.create({
  line: {
    paddingBottom: ScreenUtil.scaleSize(20),
    backgroundColor: '#fafbfc'
  },
  itemTitle: {
    height: ScreenUtil.scaleSize(70),
    backgroundColor: '#fafbfc',
    paddingLeft: ScreenUtil.scaleSize(80),
    paddingRight: ScreenUtil.scaleSize(80),
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemTitle_text: {
    color: '#b3b3b3',
    fontSize: ScreenUtil.setSpText(14)
  },
  itemTitle_text_small: {
    fontSize: ScreenUtil.setSpText(12)
  },
  content: {
    paddingLeft: ScreenUtil.scaleSize(80),
    paddingRight: ScreenUtil.scaleSize(80),
    paddingTop: ScreenUtil.scaleSize(40),
    paddingBottom: ScreenUtil.scaleSize(40),
    backgroundColor: '#fff',
    overflow: 'hidden'
  },
  inputWrap: {
    flexDirection: 'row',
    height: ScreenUtil.scaleSize(88),
    borderBottomWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center'
  },
  label: {
    width: ScreenUtil.scaleSize(180),
    fontSize: ScreenUtil.setSpText(14),
    color: '#4d4d4d'
  },
  input: {
    flex: 1,
    color: '#4d4d4d',
    height: ScreenUtil.scaleSize(60),
  },
  input_right: {
    paddingLeft: ScreenUtil.scaleSize(20),
    textAlign: 'right',
    borderBottomWidth: 0
  },
  tabView: {
    height: ScreenUtil.scaleSize(353)
  },
  tabBar: {
    height: ScreenUtil.scaleSize(88),
    paddingLeft: ScreenUtil.scaleSize(80),
    paddingRight: ScreenUtil.scaleSize(80)
  },
  tabBarTitle: {
    fontSize: ScreenUtil.setSpText(18)
  },
  textareaWrap: {
    paddingLeft: ScreenUtil.scaleSize(20),
    paddingRight: ScreenUtil.scaleSize(20),
    paddingTop: ScreenUtil.scaleSize(20),
    paddingBottom: ScreenUtil.scaleSize(20),
    backgroundColor: '#e6e6e6',
    borderRadius: ScreenUtil.scaleSize(10)
  },
  textarea: {
    borderWidth: 0,
    height: ScreenUtil.scaleSize(140),
    lineHeight: ScreenUtil.scaleSize(44),
    textAlignVertical: 'top'
  },
  uploadItem: {
    width: ScreenUtil.scaleSize(200),
    marginRight: ScreenUtil.scaleSize(20)
  },
  loadImag: {
    width: ScreenUtil.scaleSize(200),
    height: ScreenUtil.scaleSize(200)
  },
  uploadText: {
    textAlign: 'center',
    height: ScreenUtil.scaleSize(68),
    lineHeight: ScreenUtil.scaleSize(68),
    color: '#668fff'
  },
  tag: {
    paddingLeft: ScreenUtil.scaleSize(40),
    paddingRight: ScreenUtil.scaleSize(40),
    height: ScreenUtil.scaleSize(60),
    borderWidth: 1,
    borderColor: '#d9d9d9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: ScreenUtil.scaleSize(10),
    marginRight: ScreenUtil.scaleSize(30)
  },
  tag_active: {
    borderColor: '#108ee9'
  },
  tagText: {
    fontSize: ScreenUtil.setSpText(12)
  },
  close: {
    width: ScreenUtil.scaleSize(48),
    height: ScreenUtil.scaleSize(48)
  },
  btn_add_wrap: {
    alignItems: 'center',
    paddingTop: 0
  },
  btn_add: {
    width: ScreenUtil.scaleSize(270),
    height: ScreenUtil.scaleSize(88),
    borderWidth: ScreenUtil.scaleSize(1),
    borderColor: '#668fff',
    borderRadius: ScreenUtil.scaleSize(44),
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn_add_text: {
    color: '#668fff',
    fontSize: ScreenUtil.setSpText(16),
    fontWeight: '800'
  },
  modal: {
    backgroundColor: '#fff', 
    width: ScreenUtil.scaleSize(600), 
    height: ScreenUtil.scaleSize(300), 
    borderRadius: ScreenUtil.scaleSize(30),
    flexDirection: 'column'
  },
  modal_title: {
    height: ScreenUtil.scaleSize(80),
    paddingLeft: ScreenUtil.scaleSize(30),
    paddingRight: ScreenUtil.scaleSize(30),
    borderBottomWidth: ScreenUtil.scaleSize(1),
    borderColor: '#666'
  },
  title_text: {
    lineHeight: ScreenUtil.scaleSize(80),
    color: '#666',
    fontSize: ScreenUtil.setSpText(16)
  },
  modal_content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal_footer: {
    height: ScreenUtil.scaleSize(80),
    borderTopWidth: ScreenUtil.scaleSize(1),
    borderColor: '#666',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingLeft: ScreenUtil.scaleSize(30),
    paddingRight: ScreenUtil.scaleSize(30)
  },
  modal_input: {
    width: ScreenUtil.scaleSize(400),
    height: ScreenUtil.scaleSize(60),
    borderColor: '#999',
    borderWidth: ScreenUtil.scaleSize(1),
    paddingLeft: ScreenUtil.scaleSize(20)
  },
  modal_btn: {
    width: ScreenUtil.scaleSize(150),
    height: ScreenUtil.scaleSize(60),
    borderRadius: ScreenUtil.scaleSize(30),
    borderWidth: ScreenUtil.scaleSize(1),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: ScreenUtil.scaleSize(20)
  },
  btn_cancel: {
    borderColor: '#ffd34c'
  },
  btn_copm: {
    borderColor: '#4887e5'
  },
  btn_text: {
    color: '#666'
  }
})

export default styles;