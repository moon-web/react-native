import { StyleSheet } from 'react-native'
import { ScreenUtil } from '../../../../../utils/util';

const styles = StyleSheet.create({
  progress: {
    backgroundColor: '#fff'
  },
  progress_content: {
    paddingLeft: ScreenUtil.scaleSize(40),
    paddingRight: ScreenUtil.scaleSize(40),
    paddingTop: ScreenUtil.scaleSize(30)
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
  suspect_name: {
    marginRight: ScreenUtil.scaleSize(30),
    fontSize: ScreenUtil.setSpText(14),
    color: '#4d4d4d'
  },
  suspect_time: {
    fontSize: ScreenUtil.setSpText(12),
    color: '#b3b3b3'
  },
  suspect_detail: {
    paddingTop: ScreenUtil.scaleSize(20),
    paddingBottom: ScreenUtil.scaleSize(20),
    borderBottomWidth: ScreenUtil.scaleSize(1),
    borderBottomColor: '#f2f2f2'
  },
  suspect_item: {
    flexDirection: 'row',
    alignItems: 'center',
    height: ScreenUtil.scaleSize(70)
  },
  label: {
    width: ScreenUtil.scaleSize(260),
    flexDirection: 'row',
    alignItems: 'center'
  },
  label_icon: {
    width: ScreenUtil.scaleSize(32),
    height: ScreenUtil.scaleSize(32),
    marginRight: ScreenUtil.scaleSize(20)
  },
  label_text: {
    fontSize: ScreenUtil.setSpText(14),
    color: '#4d4d4d'
  },
  item_text: {
    flex: 1,
    fontSize: ScreenUtil.setSpText(12),
    textAlign: 'right',
    color: '#4d4d4d'
  },
  suspect_note: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: ScreenUtil.scaleSize(1),
    borderBottomColor: '#f2f2f2',
    height: ScreenUtil.scaleSize(104)
  },
  suspect_imgs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: ScreenUtil.scaleSize(30),
  },
  suspect_img: {
    width: ScreenUtil.scaleSize(160),
    height: ScreenUtil.scaleSize(120),
    marginRight: ScreenUtil.scaleSize(20)
  },
  law_info: {
    fontSize: ScreenUtil.setSpText(20),
    color: '#4d4d4d',
    fontWeight: '800'
  },
  law_footer: {
    paddingTop: ScreenUtil.scaleSize(30)
  },
  law_note: {
    fontSize: ScreenUtil.setSpText(14),
    color: '#4d4d4d'
  },
  law_img_wrap: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  law_img: {
    width: ScreenUtil.scaleSize(180),
    height: ScreenUtil.scaleSize(180),
    marginRight: ScreenUtil.scaleSize(20)
  },
  law_msg: {
    color: '#7888b4',
    fontSize: ScreenUtil.setSpText(12),
    textAlign: 'center'
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row'
  },
  edit_icon: {
    width: ScreenUtil.scaleSize(58),
    height: ScreenUtil.scaleSize(58),
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
  modal: {
    flexDirection: 'column',
    height: ScreenUtil.scaleSize(700)

  },
  modal_header: {
    height: ScreenUtil.scaleSize(100),
    borderBottomWidth: ScreenUtil.scaleSize(1),
    justifyContent: 'center',
    borderColor: '#ccc',
  },
  modal_title: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: ScreenUtil.scaleSize(40),
    paddingRight: ScreenUtil.scaleSize(40)
  },
  modal_title_text: {
    flex: 1,
    color: '#7d8ebd',
    fontSize: ScreenUtil.setSpText(16)
  },
  modal_close: {
    width: ScreenUtil.scaleSize(50),
    height: ScreenUtil.scaleSize(50),
  },
  modal_content: {
    flex: 1,
    padding: ScreenUtil.scaleSize(40)
  },
  modal_item: {
    paddingTop: ScreenUtil.scaleSize(20),
    paddingBottom: ScreenUtil.scaleSize(20),
    borderBottomWidth: ScreenUtil.scaleSize(1),
    borderColor: '#999',
    flexDirection: 'row',
    alignItems: 'center'
  },
  modal_label: {
    height: ScreenUtil.scaleSize(36),
    justifyContent: 'center',
    width: ScreenUtil.scaleSize(170)
  },
  modal_input_wrap: {
    flex: 1,
    alignItems: 'flex-end'
  },
  modal_input: {
    textAlign: 'right'
  },
  modal_img_wrap: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  modal_add_img: {
    width: ScreenUtil.scaleSize(92),
    height: ScreenUtil.scaleSize(92),
    marginLeft: ScreenUtil.scaleSize(20),
    marginBottom: ScreenUtil.scaleSize(20)
  },
  modal_footer: {
    height: ScreenUtil.scaleSize(120),
    paddingLeft: ScreenUtil.scaleSize(40),
    paddingRight: ScreenUtil.scaleSize(40),
    borderTopWidth: ScreenUtil.scaleSize(1),
    justifyContent: 'center',
    borderColor: '#ccc',
  },
  modal_btn: {
    height: ScreenUtil.scaleSize(80),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b2c7ff',
    borderRadius: ScreenUtil.scaleSize(40)
  },
  modal_btn_text: {
    color: '#fff',
    fontSize: ScreenUtil.setSpText(16)
  },
  modal_title_tabs: {
    borderWidth: ScreenUtil.scaleSize(4),
    borderColor: '#7d8edb',
    height: ScreenUtil.scaleSize(68),
    flexDirection: 'row',
    borderRadius: ScreenUtil.scaleSize(32),
    width: ScreenUtil.scaleSize(440),
    overflow: 'hidden'
  },
  modal_tab: {
    flex: 1,
    height: ScreenUtil.scaleSize(60),
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: ScreenUtil.scaleSize(4),
    borderColor: '#7d8edb'
  },
  modal_tab_text: {
    width: ScreenUtil.scaleSize(142),
    height: ScreenUtil.scaleSize(60),
    lineHeight: ScreenUtil.scaleSize(60),
    textAlign: 'center',
    color: '#7d8edb',
    fontSize: ScreenUtil.setSpText(16)
  },
  active_tab: {
    backgroundColor: '#7d8edb',
    color: '#fff'
  },
  switch_btn: {
    width: ScreenUtil.scaleSize(88),
    borderWidth: ScreenUtil.scaleSize(2),
    borderColor: '#ccc',
    backgroundColor: '#ccc',
    height: ScreenUtil.scaleSize(48),
    borderRadius: ScreenUtil.scaleSize(24),
    flexDirection: 'row'
  },
  switch_btn_info: {
    borderRadius: ScreenUtil.scaleSize(42),
    width: ScreenUtil.scaleSize(42),
    height: ScreenUtil.scaleSize(42),
    backgroundColor: '#fff'
  },
  switch_btn_active: {
    backgroundColor: '#668fff',
    borderColor: '#668fff',
    justifyContent: 'flex-end'
  },
  textarea_wrap: {
    padding: ScreenUtil.scaleSize(20),
    backgroundColor: '#e6e6e6',
    borderRadius: ScreenUtil.scaleSize(10)
  },
  textarea: {
    height: ScreenUtil.scaleSize(300),
    lineHeight: ScreenUtil.scaleSize(46)
  },
  upload_wrap: {
    alignItems: 'center'
  },
  upload_file: {
    borderWidth: ScreenUtil.scaleSize(1),
    borderColor: '#ccc',
    borderRadius: ScreenUtil.scaleSize(6),
    height: ScreenUtil.scaleSize(80),
    width: ScreenUtil.scaleSize(200),
    alignItems: 'center',
    justifyContent: 'center'
  },
  file_item: {
    justifyContent: 'center',
    alignItems: 'center',
    height: ScreenUtil.scaleSize(60),
    flexDirection: 'row'
  },
  delete_file: {
    width: ScreenUtil.scaleSize(48),
    height: ScreenUtil.scaleSize(48),
    marginLeft: ScreenUtil.scaleSize(20),
  },
  file_name: {
    lineHeight: ScreenUtil.scaleSize(60),
    height: ScreenUtil.scaleSize(60),
    width: ScreenUtil.scaleSize(280),
    textAlign: 'right',
  }
})

export default styles;