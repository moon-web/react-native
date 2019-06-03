import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity} from 'react-native'
import styles from './style'

class Item extends Component {
    constructor() {
        super()
    }
    render() {
        let {data, navigation} = this.props
        return (
            <View style={styles.container}>
                <View style={styles.rewardtask_item}>
                    <TouchableOpacity onPress={() => navigation.navigate('RewardDetail', {
                        id: data.compensableId
                    })}>
                        <View style={styles.rewardtask_title_box}>
                            <Text style={styles.rewardtask_title} numberOfLines={1}>{data.compensable.name}</Text>
                            <Image style={styles.rewardtask_state}
                                   source={require('../../../../../assets/images/sheng.png')}></Image>
                        </View>
                        {
                            data.statusTaskText === '执法任务' ?
                                <View style={styles.rewardtask_item_con}>
                                    <View
                                        style={[styles.rewardtask_item_con_item_box, styles.rewardtask_item_con_item_box_border]}>
                                        <View style={styles.rewardtask_item_con_item}>
                                            <View style={[styles.rewardtask_item_con_list]}>
                                                <Image style={styles.rewardtask_item_con_bg}
                                                       source={require('../../../../../assets/images/diao_zhi.png')}></Image>
                                                <Text style={styles.rewardtask_item_con_list_title}>执法任务</Text>
                                            </View>
                                            <View style={styles.rewardtask_item_con_list}>
                                                <Text style={styles.rewardtask_item_con_list_sing}>￥</Text>
                                                <Text style={styles.rewardtask_item_con_list_price}>{data.lawMoney}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.rewardtask_item_con_item}>
                                            <View style={[styles.rewardtask_item_con_list]}>
                                                <Image style={styles.rewardtask_item_con_bg}
                                                       source={require('../../../../../assets/images/rewardtime.png')}></Image>
                                                <Text style={styles.rewardtask_item_con_list_title}>预估完成时间</Text>
                                            </View>
                                            <View style={styles.rewardtask_item_con_list}>
                                                <Text
                                                    style={styles.rewardtask_item_con_list_time}>{data.lawTime.substring(0, 11)}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>:
                                <View style={styles.rewardtask_item_con}>
                                    <View
                                        style={[styles.rewardtask_item_con_item_box, styles.rewardtask_item_con_item_box_border]}>
                                        <View style={styles.rewardtask_item_con_item}>
                                            <View style={[styles.rewardtask_item_con_list]}>
                                                <Image style={styles.rewardtask_item_con_bg}
                                                       source={require('../../../../../assets/images/diao_reward.png')}></Image>
                                                <Text style={styles.rewardtask_item_con_list_title}>调查任务</Text>
                                            </View>
                                            <View style={styles.rewardtask_item_con_list}>
                                                <Text style={styles.rewardtask_item_con_list_sing}>￥</Text>
                                                <Text style={styles.rewardtask_item_con_list_price}>{data.researchMoney}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.rewardtask_item_con_item}>
                                            <View style={[styles.rewardtask_item_con_list]}>
                                                <Image style={styles.rewardtask_item_con_bg}
                                                       source={require('../../../../../assets/images/rewardtime.png')}></Image>
                                                <Text style={styles.rewardtask_item_con_list_title}>预估完成时间</Text>
                                            </View>
                                            <View style={styles.rewardtask_item_con_list}>
                                                <Text
                                                    style={styles.rewardtask_item_con_list_time}>{data.researchTime.substring(0, 11)}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.rewardtask_item_con_item_box}>
                                        <View style={styles.rewardtask_item_con_item}>
                                            <View style={[styles.rewardtask_item_con_list]}>
                                                <Image style={styles.rewardtask_item_con_bg}
                                                       source={require('../../../../../assets/images/diao_zhi.png')}></Image>
                                                <Text style={styles.rewardtask_item_con_list_title}>调查+执法任务</Text>
                                            </View>
                                            <View style={styles.rewardtask_item_con_list}>
                                                <Text style={styles.rewardtask_item_con_list_sing}>￥</Text>
                                                <Text style={styles.rewardtask_item_con_list_price}>{data.money}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.rewardtask_item_con_item}>
                                            <View style={[styles.rewardtask_item_con_list]}>
                                                <Image style={styles.rewardtask_item_con_bg}
                                                       source={require('../../../../../assets/images/rewardtime.png')}></Image>
                                                <Text style={styles.rewardtask_item_con_list_title}>预估完成时间</Text>
                                            </View>
                                            <View style={styles.rewardtask_item_con_list}>
                                                <Text
                                                    style={styles.rewardtask_item_con_list_time}>{data.allTime.substring(0, 11)}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                        }

                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default Item
