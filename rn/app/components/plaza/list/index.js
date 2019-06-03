import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Toast, Theme } from 'teaset'
import Header from '../../common/header/index';
import PlazaItem from './children/item'
import RewardItem from './children/reward_item'
import { ScreenUtil } from '../../../utils/util'
class Plaza extends Component {
    constructor() {
        super();
        this.state = {
            // 下拉刷新
            isRefresh: false,
            y: 0,
            pageSize: 10
        }
    }

    _onScrollView(e) {
        // 获取滑动的距离
        let {y} = e.nativeEvent.contentOffset;
        this.setState({
            y
        })
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
        this._getTaskList(1, [])
    }

    _getTaskList(pageNo, oldList) {
        let { userInfo, loadTaskList, queryRewardTask } = this.props;
        let pageSize = this.state.pageSize;
        let taskData = {userId: userInfo.userId, status: 1, pageSize, pageNo};
        if (userInfo.type === 4 || userInfo.type === 5) {
            let queryRewardData = { pageNo, pageSize, allotUserId: userInfo.userId, status: '21,31' }
            queryRewardTask(queryRewardData, oldList)
        }
        this._showLoading()
        loadTaskList(taskData, oldList, this._hideLoading.bind(this))
    }

    /**
     * 创建头部布局
     */
    _createListHeader() {
        return (
            <View>
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
                        ? <Text style={{ textAlign: 'center', lineHeight: ScreenUtil.scaleSize(80), color: '#ccc' }}>
                            已经到底了哦~
            </Text>
                        : null
                }
            </View>
        )
    }
    /**
     * 创建布局
     */
    _createListItem(item, index) {
        let { y } = this.state;
        let Item = null;
        if (item.compensableDetail) {
            Item = RewardItem;
        } else {
            Item = PlazaItem;
        }
        return (
            <Item data={item} navigation={this.props.navigation} key={index} y={y} />
        );
    }
    /**
     * 空布局
     */
    _createEmptyView() {
        return (
            <View style={{ height: 100, alignItems: 'center', justifyContent: 'center' }}>
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
        this._showLoading()
        this._getTaskList(1, [])
    };

    /**
     * 加载更多
     * @private
     */
    _onLoadMore() {
        let { isFetching, taskList, total, pageNo } = this.props;
        pageNo += 1;
        if (pageNo > total) {
            return
        } else if (pageNo > 1 && !isFetching) {
            this._showLoading()
            this._getTaskList(pageNo, taskList)
        }
    }

    render() {
        //打赏任务列表(二期)
        //任务列表
        const { navigation, address } = this.props;
        return (
            <View style={styles.container}>
                <Header navigation={navigation} address={address} />
                <View style={{ flex: 1 }}>
                    <FlatList
                        ref={flatList => { this.flatList = flatList }}
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
                        keyExtractor={(item) => item.id.toString()} 
                        onScroll={e => this._onScrollView(e)}
                    />
                </View>
                <View style={{ height: Theme.screenInset.bottom }} />
            </View>
        );
    }
}
export default Plaza
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fafbfc',
        flex: 1
    }
})