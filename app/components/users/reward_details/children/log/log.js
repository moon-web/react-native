import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { Overlay } from 'teaset'
import Modal from './modal'
import styles from './styles';

export default class Log extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [],
      activeIndex: 0,
      currentStatus: ''
    }
  }

  // 显示嫌疑人弹窗
  _showOverlay() {
    this.overlayView = (
      <Overlay.PullView side='bottom' modal={false} ref={v => this.overlayView = v}>
        <Modal closeModal={() => this.overlayView && this.overlayView.close()}
          commitSuspect={(suspect) => this.commitSuspect(suspect)} />
      </Overlay.PullView>
    );
    Overlay.show(this.overlayView);
  }

  // 提交数据
  commitSuspect(data) {
    let { userInfo, compensableDetail, getTaskLogs, newTaskType } = this.props;
    let string = data.trim();
    let log = {
      opStr: string,
      compensableId: compensableDetail.id,
      userId: userInfo.userId
    };
    if (string) {
      this.props.addTaskLog(log, () => getTaskLogs(compensableDetail.id, 1, [], newTaskType))
    }
  }

  componentWillMount() {
    let { newTaskType, getTaskLogs, compensableDetail } = this.props;
    getTaskLogs(compensableDetail.id, 1, [], newTaskType)
    this.setState({
      activeIndex: 0,
      currentStatus: newTaskType
    })
  }

  // 切换tab
  _switchTab(activeIndex, status) {
    this.setState({
      activeIndex,
      currentStatus: status
    })
    const { getTaskLogs, compensableDetail } = this.props;
    let taskType = '';
    if (status) {
      taskType = status;
    }
    getTaskLogs(compensableDetail.id, 1, [], taskType)
  }

  render() {
    let activeIndex = this.state.activeIndex;
    let { taskList: list, users, userInfo, compensableDetail } = this.props;
    return (
      <View>
        <View style={styles.tabs}>
          <TouchableOpacity onPress={() => this._switchTab(0)} activeOpacity={0.7}>
            <View style={[styles.tab, activeIndex === 0 ? styles.tab_active : null]}>
              <Text style={[styles.tab_text, activeIndex === 0 ? styles.tab_active_text : null]}>
                全部
                </Text>
            </View>
          </TouchableOpacity>
          {
            users.length > 0
              ?
              users.map((item, index) => {
                if (item.isShow === 1) {
                  return (
                    <TouchableOpacity onPress={() => this._switchTab(index + 1, item.nickName)} activeOpacity={0.7} key={index}>
                      <View style={[styles.tab, activeIndex === index + 1 ? styles.tab_active : null]}>
                        <Text style={[styles.tab_text, activeIndex === index + 1 ? styles.tab_active_text : null]}>
                          {item.nickName}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )
                }
              })
              : <TouchableOpacity onPress={() => this._switchTab(1, userInfo.nickName)} activeOpacity={0.7}>
                <View style={[styles.tab, activeIndex === 1 ? styles.tab_active : null]}>
                  <Text style={[styles.tab_text, activeIndex === 1 ? styles.tab_active_text : null]}>
                    {userInfo.nickName}
                  </Text>
                </View>
              </TouchableOpacity>
          }
        </View>
        <View style={styles.log_content}>
          {
            list.length > 0
              ?
              list.map((item, index) => {
                return (
                  <View style={styles.suspect} key={index}>
                    <View style={styles.suspect_title}>
                      <View style={styles.userInfo}>
                        <Text style={styles.suspect_name}>{item.chargeNick}</Text>
                        <Text style={styles.suspect_time}>{item.opTime}</Text>
                      </View>
                    </View>
                    <View style={styles.suspect_detail}>
                      <View style={styles.suspect_item}>
                        <View style={styles.label}>
                          <Text style={styles.label_text}>日志</Text>
                        </View>
                        <Text style={styles.item_text}>{item.opStr}</Text>
                      </View>
                    </View>
                  </View>
                )
              })
              : <View style={styles.no_data}>
                <Text style={styles.no_data_text}>暂时没有日志数据</Text>
              </View>
          }
          {
            compensableDetail.status === 13 || compensableDetail.status === 23 || compensableDetail.status === 33 || compensableDetail.status === 14 || compensableDetail.status === 24 || compensableDetail.status === 34
              ? <View style={styles.btn_wrap}>
                <TouchableOpacity style={styles.add_btn} activeOpacity={0.5} onPress={() => this._showOverlay()}>
                  <Text style={styles.btn_text}> + 新增日志</Text>
                </TouchableOpacity>
              </View>
              : null
          }

        </View>
      </View>
    )
  }
}