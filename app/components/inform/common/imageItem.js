import React, { Component } from 'react';
import {  View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { ScreenUtil } from '../../../utils/util';

export default class ImageItem extends Component {
  constructor(props){
    super(props)
  }

  // 删除图片
  _deleteImage(){
    if (this.props.deleteImage) {
      this.props.deleteImage(this.props.data)
    }
  }

  render() {
    let item = this.props.data;
    return (
      <View style={styles.uploadItem}>
        <TouchableOpacity onPress={this._deleteImage.bind(this)} activeOpacity={0.5}>
          <Image style={styles.loadImag} source={{uri: item.msgCode}} />
        </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  uploadItem: {
    marginBottom: ScreenUtil.scaleSize(15),
    marginRight: ScreenUtil.scaleSize(15),
  },
  loadImag: {
    width: ScreenUtil.scaleSize(150),
    height: ScreenUtil.scaleSize(150),
  },
  editDesc: {
    color: '#668fff',
    fontSize: ScreenUtil.setSpText(14),
    textAlign: 'center',
    height: ScreenUtil.scaleSize(40),
    lineHeight: ScreenUtil.scaleSize(40),
    width: ScreenUtil.scaleSize(150)
  },
})