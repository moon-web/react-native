import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { ScreenUtil } from '../../../../utils/util'
export default class Item extends Component {
  constructor(props) {
    super(props)
  }

  // 渲染状态文案组件
  _renderStatusText(status) {
    if ( status === 80 || status === 21 || status === 31 || status === 12 || status === 22 || status === 32 || status === 13 || status === 23 || status === 33 || status === 14 || status === 24 || status === 34 || status === 15 || status === 25 || status === 35 || status === 16 || status === 26 || status === 36 || status === 17) {
      return (
        <Text style={[styles.status_text, styles.text_blue]}>已通过</Text>
      )
    } else if ( status === 90 ) {
      return (
        <Text style={[styles.status_text, styles.text_red]}>未通过</Text>
      )
    } else if ( status === 0 ) {
      return (
        <Text style={[styles.status_text, styles.text_yello]}>待审核</Text>
      )
    }
  }

  // 渲染全部状态文案
  _renderStatus(status) {
    let statusText = '';
    if ( status === 21 || status === 31 ) {
      statusText = '待确认'
    } else if ( status === 12 || status === 22 || status === 32 ) {
      statusText = '协商中'
    }  else if ( status === 14 || status === 24 || status === 34 ) {
      statusText = '任务中'
    } else if ( status === 15 || status === 25 || status === 35 ) {
      statusText = '中止'
    } else if ( status === 16 || status === 26 || status === 36 || status === 17 || status === 97 ||  status === 80 ) {
      statusText = '已通过'
    } else if ( status === 90 ) {
      statusText = '未通过'
    } else if ( status === 0 ) {
      statusText = '待审核'
    }
    return statusText;
  }

  render() {
    const { data, navigation } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.content} activeOpacity={0.5} onPress={() => navigation.navigate('InvestigationDetail', { id: data.id })}>
          <View style={styles.item_top}>
            <View style={styles.cell}>
              <View style={styles.radius}></View>
              <View style={styles.top_mid}>
                <Text style={styles.top_text}>{data.name}</Text>
              </View>
            </View>
            <View style={styles.cell}>
              <View style={styles.radius}>
              </View>
              <View style={styles.top_mid}>
                <Text style={styles.address_text}>{data.address}</Text>
              </View>
              <View  style={styles.status}>
                {
                  this._renderStatusText(data.status)
                }
              </View>
            </View>
          </View>
          <View style={styles.item_bot}>
            <View style={styles.bot_info}>
              <View style={styles.time}>
                <Text style={styles.time_text}>{data.gmtCreate}</Text>
              </View>
              <View style={styles.status}>
                <Text style={styles.status_text}>
                {
                  this._renderStatus(data.status)
                }
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    paddingTop: ScreenUtil.scaleSize(30),
    paddingLeft: ScreenUtil.scaleSize(30),
    paddingRight: ScreenUtil.scaleSize(30),
    backgroundColor: '#fafbfc'
  },
  content: {
    backgroundColor: '#fff',
  },
  item_top: {
    borderBottomWidth: ScreenUtil.scaleSize(1),
    borderBottomColor: '#f2f2f2',
    paddingTop: ScreenUtil.scaleSize(40),
    paddingBottom: ScreenUtil.scaleSize(40),
    paddingLeft: ScreenUtil.scaleSize(30),
    paddingRight: ScreenUtil.scaleSize(30),
  },
  cell: {
    flexDirection: 'row',
    alignItems: 'center',
    height: ScreenUtil.scaleSize(60)
  },
  radius: {
    width: ScreenUtil.scaleSize(10),
    height: ScreenUtil.scaleSize(10),
    backgroundColor: '#ccc',
    borderRadius: ScreenUtil.scaleSize(5)
  },
  top_mid: {
    flex: 1,
    paddingLeft: ScreenUtil.scaleSize(20)
  },
  top_text: {
    fontSize: ScreenUtil.setSpText(14),
    color: '#333'
  },
  address_text: {
    fontSize: ScreenUtil.setSpText(12)
  },
  item_bot: {
    paddingTop: ScreenUtil.scaleSize(20),
    paddingBottom: ScreenUtil.scaleSize(20),
    paddingLeft: ScreenUtil.scaleSize(30),
    paddingRight: ScreenUtil.scaleSize(30),    
  },
  bot_info: {
    flexDirection: 'row',
    alignItems: 'center',
    height: ScreenUtil.scaleSize(58)
  },
  time: {
    flex: 1
  },
  time_text: {
    fontSize: ScreenUtil.setSpText(14),
    color: '#b3b3b3'
  },
  status: {
    width: ScreenUtil.scaleSize(140)
  },
  status_text: {
    fontSize: ScreenUtil.setSpText(12),
    textAlign: 'right',
    color: '#4d4d4d'
  },
  text_red: {
    color: '#f16464'
  },
  text_blue: {
    color: '#668fff'
  },
  text_yello: {
    color: '#fabb2b'
  }
})