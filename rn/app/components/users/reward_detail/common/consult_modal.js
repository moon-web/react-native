import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native'
import {Overlay} from 'teaset'
import {ScreenUtil, formatNum } from '../../../../utils/util'
import Modal from './modal'
import Picker from 'react-native-picker';

export default class ApplyModal extends Component {
    constructor() {
        super()
        this.state = {
            consultType: 1,//协商类型1：调查，2：执法，3：调查+执法
            money: '',
            time: '',
            dzMoney: '',//调查+执法金额
            moneySubmit: '',//参数money
            consultMoney: '',
        }
    }

    //显示原数据
    componentWillMount() {
        let detail = this.props.data
        if (detail.statusTaskText === '执法任务') {
            this.setState({
                consultType: 2,
                money: detail.compensableDetail ? detail.compensableDetail.lawMoney : '',
                time: detail.compensableDetail ? detail.compensableDetail.lawTime : ''
            }, () => {
                if (this.props.MoneySubmit) {
                    this.props.MoneySubmit(this.state.money)
                }
                if (this.props.TimeSubmit) {
                    this.props.TimeSubmit(this.state.time)
                }
                if (this.props.ConsultTypeSubmit) {
                    this.props.ConsultTypeSubmit(2)
                }
            })
        } else {
            this.setState({
                consultType: 1,
                money: detail.compensableDetail ? detail.compensableDetail.researchMoney : '',
                time: detail.compensableDetail ? detail.compensableDetail.researchTime : '',
                dzMoney: detail.compensableDetail ? detail.compensableDetail.money : '',
            }, () => {
                if (this.props.MoneySubmit) {
                    this.props.MoneySubmit(this.state.money)
                }
                if (this.props.TimeSubmit) {
                    this.props.TimeSubmit(this.state.time)
                }
                if (this.props.ConsultTypeSubmit) {
                    this.props.ConsultTypeSubmit(1)
                }
            })
        }
    }

    //协商的金额值
    consultMoney(value) {
        this.setState({
            consultMoney: value,
        })
    }

    //协商金额确认
    consultOk() {
        if (this.state.consultType === 3) {
            this.setState({
                dzMoney: this.state.consultMoney,
            }, () => {
                if (this.props.MoneySubmit) {
                    this.props.MoneySubmit(this.state.consultMoney)
                }
            })
        } else {
            this.setState({
                money: this.state.consultMoney,
            }, () => {
                if (this.props.MoneySubmit) {
                    this.props.MoneySubmit(this.state.consultMoney)
                }
            })
        }
        this.overlayView && this.overlayView.close()
    }

    //协商类型(协商金额modal)
    _applyType(index) {
        let detail = this.props.data
        let money = 0
        let time = ''
        if (index === 1) {
            money = detail.compensableDetail ? detail.compensableDetail.researchMoney : ''
            time = detail.compensableDetail ? detail.compensableDetail.researchTime : ''
        } else if (index === 3) {
            money = detail.compensableDetail ? detail.compensableDetail.money : ''
            time = detail.compensableDetail ? detail.compensableDetail.allTime : ''
        } else if (index === 2) {
            money = detail.compensableDetail ? detail.compensableDetail.lawMoney : ''
            time = detail.compensableDetail ? detail.compensableDetail.lawTime : ''
        }
        if (this.props.MoneySubmit) {
            this.props.MoneySubmit(money)
        }
        if (this.props.TimeSubmit) {
            this.props.TimeSubmit(time)
        }
        if (this.props.ConsultTypeSubmit) {
            this.props.ConsultTypeSubmit(index)
        }
        this.setState({
            consultType: index,
            time: time,
            moneySubmit: money
        })
        let overlayView = (
            <Overlay.View style={{alignItems: 'center', justifyContent: 'center'}}
                          modal={true}
                          overlayOpacity={0.5}
                          ref={v => this.overlayView = v}
            >
                <Modal
                    closeModal={() => this.overlayView && this.overlayView.close()}
                    ConsultMoney={(value) => this.consultMoney(value)}
                    consultOk={() => this.consultOk()}>
                </Modal>
            </Overlay.View>
        );
        Overlay.show(overlayView);
    }

    //确认协商
    _apply() {
        if (this.props.ConsultTask) {
            this.props.ConsultTask()
        }
        this.props.closeModal()
    }

