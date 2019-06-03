import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, ActivityIndicator, FlatList, Keyboard, TouchableWithoutFeedback } from 'react-native'
import MyInput from '../../common/extends/myInput'
import { Theme, Toast, Overlay } from 'teaset'
import styles from './styles'
import { ScreenUtil } from '../../../utils/util'
import Api from '../../../utils/index'

class MyInvitation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: '',
            InvitationName: '',
            InvitationPhone: '',
            code: '',
            isRefresh: false
        }
    }

    componentWillMount() {
        let { userInfo } = this.props
        let data = {
            parentId: userInfo.userId  //当前用户id
        }
        this._showLoading()
        this.props.MyInvitation(data, [], this._hideLoading.bind(this))
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
                    this.props.invitationList.length > 0
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
            <View style={styles.myInvitation_list_item_box}>
                <View style={styles.myInvitation_list_item}>
                    <Text style={styles.myInvitation_list_item_title}>{item.nickName}</Text>
                    <Text style={styles.myInvitation_list_item_phone}>{item.mobile}</Text>
                    <Text style={styles.myInvitation_list_item_time}>{item.gmtCreate}</Text>
                </View>
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
            parentId: userInfo.userId,  //当前用户id
            pageNo: 1,
        }
        this.props.MyInvitation(data, [], this._hideLoading.bind(this))

    };

    /**
     * 加载更多
     * @private
     */
    _onLoadMore() {
        let { isFetching, total, userInfo, pageNo, invitationList } = this.props;
        pageNo += 1;
        if (pageNo > total) {
            return
        } else if (pageNo > 1 && !isFetching) {
            this._showLoading()
            let data = {
                parentId: userInfo.userId,  //当前用户id
                pageNo: pageNo
            }
            this.props.MyInvitation(data, invitationList, this._hideLoading.bind(this))
        }
    }

    _mobileBlur() {
        let myreg = /^(0|86|17951)?(13[0-9]|14[5-9]|15[012356789]|16[56]|17[0-8]|18[0-9]|19[189])[0-9]{8}$/;
        if (!myreg.test(this.state.InvitationPhone)) {
            Toast.info('请输入正确的手机号')
        } else {
            this.setState({
                InvitationPhone: this.state.InvitationPhone
            })
        }
    }

    //邀请
    _MyInvitation() {
        let { userInfo } = this.props
        if (this.state.InvitationName === '' || this.state.InvitationName === undefined) {
            Toast.info('请输入邀请人姓名')
            return false
        }
        if (this.state.InvitationPhone === '' || this.state.InvitationPhone === undefined) {
            Toast.info('请输入邀请人手机号')
            return false
        } else {
            let myreg = /^(0|86|17951)?(13[0-9]|14[5-9]|15[012356789]|16[56]|17[0-8]|18[0-9]|19[189])[0-9]{8}$/;
            if (!myreg.test(this.state.InvitationPhone)) {
                Toast.info('请输入正确的手机号')
                return false
            }
        }
        Api.getQrCode({
            imageText: `http://volunteer.ipcommune.com/register/SecondRInvestigator?InvitationPhone=${this.state.InvitationPhone}/parentId=${userInfo.userId}/name=${this.state.InvitationName}`
        }).then(res => {
            if (res.success) {
                this.setState({
                    code: res.msgCode
                }, () => {
                    this._erCode()
                })
            } else {
                Toast.message('生成二维码失败')
            }
        })
    }
    //我的邀请二维码弹出层
    _erCode() {
        let overlayView = (
            <Overlay.View style={{ alignItems: 'center', justifyContent: 'center' }}
                modal={false}
                overlayOpacity={0.5}
                ref={v => this.overlayView = v}
            >
                <View style={styles.myInvitation_code}>
                    <Image style={styles.invitation_img} source={this.state.code ? { uri: this.state.code } : ''} />
                </View>
            </Overlay.View>
        );
        Overlay.show(overlayView);
    }

    // 收起小键盘
    _dismissKeyBoard() {
        Keyboard.dismiss()
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={this._dismissKeyBoard}>
                    <View>
                    <View style={styles.myInvitation_top}>
                        <Text style={styles.myInvitation_top_text}>我的邀请</Text>
                    </View>
                    <View style={styles.myInvitation_box}>
                        <View style={styles.myInvitation_box_item}>
                            <Text style={styles.myInvitation_box_item_title}>姓名</Text>
                            <MyInput
                                underlineColorAndroid="transparent"
                                style={styles.myInvitation_input}
                                onChangeText={(text) => this.setState({ InvitationName: text })}
                            />
                        </View>
                        <View style={styles.myInvitation_box_item}>
                            <Text style={styles.myInvitation_box_item_title}>手机号码</Text>
                            <MyInput
                                underlineColorAndroid="transparent"
                                style={styles.myInvitation_input}
                                onChangeText={(text) => this.setState({ InvitationPhone: text })}
                                onBlur={this._mobileBlur.bind(this)}
                                keyboardType="numeric"
                            />
                        </View>
                    </View>
                    <View style={styles.myInvitation_container}>
                        <TouchableOpacity style={styles.myInvitation_box_btn} onPress={this._MyInvitation.bind(this)}>
                            <Text style={styles.myInvitation_box_btn_text}>
                                生成二维码
                            </Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.myInvitation_list_box}>
                    <View style={styles.myInvitation_list_deiscrible_box}>
                        <Text numberOfLines={10} style={styles.myInvitation_list_deiscrible}>邀请好友成为调查员，TA前五次订单可获得该订单的10%作为奖励，邀请越多奖励越多！</Text>
                    </View>
                    <View style={styles.myInvitation_list_title_box}>
                        <Text style={styles.myInvitation_list_title}>已邀请的朋友</Text>
                    </View>
                    <View style={styles.myInvitation_list}>
                        <FlatList
                            ref={flatList => {
                                this.flatList = flatList
                            }}
                            data={this.props.invitationList}
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
                            keyExtractor={(index) => index} />
                    </View>
                    <View style={{ height: Theme.screenInset.bottom }} />
                </View>
            </View>
        )
    }
}

export default MyInvitation