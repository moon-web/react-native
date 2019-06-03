import React, { Component } from 'react';
import {  View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ScreenUtil } from '../../utils/util';

export default class HotSearch extends Component {
  // 点击回传热搜关键字
  _pressHotItem(item){
    if(this.props.onPressHotSearch) {
      this.props.onPressHotSearch(item)
    }
  }

  render() {
    return (
      <View style={styles.hotSearch}>
        <Text style={styles.searchTitle}>
          热门搜索
        </Text>
        <View style={styles.hotList}>
          {
            this.props.data.length > 0
            ? this.props.data.map((item, index)=> {
              return (
                <TouchableOpacity key={index} activeOpacity={1} onPress={ () => this._pressHotItem(item)}>
                  <Text style={styles.hotItem}>
                    { item }
                  </Text>
                </TouchableOpacity>
              )
            })
            : <Text></Text>
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  hotSearch: {
    paddingTop: ScreenUtil.scaleSize(26),
    paddingBottom: ScreenUtil.scaleSize(26),
    paddingLeft: ScreenUtil.scaleSize(12),
    paddingRight: ScreenUtil.scaleSize(12),
  },
  searchTitle: {
    height: ScreenUtil.scaleSize(52),
    fontSize: ScreenUtil.setSpText(14),
    color: '#9c9ca1'
  },
  hotList: {
    display: 'flex',
    flexDirection: 'row',
  },
  hotItem: {
    height: ScreenUtil.scaleSize(44),
    lineHeight: ScreenUtil.scaleSize(42),
    paddingLeft: ScreenUtil.scaleSize(15),
    paddingRight: ScreenUtil.scaleSize(15),
    borderColor: '#f38948',
    color: '#f38948',
    borderWidth: ScreenUtil.scaleSize(1),
    marginLeft: ScreenUtil.scaleSize(25),
  }
})
