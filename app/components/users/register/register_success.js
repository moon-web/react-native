import React, { Component } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { ScreenUtil } from '../../../utils/util'

class RegisterSuccess extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.registerSuccess}>
                    <Image style={styles.registerSuccess_img} source={require('../../../../assets/images/registerSucc.png')}></Image>
                </View>
                <View style={styles.registerSuccess_con}>
                    <Text style={styles.registerSuccess_title}>恭喜您注册成功</Text>
                    <Text style={styles.registerSuccess_title_other} numberOfLines={10}>稍后我们的工作人员会对您的资料进行审核，您可以先使用普通志愿者的功能</Text>
                </View>
            </View>
        )
    }
}

export default RegisterSuccess
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    registerSuccess: {
        paddingLeft: ScreenUtil.scaleSize(60),
        paddingRight: ScreenUtil.scaleSize(60),
        paddingTop: ScreenUtil.scaleSize(100),
        alignItems : 'center',
        justifyContent: 'center'
    },
    registerSuccess_img : {
        width: ScreenUtil.scaleSize(400),
        height: ScreenUtil.scaleSize(360)
    },
    registerSuccess_con : {
        marginTop: ScreenUtil.scaleSize(60),
        paddingLeft: ScreenUtil.scaleSize(60),
        paddingRight: ScreenUtil.scaleSize(60),
        alignItems : 'center',
    },
    registerSuccess_title : {
        fontSize: ScreenUtil.setSpText(22),
        color: '#292929',
        height: ScreenUtil.scaleSize(100),
        lineHeight: ScreenUtil.scaleSize(100),
    },
    registerSuccess_title_other : {
        marginTop: ScreenUtil.scaleSize(40),
        paddingLeft: ScreenUtil.scaleSize(40),
        paddingRight: ScreenUtil.scaleSize(40),
        fontSize: ScreenUtil.setSpText(14),
        color: 'gray',
        lineHeight:ScreenUtil.scaleSize(50),
        textAlign: 'center',
    }
})