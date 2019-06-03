import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Platform, Dimensions } from 'react-native';
import { ScreenUtil, ifIphoneX } from '../../../utils/util'

export default class Header extends Component {
  constructor(props) {
    super(props)
  }

  _pressInput() {
    // 跳转到搜索页面
    this.props.navigation.navigate('Search')
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={Platform.OS === 'ios' ? styles.statusBar : styles.statusBarAndroid}></View>
        <View style={styles.content}>
          <View style={styles.hLeft}>
            <Image style={styles.positionIcon} source={require('../../../../assets/images/position.png')} />
            <Text style={styles.address} numberOfLines={1}>{this.props.address ? this.props.address : '定位中...'}</Text>
          </View>
          <View style={styles.hRight}>
            <View style={styles.label} >
              <Image style={styles.searchIcon} source={require('../../../../assets/images/search.png')} />
              <TouchableOpacity style={styles.inputBtn} onPress={this._pressInput.bind(this)} activeOpacity={0}>
                <View style={{ display: 'none' }}>
                  {/* TouchableHighlight 必须有一个子元素 所以这里给他一个view 隐藏 */}
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width,
    height: ScreenUtil.scaleSize(128),
  },
  statusBar: {
    height: ScreenUtil.scaleSize(40),
    backgroundColor: '#fff'
  },
  statusBarAndroid: {
    height: 0
  },
  content: {
    paddingLeft: ScreenUtil.scaleSize(40),
    paddingRight: ScreenUtil.scaleSize(40),
    backgroundColor: '#fff',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row'
  },
  hLeft: {
    width: ScreenUtil.scaleSize(225),
    height: ScreenUtil.scaleSize(88),
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row'
  },
  positionIcon: {
    width: ScreenUtil.scaleSize(36),
    height: ScreenUtil.scaleSize(44),
  },
  address: {
    flex: 1,
    fontSize: ScreenUtil.setSpText(14),
    color: '#363636',
    lineHeight: ScreenUtil.scaleSize(88),
    width: ScreenUtil.scaleSize(200)
  },
  hRight: {
    flex: 1,
    height: ScreenUtil.scaleSize(76),
    paddingTop: ScreenUtil.scaleSize(16),
  },
  label: {
    height: ScreenUtil.scaleSize(56),
    borderRadius: ScreenUtil.scaleSize(28),
    backgroundColor: '#ededed',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchIcon: {
    width: ScreenUtil.scaleSize(36),
    height: ScreenUtil.scaleSize(36),
    marginLeft: ScreenUtil.scaleSize(15)
  },
  inputBtn: {
    flex: 1,
    height: ScreenUtil.scaleSize(56),
  }
})