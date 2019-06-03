import React, { Component } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { ScreenUtil } from '../../../../utils/util';
import { SegmentedBar } from 'teaset'
import Suspect from './children/suspect/connect'
import Address from './children/address/connect'
import Law from './children/law/connect'

export default class ProgressDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    }
  }

  render() {
    let { compensableDetail } = this.props;
    let activeIndex = this.state.activeIndex;
    return (
      <View style={styles.progress}>
        <SegmentedBar type='projector' onChange={data => this.setState({ activeIndex: data })}>
          <SegmentedBar.Item title='嫌疑人' />
          <SegmentedBar.Item title='地址' />
          <SegmentedBar.Item title='执法立案' />
        </SegmentedBar>
        <View style={styles.progress_content}>
          {
            activeIndex === 0
              ? <Suspect read={true}/>
              : null
          }
          {
            activeIndex === 1
              ? <Address read={true}/>
              : null
          }
          {
            activeIndex === 2
              ? <Law read={true}/>
              : null
          }
        </View>
      </View>
    )
  }
}

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
    padding: ScreenUtil.scaleSize(40),
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
  }
})