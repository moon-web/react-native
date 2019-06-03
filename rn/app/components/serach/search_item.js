import React, { Component } from 'react';
import {  View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { ScreenUtil } from '../../utils/util';

export default class SearchItem extends Component {

  // 点击Item
  _onPressItem(data){
    if (this.props.onPressItem) {
      this.props.onPressItem(data.item.id)
    }
  }

  render() {
    let data = this.props.data;
    return (
      <TouchableOpacity style={styles.hotItem} onPress={() => this._onPressItem(data)} activeOpacity={0.7}>
        <Image style={styles.taskIcon} source={data.item.mainPics ? {uri:data.item.mainPics} : require('../../../assets/images/peple.png')}/>
        <View style={styles.itemTitle}>
          <Text style={styles.title}>
          {data.item.name}
          </Text>
        </View>
        <View style={styles.timeOut}>
          <Image style={styles.timeIcon} source={require('../../../assets/images/timer.png')}/>
          <Text style={styles.time} numberOfLines={1}>
          {data.item.outTime}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  hotItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding:ScreenUtil.scaleSize(20),
    borderBottomColor: '#ccc',
    borderBottomWidth: ScreenUtil.scaleSize(1),
    backgroundColor: '#fff',
  },
  taskIcon: {
    width: ScreenUtil.scaleSize(100),
    height: ScreenUtil.scaleSize(100)
  },
  itemTitle: {
    flex: 1,
    paddingLeft: ScreenUtil.scaleSize(30),
    minHeight: ScreenUtil.scaleSize(100),
  },
  timeOut: {
    width: ScreenUtil.scaleSize(160),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeIcon: {
    width: ScreenUtil.scaleSize(24),
    height: ScreenUtil.scaleSize(24),
  },
  time: {
    paddingLeft: ScreenUtil.scaleSize(10),
    fontSize: ScreenUtil.setSpText(12),
    flex: 1,
  }
})