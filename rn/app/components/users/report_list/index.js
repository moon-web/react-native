import React, { Component } from 'react'
import { StyleSheet, View, Text, FlatList, ActivityIndicator } from 'react-native'
import { Theme, Toast, SegmentedBar } from 'teaset'
import ReportItem from '../task_list/common/item'
import { ScreenUtil } from '../../../utils/util'
class Report extends Component {
    constructor() {
        super()
        this.state = {
            titles: [
                { type: 2, title: '线下举报' },
                { type: 1, title: '线上举报' },
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
        let { taskType, taskList, refreshTaskList, loadTaskList, userInfo } = this.props;
        let newTaskType = this.props.navigation.getParam('type');
        if (!taskList.length || taskType !== newTaskType || refreshTaskList) {
            this._showLoading()
            loadTaskList(userInfo.userId, 1, [], newTaskType, this._hideLoading.bind(this))
        } 
        let activeIndex = 0;
        for (let i = 0; i < this.state.titles.length; i++) {
            const element = this.state.titles[i];
            if (element.type === newTaskType) {
                activeIndex = i;
            }
        }
        this.setState({
            activeIndex: activeIndex
        })
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
        return (
            <ReportItem data={item} navigation={this.props.navigation} key={index} type='report' />
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
        } else if (pageNo > 1 && !isFetching) {
            this._showLoading()
            loadTaskList(userInfo.userId, pageNo, taskList, taskType, this._hideLoading.bind(this))
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <SegmentedBar onChange={this._tabChange.bind(this)} animated={false} activeIndex={this.state.activeIndex} style={{height: ScreenUtil.scaleSize(66)}}>
                    <SegmentedBar.Item title='线下举报' />
                    <SegmentedBar.Item title='线上举报' />
                </SegmentedBar>
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
                        keyExtractor={(item) => item.id.toString()} />
                </View>
                <View style={{ height: Theme.screenInset.bottom }} />
            </View>
        )
    }
}

export default Report
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})