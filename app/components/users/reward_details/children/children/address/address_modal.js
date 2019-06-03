import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import MyInput from '../../../../../common/extends/myInput'
import { Toast } from 'teaset'
import styles from '../styles'
import { uploadImag } from '../../../../../../utils/util';

export default class AddressModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      num: '',
      note: '',
      editType: '',
      imgSrc: [],
      type: 1
    }
  }

  // 显示原始数据
  componentWillMount() {
    let { address, num, note, imgSrc, editType, type } = this.props;
    this.setState({
      address,
      num,
      note,
      imgSrc: imgSrc || [],
      type: type || 1,
      editType
    })
  }

  // 上传图片
  _uploadImgs() {
    let imgSrc = this.state.imgSrc;
    uploadImag(res => {
      imgSrc.push(res)
      this.setState({ imgSrc })
    })
  }

  // 提交数据
  _commitSuspect() {
    let { address, num, note, imgSrc, type } = this.state;
    let imgs = [];
    for (let i = 0; i < imgSrc.length; i++) {
      const element = imgSrc[i];
      imgs.push(element.msgCode)
    }
    imgs = imgs.toString();
    let data = {
      address,
      num,
      note,
      imgSrc: imgs,
      type
    }
    if (this.props.commitSuspect && (address || num || note || imgs)) {
      this.props.commitSuspect(data)
    }
    this.props.closeModal()
  }

  // 切换tab
  _switchTabs(index) {
    if(!this.state.editType) {
      this.setState({
        type: index,
        address: '',
        num: '',
        note: '',
        imgSrc: []
      })
    }
  }

  render() {
    return (
      <View style={styles.modal}>
        <View style={styles.modal_header}>
          <View style={styles.modal_title}>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <View style={styles.modal_title_tabs}>
                <TouchableOpacity style={styles.modal_tab} activeOpacity={0.7} onPress={()=> this._switchTabs(1)}>
                  <Text style={[styles.modal_tab_text, this.state.type === 1 ? styles.active_tab : '']}>
                    经营点
                </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modal_tab} activeOpacity={0.7} onPress={()=> this._switchTabs(2)}>
                  <Text style={[styles.modal_tab_text, this.state.type === 2 ? styles.active_tab : '']}>
                    仓库
                </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modal_tab, { borderRightWidth: 0 }]} activeOpacity={0.7} onPress={()=> this._switchTabs(3)}>
                  <Text style={[styles.modal_tab_text, this.state.type === 3 ? styles.active_tab : '']}>
                    工厂
                </Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.closeModal()}>
              <Image style={styles.modal_close} source={require('../../../../../../../assets/images/close.png')} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.modal_content}>
          <ScrollView>
            <View style={styles.modal_item}>
              <View style={styles.modal_label}>
                <Text style={styles.modal_label_text}>
                  {
                    this.state.type === 1
                      ? '经营地址'
                      : this.state.type === 2
                        ? '仓库地址'
                        : '工厂地址'
                  }
                </Text>
              </View>
              <View style={styles.modal_input_wrap}>
                <MyInput style={styles.modal_input} onChangeText={text => this.setState({ address: text })} value={this.state.address}
                  placeholder={
                    this.state.type === 1
                      ? '请输入经营地址'
                      : this.state.type === 2
                        ? '请输入仓库地址'
                        : '请输入工厂地址'
                  }
                  placeholderTextColor='#4d4d4d' />
              </View>
            </View>
            <View style={styles.modal_item}>
              <View style={styles.modal_label}>
                <Text style={styles.modal_label_text}>
                  {
                    this.state.type === 1 || this.state.type === 2
                      ? '货物数量'
                      : '工厂生产情况'
                  }
                </Text>
              </View>
              <View style={styles.modal_input_wrap}>
              {
                this.state.type === 1 || this.state.type === 2
                ? <MyInput style={styles.modal_input} onChangeText={text => this.setState({ num: text })} keyboardType='numeric' value={this.state.num} placeholder='请输入货物数量' placeholderTextColor='#4d4d4d' />
                : <TouchableOpacity style={[styles.switch_btn, this.state.num ? styles.switch_btn_active : '']} activeOpacity={0.5} onPress={() => this.setState({num: !this.state.num})}>
                    <View style={styles.switch_btn_info}></View>
                  </TouchableOpacity>
              }
              </View>
            </View>
            <View style={styles.modal_item}>
              <View style={styles.modal_label}>
                <Text style={styles.modal_label_text}>
                  备注
                </Text>
              </View>
              <View style={styles.modal_input_wrap}>
                <MyInput style={styles.modal_input} onChangeText={text => this.setState({ note: text })} value={this.state.note} placeholder='请输入备注信息' placeholderTextColor='#4d4d4d' />
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