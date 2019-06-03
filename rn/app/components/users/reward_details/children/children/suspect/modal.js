import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import MyInput from '../../../../../common/extends/myInput'
import { Toast } from 'teaset'
import styles from '../styles'
import { uploadImag } from '../../../../../../utils/util';

export default class SuspectModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CriminalAddress: '',
      CriminalName: '',
      CriminalNote: '',
      CriminalPhone: '',
      imgSrc: [],
      type: ''
    }
  }

  // 显示原始数据
  componentWillMount() {
    let { CriminalAddress, CriminalName, CriminalNote, CriminalPhone, imgSrc, type } = this.props;
    this.setState({
      CriminalAddress, 
      CriminalName, 
      CriminalNote, 
      CriminalPhone, 
      imgSrc: imgSrc || [],
      type
    })
  }

  // 上传图片
  _uploadImgs() {
    let imgSrc = this.state.imgSrc;
    uploadImag(res =>{
      imgSrc.push(res)
      this.setState({imgSrc})
      this.forceUpdate()
    })
  }

  // 提交数据
  _commitSuspect() {
    let { CriminalAddress, CriminalName, CriminalNote, CriminalPhone, imgSrc, type } = this.state;
    let imgs = [];
    for (let i = 0; i < imgSrc.length; i++) {
      const element = imgSrc[i];
      imgs.push(element.msgCode)
    }
    imgs = imgs.toString();
    let data = {
      CriminalAddress,
      CriminalName,
      CriminalNote,
      CriminalPhone,
      imgSrc: imgs
    }
    if (this.props.commitSuspect && (CriminalAddress || CriminalName || CriminalNote || CriminalPhone || imgs)) {
      this.props.commitSuspect(data)
    } 
    this.props.closeModal()
  }

  _checkPhone() {
    if (!(/^(0|86|17951)?(13[0-9]|14[5-9]|15[012356789]|16[56]|17[0-8]|18[0-9]|19[189])[0-9]{8}$/.test(this.state.CriminalPhone))) {
      Toast.message('请输入正确的手机号码')
    }
  }

  render() {
    return (
      <View style={styles.modal}>
        <View style={styles.modal_header}>
          <View style={styles.modal_title}>
            <Text style={styles.modal_title_text}>
              {
                this.state.type === 'edit'
                ? '编辑嫌疑人'
                : '添加嫌疑人'
              }
              </Text>
            <TouchableOpacity activeOpacity={0.5} onPress={()=> this.props.closeModal()}>
              <Image style={styles.modal_close} source={require('../../../../../../../assets/images/close.png')} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.modal_content}>
          <ScrollView>
            <View style={styles.modal_item}>
              <View style={styles.modal_label}>
                <Text style={styles.modal_label_text}>
                  姓名
                </Text>
              </View>
              <View style={styles.modal_input_wrap}>
                <MyInput style={styles.modal_input} onChangeText={text => this.setState({ CriminalName: text })} value={this.state.CriminalName} placeholder='请输入嫌疑人姓名' placeholderTextColor='#4d4d4d' />
              </View>
            </View>
            <View style={styles.modal_item}>
              <View style={styles.modal_label}>
                <Text style={styles.modal_label_text}>
                  电话
                </Text>
              </View>
              <View style={styles.modal_input_wrap}>
                <MyInput style={styles.modal_input} onChangeText={text => this.setState({ CriminalPhone: text })} value={this.state.CriminalPhone} onBlur={()=> this._checkPhone} placeholder='请输入嫌疑人电话' placeholderTextColor='#4d4d4d' />
              </View>
            </View>
            <View style={styles.modal_item}>
              <View style={styles.modal_label}>
                <Text style={styles.modal_label_text}>
                  居住地
                </Text>
              </View>
              <View style={styles.modal_input_wrap}>
                <MyInput style={styles.modal_input} onChangeText={text => this.setState({ CriminalAddress: text })} value={this.state.CriminalAddress} placeholder='请输入嫌疑人居住地址' placeholderTextColor='#4d4d4d' />
              </View>
            </View>
            <View style={styles.modal_item}>
              <View style={styles.modal_label}>
                <Text style={styles.modal_label_text}>
                  备注
                </Text>
              </View>
              <View style={styles.modal_input_wrap}>
                <MyInput style={styles.modal_input} onChangeText={text => this.setState({ CriminalNote: text })} value={this.state.CriminalNote} placeholder='请输入备注信息' placeholderTextColor='#4d4d4d' />
              </View>
            </View>
            <View style={styles.modal_item}>
              <View style={styles.modal_label}>
                <Text style={styles.modal_label_text}>
                  照片
                </Text>
              </View>
              <View style={[styles.modal_input_wrap, styles.modal_img_wrap]}>
                {
                  this.state.imgSrc.map((item, index) => {
                    return (
                      <TouchableOpacity activeOpacity={0.5} key={index}>
                        <Image style={styles.modal_add_img} source={{ uri: item.msgCode }} />
                      </TouchableOpacity>
                    )
                  })
                }
                <TouchableOpacity activeOpacity={0.5} onPress={() => this._uploadImgs()}>
                  <Image style={styles.modal_add_img} source={require('../../../../../../../assets/images/cardUpload.png')} />
                </TouchableOpacity>
              </View>
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