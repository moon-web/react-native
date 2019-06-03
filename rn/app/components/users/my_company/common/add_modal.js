import React,{ Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native'
import MyInput from '../../../common/extends/myInput'
import { ScreenUtil } from '../../../../utils/util'
import { Toast } from 'teaset'
class AddModal extends Component{
    constructor(){
        super()
        this.state = {
            mobile:'',
            passward:''
        }
    }
    //关闭modal(再想想按钮)
    _closeModal(){
        if(this.props.closeModal){
            this.props.closeModal()
        }
    }
    //确定
    _addCompanyMember(){
        if(this.props.addCompanyMember){
            this.props.addCompanyMember()
        }
    }
    //手机
    _Mobile(){
        let myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(this.state.mobile)){
            Toast.info('请输入正确的手机号')
            this.props.Mobile('')
        }else{
            this.props.Mobile(this.state.mobile)
        }
    }
    _PassWord(){
        let myreg=/^\w{6,18}$/;
        if (!myreg.test(this.state.password)){
            Toast.info('请输入6-18的数字，字符或字符串')
            this.props.PassWord('')
        }else{
            this.props.PassWord(this.state.password)
        }
    }
    render(){
        return (
            <View style={styles.add_container}>
                <View style={styles.add_title}>
                    <Text style={styles.add_title_text}>新增公司成员</Text>
                    <TouchableOpacity style={styles.add_title_img} onPress={this._closeModal.bind(this)}>
                        <Image style={styles.add_title_img_img} source={require('../../../../../assets/images/login_del.png')}></Image>
                    </TouchableOpacity>
                </View>
                <View style={styles.add_companyMember}>
                    <View style={styles.add_companyMember_item}>
                        <Text>电话</Text>
                        <MyInput placeholder='请输入新成员的电话'
                                   underlineColorAndroid="transparent"
                                   style={styles.add_companyMember_input}
                                   onChangeText={(text) => {this.setState({mobile:text})}}
                                   onBlur={this._Mobile.bind(this)}
                        />
                    </View>
                    <View style={styles.add_companyMember_item}>
                        <Text>密码</Text>
                        <MyInput placeholder='请输入新成员的密码'
                                   underlineColorAndroid="transparent"
                                   secureTextEntry={true}
                                   style={styles.add_companyMember_input}
                                   onChangeText={(text) => {this.setState({password:text})}}
                                   onBlur={this._PassWord.bind(this)}
                        />
                    </View>
                    <View style={styles.add_companyMember_item}>
                        <Text style={styles.add_companyMember_text}>姓名</Text>
                        <MyInput placeholder='请输入新成员的姓名'
                                   underlineColorAndroid="transparent"
                                   style={styles.add_companyMember_input}
                                   onChangeText={(text) => {this.props.UserName(text)}}
                        />
                    </View>
                    <View style={styles.add_companyMember_item}>
                        <Text>昵称</Text>
                        <MyInput placeholder='请输入新成员的昵称'
                                   underlineColorAndroid="transparent"
                                   style={styles.add_companyMember_input}
                                   onChangeText={(text) => {this.props.NickName(text)}}
                        />
                    </View>
                </View>
                <TouchableOpacity style={styles.add_companyMember_btn} onPress={this._addCompanyMember.bind(this)}>
                    <Text style={styles.add_companyMember_btn_text}>确定新增</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
export default AddModal
const styles = StyleSheet.create({
    add_container:{
        paddingLeft:ScreenUtil.scaleSize(30),
        paddingRight:ScreenUtil.scaleSize(30),
        paddingTop:ScreenUtil.scaleSize(30),
        paddingBottom:ScreenUtil.scaleSize(30),
    },
    add_title:{
        flexDirection:'row',
        height:ScreenUtil.scaleSize(60),
        alignItems:'center',
        justifyContent:'space-between',
    },
    add_title_text:{
        fontSize:18,
        color:'#7d8ebd',
    },
    add_title_img:{
        width:ScreenUtil.scaleSize(60),
        height:ScreenUtil.scaleSize(60),
        alignItems:'center',
        justifyContent:'center',
    },
    add_title_img_img:{
        width:ScreenUtil.scaleSize(45),
        height:ScreenUtil.scaleSize(45),
    },
    add_companyMember:{
        flexDirection:'column',
    },
    add_companyMember_item:{
        height:ScreenUtil.scaleSize(80),
        marginTop:ScreenUtil.scaleSize(20),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderStyle:'solid',
        borderBottomWidth:1,
        borderBottomColor:'#e1e1e1'
    },
    add_companyMember_text:{
        color:'gray',
        fontSize:16
    },
    add_companyMember_input:{
        width:ScreenUtil.scaleSize(500),
        textAlign:'right',
        fontSize:18
    },
    add_companyMember_btn:{
        height:ScreenUtil.scaleSize(80),
        backgroundColor:'#b2c7ff',
        borderRadius:ScreenUtil.scaleSize(50),
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        marginBottom:ScreenUtil.scaleSize(20),
        marginTop:ScreenUtil.scaleSize(50),
    },
    add_companyMember_btn_text:{
        fontSize:20,
        color:'#fff'
    },
})