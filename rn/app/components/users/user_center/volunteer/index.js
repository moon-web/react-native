import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Platform } from 'react-native';
import styles from './styles'

export default class UserCenter extends Component {
    constructor() {
        super()
    }

    componentWillMount() {
        this._getPersonalCount()
    }

    //退出登录
    LoginOut() {
        this.props.loginOut()
    }

    // 获取用户任务总计
    _getPersonalCount() {
        if (this.props.getPersonalCount) {
            this.props.getPersonalCount(this.props.userInfo.userId)
        }
    }

    render() {
        let { userInfo, counts } = this.props;
        return (
            <View style={styles.container}>
                <View style={Platform.OS === 'ios' ? styles.statusBar : styles.statusBarAndroid}></View>
                <ScrollView style={styles.content}>
                    <TouchableOpacity style={styles.PersonalInfo} activeOpacity={0.8} onPress={() => this.props.navigation.navigate('ModifyInformation')}>
                        <View style={styles.PersonalInfoData}>
                            <View style={styles.PersonalInfoDataLeft}>
                                <View style={styles.PersonalInfoDataLeftData}>
                                    {
                                        userInfo.type === 4 ? <Text style={styles.PersonalName}>{userInfo.chargeNick ? userInfo.chargeNick : null}</Text> : null
                                    }
                                    {
                                        userInfo.type === 5 ? <Text style={styles.PersonalName}>{userInfo.nickName ? userInfo.nickName : null}</Text> : null
                                    }
                                    {
                                        (userInfo.type === 4 || userInfo.type === 5) && userInfo.checkStatus === 1 ? <Image style={styles.PersonalStatus}
                                            source={require('../../../../../assets/images/statuss.png')}></Image> : null
                                    }
                                    {
                                        (userInfo.type === 4 || userInfo.type === 5) && userInfo.checkStatus === 0 ? <Image style={styles.PersonalStatus}
                                            source={require('../../../../../assets/images/statusf.png')}></Image> : null
                                    }
                                </View>
                                <Text style={styles.PersonalAddress} numberOfLines={1}>{userInfo.address}</Text>
                            </View>
                            <View style={styles.PersonalInfoDataRight}>
                                <Image style={styles.PersonalInfoImg} source={userInfo.headImage ? { uri: userInfo.headImage } : require('../../../../../assets/images/default_avatar.png')}></Image>
                            </View>
                        </View>
                        <View style={styles.PersonalInfoDetail}>
                            <View style={styles.PersonalInfoDetailInfo}>
                                <Text styele={styles.PersonaInfoLook}>查看或编辑用户资料</Text>
                                <Image styele={styles.PersonalInfoDetailInfo_img} source={require('../../../../../assets/images/personald.png')} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.PersonalData_box1}>
                        <View style={[styles.PersonalData_box1_item, styles.PersonalData_box1_item_border]}>
                            <TouchableOpacity style={styles.PersonalData_box1_item} onPress={() => this.props.navigation.navigate('InvestigationList')}>
                                <Image style={styles.PersonalData_box1_img}
                                    source={require('../../../../../assets/images/p_report.png')} />
                                <Text style={styles.PersonalData_box1_tiltle}>调查举报</Text>
                                <Text style={styles.PersonalData_box1_num}>{counts.count1}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.PersonalData_box1_item}>
                            <TouchableOpacity style={styles.PersonalData_box1_item} onPress={() => this.props.navigation.navigate('RewardTask')}>
                                <Image style={styles.PersonalData_box1_img}
                                    source={require('../../../../../assets/images/p_reword.png')} />
                                <Text style={styles.PersonalData_box1_tiltle}>打赏任务</Text>
                                <Text style={styles.PersonalData_box1_num}>{counts.count2}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.PersonalData_box2}>
                        <View style={[styles.PersonalData_box2_item_box, styles.PersonalData_box2_item_box_border_b]}>
                            <View style={[styles.PersonalData_box2_item, styles.PersonalData_box1_item_border]}>
                                <TouchableOpacity style={styles.PersonalData_box2_item_other} onPress={() => this.props.navigation.navigate('UserCenterReport', {
                                    type: 2
                                })}>
                                    <Image style={styles.PersonalData_box2_img}
                                        source={require('../../../../../assets/images/p_underLine.png')} />
                                    <Text style={styles.PersonalData_box2_tiltle}>线下举报</Text>
                                    <Text style={styles.PersonalData_box2_num}>{counts.count4}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.PersonalData_box2_item, styles.PersonalData_box1_item_border]}>
                                <TouchableOpacity style={styles.PersonalData_box2_item_other} onPress={() => this.props.navigation.navigate('UserCenterReport', {
                                    type: 1
                                })}>
                                    <Image style={styles.PersonalData_box2_img}
                                        source={require('../../../../../assets/images/p_onLine.png')} />
                                    <Text style={styles.PersonalData_box2_tiltle}>志愿举报</Text>
                                    <Text style={styles.PersonalData_box2_num}>{counts.count3}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.PersonalData_box2_item}>
                                <TouchableOpacity style={styles.PersonalData_box2_item_other} onPress={() => this.props.navigation.navigate('TaskDetailsInf')}>
                                    <Image style={styles.PersonalData_box2_img}
                                        source={require('../../../../../assets/images/p_task.png')} />
                                    <Text style={styles.PersonalData_box2_tiltle}>我的任务</Text>
                                    <Text style={styles.PersonalData_box2_num}>{counts.count5}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.PersonalData_box2_item_box}>
                            <View style={[styles.PersonalData_box2_item, styles.PersonalData_box1_item_border]}>
                                <TouchableOpacity style={styles.PersonalData_box2_item_other} onPress={() => this.props.navigation.navigate('MyInvitation')}>
                                    <Image style={styles.PersonalData_box2_img}
                                        source={require('../../../../../assets/images/p_invertation.png')} />
                                    <Text style={styles.PersonalData_box2_tiltle}>我的邀请</Text>
                                    <Text style={styles.PersonalData_box2_num}>{counts.count6}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.PersonalData_box2_item, styles.PersonalData_box1_item_border]}>
                                <TouchableOpacity style={styles.PersonalData_box2_item_other} onPress={() => this.props.navigation.navigate('MyCompany')}>
                                    <Image style={styles.PersonalData_box2_img}
                                        source={require('../../../../../assets/images/p_company.png')} />
                                    <Text style={styles.PersonalData_box2_tiltle}>我的公司</Text>
                                    <Text style={styles.PersonalData_box2_num}>{counts.count7}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.PersonalData_box2_item}>
                                <TouchableOpacity style={styles.PersonalData_box2_item_other} onPress={() => this.props.navigation.navigate('Intrgral')}>
                                    <Image style={styles.PersonalData_box2_img}
                                        source={require('../../../../../assets/images/p_integral.png')} />
                                    <Text style={styles.PersonalData_box2_tiltle}>我的积分</Text>
                                    <Text style={styles.PersonalData_box2_num}>{counts.count10}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.PersonalData_box3}>
                        <View style={styles.PersonalData_box3_title_box}>
                            <Image style={styles.PersonalData_box3_title_image}
                                source={require('../../../../../assets/images/p_rewardCenter.png')} />
                            <Text style={styles.PersonalData_box3_title}>奖励中心</Text>
                        </View>
                        <View style={styles.PersonalData_box3_item_box}>
                            <TouchableOpacity style={[styles.PersonalData_box3_item, styles.PersonalData_box1_item_border]} onPress={() => this.props.navigation.navigate('TotalReward')}>
                                <Text style={styles.PersonalData_box3_money}>{counts.count8}</Text>
                                <View style={styles.PersonalData_box3_money_data}>
                                    <View style={styles.PersonalData_box3_money_data_describe}>
                                        <Text style={styles.PersonalData_box3_text}>累计奖励（元）</Text>
                                        <Text style={styles.PersonalData_box3_text_total}>查看收支明细</Text>
                                    </View>
                                    <Image style={styles.PersonalData_box3_money_data_img} source={require('../../../../../assets/images/personald.png')} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.PersonalData_box3_item} onPress={() => this.props.navigation.navigate('ChangeReward')}>
                                <Text style={styles.PersonalData_box3_money}>{counts.count9}</Text>
                                <View style={styles.PersonalData_box3_money_data}>
                                    <View style={styles.PersonalData_box3_money_data_describe}>
                                        <Text style={styles.PersonalData_box3_text}>可申请奖励（元）</Text>
                                        <Text style={styles.PersonalData_box3_text_active}>查看收支明细</Text>
                                    </View>
                                    <Image style={styles.PersonalData_box3_money_data_img} source={require('../../../../../assets/images/personald.png')} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.PersonalOrdinary_box1}>
                        <View style={styles.PersonalOrdinary_box1_item}>
                            <TouchableOpacity onPress={this.LoginOut.bind(this)}>
                                <View style={styles.PersonalOrdinary_box1_item_box_loginout}>
                                    <Text style={styles.PersonalOrdinary_box1_item_box_title}>退出登录</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
