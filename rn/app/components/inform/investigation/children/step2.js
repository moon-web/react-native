import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import MyInput from '../../../common/extends/myInput'
import styles from './styles'
import { Toast } from 'teaset';

export default class Investigation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      suspect: [
        {
          suspectName: '',
          suspectPhone: '',
          suspectWeixin: ''
        }
      ],
      taobao: [
        {
          shopName: ''
        }
      ]
    }
  }

  componentWillMount() {
    let { suspect, taobao } = this.props;
    this.setState({
      suspect,
      taobao
    })
  }

  // 修改input信息
  _changeText(text, element, name, type) {
    let data = null;
    if (type === 'suspect') {
      data = this.state.suspect;
    } else {
      data = this.state.taobao;
    }
    for (let i = 0; i < data.length; i++) {
      if (data[i].key === element.key) {
        data[i][name] = text;
      }
    }
    this._setDataToParent(type, data)
  }

  // 提交数据到父级信息
  _setDataToParent(type, data) {
    if (type === 'suspect') {
      this.setState({
        suspect: data
      })
      if (this.props.setSuspect) {
        this.props.setSuspect(data)
      }
    } else {
      this.setState({
        taobao: data
      })
      if (this.props.setShopName) {
        this.props.setShopName(data)
      }
    }
  }

  // 清除输入框
  _clearShopName(element) {
    let data = this.state.taobao;
    for (let i = 0; i < data.length; i++) {
      if (data[i].key === element.key) {
        data[i].shopName = ''
      }
    }
    this._setDataToParent('taobao', data)
  }

  _checkMobile(element) {
    if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(element.suspectPhone))) {
      Toast.message('请输入正确的手机号码')
    }
  }


  // 渲染嫌疑人
  _renderSuspect() {
    let suspectElement = [],
      suspect = this.state.suspect,
      _this = this;
    for (let i = 0; i < suspect.length; i++) {
      const element = suspect[i];
      element.key = 'suspect'+ i;
      suspectElement.push(
        <View key={'suspect'+ i}>
          <View style={styles.line}></View>
          <View style={styles.content}>
            <View style={styles.inputWrap}>
              <Text style={styles.label}>
                姓名
              </Text>
              <MyInput style={[styles.input, styles.input_right]} onChangeText={text => _this._changeText(text, element, 'suspectName', 'suspect')} placeholder='请输入嫌疑人姓名' value={element.suspectName} placeholderTextColor='#ccc' />
            </View>
            <View style={styles.inputWrap}>
              <Text style={styles.label}>
                手机号码
              </Text>
              <MyInput style={[styles.input, styles.input_right]} onChangeText={text => _this._changeText(text, element, 'suspectPhone', 'suspect')} onBlur={()=> this._checkMobile(element)} placeholder='请输入手机号码' value={element.suspectPhone} placeholderTextColor='#ccc' />
            </View>
            <View style={styles.inputWrap}>
              <Text style={styles.label}>
                微信号
              </Text>
              <MyInput style={[styles.input, styles.input_right]} onChangeText={text => _this._changeText(text, element, 'suspectWeixin', 'suspect')} placeholder='请输入微信号' value={element.suspectWeixin} placeholderTextColor='#ccc' />
            </View>
          </View>
        </View>
      )
    }
    return suspectElement;
  }

  // 渲染淘宝链接
  _renderTaobaoLink() {
    let taobaoElement = [],
      taobao = this.state.taobao,
      _this = this;
    for (let i = 0; i < taobao.length; i++) {
      const element = taobao[i];
      element.key = 'taobao'+ i;
      taobaoElement.push(
        <View style={styles.inputWrap} key={'taobao'+ i}>
          <MyInput style={styles.input} onChangeText={text => _this._changeText(text, element, 'shopName', 'taobao')} value={element.shopName} placeholder='添加店铺连接' />
          <TouchableOpacity activeOpacity={0.5} onPress={() => _this._clearShopName(element)}>
            <Image style={styles.close} source={require('../../../../../assets/images/close.png')} />
          </TouchableOpacity>
        </View>
      )
    }
    return taobaoElement;
  }

  // 添加 嫌疑人/淘宝 Item
  _addItem(type) {
    let data = null,
      item = null;
    if (type === 'suspect') {
      data = this.state.suspect;
      item = {
        suspectName: '',
        suspectPhone: '',
        suspectWeixin: ''
      };
      data.push(item);
      this.setState({
        suspect: data
      })
    } else {
      data = this.state.taobao;
      item = {
        shopName: ''
      };
      data.push(item);
      this.setState({
        taobao: data
      })
    }

  }

  render() {
    return (
      <View>
        <View>
          {
            this._renderSuspect()
          }
          <View style={[styles.content, styles.btn_add_wrap]}>
            <TouchableOpacity style={styles.btn_add} activeOpacity={0.5} onPress={() => this._addItem('suspect')}>
              <Text style={styles.btn_add_text}> + 新建嫌疑人</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.itemTitle}>
            <Text style={styles.itemTitle_text}>店铺链接</Text>
          </View>
          <View style={styles.content}>
            {this._renderTaobaoLink()}
          </View>
          <View style={[styles.content, styles.btn_add_wrap]}>
            <TouchableOpacity style={styles.btn_add} activeOpacity={0.5} onPress={() => this._addItem('taobao')}>
              <Text style={styles.btn_add_text}> + 新增店铺连接</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}