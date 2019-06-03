import React, { Component } from 'react';
import { NativeEventEmitter, NativeModules, Platform } from 'react-native';
import { TabView } from 'teaset'
const { CalendarManager } = NativeModules;
const calendarManagerEmitter = new NativeEventEmitter(CalendarManager);
import Home from '../../home/connect'
import Inform from '../../inform/inform'
import Plaza from '../../plaza/list/connect'
import OrdinaryUserCenter from '../../users/user_center/ordinary/connect'
import VolunteerUserCenter from '../../users/user_center/volunteer/connect'
import myStorage from '../../../utils/myStorage'
myStorage._getStorage()
export default class FooterBar extends Component {
  static navigationOptions = {
    headerStyle: { display: 'none'},
  }
  constructor(props) {
    super(props)
    this.subscription = null;
    this.state = {
      selectedTab: 'home',
      userId: '',
      checkStatus: '',
      type: '',
      update: '',
      address: '',
      activeIndex: 0
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.navigation.getParam('type')){
      let activeIndex = nextProps.navigation.getParam('type');
      this.setState({
        activeIndex:activeIndex
      })
    }
  }
  componentWillMount() {
    let userId = '';
    let { getUserInfo, saveLocation, getBrandList } = this.props;
    // 获取用户信息
    myStorage._load('user3', function (data) {
      userId = data.userId;
      getUserInfo(data.userId)
    })
    // 获取品牌数据
    getBrandList()

    // 接受iOS原生的通知  获取定位信息
    this.subscription = calendarManagerEmitter.addListener(
      'EventReminder',
      (reminder) => {
        if (this.state.address !== reminder.name) {
          let res = this._formatAddr(reminder.name);
          this.setState({
            address: reminder.name
          })
          saveLocation(userId, res, saveLocation)
        }
      }
    );
    // 进入首页时获取一次定位  然后没个30s定位一次
    if (Platform.OS === 'ios') {
      this._getLocation()
      this.timer = setInterval(() => {
        this._getLocation()
      }, 30000)
    }
  }

  componentWillUnmount() {
    // 别忘了取消订阅，通常在componentWillUnmount生命周期方法中实现。
    this.subscription.remove();
  }

  // 获取定位
  _getLocation() {
    CalendarManager.addEvent("Birthday Party");
  }

  // 格式化地址数据
  _formatAddr(addr) {
    let location = {};
    if (!addr) {
      location = '定位中...'
    } else {
      let result = addr.substr(7, addr.length).replace(/\s\|/g, '').split(' ');
      for (let i = 0; i < result.length; i++) {
        if (result[i] === '(null)') {
          result[i] = '';
        }
      }
      if (result[8] === result[3]) {
        result[8] = '';
      }
      location.currentAddress = `${result[8]}${result[3]}${result[7]}${result[5]}${result[6]}${result[9]}`;
      location.address = `${result[8]}${result[3]}`;
    }
    return location;
  }

  // 切换tab
  _switchTab(data) {
    this.setState({
      activeIndex: data
    })
  }

  // 渲染tab
  _renderTab(Component, title, renderIcon, renderSelectedIcon) {
    return (
      <TabView.Sheet
        title={title}
        icon={renderIcon}
        activeIcon={renderSelectedIcon} >
        <Component {...this.props} switchTab={index => this._switchTab(index)} />
      </TabView.Sheet>
    )
  }

  render() {
    let UserCenter = null,
      userInfo = this.props.userInfo,
      activeIndex = this.state.activeIndex;
    if ((userInfo.type === 5 || userInfo.type === 4) && userInfo.checkStatus === 1) {
      UserCenter = VolunteerUserCenter
    } else {
      UserCenter = OrdinaryUserCenter
    }
    return (
      <TabView style={{ flex: 1 }} type='projector' onChange={(data) => this._switchTab(data)} activeIndex={activeIndex}>
        {this._renderTab(Home, '首页', require('../../../../assets/images/home.png'), require('../../../../assets/images/home_selected.png'))}
        {this._renderTab(Inform, '举报', require('../../../../assets/images/inform.png'), require('../../../../assets/images/inform_selected.png'))}
        {this._renderTab(Plaza, '广场', require('../../../../assets/images/plaza.png'), require('../../../../assets/images/plaza_selected.png'))}
        {this._renderTab(UserCenter, '我', require('../../../../assets/images/my.png'), require('../../../../assets/images/my_selected.png'))}
      </TabView>
    );
  }
}