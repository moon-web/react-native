import React,{ Component } from 'react'
import { View, Text, Image, TouchableOpacity} from 'react-native'
import Container from '../../common/container/index'
import MyInput from '../../common/extends/myInput'
import styles from './styles'
import myStorage from '../../../utils/myStorage'
import { Toast } from 'teaset'
myStorage._getStorage();
class Login extends Component{
    constructor(){
        super()
        this.state = {
            username:'',
            password:''
        }
    }
    //手机号失去焦点
    mobileBlur = () =>{
        let myreg=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (!myreg.test(this.state.username)){
            Toast.info('请输入正确的身份证号码')
        } else {
            return true;
        }
    }
    //密码失去焦点
    passwordBlur = () => {
        let myreg=/^\w{6,18}$/;;
        if (!myreg.test(this.state.password)){
            Toast.info('请输入6-18的数字，字符或字符串')
        } else {
            return true;
        }
    }
    //登录
    Login = () => {
        if(this.state.username === '' || this.state.username === undefined){
            Toast.info('请输入用户名')
        }else if(this.state.password === '' || this.state.password === undefined){
            Toast.info('请输入密码')
        }else {
            let loginData = {
                username: this.state.username,
                password: this.state.password
            }
            this.props.ZYHLogin(loginData)

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
    render(){
        return(
            <Container scrollViewProps={{style: styles.container}}>
                <View style={styles.zyhLoginHeader}>
                    <Image source={require('../../../../assets/images/zyhlogo.png')}></Image>
                </View>
                <View style={styles.login_box}>
                    <View style={styles.loginwrapper}>
                        <View style={styles.loginicon}>
                            <Image source={require('../../../../assets/images/zyhicons.png')} style={styles.icon}></Image>
                        </View>
                        <MyInput placeholder='请输入身份证号码'
                                       onChangeText={(text) => {this.setState({username: text})}}
                                       value={this.state.username}
                                       onBlur = {this.mobileBlur}
                                       style={styles.login_input}
                                       multiline={false}
                                       />
                    </View>
                    <View style={styles.loginwrapper}>
                        <View style={styles.loginicon}>
                            <Image source={require('../../../../assets/images/suo.png')} style={styles.icon}></Image>
                        </View>
                        <MyInput placeholder='请设置您的密码'
                                   onChangeText={(text) => {this.setState({password: text})}}
                                   value={this.state.password}
                                   onBlur = {this.passwordBlur}
                                   style={styles.login_input}
                                   multiline={false}
                                   secureTextEntry={true}
                                   />
                    </View>
                    <View style={styles.login_login_box}>
                        <TouchableOpacity onPress={this.Login}>
                            <Text style={styles.login_btn}>登录</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Container>
        )
    }
}
export default Login