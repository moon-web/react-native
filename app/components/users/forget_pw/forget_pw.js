import React, {Component} from 'react'
import { View, Text, Image, TouchableOpacity} from 'react-native'
import Container from '../../common/container/index'
import MyInput from '../../common/extends/myInput'
import API from '../../../utils/index'
import styles from './styles'
import { Toast } from 'teaset'
class ForgetPw extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mobile: '',
            code: '',
            password: '',
            protocol: false,
            codeText: '获取验证码',
            count: 60,
            eyes: true,
            secureTextEntry: true,//密码框还是input
            changepwBtag: false,//下一步颜色
            ChangeBtag: false,//确定颜色
            Step: true,
            checkId:'',
            hasFlag: true
        }
    }
    //手机号失去焦点
    mobileBlur = () => {
        let myreg = /^(0|86|17951)?(13[0-9]|14[5-9]|15[012356789]|16[56]|17[0-8]|18[0-9]|19[189])[0-9]{8}$/;
        if (!myreg.test(this.state.mobile)) {
            Toast.info('请输入正确的手机号!')
        } else {
            return true;
        }
    }
    //密码失去焦点
    passwordBlur = () => {
        let myreg = /^\w{6,18}$/;
        if (!myreg.test(this.state.password)) {
            Toast.info('请输入6-18的数字，字符或字符串!')
        } else {
            return true;
        }
    }
    //显示小眼睛
    changeEyes = () => {
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

    //获取验证码
    getCode = () => {
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
                API.forget_identifying({mobile: mobile}).then(res => {
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

    //下一步
    NextStep = () => {
        if(this.state.mobile === '' || this.state.mobile === undefined){
            Toast.info('请输入手机号')
        }else if(this.state.code === '' || this.state.code === undefined){
            Toast.info('请输入验证码')
        }else {
            let data = {
                mobile: this.state.mobile,
                code: this.state.code
            }
            let _this = this
            this.props.ForgetCode(data, () => {
                _this.setState({
                    Step: false
                })
            })
        }
    }
    //确定修改密码
    SureChange = () => {
        if(this.state.password === '' || this.state.password === undefined){
            Toast.info('请输入密码')
        }else {
            let registerData = {
                mobile: this.state.mobile,
                code: this.state.code,
                password: this.state.password,
                checkId: this.props.checkId,
            }
            this.props.ForgetPw(registerData)
        }
    }

    render() {
        let { hasFlag, count } = this.state;
        return (
            <Container scrollViewProps={{style: styles.container}}>
                {
                    this.state.Step ?
                        <View>
                            <Text style={styles.changepw_title}>请输入手机号码</Text>
                            <View style={styles.changepw_box}>
                                <View style={styles.changepw_item}>
                                    <Text style={styles.changepw_item_title}>手机号码</Text>
                                    <View style={styles.changepw_item_box}>
                                        <Text style={styles.changepw_item_number}>中国 +86</Text>
                                        <MyInput
                                                   onChangeText={(text) => {
                                                       this.setState({mobile: text})
                                                   }}
                                                   onFocus={() => {
                                                       this.setState({changepwBtag: true})
                                                   }}
                                                   onBlur={this.mobileBlur}
                                                   style={styles.changepw_item_input}
                                                   multiline={false}
                                                   keyboardType="numeric"/>
                                    </View>
                                </View>
                                <View style={styles.changepw_item}>
                                    <Text style={styles.changepw_item_title}>验证码</Text>
                                    <View style={styles.changepw_item_box}>
                                        <MyInput placeholder='请输入手机验证码'
                                                   onChangeText={(text) => {
                                                       this.setState({code: text})
                                                   }}
                                                   style={styles.changepw_item_input}
                                                   multiline={false}
                                                   keyboardType="numeric"/>
                                        {
                                            hasFlag
                                            ? (
                                                <TouchableOpacity onPress={this.getCode}>
                                                    <Text style={[styles.changepw_item_number, styles.changepw_item_code]}>发送验证码</Text>
                                                </TouchableOpacity>
                                            )
                                            : <Text style={[styles.changepw_item_number, styles.changepw_item_code]}>{`${count}秒后重发`}</Text>
                                        }
                                    </View>
                                </View>
                                <View style={styles.changepw_changepw}>
                                    {
                                        this.state.changepwBtag ?
                                            <TouchableOpacity onPress={this.NextStep}>
                                                <Text style={styles.changepw_changepw_btn}>下一步</Text>
                                            </TouchableOpacity> :
                                            <Text style={styles.changepw_changepw_btn_other}>下一步</Text>
                                    }
                                </View>
                            </View>
                        </View> :
                        <View>
                            <Text style={styles.changepw_title}>请设置密码</Text>
                            <Text style={styles.changepw_title_other}>您的新密码至少需要6-18的数字，字符或字符串</Text>
                            <View style={[styles.changepw_box, styles.changepw_box_other]}>
                                <View style={styles.changepw_item}>
                                    <Text style={styles.changepw_item_title}>设置密码</Text>
                                    <View style={styles.changepw_item_box}>
                                        <MyInput placeholder='请设置您的密码'
                                                   onChangeText={(text) => {
                                                       this.setState({password: text})
                                                   }}
                                                   onFocus={() => {
                                                       this.setState({ChangeBtag: true})
                                                   }}
                                                   onBlur={this.passwordBlur}
                                                   style={styles.changepw_item_input}
                                                   multiline={false}
                                                   secureTextEntry={this.state.secureTextEntry}
                                                   />
                                        <TouchableOpacity onPress={this.changeEyes}>
                                            {
                                                this.state.eyes ? <Image style={styles.passwordEyes}
                                                                         source={require('../../../../assets/images/close_eyes.png')}/> :
                                                    <Image style={styles.passwordEyes}
                                                           source={require('../../../../assets/images/open_eyes.png')}/>
                                            }
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.changepw_changepw}>
                                    {
                                        this.state.ChangeBtag ?
                                            <TouchableOpacity onPress={this.SureChange}>
                                                <Text style={styles.changepw_changepw_btn}>确定</Text>
                                            </TouchableOpacity> :
                                            <Text style={styles.changepw_changepw_btn_other}>确定</Text>
                                    }
                                </View>
                            </View>
                        </View>
                }

            </Container>
        )
    }
}

export default ForgetPw