    //协商时间
    _getTimePicker() {
        let years = [],
            months = [],
            days = [],
            hours = [],
            minutes = [],
            seconds = [];
        for (let i = 1; i < 51; i++) {
            years.push(i + 1980);
        }
        for (let i = 1; i < 13; i++) {
            months.push(formatNum(i));
        }
        for (let i = 1; i < 32; i++) {
            days.push(formatNum(i));
        }
        for (let i = 1; i < 25; i++) {
            hours.push(formatNum(i));
        }
        for (let i = 1; i < 61; i++) {
            minutes.push(formatNum(i));
        }
        for (let i = 1; i < 61; i++) {
            seconds.push(formatNum(i));
        }
        let pickerData = [years, months, days, hours, minutes, seconds];

        let myDate = new Date();//获取系统当前时间
        let selected = [myDate.getFullYear(),formatNum(myDate.getMonth()+1),formatNum(myDate.getDate()),formatNum(myDate.getHours()),formatNum(myDate.getMinutes()),formatNum(myDate.getSeconds())]
        Picker.init({
            pickerData,
            selectedValue: selected,
            pickerTitleText: '时间选择器',
            pickerCancelBtnText: '取消',
            pickerConfirmBtnText: '确定',
            wheelFlex: [2, 1, 1, 2, 1, 1],
            onPickerConfirm: pickedValue => {
                let date = `${pickedValue[0]}-${pickedValue[1]}-${pickedValue[2]} ${pickedValue[3]}:${pickedValue[4]}:${pickedValue[5]}`
                this.setState({
                    time: date
                })
                if (this.props.TimeSubmit) {
                    this.props.TimeSubmit(date)
                }
            },
            // onPickerCancel: pickedValue => {
            //   // 取消按钮事件
            //   console.log('area', pickedValue);
            // },
            onPickerSelect: pickedValue => {
                let targetValue = [...pickedValue];
                if (parseInt(targetValue[1]) === 2) {
                    if (targetValue[0] % 4 === 0 && targetValue[2] > 29) {
                        targetValue[2] = 29;
                    }
                    else if (targetValue[0] % 4 !== 0 && targetValue[2] > 28) {
                        targetValue[2] = 28;
                    }
                }
                else if (targetValue[1] in {4: 1, 6: 1, 9: 1, 11: 1} && targetValue[2] > 30) {
                    targetValue[2] = 30;
                }

                if (JSON.stringify(targetValue) !== JSON.stringify(pickedValue)) {

                    targetValue.map((v, k) => {
                        if (k !== 3) {
                            targetValue[k] = parseInt(v);
                        }
                    });
                    Picker.select(targetValue);
                    pickedValue = targetValue;
                }
            }
        });
        Picker.show();
    }


