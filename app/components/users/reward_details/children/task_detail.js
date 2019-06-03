import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import LawDetail from '../../reward_detail/common/law_detail'
import { ScreenUtil } from '../../../../utils/util';
import { Overlay, Toast } from 'teaset'
import Modal from './task_detail_modal'

export default class TaskDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      tabs: []
    }
  }

  componentWillMount() {
    // 获取公司成员
    let { userInfo } = this.props;
    this.props.getCompanayUsers({ companyId: userInfo.userId }, (res) => {
      this.setState({
        users: res.result || []
      })
    })
  }

  // 数组去重
  _deleteRepeat(data) {
    let result = [];
    for (let i = 0; i < data.length; i++) {
      let flag = true;
      for (let j = 0; j < result.length; j++) {
        if (typeof data[i] === 'object') {
          if (data[i].nickName == result[j].nickName) {
            flag = false;
          }
        } else {
          if (data[i] == result[j]) {
            flag = false;
          }
        }
      }
      if (flag) {
        result.push(data[i]);
      };
    }
    // 数组去空
    result = result.filter(item => {
      return item !== ''
    })
    return result;
  }

  // 显示嫌疑人弹窗
  _showOverlay(type) {
    this.overlayView = (
      <Overlay.PullView side='bottom' modal={false} ref={v => this.overlayView = v}>
        <Modal closeModal={() => this.overlayView && this.overlayView.close()}
          type={type}
          commitSuspect={(data, type) => this.commitSuspect(data, type)}
          checkZuTuanStatus={this.props.checkZuTuanStatus}
          users={this.state.users} />
      </Overlay.PullView>
    );
    Overlay.show(this.overlayView);
  }

  // 提交任务
  commitSuspect(data, type) {
    let compensableDetail = this.props.compensableDetail;
    if (type === 'company') {
      // 分配任务
      let { allot, allotUserIds } = compensableDetail;
      allotUserIds = allotUserIds.split(',');
      let newAllot = this._deleteRepeat([].concat(allot, data.data));
      let allUserIds = this._deleteRepeat([].concat(allotUserIds, data.userIds));
      let allotData = {
        allot: JSON.stringify(newAllot),
        allotUserIds: allUserIds.toString(),
        compensableId: compensableDetail.compensableId
      }
      compensableDetail.allot = newAllot;
      compensableDetail.allotUserIds = allUserIds.toString();
      let newCompensableDetail = Object.assign({}, compensableDetail)
      if (this.props.updateAllot) {
        this.props.updateAllot(allotData, newCompensableDetail)
      }
    } else {
      // 组团
      let { team, userIds } = compensableDetail;
      userIds = userIds.split(',');
      let newTeam = this._deleteRepeat([].concat(team, data.data));
      let allUserIds = this._deleteRepeat([].concat(userIds, data.userIds));
      let teamData = {
        team: JSON.stringify(newTeam),
        userIds: allUserIds.toString(),
        compensableId: compensableDetail.compensableId
      }
      compensableDetail.team = newTeam;
      compensableDetail.userIds = allUserIds.toString();
      let newCompensableDetail = Object.assign({}, compensableDetail)
      if (this.props.zutuanusers) {
        this.props.zutuanusers(teamData, newCompensableDetail)
      }
    }
  }

  // 同意/拒绝任务
  _taskOperation(type) {
    let { compensableDetail, userInfo, navigation, newListResult } = this.props;
    let { team, userIds } = compensableDetail;
    userIds = userIds.split(',');
    let newTeam = this._deleteRepeat(team);
    let allUserIds = this._deleteRepeat(userIds);
    let teamData, msg;
    if (type === 'accept') {
      // 同意
      for (let i = 0; i < newTeam.length; i++) {
        const element = newTeam[i];
        if (userInfo.type === 4 && element.nickName === userInfo.chargeNick) {
          element.isShow = 1
        } else if (element.nickName === userInfo.nickName) {
          element.isShow = 1
        }
      }
      msg = '同意成功'
    } else {
      // 拒绝
      newTeam = team.filter(item => {
        if (userInfo.type === 4) {
          return item.nickName !== userInfo.chargeNick
        } else {
          return item.nickName !== userInfo.nickName
        }
      })
      allUserIds = allUserIds.filter(item => {
        return item != userInfo.userId
      })
      msg = '拒绝成功'
    }
    teamData = {
      team: JSON.stringify(newTeam),
      userIds: allUserIds.toString(),
      compensableId: compensableDetail.compensableId
    }
    compensableDetail.team = newTeam;
    compensableDetail.userIds = allUserIds.toString();
    let newCompensableDetail = Object.assign({}, compensableDetail)
    newListResult = newListResult.filter(item => {
      return item.compensableId != compensableDetail.compensableId
    })
    if (this.props.zutuanusers) {
      this.props.zutuanusers(teamData, newCompensableDetail,  ()=> {
        Toast.message(msg);
        if(type === 'reject') {
          navigation.goBack()
        }
      }, type, newListResult)
    }
  }

  _renderBtns() {
    // compensableDetail.sourceType 1 组团  2 分配
    // userInfo.type 4 调查公司
    // compensableDetail.isShow 1 已同意 0 未同意
    let { userInfo, compensableDetail } = this.props;
    let btns = null;
    if (compensableDetail.status == 13 || compensableDetail.status == 23 || compensableDetail.status == 33 || compensableDetail.status == 14 || compensableDetail.status == 24 || compensableDetail.status == 34) {
      if (compensableDetail.sourceType === 1) {
        if (userInfo.type === 4) {
          if (compensableDetail.isShow === 0) {
            btns = [
              <TouchableOpacity activeOpacity={0.5} onPress={() => this._taskOperation('accept')} key='1-4-0-1'>
                <View style={styles.btn}>
                  <Text style={styles.btn_text}>
                    接受任务
                  </Text>
                </View>
              </TouchableOpacity>,
              <TouchableOpacity activeOpacity={0.5} onPress={() => this._taskOperation('reject')} key='1-4-0-0'>
                <View style={[styles.btn, { backgroundColor: '#668fff' }]}>
                  <Text style={styles.btn_text}>
                    拒绝任务
                  </Text>
                </View>
              </TouchableOpacity>
            ]
          } else {
            btns = [
              <TouchableOpacity activeOpacity={0.5} onPress={() => this._showOverlay('company')}>
                <View style={styles.btn}>
                  <Text style={styles.btn_text}>
                    分配
                </Text>
                </View>
              </TouchableOpacity>,
              <TouchableOpacity activeOpacity={0.5} onPress={() => this._showOverlay('zutuan')}>
                <View style={[styles.btn, { backgroundColor: '#668fff' }]}>
                  <Text style={styles.btn_text}>
                    组团
                </Text>
                </View>
              </TouchableOpacity>
            ]
          }
        } else {
          if (compensableDetail.isShow === 0) {
            btns = [
              <TouchableOpacity activeOpacity={0.5} onPress={() => this._taskOperation('accept')} key='1-0-0-1'>
                <View style={styles.btn}>
                  <Text style={styles.btn_text}>
                    接受任务
                  </Text>
                </View>
              </TouchableOpacity>,
              <TouchableOpacity activeOpacity={0.5} onPress={() => this._taskOperation('reject')} key='1-0-0-0'>
                <View style={[styles.btn, { backgroundColor: '#668fff' }]}>
                  <Text style={styles.btn_text}>
                    拒绝任务
                  </Text>
                </View>
              </TouchableOpacity>
            ]
          } else {
            btns = <TouchableOpacity activeOpacity={0.5} onPress={() => this._showOverlay('zutuan')}>
              <View style={[styles.btn, { backgroundColor: '#668fff' }]}>
                <Text style={styles.btn_text}>
                  组团
              </Text>
              </View>
            </TouchableOpacity>
          }
        }
      } else if (compensableDetail.sourceType === 2) {
        if (compensableDetail.isShow === 0) {
          btns = <TouchableOpacity activeOpacity={0.5} onPress={() => this._showOverlay('zutuan')}>
            <View style={[styles.btn, { backgroundColor: '#668fff' }]}>
              <Text style={styles.btn_text}>
                组团
            </Text>
            </View>
          </TouchableOpacity>
        }
      } else {
        if (compensableDetail.isShow === 0) {
          btns = [
            <TouchableOpacity activeOpacity={0.5} onPress={() => this._taskOperation('accept')} key='0-0-0-1'>
              <View style={styles.btn}>
                <Text style={styles.btn_text}>
                  接受任务
                </Text>
              </View>
            </TouchableOpacity>,
            <TouchableOpacity activeOpacity={0.5} onPress={() => this._taskOperation('reject')} key='0-0-0-0'>
              <View style={[styles.btn, { backgroundColor: '#668fff' }]}>
                <Text style={styles.btn_text}>
                  拒绝任务
                </Text>
              </View>
            </TouchableOpacity>
          ]
        } else {
          btns = [
            <TouchableOpacity activeOpacity={0.5} onPress={() => this._showOverlay('company')} key='0-0-1-1'>
              <View style={styles.btn}>
                <Text style={styles.btn_text}>
                  分配
              </Text>
              </View>
            </TouchableOpacity>,
            <TouchableOpacity activeOpacity={0.5} onPress={() => this._showOverlay('zutuan')} key='0-0-1-0'>
              <View style={[styles.btn, { backgroundColor: '#668fff' }]}>
                <Text style={styles.btn_text}>
                  组团
              </Text>
              </View>
            </TouchableOpacity>
          ]
        }
      }
    }
    return btns;
  }

  render() {
    let { detail, userInfo, users } = this.props;

    return (
      <View style={styles.task_detail}>
        <View style={styles.group}>
          <View style={styles.title}>
            <Image style={styles.title_icon} source={require('../../../../../assets/images/users.png')} />
            <Text style={styles.title_text}>组团人员</Text>
          </View>
          <View style={styles.user_content}>
            {
              users.length > 0
                ?
                users.map((item, index) => {
                  if (item.isShow === 1) {
                    return (
                      <View style={styles.users} key={index}>
                        <View style={styles.user_icon}>
                          <Text style={[styles.userName, { color: '#fff' }]} numberOfLines={1}>{item.nickName}</Text>
                        </View>
                        <Text style={styles.userName} numberOfLines={1}>{item.nickName}</Text>
                      </View>
                    )
                  }
                })
                : <View style={styles.users}>
                  <View style={styles.user_icon}>
                    <Text style={[styles.userName, { color: '#fff' }]} numberOfLines={1}>{userInfo.chargeNick}</Text>
                  </View>
                  <Text style={styles.userName} numberOfLines={1}>{userInfo.chargeNick}</Text>
                </View>
            }
          </View>
        </View>
        <View style={styles.group}>
          <View style={styles.title}>
            <Image style={styles.title_icon} source={require('../../../../../assets/images/logs.png')} />
            <Text style={styles.title_text}>案件信息</Text>
          </View>
          <LawDetail data={detail} />
        </View>
        <View style={styles.btns}>
          {this._renderBtns()}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  task_detail: {
    backgroundColor: '#fff',
    paddingBottom: ScreenUtil.scaleSize(40)
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    height: ScreenUtil.scaleSize(100),
    marginLeft: ScreenUtil.scaleSize(30),
    marginRight: ScreenUtil.scaleSize(30),
    borderBottomWidth: ScreenUtil.scaleSize(1),
    borderBottomColor: '#e6e6e6'
  },
  title_icon: {
    height: ScreenUtil.scaleSize(56),
    width: ScreenUtil.scaleSize(56),
  },
  title_text: {
    fontSize: ScreenUtil.setSpText(19),
    color: '#4d4d4d',
    flex: 1,
    paddingLeft: ScreenUtil.scaleSize(20)
  },
  user_content: {
    padding: ScreenUtil.scaleSize(30),
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  users: {
    height: ScreenUtil.scaleSize(164),
    width: ScreenUtil.scaleSize(120),
    marginRight: ScreenUtil.scaleSize(20),
    alignItems: 'center'
  },
  user_icon: {
    width: ScreenUtil.scaleSize(100),
    height: ScreenUtil.scaleSize(100),
    borderRadius: ScreenUtil.scaleSize(50),
    backgroundColor: '#668fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  userName: {
    height: ScreenUtil.scaleSize(64),
    fontSize: ScreenUtil.setSpText(14),
    color: '#4d4d4d',
    textAlign: 'center',
    lineHeight: ScreenUtil.scaleSize(64),
    width: ScreenUtil.scaleSize(120)
  },
  btns: {
    paddingLeft: ScreenUtil.scaleSize(60),
    paddingRight: ScreenUtil.scaleSize(60),
    paddingTop: ScreenUtil.scaleSize(30),
    paddingBottom: ScreenUtil.scaleSize(30),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btn: {
    height: ScreenUtil.scaleSize(100),
    width: ScreenUtil.scaleSize(290),
    borderRadius: ScreenUtil.scaleSize(50),
    backgroundColor: '#7d8ebd',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn_text: {
    fontSize: ScreenUtil.setSpText(18),
    color: '#fff',
    fontWeight: '900'
  }
})