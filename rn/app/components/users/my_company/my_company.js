import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, ActivityIndicator, FlatList} from 'react-native'
import styles from './styles'
import { Toast, Overlay } from 'teaset'
import Item from './common/item'
import AddModal from './common/add_modal'
import EditModal from './common/edit_modal'
import { ScreenUtil } from '../../../utils/util'
class MyCompany extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isRefresh:false,
            userName: '',
            nickName: '',
            password: '',
            mobile: '',
            editName:'',
            editNickName:'',
            editMoblie:'',
            editPassword:''
        }
        this.customKey = null;
    }

    componentWillMount() {
        let {userInfo} = this.props
        let data = {
            companyId: userInfo.userId,
            pageNo:1
        }
        this._showLoading()
        this.props.CompanyMemberList(data,[],this._hideLoading.bind(this))

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
                    this.props.companyMemberList.length > 0
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
                <Item data={item}
                      removeCompanyMember = {(id) => this.removeCompanyMember(id)}
                      editCompanyMember = {(id,username,nickName,mobile) => this._editCompanyMember(id,username,nickName,mobile)}
                />
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
        let {userInfo} = this.props
        let data = {
            companyId: userInfo.userId,
            pageNo:1
        }
        this._showLoading()
        this.props.CompanyMemberList(data,[],this._hideLoading.bind(this))
    };

    /**
     * 加载更多
     * @private
     */
    _onLoadMore() {
        let { isFetching, total, pageNo ,companyMemberList} = this.props;
        pageNo += 1;
        if (pageNo > total) {
            return
        } else if (pageNo > 1 && !isFetching) {
            this._showLoading()
            let {userInfo} = this.props
            let data = {
                companyId: userInfo.userId,
                pageNo:pageNo
            }
            this.props.CompanyMemberList(data,companyMemberList,this._hideLoading.bind(this))
        }
    }

    //新增公司成员modal
    _addCompanyNumber() {
        let overlayView = (
            <Overlay.PullView side='bottom' modal={false}
                              ref={v => this.overlayView = v}>
                <AddModal
                    closeModal={() => this.overlayView && this.overlayView.close()}
                    addCompanyMember = {() => this.addCompanyMember()}
                    UserName = {(value) => this.setState({userName:value})}
                    NickName = {(value) => this.setState({nickName:value})}
                    Mobile = {(value) => this.setState({mobile:value})}
                    PassWord = {(value) => this.setState({password:value})}
                ></AddModal>
            </Overlay.PullView>
        );
        Overlay.show(overlayView);
    }

    //新增公司成员接口
    addCompanyMember(){
        let { userInfo } = this.props
        let data = {
            userId:userInfo.userId,
            userName: this.state.userName,
            nickName: this.state.nickName,
            mobile: this.state.mobile,
            password: this.state.password,
        }
        this.props.CompnayMemberAdd(data,() => {
            let datas = {
                companyId: userInfo.userId,
                pageNo:1,
            }
            this.overlayView && this.overlayView.close()
            this._showLoading()
            this.props.CompanyMemberList(datas,[],this._hideLoading.bind(this))
        })
    }

    //删除公司成员
    removeCompanyMember(id){
        let { userInfo } = this.props
        let data = {
            userId:id
        }
        this.props.CompanyMemberDel(data,() => {
            let datas = {
                companyId: userInfo.userId,
                pageNo:1,
            }
            this._showLoading()
            this.props.CompanyMemberList(datas,[],this._hideLoading.bind(this))
        })
    }

    //编辑公司成员modal
    _editCompanyMember(id,username,nickName,mobile){
        let overlayView = (
            <Overlay.PullView side='bottom' modal={false}
                              ref={v => this.overlayView = v}>
                <EditModal
                    closeModal={() => this.overlayView && this.overlayView.close()}
                    editCompany = {() => this.editCompanyMember(id)}
                    UserName = {(value) => this.setState({editName:value})}
                    NickName = {(value) => this.setState({editNickName:value})}
                    Mobile = {(value) => this.setState({editMoblie:value})}
                    PassWord = {(value) => this.setState({editPassword:value})}
                    userName={username}
                    nickName={nickName}
                    mobile={mobile}
                ></EditModal>
            </Overlay.PullView>
        );
        Overlay.show(overlayView);
    }
    //确定编辑
    editCompanyMember(id){
        let { userInfo } = this.props
        let data = {
            userId:id,
            userName: this.state.editName,
            nickName: this.state.editNickName,
            mobile: this.state.editMoblie,
            password: this.state.editPassword,
        }
        this.props.ComapnyMemberEdit(data,() => {
            let datas = {
                companyId: userInfo.userId,
                pageNo:1,
            }
            this.overlayView && this.overlayView.close()
            this._showLoading()
            this.props.CompanyMemberList(datas,[],this._hideLoading.bind(this))
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.company_top}>
                    <Text style={styles.company_top_text}>我的公司</Text>
                </View>
                <View style={styles.company_list}>
                    <FlatList
                        ref={flatList => { this.flatList = flatList }}
                        data={this.props.companyMemberList}
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
                        keyExtractor={(index) => index} />
                </View>
                <View style={styles.company_add_btn_box}>
                    <TouchableOpacity style={styles.company_add_btn} onPress={this._addCompanyNumber.bind(this)}>
                        <View style={styles.company_add_btn}>
                            <Image style={styles.company_add_img}
                                   source={require('../../../../assets/images/my_company_add.png')}></Image>
                            <Text style={styles.company_add_text}>新增公司成员</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default MyCompany