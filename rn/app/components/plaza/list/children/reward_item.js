import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { ScreenUtil } from '../../../../utils/util';

export default class RewardItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { navigation, data } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.reward_item} activeOpacity={0.5} onPress={() => navigation.navigate('RewardDetail', { id: data.id })}>
          <View style={styles.item_title}>
            <Text style={styles.titlt_text}>
              | 打赏任务
          </Text>
          </View>
          <View style={styles.content}>
            <View style={styles.list}>
              <View style={styles.lable}>
                <Image style={styles.icon} source={require('../../../../../assets/images/reward_iconaddress.png')} />
                <Text style={styles.lable_text}>案件地址</Text>
              </View>
              <View style={styles.text_wrap}>
                <Text style={styles.text}>
                  {data.address}
                </Text>
              </View>
            </View>
            <View style={styles.list}>
              <View style={styles.lable}>
                <Image style={styles.icon} source={require('../../../../../assets/images/rewardCaseNature.png')} />
                <Text style={styles.lable_text}>案件性质</Text>
              </View>
              <View style={styles.text_wrap}>
                <Text style={[styles.text, styles.text_red]}>
                  {data.type === 2 ? '行政事件' : '刑事事件'}
                </Text>
              </View>
            </View>
            {
              data.status.toString().slice(0, 1) === '2'
                ? <View style={styles.list}>
                  <View style={styles.lable}>
                    <Image style={styles.icon} source={require('../../../../../assets/images/reward_investigation.png')} />
                    <Text style={styles.lable_text}>执法奖励</Text>
                  </View>
                  <View style={styles.text_wrap}>
                    <Text style={[styles.text, styles.text_money]}>
                      ￥{data.compensableDetail.lawMoney}
                    </Text>
                  </View>
                </View>
                : (
                  <View>
                    <View style={styles.list}>
                      <View style={styles.lable}>
                        <Image style={styles.icon} source={require('../../../../../assets/images/reward_investigation.png')} />
                        <Text style={styles.lable_text}>调查奖励</Text>
                      </View>
                      <View style={styles.text_wrap}>
                        <Text style={[styles.text, styles.text_money]}>
                          ￥{data.compensableDetail.researchMoney}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.list}>
                      <View style={styles.lable}>
                        <Image style={styles.icon} source={require('../../../../../assets/images/reward_InvestigationIaw.png')} />
                        <Text style={styles.lable_text}>调查+执法奖励</Text>
                      </View>
                      <View style={styles.text_wrap}>
                        <Text style={[styles.text, styles.text_money]}>
                          ￥{data.compensableDetail.money}
                        </Text>
                      </View>
                    </View>
                  </View>
                )
            }
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: ScreenUtil.scaleSize(40),
    paddingBottom: ScreenUtil.scaleSize(20),
    paddingTop: ScreenUtil.scaleSize(20),
  },
  reward_item: {
    borderBottomRightRadius: ScreenUtil.scaleSize(30),
    backgroundColor: '#fff'
  },
  item_title: {
    backgroundColor: '#668fff',
    height: ScreenUtil.scaleSize(88),
    borderTopLeftRadius: ScreenUtil.scaleSize(15),
    borderTopRightRadius: ScreenUtil.scaleSize(15),
    paddingLeft: ScreenUtil.scaleSize(40),
    paddingRight: ScreenUtil.scaleSize(40),
    justifyContent: 'center'
  },
  titlt_text: {
    color: '#fff',
    fontSize: ScreenUtil.setSpText(16),
    fontWeight: '900'
  },
  content: {
    padding: ScreenUtil.scaleSize(40),
    borderBottomLeftRadius: ScreenUtil.scaleSize(30),
    borderBottomRightRadius: ScreenUtil.scaleSize(30),
  },
  list: {
    height: ScreenUtil.scaleSize(80),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: ScreenUtil.scaleSize(1),
    borderBottomColor: '#ddd'
  },
  lable: {
    width: ScreenUtil.scaleSize(260),
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    width: ScreenUtil.scaleSize(44),
    height: ScreenUtil.scaleSize(44)
  },
  lable_text: {
    flex: 1,
    fontSize: ScreenUtil.setSpText(14),
    color: '#4d4d4d'
  },
  text_wrap: {
    flex: 1
  },
  text: {
    fontSize: ScreenUtil.setSpText(14),
    color: '#4d4d4d',
    textAlign: 'right'
  },
  text_red: {
    color: '#f26364'
  },
  text_money: {
    color: '#658fff',
    fontSize: ScreenUtil.setSpText(24),
    fontWeight: '600'
  }
})