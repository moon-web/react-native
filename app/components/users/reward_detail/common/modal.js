import React,{ Component } from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import MyInput from '../../../common/extends/myInput'
import { ScreenUtil } from '../../../../utils/util'
class Modal extends Component{
    constructor(){
        super()
        this.state = {
        }
    }
    //关闭modal(取消按钮)
    _closeModal(){
        if(this.props.closeModal){
            this.props.closeModal()
        }
    }
    //确认
    _consultOk(){
        if(this.props.consultOk){
            this.props.consultOk()
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.modal_title}>
                    <Text style={styles.modal_title_text}>请输入调查奖励</Text>
                </View>
                <View style={styles.modal_input_box}>
                    <MyInput
                        style={styles.modal_input}
                        underlineColorAndroid="transparent"
                        placeholder='请输入协商金额'
                        onChangeText={(text) => {this.props.ConsultMoney(text)}}
                    />
                </View>
                <View style={styles.modal_btn_box}>
                    <TouchableOpacity style={styles.modal_btn} onPress={this._closeModal.bind(this)}>
                        <Text style={[styles.modal_btn_text,styles.modal_btn_text_other]}>取消</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modal_btn} onPress={this._consultOk.bind(this)}>
                        <Text style={styles.modal_btn_text}>确认</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
export default Modal
const styles = StyleSheet.create({
    container:{
        flexDirection:'column',
        paddingLeft: ScreenUtil.scaleSize(30),
        paddingRight: ScreenUtil.scaleSize(30),
        paddingTop: ScreenUtil.scaleSize(40),
        paddingBottom: ScreenUtil.scaleSize(40),
        backgroundColor: '#fff',
        width: ScreenUtil.scaleSize(550),
        borderRadius: 15,
        height:ScreenUtil.scaleSize(350)
    },
    modal_title:{
        height:ScreenUtil.scaleSize(60),
        marginBottom:ScreenUtil.scaleSize(30),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    modal_title_text:{
        fontSize:18,
        color:'#292929'
    },
    modal_input_box:{
        height:ScreenUtil.scaleSize(60),
        borderBottomColor:'#e6e6e6',
        borderBottomWidth:1,
        borderStyle:'solid'
    },
    modal_input:{
        fontSize:18
    },
    modal_btn_box:{
        flex:1,
        marginTop:ScreenUtil.scaleSize(30),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        height:ScreenUtil.scaleSize(60)
    },
    modal_btn:{
        width:ScreenUtil.scaleSize(200),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    modal_btn_text_other:{
        fontSize:18,
        color:'#292929'
    },
    modal_btn_text:{
        fontSize:18,
        color:'#668fff'
    }
})