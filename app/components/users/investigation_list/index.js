import React, { Component } from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import { Theme, SegmentedBar, Toast } from 'teaset'
import Item from './common/item'
import styles from './styles'

class InvestigationList extends Component {
  constructor() {
    super();
    this.customKey = null;
    this.state = {
      titles: [
        { type: '', title: '全部' },
        { type: '80,21,31,12,22,32,13,23,33,14,24,34,15,25,35,16,26,36,17', title: '已通过' },
        { type: '90', title: '未通过' },
        { type: '0', title: '待审核' },
      ],
      activeIndex: 0,
      isRefresh: false
    }
  }

  // 显示loading
  _showLoading() {
    if (this.customKey) return;
    this.customKey = Toast.show({
      text: '加载中...',
      icon: <ActivityIndicator size='large' />,
      position: 'top',
      duration: 1000000,
    })
  }

  // 隐藏loading
  _hideLoading() {
    if (!this.customKey) return;
    Toast.hide(this.customKey);
    this.customKey = null;
  }

  componentWillMount() {
    const titles = this.state.titles;
    let { taskType, newTaskType, taskList, refreshTaskList, loadTaskList, userInfo } = this.props;
    newTaskType = titles[0].type
    if (!taskList.length || taskType !== newTaskType || refreshTaskList) {
      this._showLoading()
      loadTaskList(userInfo.userId, 1, [], newTaskType, this._hideLoading.bind(this))
    }
  }

  // 改变tab
  _tabChange(data) {
    const titles = this.state.titles;
    const { userInfo, loadTaskList } = this.props;
    let taskType = titles[data].type;
    this.setState({
      activeIndex: data
    })
    this._showLoading()
    loadTaskList(userInfo.userId, 1, [], taskType, this._hideLoading.bind(this))
  }

  /**
   * 创建头部布局
   */
  _createListHeader() {
    return (
      <View>
        <Text style={{ color: 'white' }}>

        </Text>
      </View>
    )
  }
  /**
   * 创建尾部布局
   */
  _createListFooter() {
    return (
      <View>
        {
          this.props.taskList.length > 0
          ? <Text style={styles.footer}>
              已经到底了哦~
            </Text>
          : ''
        }
      </View>
    )
  }
  /**
   * 创建布局
   */
  _createListItem(item) {
    return (
      <Item data={item} navigation={this.props.navigation}/>
    );
  }
  /**
   * 空布局
   */
  _createEmptyView() {
    return (
      <View style={styles.noData}>
        <Text style={{ fontSize: 16 }}>
          暂无列表数据，下拉刷新
        </Text>
      </View>
    );
  }

  /**
   * 下拉刷新
   * @private
   */
  _onRefresh() {
    // 不处于 下拉刷新
    const { taskType, loadTaskList, userInfo } = this.props;
    this._showLoading()
    loadTaskList(userInfo.userId, 1, [], taskType, this._hideLoading.bind(this))
  };

  /**
   * 加载更多
   * @private
   */
  _onLoadMore() {
    let { isFetching, taskList, taskType, loadTaskList, total, userInfo, pageNo } = this.props;
    pageNo += 1;
    if (pageNo > total) {
      return
    } else if(pageNo > 1 && !isFetching) {
      this._showLoading()
      loadTaskList(userInfo.userId, pageNo, taskList, taskType, this._hideLoading.bind(this))
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <SegmentedBar onChange={this._tabChange.bind(this)} animated={false} activeIndex={this.state.activeIndex} style={styles.tabBar}>
          <SegmentedBar.Item title='全部' />
          <SegmentedBar.Item title='已通过' />
          <SegmentedBar.Item title='未通过' />
          <SegmentedBar.Item title='待审核' />
        </SegmentedBar>
        <View style={{flex: 1}}>
          <FlatList
            ref={flatList=> {this.flatList = flatList}}
            data={this.props.taskList}
            //item显示的布局
            renderItem={({ item }) => this._createListItem(item)}
            // 空布局
            ListEmptyComponent={this._createEmptyView}
            //添加头尾布局
            // ListHeaderComponent={this._createListHeader}
            ListFooterComponent={() => this._createListFooter()}
            //下拉刷新相关
            onRefresh={() => this._onRefresh()}
            refreshing={this.state.isRefresh}
            //加载更多
            onEndReached={() => this._onLoadMore()}
            onEndReachedThreshold={0.2}
            keyExtractor={(item) => item.id.toString()}/>
        </View>
        <View style={{height: Theme.screenInset.bottom}} />
      </View>
    );
  }
}

export default InvestigationList