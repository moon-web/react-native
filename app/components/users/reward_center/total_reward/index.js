import React,{ Component } from 'react'
import { View, Text ,FlatList, ActivityIndicator } from 'react-native'
import styles from './styles'
import Item from './common/item1'
import { ScreenUtil } from '../../../../utils/util'
import { Toast } from 'teaset'
class TotalReward extends Component{
    constructor(){
        super()
        this.state = {
            isRefresh: false
        }
        this.customKey = null;
    }
    componentWillMount(){
        let data = {
            userId:this.props.userInfo.userId,
            pageNo:1,
            pageSize:10
        }
        this._showLoading()
        this.props.TotalReward(data,[],this._hideLoading.bind(this))
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
    /**
     * 创建尾部布局
     */
    _createListFooter() {
        return (
            <View>
                {
                    this.props.rewardApplyList.length > 0
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
    _createListItem(item) {
        return (
            <View>
                <Item data={item} />
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
        this._showLoading()
        let data = {
            userId:userInfo.userId,
            pageNo:1,
            pageSize:10
        }
        this.props.TotalReward(data,[],this._hideLoading.bind(this))
    };

    /**
     * 加载更多
     * @private
     */
    _onLoadMore() {
        let { isFetching, rewardApplyList,total, userInfo, pageNo } = this.props;
        pageNo += 1;
        if (pageNo > total) {
            return
        } else if (pageNo > 1 && !isFetching) {
            this._showLoading()
            let data = {
                userId:userInfo.userId,
                pageNo:pageNo,
                pageSize:10
            }
            this.props.TotalReward(data,rewardApplyList,this._hideLoading.bind(this))
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.reward_total_num}>
                    <Text style={styles.reward_total_text}>累计奖励(元)</Text>
                    <Text style={styles.reward_total_money}>{this.props.money}.00</Text>
                </View>
                <View style={styles.reward_title}>
                    <Text style={styles.reward_title_text}>申请记录</Text>
                </View>
                <View style={styles.rewardBox}>
                    <FlatList
                        data={this.props.rewardApplyList}
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
            </View>
        )
    }
}
export default TotalReward