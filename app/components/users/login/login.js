import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import Container from '../../common/container/index'
import MyInput from '../../common/extends/myInput'
import myStorage from '../../../utils/myStorage'
import { Toast } from 'teaset'
import styles from './styles'
myStorage._getStorage();
class Login extends Component {
    static navigationOptions = {
        headerStyle: {
            display: 'none',
        }
    }
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            userId: '',
            loginBag: false
        }
    }
    //删除用户名
    DelUserName = () => {
        this.setState({
            username: ''
        })
    }
    //删除密码
    DelPassWd = () => {
        this.setState({
            password: ''
        })
    }
    //手机号失去焦点
    mobileBlur = () => {
        let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(this.state.username)) {
            Toast.info('请输入正确的手机号')
        } else {
            return true;
        }
    }
    //密码失去焦点
    passwordBlur = () => {
        let myreg = /^\w{6,18}$/;;
        if (!myreg.test(this.state.password)) {
            Toast.info('请输入6-18的数字，字符或字符串')
        } else {
            return true;
        }
    }
    //登录
    Login = () => {
        if (this.state.username === '' || this.state.username === undefined) {
            Toast.info('请输入用户名')
        } else if (this.state.password === '' || this.state.password === undefined) {
            Toast.info('请输入密码')
        } else {
            let loginData = {
                username: this.state.username,
                password: this.state.password
            }
            this.props.login(loginData)
        }
    }


    //忘记密码
    ForgetPw = () => {
        this.props.navigation.navigate('ForgetPw')
    }
    //注册按钮
    Register = () => {
        this.props.navigation.navigate('Register')
    }
    //zyh登录
    zyh_login = () => {
        this.props.navigation.navigate('zyhLogin')
    }
    render() {
        return (
            <Container scrollViewProps={{style: styles.box}}>
                <View style={styles.container}>
                    <Image style={styles.login_logo} source={require('../../../../assets/images/logo_img.png')}></Image>
                    <View style={styles.login_box}>
                        <View style={styles.login_box_item}>
                            <MyInput placehold='输入手机号'
                                onChangeText={(text) => { this.setState({ username: text }) }}
                                value={this.state.username}
                                onFocus={() => this.setState({ loginBag: true })}
                                onBlur={this.mobileBlur}
                                style={styles.login_input}
                                multiline={false}
                                underlineColorAndroid="transparent"
                                keyboardType="numeric" />
                            <TouchableOpacity onPress={this.DelUserName}>
                                <Image style={styles.login_del} source={require('../../../../assets/images/login_del.png')}></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.login_box_item, styles.login_box_item_other]}>
                            <MyInput placehold='请设置您的密码'
                                onChangeText={(text) => { this.setState({ password: text }) }}
                                value={this.state.password}
                                onBlur={this.passwordBlur}
                                style={styles.login_input}
                                underlineColorAndroid="transparent"
                                secureTextEntry={true} />
                            <TouchableOpacity onPress={this.DelPassWd}>
                                <Image style={styles.login_del} source={require('../../../../assets/images/login_del.png')}></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.login_login_box}>
                            {
                                this.state.loginBag ?
                                    <TouchableOpacity onPress={this.Login} style={styles.login_btn}>
                                        <Text style={styles.login_btn_text}>登录</Text>
                                    </TouchableOpacity> :
                                    <View style={styles.login_btn_other}>
                                        <Text style={styles.login_btn_text}>登录</Text>
                                    </View>
                            }
                        </View>
                        <View style={styles.login_login_box_other}>
                            <TouchableOpacity onPress={this.ForgetPw}>
                                <Text style={styles.forget_btn}>忘记密码</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.zyh_login}>
                                <Text style={styles.zyh_btn}>用志愿汇登录</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.login_login_rigister}>
                            <TouchableOpacity onPress={this.Register}>
                                <Text style={styles.login_rigister_btn}>新用户注册</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Container>
        )
    }
}
export default Login

