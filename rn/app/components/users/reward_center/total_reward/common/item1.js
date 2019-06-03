import React,{ Component } from 'react'
import { StyleSheet,View, Text } from 'react-native'
import { ScreenUtil } from  '../../../../../utils/util'
class Item extends Component{
    constructor(){
        super()
    }
    render(){
        let { data } = this.props
        return(
            <View style={styles.container}>
                <View style={styles.item}>
                    <View style={styles.item_title}>
                        <Text style={styles.item_title_text}>{data.userName}</Text>
                        <Text style={styles.item_money_num}>-{data.price.toFixed(2)}</Text>
                    </View>
                    <View style={styles.item_money}>
                        <Text style={styles.item_money_text}>{data.gmtCreate}</Text>
                        <Text style={styles.item_title_describe}>{data.isGiveout === 1 ? '已发放' :'待发放'}</Text>
                    </View>
                </View>
            </View>
        )
    }
}
export default Item
const styles = StyleSheet.create({
    container:{
        paddingLeft:ScreenUtil.scaleSize(60),
        paddingRight:ScreenUtil.scaleSize(60),
    },
    item:{
        height: ScreenUtil.scaleSize(140),
        borderColor:'#e6e6e6',
        borderBottomWidth:1,
        borderStyle:'solid',
        flexDirection:'column',
        paddingTop:ScreenUtil.scaleSize(20),
        paddingBottom:ScreenUtil.scaleSize(20),
    },
    item_title:{
        height:ScreenUtil.scaleSize(50),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    item_title_text:{
        fontSize:18,
        color:'#4d4d4d',
        marginRight:ScreenUtil.scaleSize(20)
    },
    item_money_num:{
        fontSize:20,
        color:'#4d4d4d'
    },
    item_money:{
        height:ScreenUtil.scaleSize(50),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    item_money_text:{
        fontSize:14,
        color:'#b3b3b3'
    },
    item_title_describe:{
        fontSize:14,
        color:'gray'
    },

})