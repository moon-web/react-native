import React, { Component } from 'react';
import { View, Text, StyleSheet,Image,TouchableOpacity} from 'react-native';
import {ScreenUtil} from '../../utils/util';
export default class Perfect extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.TaskSuccessFul}>
                    <Image source={require('../../../assets/images/repsuc.png')} style={styles.TaskSuccessImg}/>
                    <Text numberOfLines={10} style={styles.TaskSuccessTitle}>感谢您参加活动。根据相关规定，请完善个人信息。我们将严格保密您的用户信息！</Text>
                </View>
                <View style={styles.TaskSuccessBtn} >
                    <TouchableOpacity style={styles.brannerWrap} onPress={()=> this.props.navigation.navigate('ModifyInformation')}>
                        <View style={styles.TaskSuccessBtnStyle}>
                            <Text style={styles.TaskSuccessBtnStyleFONT}>完善信息</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop:ScreenUtil.scaleSize(100),
        paddingBottom:ScreenUtil.scaleSize(100),
        paddingLeft:ScreenUtil.scaleSize(30),
        paddingRight:ScreenUtil.scaleSize(30),
    },
    TaskSuccessFul:{
        backgroundColor:'#fff',
        borderRadius:ScreenUtil.scaleSize(10),
        shadowColor:'#808080',
        shadowOffset:{width: 10, height: 10},
        shadowOpacity:0.5,
        shadowRadius:ScreenUtil.scaleSize(10),
        elevation:ScreenUtil.scaleSize(100),
        justifyContent:'center',
        alignItems:'center',
        paddingLeft: ScreenUtil.scaleSize(40),
        paddingRight: ScreenUtil.scaleSize(40),
        paddingTop: ScreenUtil.scaleSize(80),
        paddingBottom: ScreenUtil.scaleSize(80)
    },
    TaskSuccessImg:{
        width:ScreenUtil.scaleSize(130),
        height:ScreenUtil.scaleSize(100),
        marginTop:ScreenUtil.scaleSize(40),
    },
    TaskSuccessTitle:{
        lineHeight:ScreenUtil.scaleSize(100),
        textAlign: 'center',
        fontSize:ScreenUtil.setSpText(20),
        color:'#668fff',
        fontWeight:'600',
    },
    TaskSuccessBtn:{
        marginTop:ScreenUtil.scaleSize(146),
        height:ScreenUtil.scaleSize(90),
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center'
    },
    TaskSuccessBtnStyle:{
        width:ScreenUtil.scaleSize(250),
        height:ScreenUtil.scaleSize(90),
        borderRadius:ScreenUtil.scaleSize(10),
        backgroundColor:'#4887e5',
        marginRight:ScreenUtil.scaleSize(30),
        marginLeft:ScreenUtil.scaleSize(30),
    },
    TaskSuccessBtnStyleFONT:{
        fontSize:ScreenUtil.setSpText(16),
        color:'#fff',
        lineHeight:ScreenUtil.scaleSize(90),
        textAlign:'center',
    }


})