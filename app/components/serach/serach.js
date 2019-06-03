import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import Container from '../common/container/index'
import SearchHeader from './search_header'
import SearchItem from './search_item'
import HotSearchList from './hot_search'
import { ScreenUtil, time2Date } from '../../utils/util';
import Api from '../../utils/index'

export default class Search extends Component {
  static navigationOptions = {
    headerStyle: {
      display: 'none',
    }
  }
  
  constructor(props) {
    super(props)
    this.state = {
      hotList: ['LV', '假包', '测试'],
      showHot: true,
      dataSource: [],
      pageSize: 20,
      pageNo: 1,
      totalPages: 1,
      hasMore: true,
      refreshing: false,
      text: ''
     }
  }

  // 提交搜索文字
  onSubmitSearch(text) {
    this.setState({
      text: text
    }, () => {
      this.searchTask(1, [])
    })
  }

  // 点击跳转到任务详情
  onPressItem(id) {
    this.props.navigation.navigate('TaskDetails', {id: id})
  }

  // 点击热搜查找
  onPressHotSearch(hotKey){
    this.setState({
      text: hotKey,
      showHot: false,
      hasMore: true
    }, ()=> {
      this.searchTask(1, [])
    })
  }

  // 点击取消
  onCancelSearch() {
    this.setState({
      hasMore: true,
      showHot: true,
      text: ''
    }, () => {
      this.searchTask(1, [])
    })
  }

  // 下拉刷新
  _onRefresh() {
    this.setState({
      hasMore: true,
      refreshing: true,
    }, ()=>{
      this.searchTask(1, [])
    })
  }

  // 上拉加载
  _onEndReached() {
    let { pageNo, dataSource, totalPages } = this.state;
    pageNo++;
    this.searchTask(pageNo, dataSource)
  }

  // 搜索查找相关数据
  searchTask(pageNo, list) {
    let { text, pageSize, hasMore, totalPages } = this.state;
    if (pageNo> totalPages) {
      hasMore = false;
      this.setState({
        hasMore: hasMore
      })
    }
    if (hasMore) {
      let data = {
        name: text,
        pageSize: pageSize,
        pageNo: pageNo
      }
      Api.TASKSQUARESLIST(data).then(res => {
        if(res.success) {
          if (res.result && res.result.length > 0) {
            res.result.map((item, index) => {
              let endTimeMs = time2Date(item.endTime);
              item.taskStatus = endTimeMs - Date.now();
              let days = parseInt((item.taskStatus / 1000 / 60 / 60 / 24), 10)
              let hours = parseInt((item.taskStatus / 1000 / 60 / 60 % 24), 10)
              item.outTime = `${days}天${hours}小时`
              if (item.taskStatus > 0) {
                list.push(item);
              }
            })
          }
          this.setState({
            dataSource: list,
            pageNo: pageNo,
            totalPages: res.totalPages,
            hasMore: hasMore,
            refreshing: false
          })
        }
      })
    }
  }

  // 渲染搜索结果
  _renderItem(item, index) {
    return (
      <SearchItem 
        onPressItem={this.onPressItem.bind(this)}
        data={item}
      />
    )
  }

  // 数据为空时显示的
  _renderNoData() {
    return (
      <View style={styles.noData}>
        <Text style={styles.noDataMsg}>暂时没有您要找的任务</Text>
      </View>
    )
  }

  render() {
    return (
      <Container scrollViewProps={{style: styles.container}}>
        <SearchHeader 
          onSubmitSearch={ text => this.onSubmitSearch(text)}
          onCancelSearch={this.onCancelSearch.bind(this)}
          navigation={this.props.navigation}
        />
          <View style={styles.content}>
            {
              this.state.showHot
              ? <HotSearchList onPressHotSearch={(hotKey) => this.onPressHotSearch(hotKey)} data={this.state.hotList}/>
              : <FlatList style={styles.content}
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
                onEndReachedThreshold={0.2}
                onEndReached={this._onEndReached.bind(this)}
                data={this.state.dataSource}
                keyExtractor={(item)=> item.id.toString()}
                ListEmptyComponent={this._renderNoData}
                renderItem={this._renderItem.bind(this)}/>
            }
          </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: ScreenUtil.scaleSize(10),
    paddingBottom: ScreenUtil.scaleSize(10),
  },
  noData: {
    paddingTop: ScreenUtil.scaleSize(400),
    alignItems: 'center',
  },
  noDataMsg: {
    fontSize: ScreenUtil.setSpText(14),
    color: '#9c9ca1'
  }
})