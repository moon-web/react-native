import React,{ Component } from 'react'
import { StyleSheet, View, ActivityIndicator, FlatList, Text } from 'react-native'
import { Theme, Toast, SegmentedBar } from 'teaset'
import { ScreenUtil }  from '../../../utils/util'
import Item1 from './common/item1'
import Item2 from './common/item2'
class RewardTask extends Component{
    constructor(){
        super();
        this.customKey = null;
        this.state = {
            titles: [
                { type: 0, title: '任务中' },
                { type: 1, title: '已完成' },
                { type: 2, title: '已中止' },
            ],
            activeIndex: 0,
            isRefresh: false
        }
    }
    componentWillMount(){
        const { userInfo } = this.props;
        this._showLoading()
        let data = {
            userId:userInfo.userId,
            status:'21,31,12,22,32,13,23,33,14,24,34',
            pageNo:1
        }
        this.props.loadRewardTask(data,[],this._hideLoading.bind(this))
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
    // 改变tab
    _tabChange(data) {
        this._showLoading()
        const titles = this.state.titles;
        const { userInfo } = this.props;
        let status = ''
        this.setState({
            activeIndex: data
        })
        if(data === 0){
            status = '21,31,12,22,32,13,23,33,14,24,34'
        }else if(data === 1){
            status = '16,26,36,17'
        }else {
            status = '15,25,35'
        }
        let datas = {
            userId:userInfo.userId,
            status:status,
            pageNo:1
        }
        this.props.loadRewardTask(datas,[],this._hideLoading.bind(this))
    }

    /**
     * 创建尾部布局
     */
    _createListFooter() {
        return (
            <View>
                {
                    this.props.rewardList.length > 0
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
            <View>
                {
                    item.status === 21 || item.status === 31 ?
                        <Item1 data={item} navigation={this.props.navigation} key={index} />:
                        <Item2 data={item} navigation={this.props.navigation} key={index} />
                }
            </View>

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
        const { userInfo } = this.props;
        let status = ''
        if(this.state.activeIndex === 0){
            status = '21,31,12,22,32,13,23,33,14,24,34'
        }else if(this.state.activeIndex === 1){
            status = '16,26,36,17'
        }else {
            status = '15,25,35'
        }
        this._showLoading()
        let datas = {
            userId:userInfo.userId,
            status:status,
            pageNo:1
        }
        this.props.loadRewardTask(datas,[],this._hideLoading.bind(this))
    };

    /**
     * 加载更多
     * @private
     */
    _onLoadMore() {
        let { isFetching, total, userInfo, pageNo ,rewardList} = this.props;
        pageNo += 1;
        let status = ''
        if(this.state.activeIndex === 0){
            status = '21,31,12,22,32,13,23,33,14,24,34'
        }else if(this.state.activeIndex === 1){
            status = '16,26,36,17'
        }else {
            status = '15,25,35'
        }
        if (pageNo > total) {
            return
        } else if (pageNo > 1 && !isFetching) {
            this._showLoading()
            let data = {
                userId:userInfo.userId,
                status:status,
                pageNo:pageNo
            }
            this.props.loadRewardTask(data,rewardList,this._hideLoading.bind(this))
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <SegmentedBar onChange={this._tabChange.bind(this)} animated={false} activeIndex={this.state.activeIndex} style={{height: ScreenUtil.scaleSize(66)}}>
                    <SegmentedBar.Item title='任务中' />
                    <SegmentedBar.Item title='已完成' />
                    <SegmentedBar.Item title='已中止' />
                </SegmentedBar>
                <View style={styles.rewardBox}>
                    <FlatList
                        ref={flatList => { this.flatList = flatList }}
                        data={this.props.rewardList}
                        //item显示的布局
                        renderItem={({ item }) => this._createListItem(item)}
                        // 空布局
                        ListEmptyComponent={this._createEmptyView}
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
export default RewardTask
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    rewardBox:{
        flex: 1,
        backgroundColor:'#f2f2f2',
        paddingTop:ScreenUtil.scaleSize(30),
    }
})