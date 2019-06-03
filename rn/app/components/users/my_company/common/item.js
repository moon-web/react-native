import React,{ Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native'
import { ScreenUtil } from '../../../../utils/util'
class Item extends Component{
    constructor(){
        super()
        this.state = {
            mobile:'',
            passward:''
        }
    }
    //删除公司成员
    _removeCompanyMember(id){
        if(this.props.removeCompanyMember){
            this.props.removeCompanyMember(id)
        }
    }
    //编辑公司成员
    _editCompanyMember(id,username,nickName,mobile){
        if(this.props.editCompanyMember){
            this.props.editCompanyMember(id,username,nickName,mobile)
        }
    }
    render(){
        let { data } = this.props
        return (
            <View style={styles.company_list_item}>
                <View style={styles.company_list_item_title_box}>
                    <Text
                        style={styles.company_list_item_title}>{data.userName.substr(0, 1)}</Text>
                </View>
                <View style={styles.company_list_item_box}>
                    <View style={styles.company_list_item_box_info}>
                        <Text style={styles.company_list_item_name}>{data.userName}</Text>
                        <Text style={styles.company_list_item_phone}>{data.mobile}</Text>
                    </View>
                    <View style={styles.company_list_item_box_opr}>
                        <TouchableOpacity onPress={() => this._editCompanyMember(data.userId,data.userName,data.nickName,data.mobile)}>
                            <Image style={styles.company_list_item_box_opr_img}
                                   source={require('../../../../../assets/images/my_company_edit.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._removeCompanyMember(data.userId)}>
                            <Image style={styles.company_list_item_box_opr_img}
                                   source={require('../../../../../assets/images/my_company_del.png')}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
export default Item
const styles = StyleSheet.create({
    company_list_item:{
        height:ScreenUtil.scaleSize(160),
        flexDirection:'row',
        justifyContent:'space-between',
        paddingTop:ScreenUtil.scaleSize(30),
        paddingBottom:ScreenUtil.scaleSize(30),
    },
    company_list_item_title_box:{
        width:ScreenUtil.scaleSize(100),
        height:ScreenUtil.scaleSize(100),
        backgroundColor:'#668fff',
        borderRadius:ScreenUtil.scaleSize(50),
        alignItems:'center',
        justifyContent:'center',
    },
    company_list_item_title:{
        fontSize:24,
        color:'#fff'
    },
    company_list_item_box:{
        width: ScreenUtil.scaleSize(540),
        paddingLeft:ScreenUtil.scaleSize(30),
        paddingRight:ScreenUtil.scaleSize(30),
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomWidth: 1,
        borderStyle:'solid',
        borderBottomColor:'#e6e6e6',
    },
    company_list_item_box_info:{
        flexDirection:'column',
        paddingTop:ScreenUtil.scaleSize(15),
    },
    company_list_item_name:{
        fontSize:18,
        color:'#7d8edb'
    },
    company_list_item_phone:{
        fontSize:16,
        color:'#808080'
    },
    company_list_item_box_opr:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    company_list_item_box_opr_img:{
        width:ScreenUtil.scaleSize(60),
        height:ScreenUtil.scaleSize(60),
        marginRight:ScreenUtil.scaleSize(30)
    },
})