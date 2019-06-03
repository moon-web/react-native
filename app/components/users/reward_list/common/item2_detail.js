import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity} from 'react-native'
import styles from './style'

class Item extends Component {
    constructor() {
        super()
    }

    render() {
        let { data } = this.props
        let time = ''
        let money = ''
        if (data.statusTaskText === '调查任务') {
            money = data.compensableDetail.researchMoney
            time = data.compensableDetail.researchTime.substring(0, 11)
        } else if (data.statusTaskText === '执法任务') {
            money = data.compensableDetail.lawMoney
            time = data.compensableDetail.lawTime.substring(0, 11)
        } else if (data.statusTaskText === '调查+执法任务') {
            money = data.compensableDetail.money
            time = data.compensableDetail.allTime.substring(0, 11)
        }
        return (
            <View style={styles.container}>
                <View style={styles.rewardtask_item}>
                        <View style={styles.rewardtask_title_box}>
                            <Text style={styles.rewardtask_title} numberOfLines={1}>{data.name?data.name:''}</Text>
                            <Text style={styles.rewardtask_title_task}>{data.statusTaskText?data.statusTaskText:''}</Text>
                        </View>
                        <View style={styles.rewardtask_item_con}>
                            <View
                                style={[styles.rewardtask_item_con_item_box, styles.rewardtask_item_con_item_box_border]}>
                                <View style={styles.rewardtask_item_con_item}>
                                    <View style={[styles.rewardtask_item_con_list]}>
                                        <Image style={styles.rewardtask_item_con_bg}
                                               source={require('../../../../../assets/images/address.png')}></Image>
                                        <Text
                                            style={styles.rewardtask_item_con_list_title}>{data.address?data.address:''}</Text>
                                    </View>
                                </View>
                                <View style={styles.rewardtask_item_con_item}>
                                    <View style={[styles.rewardtask_item_con_list]}>
                                        <Image style={styles.rewardtask_item_con_bg}
                                               source={require('../../../../../assets/images/casetype.png')}></Image>
                                        <Text style={styles.rewardtask_item_con_list_title}>案件性质</Text>
                                    </View>
                                    <View style={styles.rewardtask_item_con_list}>
                                        {
                                            data.type === 1 ?
                                                <Text style={styles.rewardtask_item_con_list_casetype}>刑事案件</Text>
                                                : null
                                        }
                                        {
                                            data.type === 2 ?
                                                <Text style={styles.rewardtask_item_con_list_casetype}>行政案件</Text>
                                                : null
                                        }
                                    </View>
                                </View>
                                <View style={styles.rewardtask_item_con_item}>
                                    <View style={[styles.rewardtask_item_con_list]}>
                                        <Image style={styles.rewardtask_item_con_bg}
                                               source={require('../../../../../assets/images/casestep.png')}></Image>
                                        <Text style={styles.rewardtask_item_con_list_title}>案件进展</Text>
                                    </View>
                                    <View style={styles.rewardtask_item_con_list}>
                                        <Text style={styles.rewardtask_item_con_list_progress}>{data.statusText?data.statusText:''}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.rewardtask_item_con_item_box}>
                                <View style={styles.rewardtask_item_con_item}>
                                    <View style={[styles.rewardtask_item_con_list]}>
                                        {
                                            data.statusTaskText === '调查+执法任务' ?
                                                <Image style={styles.rewardtask_item_con_bg}
                                                       source={require('../../../../../assets/images/diao_zhi.png')}></Image>
                                                : <Image style={styles.rewardtask_item_con_bg}
                                                         source={require('../../../../../assets/images/diao_reward.png')}></Image>
                                        }
                                        <Text style={styles.rewardtask_item_con_list_title}>{data.statusTaskText?data.statusTaskText:''}</Text>
                                    </View>
                                    <View style={styles.rewardtask_item_con_list}>
                                        <Text style={styles.rewardtask_item_con_list_sing}>￥</Text>
                                        <Text style={styles.rewardtask_item_con_list_price}>{money}</Text>
                                    </View>
                                </View>
                                <View style={styles.rewardtask_item_con_item}>
                                    <View style={[styles.rewardtask_item_con_list]}>
                                        <Image style={styles.rewardtask_item_con_bg}
                                               source={require('../../../../../assets/images/rewardtime.png')}></Image>
                                        <Text style={styles.rewardtask_item_con_list_title}>预估完成时间</Text>
                                    </View>
                                    <View style={styles.rewardtask_item_con_list}>
                                        <Text style={styles.rewardtask_item_con_list_time}>{time}</Text>
                                    </View>
                                </View>
                            </View>
                            {
                                data.statusText === '协商中'?
                                    <View style={[styles.rewardtask_item_con_item_box, styles.rewardtask_item_con_item_box_border_top]}>
                                        <View style={styles.rewardtask_item_con_item}>
                                            <View style={[styles.rewardtask_item_con_list]}>
                                                <Image style={styles.rewardtask_item_con_bg}
                                                       source={require('../../../../../assets/images/diao_reward.png')}></Image>
                                                <Text style={styles.rewardtask_item_con_list_title}>协商金额</Text>
                                            </View>
                                            <View style={styles.rewardtask_item_con_list}>
                                                <Text style={styles.rewardtask_item_con_list_sing}>￥</Text>
                                                <Text style={styles.rewardtask_item_con_list_price}>{data.consultMoney?data.consultMoney:''}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.rewardtask_item_con_item}>
                                            <View style={[styles.rewardtask_item_con_list]}>
                                                <Image style={styles.rewardtask_item_con_bg}
                                                       source={require('../../../../../assets/images/rewardtime.png')}></Image>
                                                <Text style={styles.rewardtask_item_con_list_title}>协商任务完成时间</Text>
                                            </View>
                                            <View style={styles.rewardtask_item_con_list}>
                                                <Text style={styles.rewardtask_item_con_list_time}>{data.consultTime?data.consultTime.substring(0, 11):''}</Text>
                                            </View>
                                        </View>
                                    </View>:null
                            }
                        </View>
                </View>
            </View>
        )
    }
}

export default Item
