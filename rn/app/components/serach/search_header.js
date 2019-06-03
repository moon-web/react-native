import React, { Component } from 'react';
import {  View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import MyInput from '../common/extends/myInput'
import { ScreenUtil } from '../../utils/util';
export default class SearchHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showCancel: true,
      text: ''
    }
  }

  // 输入文字
  _changeText(text) {
    this.setState({
      text: text
    })
  }

  // 取消按钮
  _pressCancel() {
    this.props.onCancelSearch()
    this.setState({
      showCancel: false,
      text: ''
    })
  }

  // 获取焦点
  _focusInput() {
    this.setState({
      showCancel: true
    })
  }

  // 回车提交数据
  _SubmitInput() {
    let text = this.state.text;
    this.setState({
      showCancel: false,
    })
    this.props.onSubmitSearch(text)
  }

  render() {
    let { text, showCancel } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.headerLeft}>
          <TouchableOpacity activeOpacity={0.7} onPress={()=> this.props.navigation.goBack()}>
            <Image style={styles.backIcon} source={require('../../../assets/images/back.png')}/>
          </TouchableOpacity>
        </View>
        <View style={styles.headerTitle}>
          <View style={styles.inputWrap}>
            <Image style={styles.searchIcon} source={require('../../../assets/images/search.png')}/>
            <MyInput
              style={styles.searchInput}
              value={text}
              blurOnSubmit={true}
              placeholder="请输入你感兴趣的活动"
              onChangeText={text => this._changeText(text)}
              onSubmitEditing={() => this._SubmitInput()}
              onFocus={() => this._focusInput()}
            />
          </View>
        </View>
        {
          showCancel
          ? <TouchableOpacity onPress={this._pressCancel.bind(this)} activeOpacity={0.7}>
              <Text style={styles.headerRight}>
                取消
              </Text>
            </TouchableOpacity>
          : <Text></Text>
        }
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: ScreenUtil.scaleSize(40),
    backgroundColor: '#f7f7f7',
    borderBottomColor: '#ccc',
    borderBottomWidth: ScreenUtil.scaleSize(2),
    paddingLeft: ScreenUtil.scaleSize(20),
    paddingRight: ScreenUtil.scaleSize(20),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: ScreenUtil.scaleSize(136)
  },
  headerLeft: {
    width: ScreenUtil.scaleSize(60)
  },
  backIcon: {
    width: ScreenUtil.scaleSize(26),
    height: ScreenUtil.scaleSize(42)
  },
  headerTitle: {
    flex: 1,
  },
  inputWrap: {
    height:ScreenUtil.scaleSize(56),
    borderRadius: ScreenUtil.scaleSize(28),
    backgroundColor: '#f1f1f1',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: ScreenUtil.scaleSize(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIcon: {
    width: ScreenUtil.scaleSize(40),
    height: ScreenUtil.scaleSize(40)
  },
  searchInput: {
    flex: 1,
    height: ScreenUtil.scaleSize(56),
    paddingLeft: ScreenUtil.scaleSize(15)
  },
  headerRight: {
    width: ScreenUtil.scaleSize(80),
    fontSize: ScreenUtil.setSpText(14),
    textAlign:'right'
  }
})