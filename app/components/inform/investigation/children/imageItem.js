import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Text, Alert } from 'react-native';
import MyInput from '../../../common/extends/myInput'
import { Overlay } from 'teaset'
import styles from './styles'

export default class ImageItem extends Component {
  constructor(props) {
    super(props);
    this.overlayView = null;
    this.state = {
      imgDescrible: ''
    }
  }

  componentWillMount() {
    let item = this.props.item;
    if (item) {
      this.setState({
        imgDescrible: item.imgDescrible
      })
    }
  }


  // 删除图片
  _deleteImage(item) {
    Alert.alert(
      '提示信息',
      '您确认删除图片吗？',
      [
        { text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        {
          text: '确认', onPress: () => {
            if (this.props.deleteImage) {
              this.props.deleteImage(item)
            }
          }
        },
      ],
      { cancelable: false }
    )
  }

  // 编辑描述
  _editImgDescrible() {
    let item = this.props.item;
    item.imgDescrible = this.state.imgDescrible;
    if (this.props.editDesc) {
      this.props.editDesc(item)
    }
  }

  // 取消按钮，隐藏modal并清除描述文字
  _cancelModal() {
    this.overlayView && this.overlayView.close()
  }

  // 确认按钮，隐藏关闭modal并提交描述文字
  _perssConfirm() {
    this.overlayView && this.overlayView.close();
    this._editImgDescrible()
  }

  // 显示编辑弹窗
  _showEditModal() {
    // 显示编辑弹窗
    let overlayView = (
      <Overlay.View
        style={{ alignItems: 'center', justifyContent: 'center' }}
        // modal={true}
        overlayOpacity={0.5}
        ref={v => this.overlayView = v}
      >
        <View style={styles.modal}>
          <View style={styles.modal_title}>
            <Text style={styles.title_text}>
              编辑描述
          </Text>
          </View>
          <View style={styles.modal_content}>
            <MyInput style={styles.modal_input} onChangeText={text => this.setState({ imgDescrible: text })} value={this.state.imgDescrible} placeholder='请输入描述信息' />
          </View>
          <View style={styles.modal_footer}>
            <TouchableOpacity style={[styles.modal_btn, styles.btn_cancel]} onPress={() => this._cancelModal()}>
              <Text style={styles.btn_text}>取消</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modal_btn, styles.btn_copm]} onPress={() => this._perssConfirm()}>
              <Text style={styles.btn_text}>确认</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Overlay.View>
    );
    Overlay.show(overlayView);
  }

  render() {
    let item = this.props.item;
    let imgDescrible = this.state.imgDescrible;
    return (
      <View style={styles.uploadItem}>
        <TouchableOpacity activeOpacity={0.5} onPress={() => this._deleteImage(item)}>
          <Image style={styles.loadImag} source={{ uri: item.msgCode }} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} onPress={() => this._showEditModal()}>
          {
            item.imgDescrible
              ? <Text style={styles.uploadText}>
                {item.imgDescrible}
              </Text>
              : <Text style={styles.uploadText}>添加描述</Text>
          }
        </TouchableOpacity>
      </View>
    );
  }
}