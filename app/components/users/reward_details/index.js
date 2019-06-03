import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import HeaderDetail from '../reward_list/common/item2_detail'
import TaskDetail from './children/task_detail'
import ProgressDetail from './children/progress_detail'
import { ScreenUtil } from '../../../utils/util';
import Log from './children/log/connect';

export default class RewardCompletDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskActiveIndex: 0
    }
  }
  componentWillMount() {
    let id = this.props.navigation.getParam('id')
    this.props.rewardDeatil({ id })
  }

  _applyFinish() {
    let { compensableDetail, applyFinish } = this.props;
    let newDetail = Object.assign({}, compensableDetail);
    newDetail.isFinish = 1;
    applyFinish({compensableId: compensableDetail.compensableId}, newDetail)
  }

  render() {
    let { detail, compensableDetail, userInfo, getCompanayUsers, updateAllot, checkZuTuanStatus, zutuanusers, users, navigation, newListResult } = this.props;
    let { taskActiveIndex } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <View style={styles.blue_container}>
            </View>
            <View style={styles.posi_header}>
              <HeaderDetail data={detail} />>
              </View>
          </View>
          {
            compensableDetail.isFinish === 0 && (compensableDetail.status === 13 || compensableDetail.status === 23 || compensableDetail.status === 33 || compensableDetail.status === 14 || compensableDetail.status === 24 || compensableDetail.status === 34)
              ? <View style={styles.finish}>
                <TouchableOpacity style={styles.finish_btn} onPress={() => this._applyFinish()} activeOpacity={0.5}>
                  <Text style={styles.finish_btn_text}>
                    申请验收
                  </Text>
                </TouchableOpacity>
              </View>
              : null
          }
          <View style={styles.task_tabBar}>
            <TouchableOpacity style={styles.task_tab} onPress={() => this.setState({ taskActiveIndex: 0 })} activeOpacity={0.5}>
              <Image style={styles.tab_icon} source={require('../../../../assets/images/renwu1.png')} />
              <View style={[styles.tab_text_wrap, taskActiveIndex === 0 ? styles.tab_active : null]}>
                <Text style={styles.tab_text}>
                  任务详情
                  </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.task_tab} onPress={() => this.setState({ taskActiveIndex: 1 })} activeOpacity={0.5}>
              <Image style={styles.tab_icon} source={require('../../../../assets/images/renwu2.png')} />
              <View style={[styles.tab_text_wrap, taskActiveIndex === 1 ? styles.tab_active : null]}>
                <Text style={styles.tab_text}>
                  任务进度
                  </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.task_tab} onPress={() => this.setState({ taskActiveIndex: 2 })} activeOpacity={0.5}>
              <Image style={styles.tab_icon} source={require('../../../../assets/images/renwu3.png')} />
              <View style={[styles.tab_text_wrap, taskActiveIndex === 2 ? styles.tab_active : null]}>
                <Text style={styles.tab_text}>
                  任务日志
                  </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.tab_content}>
            {
              taskActiveIndex === 0
                ? <TaskDetail detail={detail}
                  compensableDetail={compensableDetail}
                  users={users}
                  navigation={navigation}
                  newListResult={newListResult}
                  getCompanayUsers={getCompanayUsers}
                  updateAllot={updateAllot}
                  checkZuTuanStatus={checkZuTuanStatus}
                  zutuanusers={zutuanusers}
                  userInfo={userInfo} />
                : null
            }
            {
              taskActiveIndex === 1
                ? <ProgressDetail detail={detail} />
                : null
            }
            {
              taskActiveIndex === 2
                ? <Log detail={detail} users={users} />
                : null
            }
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafbfc'
  },
  header: {
    backgroundColor: '#fff',
    marginBottom: ScreenUtil.scaleSize(20)
  },
  blue_container: {
    height: ScreenUtil.scaleSize(370),
    backgroundColor: '#7d8edc',
    paddingTop: ScreenUtil.scaleSize(40)
  },
  posi_header: {
    marginTop: ScreenUtil.scaleSize(-300),
    paddingBottom: ScreenUtil.scaleSize(40),
    width: ScreenUtil.scaleSize(750)
  },
  task_tabBar: {
    padding: ScreenUtil.scaleSize(40),
    backgroundColor: '#fff',
    marginBottom: ScreenUtil.scaleSize(20),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  task_tab: {
    width: ScreenUtil.scaleSize(120),
    height: ScreenUtil.scaleSize(200),
    alignItems: 'center'
  },
  tab_icon: {
    width: ScreenUtil.scaleSize(120),
    height: ScreenUtil.scaleSize(120)
  },
  tab_text_wrap: {
    height: ScreenUtil.scaleSize(80),
    borderBottomWidth: ScreenUtil.scaleSize(2),
    borderColor: '#fff'
  },
  tab_text: {
    lineHeight: ScreenUtil.scaleSize(80),
    color: '#4d4d4d'
  },
  tab_active: {
    borderColor: '#7d8edc'
  },
  finish: {
    padding: ScreenUtil.scaleSize(40),
    backgroundColor: '#fff',
    marginBottom: ScreenUtil.scaleSize(20),
  },
  finish_btn: {
    backgroundColor: '#b2c7ff',
    borderRadius: ScreenUtil.scaleSize(44),
    height: ScreenUtil.scaleSize(88),
    alignItems: 'center',
    justifyContent: 'center'
  },
  finish_btn_text: {
    color: '#fff',
    fontSize: ScreenUtil.setSpText(18),
    fontWeight: '900'
  }
})