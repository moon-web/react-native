import React, {Component} from 'react'
import { View, Text, Image, TouchableOpacity} from 'react-native'
import styles from './styles'
import Container from '../../../common/container/index'
import MyInput from '../../../common/extends/myInput'
import API from '../../../../utils/index'
import { Toast } from 'teaset'
import { ScreenUtil } from '../../../../utils/util'
class Register extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <TouchableOpacity onPress={navigation.getParam('submits')} activeOpacity={0.5}>
                    <Text style={styles.goback}>
                        调查公司注册
                    </Text>
                </TouchableOpacity>
            ),
            headerRightContainerStyle:{
                color: '#292929'
            },
            headerTintColor: '#292929',
            headerStyle: {
                paddingRight: ScreenUtil.scaleSize(30),
            }
        };
    }
    constructor(props) {
        super(props)
        this.state = {
            mobile: '',
            code: '',
            password: '',
            protocol:false,
            codeText:'获取验证码',
            count:60,
            eyes:true,
            secureTextEntry:true,//密码框还是input
            registerBtag:false,//注册颜色
            hasFlag: true
        }
        this._submits = this._submits.bind(this)
    }
    componentDidMount() {
        this.props.navigation.setParams({ submits: this._submits });
    }
    _submits(){
        this.props.navigation.navigate('RegisterCompany')
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
    //注册
    Register = () => {
        if(!this.state.mobile){
            Toast.info('请输入正确的手机号')
            return;
        }
        if(!this.state.password){
            Toast.info('请输入正确的密码')
            return
        }
        if(!this.state.code){
            Toast.info('请输入验证码')
            return
        }
        if(this.state.protocol) {
            let data = {
                mobile: this.state.mobile,
                code: this.state.code
            }
            API.register_code(data).then(res => {
                if (res.success === true) {
                    let id = res.dataObject;
                    let registerData = {
                        mobile: this.state.mobile,
                        code: this.state.code,
                        password: this.state.password,
                        checkId: id,
                        type: 1,//普通志愿者
                    }
                    API.register(registerData).then(res => {
                        if (res.success === true) {
                            this.props.navigation.navigate('RegisterSuccess')
                        } else {
                            Toast.fail(res.msg)
                        }
                    })
                } else {
                    Toast.fail(res.msg)
                }
            })
        }else{
            Toast.fail('请先同意注册协议')
        }
    }
    //手机号失去焦点
    mobileBlur = () =>{
        let myreg=/^(0|86|17951)?(13[0-9]|14[5-9]|15[012356789]|16[56]|17[0-8]|18[0-9]|19[189])[0-9]{8}$/;
        if (!myreg.test(this.state.mobile)){
            Toast.info('请输入正确的手机号')
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
    //显示小眼睛
    changeEyes = () => {
        if(this.state.eyes){
            this.setState({
                eyes: false,
                secureTextEntry:false
            })
        }else{
            this.setState({
                eyes: true,
                secureTextEntry:true
            })
        }
    }
    //注册协议
    protocolCheck = () => {
        if(this.state.protocol) {
            this.setState({
                protocol: false
            })
        }else{
            this.setState({
                protocol: true
            })
        }
    }
    render() {
        let { count, hasFlag } = this.state;
        return (
            <Container scrollViewProps={{style: styles.container }}>
                <View>
                    <Text style={styles.register_title}>志愿者注册</Text>
                </View>
                <View style={styles.register_box}>
                    <View style={styles.register_item}>
                        <Text style={styles.register_item_title}>手机号码</Text>
                        <View style={styles.register_item_box}>
                            <Text style={styles.register_item_number}>中国 +86</Text>
                            <MyInput 
                                onChangeText={(text) => {this.setState({mobile: text})}}
                                onFocus = {() => {this.setState({registerBtag:true})}}
                                onBlur = {this.mobileBlur}
                                style={styles.register_item_input}
                                multiline={false}
                                keyboardType="numeric"
                            />
                        </View>
                    </View>
                    <View style={styles.register_item}>
                        <Text style={styles.register_item_title}>验证码</Text>
                        <View style={styles.register_item_box}>
                            <MyInput 
                                placeholder="请输入手机验证码"
                                onChangeText={(text) => {this.setState({code: text})}}
                                onFocus = {() => {this.setState({registerBtag:true})}}
                                onBlur = {this.mobileBlur}
                                style={styles.register_item_input}
                                multiline={false}
                                keyboardType="numeric"
                            />
                            {
                                hasFlag
                                ? (
                                    <TouchableOpacity onPress={this.getCode}>
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
                            <MyInput 
                                placeholder='请设置您的密码'
                                onChangeText={(text) => {this.setState({password: text})}}
                                onBlur = {this.passwordBlur}
                                style={styles.register_item_input}
                                multiline={false}
                                secureTextEntry={this.state.secureTextEntry}
                            />
                            <TouchableOpacity onPress={this.changeEyes}>
                                {
                                    this.state.eyes ? <Image style={styles.passwordEyes} source={require('../../../../../assets/images/close_eyes.png')} />:
                                        <Image style={styles.passwordEyes} source={require('../../../../../assets/images/open_eyes.png')} />
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.register_item_protocol}>
                        <TouchableOpacity onPress={this.protocolCheck}>
                            {
                                this.state.protocol ? <Image source={require('../../../../../assets/images/checkbox_true.png')}/>:
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
                            this.state.registerBtag 
                            ?
                            <TouchableOpacity onPress={this.Register}>
                                <View style={styles.register_register_btn}>
                                    <Text style={styles.register_register_btn_text}>注册</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            <View style={styles.register_register_btn_other}>
                                <Text style={styles.register_register_btn_text}>注册</Text>
                            </View>
                        }
                    </View>
                </View>
            </Container>
        )
    }
}

export default Register
