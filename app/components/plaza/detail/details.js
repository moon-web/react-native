import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Alert, StyleSheet, Dimensions, Image } from 'react-native';
import Api from '../../../utils/index'
import HTML from 'react-native-render-html';
import { ScreenUtil, time2Date } from '../../../utils/util';
import MyStorage from '../../../utils/myStorage'
export default class TaskDetails extends Component {
  constructor() {
    super()
    this.state = {
      taskId: 0,
      taskStatus: 0,
      userId: '',
      detail: '',
      status: ''
    }
  }

  componentWillMount() {
    let id;
    if (!this.props.TaskId) {
      const { navigation } = this.props;
      id = navigation.getParam('id');
    } else {
      id = this.props.TaskId
    }
    this.setState({
      taskId: id
    })
    MyStorage._getStorage();
    MyStorage._load('user3', (res) => {
      this.setState({
        userId: res.userId,
        idNo: res.idNo
      })
      this._getTaskDetailById(id, res.userId)
    });
  }

  //  获取任务详情
  _getTaskDetailById(taskId, userId) {
    Api.TaskDetails({ id: taskId, userId: userId }).then(res => {
      if (res.success) {
        if (res.dataObject.endTime) {
          let endTimeMs = time2Date(res.dataObject.endTime);
          let taskStatus = endTimeMs - Date.now();
          res.dataObject.introduction = this._deleteStyle(res.dataObject.introduction);
          res.dataObject.require = this._deleteStyle(res.dataObject.require);
          this.setState({
            detail: res.dataObject,
            taskStatus: taskStatus,
            status: res.msgCode
          })
        }
      } else {

      }
    })
  }

  // 删除HTML中的样式
  _deleteStyle(str) {
    let result = '';
    if (str) {
      str = str.replace(/style="[^\"]*?"/g, '');
    }
    result = str;
    return result;
  }

  // 报名任务
  _signUpTask() {
    // 用户名获取
    let { userId, taskId } = this.state;
    let taskApply = {
      taskId: taskId,
      userId: userId
    }
    Api.create_task_apply(taskApply).then(res => {
      if (res.success === true) {
        // 报名成功
        this.props.navigation.navigate('TaskSuccessful')
      } else {
        // 报名失败
        Alert.alert('错误提示', res.msg)
      }
    })
  }

  renderButton(status) {
    if (status === '1') {
      return (
        <View style={styles.submitBtn}>
          <Text style={styles.subBtn}> 您已报名该任务 </Text>
        </View>
      )
    } else if (status === '2') {
      return (
        <View style={styles.submitBtn}>
          <Text style={styles.subBtn}> 该任务报名成功 </Text>
        </View>
      )
    } else if (status === '3') {
      return (
        <View style={[styles.submitBtn, {backgroundColor: '#f55b5b'}]}>
          <Text style={styles.subBtn}> 该任务报名失败 </Text>
        </View>
      )
    } else {
      return (
        <TouchableOpacity style={styles.submitBtn} onPress={this._signUpTask.bind(this)} activeOpacity={0.5}>
          <Text style={styles.subBtn}> 立即报名 </Text>
        </TouchableOpacity>
      )
    }
  }

  render() {
    let { detail, taskStatus, status } = this.state;
    let { readOnly } = this.props;
    const { width } = Dimensions.get('window');
    return (
      <ScrollView
        style={styles.container}
      >
        <View style={styles.content}>
          <View style={styles.taskTitle}>
            <View style={styles.titleRight}>
              {
                detail && detail.name
                ? <Text style={styles.title}>{detail.name}</Text>
                : null
              }
              {
                detail && detail.endTime
                ? <Text style={styles.timer}>{detail.endTime}</Text>
                : null
              }
            </View>
            <View style={styles.banner}>
              {
                detail && detail.mainPics
                ? <Image style={styles.brandIcon} source={{ uri: detail.mainPics.replace(/\_/, ''), cache: 'force-cache' }} />
                : <Image style={styles.brandIcon} source={require('../../../../assets/images/squareBanner.jpg')} />
              }
            </View>
          </View>
          <View style={styles.requirements}>
            <Text style={styles.requireTitle}>基本要求 :</Text>
            <View style={styles.requireDesc}>
              {
                detail && detail.require
                ? <HTML
                    html={detail.require}
                    imagesMaxWidth={width - ScreenUtil.scaleSize(140)}
                  />
                : null
              }
            </View>
          </View>
          <View style={styles.requirements}>
            <Text style={styles.requireTitle}>任务介绍 :</Text>
            <View style={styles.introductionDesc}>
              {
                detail && detail.require
                ? <HTML
                    html={detail.introduction}
                    imagesMaxWidth={width - ScreenUtil.scaleSize(60)}
                  />
                : null
              }
            </View>
          </View>
          {
            !readOnly
              ? <View style={styles.btnWrap}>
                {
                  taskStatus < 0
                    ? <View style={styles.disableBtn}>
                      <Text style={styles.subBtn}> 活动已结束 </Text>
                    </View>
                    : this.renderButton(status)
                }
              </View>
              : null
          }
        </View>
      </ScrollView>
    );
  }
}
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width,
    paddingTop: ScreenUtil.scaleSize(26),
  },
  content: {
    paddingLeft: ScreenUtil.scaleSize(30),
    paddingRight: ScreenUtil.scaleSize(30),
    backgroundColor: '#fff'
  },
  taskTitle: {
    paddingTop: ScreenUtil.scaleSize(36),
    paddingBottom: ScreenUtil.scaleSize(20),
    borderBottomColor: 'rgb(197, 195, 195)',
    borderBottomWidth: ScreenUtil.scaleSize(1)
  },
  brandIcon: {
    width: width - ScreenUtil.scaleSize(60),
    height: ScreenUtil.scaleSize(320),
    borderRadius: ScreenUtil.scaleSize(10),
    marginTop: ScreenUtil.scaleSize(10)
  },
  title: {
    fontSize: ScreenUtil.setSpText(16),
    fontWeight: 'bold',
    lineHeight: ScreenUtil.scaleSize(48)
  },
  timer: {
    fontSize: ScreenUtil.setSpText(16),
    lineHeight: ScreenUtil.scaleSize(48),
    marginTop: ScreenUtil.scaleSize(10)
  },
  requirements: {
    borderBottomColor: 'rgb(197, 195, 195)',
    borderBottomWidth: ScreenUtil.scaleSize(1),
    paddingTop: ScreenUtil.scaleSize(28),
    paddingBottom: ScreenUtil.scaleSize(28),
  },
  requireTitle: {
    height: ScreenUtil.scaleSize(60),
    lineHeight: ScreenUtil.scaleSize(60),
    fontSize: ScreenUtil.setSpText(16),
    fontWeight: 'bold'
  },
  requireDesc: {
  },
  introductionDesc: {
    width: width - ScreenUtil.scaleSize(60)
  },
  btnWrap: {
    paddingTop: ScreenUtil.scaleSize(30),
    height: ScreenUtil.scaleSize(180)
  },
  disableBtn: {
    width: width - ScreenUtil.scaleSize(60),
    height: ScreenUtil.scaleSize(72),
    backgroundColor: '#ddd',
    borderRadius: ScreenUtil.scaleSize(72),
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtn: {
    width: width - ScreenUtil.scaleSize(60),
    height: ScreenUtil.scaleSize(80),
    backgroundColor: '#668fff',
    borderRadius: ScreenUtil.scaleSize(72),
    alignItems: 'center',
    justifyContent: 'center',
  },
  subBtn: {
    color: '#fff',
    fontSize: ScreenUtil.setSpText(16),
    fontWeight: '500'
  }
})