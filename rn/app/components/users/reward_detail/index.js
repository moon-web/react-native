import React, { Component } from 'react'
import styles from './style'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { ScreenUtil, switchStateText, switchState } from '../../../utils/util'
import Item from '../reward_list/common/item1_detail'
import LawDetail from './common/law_detail'
import { Overlay } from 'teaset'
import ApplyModal from './common/apply_modal'
import ConsultModal from './common/consult_modal'
import GiveUpModal from './common/giveup_modal'
class RewadrDetail extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <TouchableOpacity activeOpacity={0.5} onPress={navigation.getParam('giveUp')}>
                    <Text style={styles.goback}>
                        放弃
                    </Text>
                </TouchableOpacity>
            ),
            headerRightContainerStyle: {
                color: '#292929',
            },
            headerTintColor: '#292929',
        };
    }
    constructor() {
        super()
        this.state = {
            consultTypeSubmit:1,//协商类型1：调查，2：执法，3：调查+执法
            moneySubmit:'',//协商金额 money
            timeSubmit:'',//协商时间 consultTime
            consultTypeApply:1,//申领类型
            moneyApply:'',//申领金额
            timeApply:'',//申领时间
        }

    }
    componentWillMount() {
        let id = this.props.navigation.getParam('id')
        let data = {
            id: id
        }
        this.props.rewardDeatil(data)
        this.props.navigation.setParams({ giveUp: this._giveUp });
    }
    //放弃任务按钮
    _giveUp = () =>{
        let overlayView = (
            <Overlay.View style={{alignItems: 'center', justifyContent: 'center'}}
                          modal={true}
                          overlayOpacity={0.5}
                          ref={v => this.overlayView = v}
            >
                <GiveUpModal
                    closeModal={() => this.overlayView && this.overlayView.close()}
                    giveUp={() => this.giveUp()}>
                </GiveUpModal>
            </Overlay.View>
        );
        Overlay.show(overlayView);
    }
    //放弃任务
    giveUp(){
        let id = this.props.navigation.state.params.id
        let data={
            compensableId:id,
        }
        this.props.GiveUpTask(data,() => {
            this.props.navigation.navigate('Home',{type:2})
        })
        this.overlayView && this.overlayView.close()
    }

    //申领任务按钮
    _myApply(){
        let { detail } = this.props
        let overlayView = (
            <Overlay.PullView side='bottom' modal={false} ref={v => this.overlayView = v}>
                <ApplyModal
                    data={detail}
                    userInfo={this.props.userInfo}
                    id={this.props.navigation.state.params.id}
                    MoneyApply={(value) => {this.setState({moneyApply:value})}}
                    ConsultTypeApply = {(value) => {this.setState({consultTypeApply:value})}}
                    closeModal={() => this.overlayView && this.overlayView.close()}
                    ApplyTask={() => this.ApplyTask()}
                ></ApplyModal>
            </Overlay.PullView>
        );
        Overlay.show(overlayView);
    }
    //申领成功
    ApplyTask(){
        let { userInfo,detail } = this.props
        let id = this.props.navigation.state.params.id
        let data = {}
        if(this.state.consultTypeApply === 2){
            data = {
                consultType:this.state.consultTypeApply,
                lawMoney:this.state.moneyApply,
                compensableId:id,
                userId:userInfo.userId
            }
        }else{
            data = {
                consultType:this.state.consultTypeApply,
                money:this.state.moneyApply,
                compensableId:id,
                userId:userInfo.userId
            }
        }
        this.props.ApplyTask(data,() => {
            this.props.navigation.navigate('RewardCompletDetail', {id: detail.compensableDetail.id})
        })
    }
    //协商任务按钮
    _myConsult(){
        let { detail } = this.props
        let overlayView = (
            <Overlay.PullView side='bottom' modal={false} ref={v => this.overlayView = v}>
                <ConsultModal
                    data={detail}
                    userInfo={this.props.userInfo}
                    id={this.props.navigation.state.params.id}
                    MoneySubmit={(value) => {this.setState({moneySubmit:value})}}
                    TimeSubmit = {(value) => {this.setState({timeSubmit:value})}}
                    ConsultTypeSubmit = {(value) => {this.setState({consultTypeSubmit:value})}}
                    closeModal={() => this.overlayView && this.overlayView.close()}
                    ConsultTask={() => this.ConsultTask()}
                ></ConsultModal>
            </Overlay.PullView>
        );
        Overlay.show(overlayView);
    }
    //协商成功
    ConsultTask(){
        let id = this.props.navigation.state.params.id

        let data = {
            compensableId:id,
            money:this.state.moneySubmit,
            consultTime:this.state.timeSubmit,
            consultType:this.state.consultTypeSubmit,
        }
        this.props.ConsultTask(data,() => {
            let data = {
                userId:this.props.userInfo.userId,
                status:'21,31,12,22,32,13,23,33,14,24,34',
                pageNo:1
            }
            this.props.loadRewardTask(data,[],() => {
                this.props.navigation.navigate('RewardTask')
            })
        })
    }
    render() {
        let { detail } = this.props
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.rewardDetail_title}>
                        <Text style={styles.rewardDetail_title_text}>打赏任务</Text>
                        <Item data={detail}></Item>
                    </View>
                    <View style={styles.rewardDetail_box}>
                        <View style={styles.rewardDetail_box_title}>
                            <Text style={styles.rewardDetail_box_title_bg}></Text>
                            <Text style={styles.rewardDetail_box_title_text}>任务详情</Text>
                        </View>
                        <LawDetail data={detail} />
                    </View>
                    <View style={styles.rewardDetail_box_btn}>
                        <TouchableOpacity style={[styles.rewardDetail_box_btn_opr,styles.rewardDetail_box_btn_oprother]} onPress={this._myConsult.bind(this)}>
                            <Text style={styles.rewardDetail_box_btn_opr_text}>我要协商</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.rewardDetail_box_btn_opr} onPress={this._myApply.bind(this)}>
                            <Text style={styles.rewardDetail_box_btn_opr_text}>申领任务</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
export default RewadrDetail