    render() {
        let detail = this.props.data
        let date = this.state.time.split(' ');
        let y = date[0];
        let nowYear = parseInt(y.split('-')[0]);
        let nowMonth = formatNum(parseInt(y.split('-')[1]));
        let nowDay = formatNum(parseInt(y.split('-')[2]));
        return (
            <View style={styles.apply_container}>
                <View>
                    <View style={styles.apply_title}>
                        <Text style={styles.apply_title_text}>选择任务类型</Text>
                    </View>
                    {
                        detail.statusTaskText === '执法任务' ?
                            <View style={styles.apply_type}>
                                <TouchableOpacity style={styles.apply_type_box_btag} onPress={() => this._applyType(2)}>
                                    <Text style={styles.apply_type_title}>执法金额</Text>
                                    <View style={styles.apply_type_money}>
                                        <Text style={styles.apply_type_money_type}>￥</Text>
                                        <Text style={styles.apply_type_money_text}>{this.state.money}</Text>
                                    </View>
                                    <Image style={styles.apply_type_btag}
                                           source={require('../../../../../assets/images/apply_type.png')}></Image>
                                </TouchableOpacity>
                            </View> :
                            <View style={styles.apply_type}>
                                <TouchableOpacity
                                    style={this.state.consultType === 1 ? styles.apply_type_box_btag : styles.apply_type_box}
                                    onPress={() => this._applyType(1)}>
                                    <Text style={styles.apply_type_title}>调查金额</Text>
                                    <View style={styles.apply_type_money}>
                                        <Text style={styles.apply_type_money_type}>￥</Text>
                                        <Text style={styles.apply_type_money_text}>{this.state.money}</Text>
                                    </View>
                                    {
                                        this.state.consultType === 1 ? <Image style={styles.apply_type_btag}
                                                                              source={require('../../../../../assets/images/apply_type.png')}></Image> : null
                                    }

                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={this.state.consultType === 3 ? styles.apply_type_box_btag : styles.apply_type_box}
                                    onPress={() => this._applyType(3)}>
                                    <Text style={styles.apply_type_title}>调查+执法金额</Text>
                                    <View style={styles.apply_type_money}>
                                        <Text style={styles.apply_type_money_type}>￥</Text>
                                        <Text style={styles.apply_type_money_text}>{this.state.dzMoney}</Text>
                                    </View>
                                    {
                                        this.state.consultType === 3 ? <Image style={styles.apply_type_btag}
                                                                              source={require('../../../../../assets/images/apply_type.png')}></Image> : null
                                    }

                                </TouchableOpacity>
                            </View>
                    }
                </View>
                <View>
                    <View style={styles.apply_title}>
                        <Text style={styles.apply_title_text}>预估完成时间</Text>
                    </View>
                    <TouchableOpacity style={styles.apply_type} onPress={this._getTimePicker.bind(this)}>
                        <View style={styles.apply_time}>
                            <Text style={styles.apply_time_time}>{nowYear}</Text>
                            <Text style={styles.apply_time_type}>年</Text>
                            <Text style={styles.apply_time_time}>{nowMonth}</Text>
                            <Text style={styles.apply_time_type}>月</Text>
                            <Text style={styles.apply_time_time}>{nowDay}</Text>
                            <Text style={styles.apply_time_type}>日</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.apply_btn} onPress={() => this._apply()}>
                    <Text style={styles.apply_btn_text}>确认</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    apply_container: {
        paddingLeft: ScreenUtil.scaleSize(30),
        paddingRight: ScreenUtil.scaleSize(30),
    },
    apply_title: {
        height: ScreenUtil.scaleSize(88),
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: '#e6e6e6',
        justifyContent: 'center'
    },
    apply_title_text: {
        fontSize: 18,
        color: '#7d8ebd',
    },
    apply_type: {
        flexDirection: 'row',
        marginTop: ScreenUtil.scaleSize(30),
        marginBottom: ScreenUtil.scaleSize(30),
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    apply_type_box: {
        width: ScreenUtil.scaleSize(330),
        height: ScreenUtil.scaleSize(150),
        paddingTop: ScreenUtil.scaleSize(25),
        paddingBottom: ScreenUtil.scaleSize(25),
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#ccc',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        /*borderRadius:ScreenUtil.scaleSize(15)*/
    },
    apply_type_box_btag: {
        width: ScreenUtil.scaleSize(330),
        height: ScreenUtil.scaleSize(150),
        paddingTop: ScreenUtil.scaleSize(25),
        paddingBottom: ScreenUtil.scaleSize(25),
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#668fff',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        /*borderRadius:ScreenUtil.scaleSize(15)*/
    },
    apply_type_title: {
        fontSize: 18,
        color: '#4d4d4d',
        height: ScreenUtil.scaleSize(50),
        lineHeight: ScreenUtil.scaleSize(50),
    },
    apply_type_money: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: ScreenUtil.scaleSize(50),
    },
    apply_type_money_type: {
        fontSize: 14,
        color: '#4d4d4d'
    },
    apply_type_money_text: {
        fontSize: 18,
        color: '#4d4d4d'
    },
    apply_type_btag: {
        position: 'absolute',
        right: -2,
        top: -2
    },
    apply_time: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    apply_time_time: {
        color: '#7d8ebd',
        fontSize: 30,
    },
    apply_time_type: {
        color: '#4d4d4d',
        fontSize: 18,
    },
    apply_btn: {
        height: ScreenUtil.scaleSize(80),
        backgroundColor: '#b2c7ff',
        borderRadius: ScreenUtil.scaleSize(50),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: ScreenUtil.scaleSize(50),
    },
    apply_btn_text: {
        fontSize: 20,
        color: '#fff'
    },
})