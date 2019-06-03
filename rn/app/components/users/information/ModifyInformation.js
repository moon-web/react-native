import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Toast } from 'teaset'
import RadioGroup from 'react-native-radio-buttons-group';
import Container from '../../common/container/index'
import MyInput from '../../common/extends/myInput'
import styles from './styles'
import { uploadImag } from '../../../utils/util'

class ModifyInformation extends Component {
    static navigationOptions = ({ navigation }) => {
        let that = this;
        return {
            headerRight: (
                <TouchableOpacity onPress={navigation.getParam('submits')} activeOpacity={0.5}>
                    <Text style={styles.goback}>
                        保存
                    </Text>
                </TouchableOpacity>
            ),
        };

    }

    constructor(props) {
        super(props)
        this.state = {
            userInfo: {},
            userId: '',
            nickName: '',//昵称
            address: '',
            currentAddress: '',
            idNo: '',
            radio: [
                {
                    label: '身份证',
                    color: '#ccc',
                    num: 1,
                    selected: true
                },
                {
                    label: '护照',
                    color: '#ccc',
                    num: 2,
                    selected: false
                },

            ],
            sexNum: [
                { 
                    label: '男', 
                    num: 1, 
                    color: '#ccc', 
                    selected: true 
                }, 
                { 
                    label: '女', 
                    num: 2, 
                    color: '#ccc', 
                    selected: false 
                }
            ],
        }
    }
    
    componentDidMount() {
        this.props.navigation.setParams({ submits: this._submits });
    }

    // 提交用户信息
    _submits = () => {
        let { idNo, nickName, address, userId, userInfo, currentAddress } = this.state;
        if (idNo === '' || idNo === undefined) {
            Toast.message('请输入证件号码')
        } else if (nickName === '' || nickName === undefined) {
            Toast.message('请输入昵称')
        } else if (address === '' || address === undefined) {
            Toast.message('请输入您的具体地址信息')
        } else if (userInfo.headImage === '' || userInfo.headImage === undefined) {
            Toast.message('请上传头像')
        } else {
            let data = {
                userId: userId,
                headImage: userInfo.headImage,
                idNo: idNo,
                idType: userInfo.idType,
                nickName: nickName,
                sex: userInfo.sex,
                address: address
            }
            this.props.updateUserInfo(data)
        }

    };

    componentWillMount() {
        this._initState()
    }

    // 初始化state
    _initState() {
        let _this = this,
            userInfo = this.props.userInfo;
        let { sex, idType } = userInfo;
        let { sexNum, radio } = _this.state;
        if (sex === '' || sex === 'undefined' || sex === null) {
            sexNum.map((v) => {
                v.selected = false;
            })
            sexNum[0].selected = true;
        } else {
            sexNum.map((v) => {
                v.selected = false;
                if (v.num == sex) {
                    v.selected = true
                }
            })
        }
        if (idType === '' || idType === undefined || idType === null) {
            radio.map((v) => {
                v.selected = false;
            })
            radio[0].selected = true;
        } else {
            radio.map((v) => {
                v.selected = false;
                if (v.num == idType) {
                    v.selected = true
                }
            })
        }
        _this.setState({
            userInfo: userInfo,
            userId: userInfo.userId,
            nickName: userInfo.nickName,
            address: userInfo.address || userInfo.detailAddress,
            currentAddress: userInfo.currentAddress,
            idNo: userInfo.idNo,
            sexNum: sexNum,
            radio: radio
        })
    }

    // 选择证件类型
    onPress(data) {
        let userInfo = this.state.userInfo;
        for (let i = 0; i < data.length; i++) {
            if (data[i].selected === true) {
                userInfo.idType = data[i].num
                this.setState({
                    userInfo: userInfo,
                    idNo: ''
                })
            }
        }
    }

    // 选择性别
    onPresssex(data) {
        let userInfo = this.state.userInfo;
        for (let i = 0; i < data.length; i++) {
            if (data[i].selected === true) {
                userInfo.sex = data[i].num
                this.setState({
                    userInfo: userInfo
                })
            }
        }
    }

    // 校验身份证或护照号
    checkAccount() {
        let reg = null,
            msg = '';
        if (this.state.userInfo.idType == 1) {
            reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            msg = '请输入正确的身份证号码';
        } else {
            reg = /^1[45][0-9]{7}|G[0-9]{8}|P[0-9]{7}|S[0-9]{7,8}|D[0-9]+$/;
            msg = '请输入正确的护照号码';
        }
        if (reg.test(this.state.idNo)) {
            return true;
        } else {
            Toast.message(msg)
        }
    }

    // 上传图片
    selectPhotoTapped() {
        let userInfo = this.state.userInfo;
        uploadImag((res)=>{
            userInfo.headImage = res.msgCode;
            this.setState({
                userInfo
            })
        })
    }

    render() {
        return (
            <Container scrollViewProps={{style: styles.container }}>
                <ScrollView>
                    <View style={styles.Modifyinformation}>
                        <Text style={styles.Modifyinformation_Title}>头像</Text>
                        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)} activeOpacity={0.5}>
                            <View style={styles.Modifyinformation_imgwrapper}>
                                <Image style={styles.Modifyinformation_imgwrapperimg} source={this.state.userInfo.headImage ? { uri: this.state.userInfo.headImage } : require('../../../../assets/images/default_avatar.png')} />
                                <Image style={styles.Modifyinformation_imgwrappernext} source={require('../../../../assets/images/reportextend.png')} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.Modifyinformation_inf}>
                        <View style={styles.Modifyinformation_infinput}>
                            <Text style={styles.Modifyinformation_nickName}>昵称</Text>
                            <MyInput placeholder='请输入昵称' onChangeText={(text) => { this.setState({ nickName: text }) }} style={styles.Inputs} multiline={false} value={this.state.nickName} />
                        </View>
                        <View style={styles.Modifyinformation_infinput}>
                            <Text style={styles.Modifyinformation_nickName}>证件类型</Text>
                            <RadioGroup radioButtons={this.state.radio} onPress={this.onPress.bind(this)} style={styles.radioGroups} flexDirection='row' size={26} />
                        </View>
                        <View style={styles.Modifyinformation_infinput}>
                            <Text style={styles.Modifyinformation_nickName}>证件号</Text>
                            <MyInput placeholder={this.state.userInfo.idType === 1 ? '请输入身份证号' : '请输入证件号码'} onChangeText={(text) => this.setState({ idNo: text })} onBlur={this.checkAccount.bind(this)} style={styles.Inputs} multiline={false} value={this.state.idNo} />
                        </View>
                        <View style={styles.Modifyinformation_infinput}>
                            <Text style={styles.Modifyinformation_nickName}>性别</Text>
                            <RadioGroup radioButtons={this.state.sexNum} onPress={this.onPresssex.bind(this)} style={styles.radioGroups} flexDirection='row' size={26} />
                        </View>
                        <View style={styles.Modifyinformation_infinput}>
                            <Text style={styles.Modifyinformation_nickName}>所在地</Text>
                            <Image style={styles.img} source={require('../../../../assets/images/reward_iconaddress.png')} />
                            <MyInput placeholder='请输入所在地' onChangeText={(text) => { this.setState({ address: text }) }} style={styles.Inputs} multiline={false} value={this.state.address} />
                        </View>
                    </View>
                </ScrollView>
            </Container>
        );
    }
}
export default ModifyInformation
