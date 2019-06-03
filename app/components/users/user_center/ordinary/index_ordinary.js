import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Platform } from 'react-native';
import styles from './styles'

export default class UserCenter extends Component {
    constructor(props) {
        super(props)
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
        if(this.props.getPersonalCount) {
            this.props.getPersonalCount(this.props.userInfo.userId)
        }
    }

    render() {
        let {userInfo, counts} = this.props;
        return (
            <View style={styles.container}>
                <View style={Platform.OS === 'ios' ? styles.statusBar : styles.statusBarAndroid}></View>
                <ScrollView style={styles.content}>
                    <TouchableOpacity activeOpacity={0.8}
                                      onPress={() => this.props.navigation.navigate('ModifyInformation')}>
                        <View style={styles.PersonalInfo}>
                            <View style={styles.PersonalInfoData}>
                                <View style={styles.PersonalInfoDataLeft}>
                                    <View style={styles.PersonalInfoDataLeftData}>
                                        <Text style={styles.PersonalName}>{userInfo.nickName}</Text>
                                        {
                                            (userInfo.type === 4 || userInfo.type === 5) && userInfo.checkStatus === 0 ?
                                                <Image style={styles.PersonalStatus}
                                                       source={require('../../../../../assets/images/statusf.png')}></Image> :
                                                <Text></Text>
                                        }
                                    </View>
                                    <Text style={styles.PersonalAddress} numberOfLines={1}>{userInfo.address}</Text>
                                </View>
                                <View style={styles.PersonalInfoDataRight}>
                                    <Image style={styles.PersonalInfoImg}
                                           source={userInfo.headImage ? {uri: userInfo.headImage} : require('../../../../../assets/images/default_avatar.png')}></Image>
                                </View>
                            </View>
                            <View style={styles.PersonalInfoDetail}>
                                <View style={styles.PersonalInfoDetailInfo}>
                                    <Text styele={styles.PersonaInfoLook}>查看或编辑用户资料</Text>
                                    <Image styele={styles.PersonalInfoDetailInfo_img}
                                           source={require('../../../../../assets/images/personald.png')}/>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.PersonalOrdinary_box}>
                        <View style={styles.PersonalOrdinary_box1}>
                            <View style={styles.PersonalOrdinary_box1_item}>
                                <Image style={styles.PersonalOrdinary_box1_item_image}
                                       source={require('../../../../../assets/images/p_underLine.png')}/>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('UserCenterReport', {
                                    type: 2
                                })}>
                                    <View
                                        style={[styles.PersonalOrdinary_box1_item_box, styles.PersonalOrdinary_box1_item_box_border]}>
                                        <Text style={styles.PersonalOrdinary_box1_item_box_title}>线下举报</Text>
                                        <View style={styles.PersonalOrdinary_box1_item_num_box}>
                                            <Text
                                                style={styles.PersonalOrdinary_box1_item_box_num}>{counts.count4}</Text>
                                            <Image style={styles.PersonalOrdinary_box1_item_image}
                                                   source={require('../../../../../assets/images/personald.png')}/>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.PersonalOrdinary_box1_item}>
                                <Image style={styles.PersonalOrdinary_box1_item_image}
                                       source={require('../../../../../assets/images/p_onLine.png')}/>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('UserCenterReport', {
                                    type: 1
                                })}>
                                    <View
                                        style={[styles.PersonalOrdinary_box1_item_box, styles.PersonalOrdinary_box1_item_box_border]}>
                                        <Text style={styles.PersonalOrdinary_box1_item_box_title}>志愿举报</Text>
                                        <View style={styles.PersonalOrdinary_box1_item_num_box}>
                                            <Text
                                                style={styles.PersonalOrdinary_box1_item_box_num}>{counts.count3}</Text>
                                            <Image style={styles.PersonalOrdinary_box1_item_image}
                                                   source={require('../../../../../assets/images/personald.png')}/>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.PersonalOrdinary_box1_item}>
                                <Image style={styles.PersonalOrdinary_box1_item_image}
                                       source={require('../../../../../assets/images/p_task.png')}/>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('TaskDetailsInf')}>
                                    <View style={styles.PersonalOrdinary_box1_item_box}>
                                        <Text style={styles.PersonalOrdinary_box1_item_box_title}>我的任务</Text>
                                        <View style={styles.PersonalOrdinary_box1_item_num_box}>
                                            <Text style={styles.PersonalOrdinary_box1_item_box_num_more}>查看更多</Text>
                                            <Image style={styles.PersonalOrdinary_box1_item_image}
                                                   source={require('../../../../../assets/images/personald.png')}/>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.PersonalOrdinary_box1}>
                            <View style={styles.PersonalOrdinary_box1_item}>
                                <Image style={styles.PersonalOrdinary_box1_item_image}
                                       source={require('../../../../../assets/images/p_integral.png')}/>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Intrgral')}>
                                    <View style={styles.PersonalOrdinary_box1_item_box}>
                                        <Text style={styles.PersonalOrdinary_box1_item_box_title}>我的积分</Text>
                                        <View style={styles.PersonalOrdinary_box1_item_num_box}>
                                            <Text
                                                style={styles.PersonalOrdinary_box1_item_box_num}>{counts.count10}</Text>
                                            <Image style={styles.PersonalOrdinary_box1_item_image}
                                                   source={require('../../../../../assets/images/personald.png')}/>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.PersonalOrdinary_box1}>
                            <View style={styles.PersonalOrdinary_box1_item}>
                                <Image style={styles.PersonalOrdinary_box1_item_image}
                                       source={require('../../../../../assets/images/p_set.png')}/>
                                <View style={styles.PersonalOrdinary_box1_item_box}>
                                    <Text style={styles.PersonalOrdinary_box1_item_box_title}>我的设置</Text>
                                    <View style={styles.PersonalOrdinary_box1_item_num_box}>
                                        <Image style={styles.PersonalOrdinary_box1_item_image}
                                               source={require('../../../../../assets/images/personald.png')}/>
                                    </View>
                                </View>
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
                    </View>
                </ScrollView>
            </View>
        );
    }
}