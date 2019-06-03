import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import MyInput from '../../../../common/extends/myInput'
import styles from '../children/styles'

export default class LawModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ''
    }
  }

  // 提交数据
  _commitSuspect() {
    let data = this.state.data;
    if (this.props.commitSuspect) {
      this.props.commitSuspect(data)
    }
    this.props.closeModal()
  }

  render() {
    return (
      <View style={styles.modal}>
        <View style={styles.modal_header}>
          <View style={styles.modal_title}>
            <Text style={styles.modal_title_text}>
              新增日志
            </Text>
            <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.closeModal()}>
              <Image style={styles.modal_close} source={require('../../../../../../assets/images/close.png')} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.modal_content}>
          <View style={styles.textarea_wrap}>
            <MyInput style={styles.textarea} value={this.state.data} onChangeText={text => this.setState({ data: text })} multiline={10} />
          </View>
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