import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import MyInput from '../../../../../common/extends/myInput'
import { Toast } from 'teaset'
import styles from '../styles'
import { uploadFile } from '../../../../../../utils/util';

export default class LawModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editType: '',
      data: ''
    }
  }

  // 显示原始数据
  componentWillMount() {
    let { editType, data} = this.props;
    this.setState({
      editType,
      data: data.data,
      title: data.title,
      name: data.name
    })
  }

  // 上传图片
  _uploadFiles() {
    let data = this.state.data;
    uploadFile(res => {
      data.push(res.dataObject)
      this.setState({ data })
    })
  }

  _deleteFiles(data) {
    let files = this.state.data;
    let result = files.filter(item => {
      return item !== data;
    })
    this.setState({
      data: result
    })
  }

  // 提交数据
  _commitSuspect() {
    let { data, name } = this.state;
    let result = {
      data,
      name
    }
    if (this.props.commitSuspect) {
      this.props.commitSuspect(result)
    }
    this.props.closeModal()
  }

  render() {
    return (
      <View style={styles.modal}>
        <View style={styles.modal_header}>
          <View style={styles.modal_title}>
            <Text style={styles.modal_title_text}>
              {
                this.state.title 
              }
            </Text>
            <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.closeModal()}>
              <Image style={styles.modal_close} source={require('../../../../../../../assets/images/close.png')} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.modal_content}>
          {
            this.state.editType === 'file'
              ? <View style={styles.upload_wrap}>
                <TouchableOpacity style={styles.upload_file} activeOpacity={0.5} onPress={() => this._uploadFiles()}>
                  <Text style={styles.upload_file_text}> 上传文件 </Text>
                </TouchableOpacity>
              </View>
              : null
          }
          <ScrollView>

            {/* 
            文本 / 文件
            <View style={styles.textarea_wrap}>
                <MyInput style={styles.textarea} multiline={10}/>
              </View> 
            */}

            {
              this.state.editType === 'file'
                ? <View style={styles.file_list}>
                  {
                    this.state.data.map((item, index) => {
                      return (
                        <View style={styles.file_item} key={index}>
                          <Text style={styles.file_name}>{item}</Text>
                          <TouchableOpacity activeOpacity={0.5} onPress={() => this._deleteFiles(item)}>
                            <Image style={styles.delete_file} source={require('../../../../../../../assets/images/close.png')} />
                          </TouchableOpacity>
                        </View>
                      )
                    })
                  }
                </View>
                : this.state.editType === 'string'
                  ? <View style={styles.textarea_wrap}>
                    <MyInput style={styles.textarea} value={this.state.data} onChangeText={text => this.setState({data: text})} multiline={10} />
                  </View>
                  : this.state.editType === 'boolean'
                    ? null
                    : null
            }

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