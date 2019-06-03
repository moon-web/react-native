import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native'
import MyInput from '../../../common/extends/myInput'
import { Toast, Select } from 'teaset'
import { uploadImag, ScreenUtil } from '../../../../utils/util';

export default class SuspectModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      companyUsers: [],
      userIds: [],
      flag: true
    }
  }

  // 显示原始数据
  componentWillMount() {
    this.setState({
      companyUsers: this.props.users
    })
    this._addUsers(true)
  }

  // 提交数据
  _commitSuspect() {
    let data = {
      userIds: this.state.userIds,
      data: this.state.data,
    };
    if (this.state.userIds.length || this.state.data.length) {
      this.props.commitSuspect(data, this.props.type)
    }
    this.props.closeModal()
  }

  // 校验手机号/用户信息
  _checkPhone(index) {
    let { data, userIds } = this.state;
    let { userName, mobile } = data[index];
    if (!(/^(0|86|17951)?(13[0-9]|14[5-9]|15[012356789]|16[56]|17[0-8]|18[0-9]|19[189])[0-9]{8}$/.test(mobile))) {
      Toast.message('请输入正确的手机号码')
    } else {
      this.props.checkZuTuanStatus({userName, mobile}, (res)=> {
        if (res.success === true) {
          if (res.dataObject) {
              if (res.dataObject.type == 4) {
                data[index].nickName = res.dataObject.chargeNick;
              } else {
                data[index].nickName = res.dataObject.nickName;
              }
              data[index].headImage = res.dataObject.headImage;
              userIds[index] = res.dataObject.userId
              this.setState({
                data,
                userIds,
                flag: true
              })
          }
      } else {
          Toast.message('该用户不存在，请先行下载app注册');
          data[index].userName = '';
          data[index].mobile = '';
          this.setState({
            flag: false,
            data
          })
      }
      })
    }
  }

  // 输入邀请人信息
  _setUesr(text, type, index) {
    let data = this.state.data;
    if (type === 'userName') {
      data[index].userName = text;
    } else {
      data[index].mobile = text;
    }
    this.setState({
      data
    })
  }

  // 添加新数据
  _addUsers(init) {
    let obj = {},
      type = this.props.type;
    let { data, flag } = this.state;
    if (type === 'company') {
      obj.id = data.length;
      obj.nickName = '请选择公司成员';
      obj.nick = [];
      obj.isShow = 1;
    } else {
      if (!init) {
        if ( !(data[data.length - 1].userName) || !(data[data.length - 1].mobile)) {
          Toast.message('请先输入邀请人信息，再添加新的。');
          return;
        } else if (!flag) {
          Toast.message('该用户不存在，请先行下载app注册');
          return;
        }
      } else {
        obj.id = data.length;
        obj.nickName = '';
        obj.userName = '';
        obj.mobile = '';
        obj.headImage = '';
        obj.isShow = 0;
      }
    }
    data.push(obj)
    this.setState({
      data
    })
  }

  // 选择公司成员
  _selectUsers(item, index) {
    let obj = {},
      { data, userIds } = this.state;
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        if(element.nickName === item.nickName && index !== i) {
          Toast.message('请勿重复选择');
          return;
        }
      }
      obj.id = index;
      obj.nickName = item.nickName;
      obj.nick = [item.nickName];
      obj.isShow = 1;
      data[index] = obj;
      userIds[index]= item.userId;
    this.setState({
      data,
      userIds
    })
  }

  // 渲染Item
  _renderItem() {
    let { data, companyUsers } = this.state;
    let type = this.props.type;
    let Items = [];
    data.map((item, index) => {
      if (type === 'company') {
        Items.push(
          <View style={styles.cells} key={index}>
            <View style={styles.modal_item}>
              <View style={styles.modal_label}>
                <Text style={styles.modal_label_text}>
                  {'公司成员' + (index + 1)}
                </Text>
              </View>
              <View style={styles.modal_input_wrap}>
                <Select items={companyUsers}
                  value={this.state.data[index].nickName}
                  placeholder='请选择公司成员'
                  pickerTitle='公司成员'
                  onSelected={(item, i) => this._selectUsers(item, index)}
                  getItemValue={(item, i) => item.userId}
                  getItemText={(item, i) => item.nickName} />
              </View>
            </View>
          </View>
        )
      } else {
        Items.push(
          <View style={styles.cells} key={index}>
            <View style={styles.modal_item}>
              <View style={styles.modal_label}>
                <Text style={styles.modal_label_text}>
                  被邀请人姓名
                </Text>
              </View>
              <View style={styles.modal_input_wrap}>
                <MyInput style={styles.modal_input} onChangeText={text => this._setUesr(text, 'userName', index)} value={item.userName} placeholder='请输入被邀请人姓名' placeholderTextColor='#4d4d4d' />
              </View>
            </View>
            <View style={styles.modal_item}>
              <View style={styles.modal_label}>
                <Text style={styles.modal_label_text}>
                  被邀请人电话
                </Text>
              </View>
              <View style={styles.modal_input_wrap}>
                <MyInput style={styles.modal_input} onChangeText={text => this._setUesr(text, 'mobile', index)} value={item.mobile} onBlur={() => this._checkPhone(index)} placeholder='请输入被邀请人电话' placeholderTextColor='#4d4d4d' />
              </View>
            </View>
          </View>
        )
      }
    })
    return Items;
  }

  render() {
    let type = this.props.type;
    return (
      <View style={styles.modal}>
        <View style={styles.modal_header}>
          <View style={styles.modal_title}>
            <Text style={styles.modal_title_text}>
              {
                type === 'company'
                  ? '分配任务'
                  : '发起组团'
              }
            </Text>
            <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.closeModal()}>
              <Image style={styles.modal_close} source={require('../../../../../assets/images/close.png')} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.modal_content}>
          <ScrollView>
            {this._renderItem()}
            <View style={styles.cells}>
              <TouchableOpacity style={styles.modal_item} activeOpacity={0.5} onPress={() => this._addUsers()}>
                <View style={styles.modal_label}>
                  <Text style={styles.modal_label_text}>
                    {
                      type === 'company'
                        ? '+ 添加分配人员'
                        : '+ 添加被邀请人'
                    }
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        <View style={styles.modal_footer}>
          <TouchableOpacity activeOpacity={0.5} style={styles.modal_btn} onPress={() => this._commitSuspect()}>
            <Text style={styles.modal_btn_text}>提交</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
    backgroundColor: '#f5f5f5'
  },
  cells: {
    borderBottomWidth: ScreenUtil.scaleSize(1),
    borderColor: '#999',
    marginBottom: ScreenUtil.scaleSize(20)
  },
  modal_item: {
    paddingTop: ScreenUtil.scaleSize(20),
    paddingBottom: ScreenUtil.scaleSize(20),
    paddingLeft: ScreenUtil.scaleSize(40),
    paddingRight: ScreenUtil.scaleSize(40),
    flexDirection: 'row',
    borderBottomWidth: ScreenUtil.scaleSize(1),
    borderColor: '#fff',
    alignItems: 'center',
    backgroundColor: '#fff'
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
})