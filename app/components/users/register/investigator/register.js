import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native'
import styles from './styles'
import Container from '../../../common/container/index'
import MyInput from '../../../common/extends/myInput'
import API from '../../../../utils/index'
import {Toast} from 'teaset'
import Picker from 'react-native-picker';
// 读取本地地区json文件
import area from '../../../common/area.json';

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mobile: '',//手机
            code: '',//验证码
            password: '',//密码
            address: '',//居住地址
            detailAddress: '',//详细地址
            experience: '',//调查经验时间,
            checkId:'',//验证验证码id
            protocol: false,
            codeText: '获取验证码',
            count: 60,
            eyes: true,
            secureTextEntry: true,//密码框还是input
            registerBtag: false,//注册颜色
            nextStep: true,
            hasFlag: true
        }
    }

    //获取验证码
    _getCode = () => {
        let { hasFlag, mobile } = this.state;
        let myreg=/^(0|86|17951)?(13[0-9]|14[5-9]|15[012356789]|16[56]|17[0-8]|18[0-9]|19[189])[0-9]{8}$/;
        if (!myreg.test(mobile)){
            Toast.info('请输入正确的手机号');
            return;
        }
        if (hasFlag) {
            this.setState({
                hasFlag: false
            }, () => {
                API.register_identifying({mobile: mobile}).then(res => {
                    if (res.success) {
                        this.timer = setInterval(()=>{
                            let count = this.state.count;
                            count--;
                            if(count < 0){
                                clearInterval(this.timer);
                                this.setState({
                                    hasFlag: true,
                                    count: 60
                                })
                            } else {
                                this.setState({
                                    count: count
                                })
                            }
                        },1000)
                    } else {
                        Toast.fail(res.msg)
                        this.setState({
                            hasFlag: true
                        })
                    }
                })
            })
        }
    }
    //手机号失去焦点
    _mobileBlur = () => {
        let myreg = /^(0|86|17951)?(13[0-9]|14[5-9]|15[012356789]|16[56]|17[0-8]|18[0-9]|19[189])[0-9]{8}$/;
        if (!myreg.test(this.state.mobile)) {
            Toast.info('请输入正确的手机号')
        }else if(this.state.mobile != this.props.navigation.state.params.mobile){
            Toast.info('输入的手机号与被邀请手机号不一致，重新输入')
        } else {
            return true;
        }
    }
    //密码失去焦点
    _passwordBlur = () => {
        let myreg = /^\w{6,18}$/;
        if (!myreg.test(this.state.password)) {
            Toast.info('请输入6-18的数字，字符或字符串')
        } else {
            return true;
        }
    }
    //显示小眼睛
    _changeEyes = () => {
        if (this.state.eyes) {
            this.setState({
                eyes: false,
                secureTextEntry: false
            })
        } else {
            this.setState({
                eyes: true,
                secureTextEntry: true
            })
        }
    }
    //下一步
    _NextStep = () => {
        if (!this.state.mobile) {
            Toast.info('请输入手机号')
            return;
        }
        if (!this.state.password) {
            Toast.info('请输入密码')
            return
        }
        if (!this.state.code) {
            Toast.info('请输入验证码')
            return
        }
        let data = {
            mobile: this.state.mobile,
            code: this.state.code
        }
        API.register_code(data).then(res => {
            if (res.success === true) {
                let id = res.dataObject;
                this.setState({
                    nextStep: false,
                    registerBtag: false,
                    checkId: id,
                })
            } else {
                Toast.fail(res.msg)
            }
        })
    }
    //注册协议
    _protocolCheck = () => {
        if (this.state.protocol) {
            this.setState({
                protocol: false
            })
        } else {
            this.setState({
                protocol: true
            })
        }
    }

    //居住地
    _createAreaData() {
        let data = [];
        let len = area.length;
        for (let i = 0; i < len; i++) {
            let city = [];
            for (let j = 0, cityLen = area[i]['city'].length; j < cityLen; j++) {
                let _city = {};
                _city[area[i]['city'][j]['name']] = area[i]['city'][j]['area'];
                city.push(_city);
            }
            let _data = {};
            _data[area[i]['name']] = city;
            data.push(_data);
        }
        return data;
    }

    _showAreaPicker() {
        Picker.init({
            pickerData: this._createAreaData(),
            selectedValue: ['北京', '北京', '东城区'],
            onPickerConfirm: pickedValue => {
                this.setState({
                    address: pickedValue
                })
            },
            onPickerCancel: pickedValue => {
                this.setState({
                    address: ''
                })
            },
            onPickerSelect: pickedValue => {
                this.setState({
                    address: ''
                })
            }
        });
        Picker.show();
    }

    //调查经验
    _showExperiencePicker() {
        let ExperienceData = ['2年内','3-5年','6年以上']
        Picker.init({
            pickerData: ExperienceData,
            selectedValue: ['2年内'],
            onPickerConfirm: pickedValue => {
                this.setState({
                    experience: pickedValue
                })
            },
            onPickerCancel: pickedValue => {
                this.setState({
                    experience: ''
                })
            },
            onPickerSelect: pickedValue => {
                this.setState({
                    experience: ''
                })
            }
        });
        Picker.show();
    }

    //注册
    _Register = () => {
        let parentId = this.props.navigation.state.params.parentId
        if (this.state.protocol) {
            let registerData = {
                mobile: this.state.mobile,
                password: this.state.password,
                code: this.state.code,
                checkId: this.state.checkId,
                parentId: parentId,//邀请人id
                name: this.state.name,//真实姓名
                nickName: this.state.nickName,//昵称
                address: this.state.address,//地址
                detailAddress: this.state.detailAddress,//详细地址
                experience: this.state.experience,//调查经验时间
                type: 5,//调查员
            }
            API.register(registerData).then(res => {
                if (res.success === true) {
                    this.props.navigation.navigate('RegisterSuccess')
                } else {
                    Toast.fail(res.msg)
                }
            })

        } else {
            Toast.fail('请先同意注册协议')
        }
    }

    _reigsterFirst() {
        let { hasFlag, count } = this.state;
        return (
            <View style={styles.register_box}>
                <View style={styles.register_item}>
                    <Text style={styles.register_item_title}>手机号码</Text>
                    <View style={styles.register_item_box}>
                        <Text style={styles.register_item_number}>中国 +86</Text>
                        <MyInput placeholder='请输入手机号'
                                   onChangeText={(text) => {
                                       this.setState({mobile: text})
                                   }}
                                   onFocus={() => {
                                       this.setState({registerBtag: true})
                                   }}
                                   onBlur={this._mobileBlur}
                                   style={styles.register_item_input}
                                   multiline={false}
                                   keyboardType="numeric"/>
                    </View>
                </View>
                <View style={styles.register_item}>
                    <Text style={styles.register_item_title}>验证码</Text>
                    <View style={styles.register_item_box}>
                        <MyInput placeholder='请输入手机验证码'
                                   onChangeText={(text) => {
                                       this.setState({code: text})
                                   }}
                                   style={styles.register_item_input}
                                   multiline={false}
                                   keyboardType="numeric"/>
                        {
                            hasFlag
                            ? (
                                <TouchableOpacity onPress={this._getCode}>
                                    <Text style={[styles.register_item_number, styles.register_item_code]}>发送验证码</Text>
                                </TouchableOpacity>
                            )
                            : <Text style={[styles.register_item_number, styles.register_item_code]}>{`${count}秒后重发`}</Text>
                        }
                    </View>
                </View>
                <View style={styles.register_item}>
                    <Text style={styles.register_item_title}>设置密码</Text>
                    <View style={styles.register_item_box}>
                        <MyInput placeholder='请设置您的密码'
                                   onChangeText={(text) => {
                                       this.setState({password: text})
                                   }}
                                   onBlur={this._passwordBlur}
                                   style={styles.register_item_input}
                                   multiline={false}
                                   secureTextEntry={this.state.secureTextEntry}
                                   />
                        <TouchableOpacity onPress={this._changeEyes}>
                            {
                                this.state.eyes ? <Image style={styles.passwordEyes}
                                                         source={require('../../../../../assets/images/close_eyes.png')}/> :
                                    <Image style={styles.passwordEyes}
                                           source={require('../../../../../assets/images/open_eyes.png')}/>
                            }
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.register_register}>
                    {
                        this.state.registerBtag ?
                            <TouchableOpacity onPress={this._NextStep} style={styles.register_register_btn}>
                                <Text style={styles.register_register_btn_text}>下一步</Text>
                            </TouchableOpacity> : <View style={styles.register_register_btn_other}>
                                <Text style={styles.register_register_btn_text}>下一步</Text>
                            </View>
                    }
                </View>
            </View>
        )
    }

    _reigsterNext() {
        return (
            <View style={styles.register_box}>
                <View style={styles.register_item}>
                    <Text style={styles.register_item_title}>您的真实姓名</Text>
                    <View style={styles.register_item_box}>
                        <MyInput placeholder='请输入您的真实姓名'
                                   onChangeText={(text) => {
                                       this.setState({name: text})
                                   }}
                                   onFocus={() => {
                                       this.setState({registerBtag: true})
                                   }}
                                   style={styles.register_item_input}
                                   multiline={false}
                                   />
                    </View>
                </View>
                <View style={styles.register_item}>
                    <Text style={styles.register_item_title}>您的昵称</Text>
                    <View style={styles.register_item_box}>
                        <MyInput placeholder='请输入您的昵称'
                                   onChangeText={(text) => {
                                       this.setState({nickName: text})
                                   }}
                                   style={styles.register_item_input}
                                   multiline={false}
                                   />
                    </View>
                </View>
                <View style={styles.register_item}>
                    <Text style={styles.register_item_title}>居住地址</Text>
                    <TouchableOpacity style={styles.register_item_box} onPress={this._showAreaPicker.bind(this)}>
                        <MyInput placeholder='请输入地区信息'
                                   value={this.state.address}
                                   style={styles.register_item_input}
                                   multiline={false}
                                //    editable={false}
                                   />
                        <Image style={styles.passwordEyes}
                               source={require('../../../../../assets/images/address.png')}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.register_item}>
                    <Text style={styles.register_item_title}>详细地址</Text>
                    <View style={styles.register_item_box}>
                        <MyInput placeholder='请输入街道门牌信息'
                                   onChangeText={(text) => {
                                       this.setState({detailAddress: text})
                                   }}
                                   style={styles.register_item_input}
                                   multiline={false}
                                   />
                    </View>
                </View>
                <View style={styles.register_item}>
                    <Text style={styles.register_item_title}>调查经验</Text>
                    <TouchableOpacity style={styles.register_item_box} onPress={this._showExperiencePicker.bind(this)}>
                        <MyInput placeholder='请输入从事经验时间'
                                   value={this.state.experience}
                                   style={styles.register_item_input}
                                   multiline={false}
                                //    editable={false}
                                   />
                        <Image style={styles.passwordEyes} source={require('../../../../../assets/images/time.png')}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.register_item_protocol}>
                    <TouchableOpacity onPress={this._protocolCheck}>
                        {
                            this.state.protocol ?
                                <Image source={require('../../../../../assets/images/checkbox_true.png')}/> :
                                <Image source={require('../../../../../assets/images/checkbox_false.png')}/>
                        }
                    </TouchableOpacity>
                    <View style={styles.register_item_protocol_con}>
                        <Text style={styles.register_item_protocol_title}>使用IP公社表示同意协议：</Text>
                        <Text style={styles.register_item_protocol_pro}>《IP公社-注册协议》</Text>
                    </View>
                </View>
                <View style={styles.register_register}>
                    {
                        this.state.registerBtag ?
                            <TouchableOpacity onPress={this._Register} style={styles.register_register_btn}>
                                <Text style={styles.register_register_btn_text}>注册</Text>
                            </TouchableOpacity> : <View style={styles.register_register_btn_other}>
                                <Text style={styles.register_register_btn_text}>注册</Text>
                            </View>
                    }
                </View>
            </View>
        )
    }

    render() {
        return (
            <Container scrollViewProps={{style: styles.container}}>
                <ScrollView>
                    <Text style={styles.register_title}>调查员注册</Text>
                    {
                        this.state.nextStep === true ? this._reigsterFirst() : this._reigsterNext()
                    }
                </ScrollView>
            </Container>
        )
    }
}

export default Register
