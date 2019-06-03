import React,{ Component } from 'react'
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import Container from '../../../common/container/index'
import MyInput from '../../../common/extends/myInput'
import styles from './styles'
import { Toast } from 'teaset'
import ImageItem from '../../../inform/common/imageItem'
import {  uploadImag } from '../../../../utils/util';

class ApplyReward extends Component{
    constructor(){
        super()
        this.state = {
            price:'',
            bankNo:'',
            bankName:'',
            userName:'',
            idNo:'',
            idFront:'',
            idBack:'',
            address:'',
            contactName:'',
            contactMobile:'',
            uploadImg:[]
        }
    }
    componentWillMount(){
        let { userInfo } = this.props
        let data = {
            userId:userInfo.userId,
            pageNo:1
        }
        this.props.ApplyRewardBackinfo(data,() => {
            let { applyRewardBackInfo } = this.props
            let newArry = this.state.uploadImg.concat([{msgCode:applyRewardBackInfo.idFront},{msgCode:applyRewardBackInfo. idBack}])
            this.setState({
                bankNo:applyRewardBackInfo.bankNo,
                bankName:applyRewardBackInfo.bankName,
                userName:applyRewardBackInfo.userName,
                idNo:applyRewardBackInfo.idNo,
                idFront:applyRewardBackInfo.idFront,
                idBack:applyRewardBackInfo.idBack,
                address:applyRewardBackInfo.address,
                uploadImg:newArry,
                contactName:applyRewardBackInfo.contactName,
                contactMobile:applyRewardBackInfo.contactMobile,
            })
        })
    }
    //可申请金额判断
    _applyMoney(){
        let money  = this.props.navigation.getParam('money')
        if(parseInt(this.state.price) > parseInt(money)){
            Toast.info('申请金额大于可申请金额，请重新输入')
        }
    }
    //银行卡判断
    _applyBankNo(){
        let regex = /^([0-9]{16}|[0-9]{19})$/;
        if(!regex.test(this.state.bankNo)){
            Toast.info("请输入正确的银行卡号")
        }
    }
    //身份证判断
    _applyIdNo(){
        let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (!reg.test(this.state.idNo)) {
            Toast.info("请输入正确的身份证号码");
        }
    }
    //手机号判断
    _applyMobile(){
        let reg=/^(0|86|17951)?(13[0-9]|14[5-9]|15[012356789]|16[56]|17[0-8]|18[0-9]|19[189])[0-9]{8}$/;
        if (!reg.test(this.state.contactMobile)) {
            Toast.info("请输入正确的手机号码");
        }
    }
    // 上传身份证图片
    selectPhotoTapped() {
        uploadImag((res)=>{
            let uploadImg = this.state.uploadImg;
            uploadImg.push(res)
            this.setState({
                uploadImg: uploadImg
            })
        })
    }
    // 删除图片
    deleteImage(data) {
        let uploadImg = this.state.uploadImg;
        let uploadImgResult = uploadImg.filter((item) => {
            return item.msgCode !== data.msgCode
        })
        this.setState({
            uploadImg: uploadImgResult
        })
    }
    //申请奖励
    _apply(){
        let { userInfo } = this.props
        if(this.state.uploadImg.length>0){
            this.state.idFront = this.state.uploadImg[0].msgCode
            this.state.idBack = this.state.uploadImg[1].msgCode
        }
        if(!this.state.price){
            Toast.info('请输入申请金额')
            return false
        }
        if(!this.state.bankNo){
            Toast.info('请输入银行卡号')
            return false
        }
        if(!this.state.bankName){
            Toast.info('请输入开户行')
            return false
        }
        if(!this.state.userName){
            Toast.info('请输入开户人姓名')
            return false
        }
        if(!this.state.idNo){
            Toast.info('请输入开户人身份证')
            return false
        }
        if(!this.state.idFront){
            Toast.info('请上传开户人身份证正面照片')
            return false
        }
        if(!this.state.idBack){
            Toast.info('请上传开户人身份证反面照片')
            return false
        }
        if(!this.state.address){
            Toast.info('请输入居住地')
            return false
        }
        if(!this.state.contactName){
            Toast.info('请输入紧急联系人姓名')
            return false
        }
        if(!this.state.contactMobile){
            Toast.info('请输入紧急联系人手机')
            return false
        }
        let data = {
            userId:userInfo.userId,
            price:this.state.price,
            bankNo:this.state.bankNo,
            bankName:this.state.bankName,
            userName:this.state.userName,
            idNo:this.state.idNo,
            idFront:this.state.idFront,
            idBack:this.state.idBack,
            address:this.state.address,
            contactName:this.state.contactName,
            contactMobile:this.state.contactMobile,
        }
        this.props.ApplyReward(data)
    }
    render(){
        let money  = this.props.navigation.getParam('money')
        return(
            <Container  scrollViewProps={{style: styles.container}}>
                <View style={styles.apply_reward_title}>
                    <Text style={styles.apply_reward_text}>申请奖励</Text>
                </View>
                <View style={styles.apply_reward_box}>
                    <View style={styles.apply_reward_money}>
                        <MyInput style={styles.apply_input_money}
                                   underlineColorAndroid="transparent"
                                   placeholder={money?`可申请${money}元`:`请输入申请金额`}
                                   onChangeText={(text)=>{this.setState({price:text})}}
                                   onBlur={this._applyMoney.bind(this)}
                                   keyboardType='numeric'
                        />
                    </View>
                    <View style={styles.apply_reward_item}>
                        <Text style={styles.apply_reward_item_text}>银行卡号</Text>
                        <MyInput
                            style={styles.apply_input}
                            underlineColorAndroid="transparent"
                            placeholder='请输入银行卡号'
                            onChangeText={(text) => {this.setState({bankNo:text})}}
                            onBlur={this._applyBankNo.bind(this)}
                            value={this.state.bankNo}
                            keyboardType='numeric'
                        />
                    </View>
                    <View style={styles.apply_reward_item}>
                        <Text style={styles.apply_reward_item_text}>开户行</Text>
                        <MyInput
                            style={styles.apply_input}
                            underlineColorAndroid="transparent"
                            onChangeText={(text) => {this.setState({bankName:text})}}
                            value={this.state.bankName}
                        />
                    </View>
                    <View style={styles.apply_reward_item}>
                        <Text style={styles.apply_reward_item_text}>开户人姓名</Text>
                        <MyInput
                            style={styles.apply_input}
                            underlineColorAndroid="transparent"
                            onChangeText={(text) => {this.setState({userName:text})}}
                            value={this.state.userName}
                        />
                    </View>
                    <View style={styles.apply_reward_item}>
                        <Text style={styles.apply_reward_item_text}>身份证号码</Text>
                        <MyInput
                            style={styles.apply_input}
                            underlineColorAndroid="transparent"
                            onChangeText={(text) => {this.setState({idNo:text})}}
                            onBlur={this._applyIdNo.bind(this)}
                            value={this.state.idNo}
                            keyboardType='numeric'
                        />
                    </View>
                    <View style={styles.apply_reward_item_img}>
                        <Text style={styles.apply_reward_item_text}>身份证正反照片（2张）</Text>
                        <View style={styles.imgWarp}>
                            {
                                this.state.uploadImg.map((item, index) => {
                                    return (
                                        <ImageItem deleteImage={this.deleteImage.bind(this)} data={item} key={index} />
                                    )
                                })
                            }
                            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)} activeOpacity={0.5} style={styles.addItem}>
                                <Image style={styles.uploadImag} source={require('../../../../../assets/images/cardUpload.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.apply_reward_item}>
                        <Text style={styles.apply_reward_item_text}>居住地</Text>
                        <MyInput
                            style={styles.apply_input}
                            underlineColorAndroid="transparent"
                            onChangeText={(text) => {this.setState({address:text})}}
                            value={this.state.address}
                        />
                    </View>
                    <View style={styles.apply_reward_item}>
                        <Text style={styles.apply_reward_item_text}>紧急联系人</Text>
                        <MyInput
                            style={styles.apply_input}
                            underlineColorAndroid="transparent"
                            onChangeText={(text) => {this.setState({contactName:text})}}
                            value={this.state.contactName}
                        />
                    </View>
                    <View style={styles.apply_reward_item}>
                        <Text style={styles.apply_reward_item_text}>紧急联系人电话</Text>
                        <MyInput
                            style={styles.apply_input}
                            underlineColorAndroid="transparent"
                            onChangeText={(text) => {this.setState({contactMobile:text})}}
                            onBlur={this._applyMobile.bind(this)}
                            value={this.state.contactMobile}
                            keyboardType='numeric'
                        />
                    </View>
                </View>
                <View style={styles.apply_btn}>
                    <TouchableOpacity style={styles.apply_btn_box} onPress={this._apply.bind(this)} activeOpacity={0.7}>
                        <Text style={styles.apply_btn_text}>申请奖励</Text>
                    </TouchableOpacity>
                </View>
            </Container>
        )
    }
}
export default ApplyReward