import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import { ScreenUtil } from '../../../../utils/util'
class ReportItem extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  _renderImage(str) {
    if(!str) {
      return <Image style={styles.reportItem_Img}
      source={require('../../../../../assets/images/peple.png')} />;
    }
    if(/\,/.test(str)) {
      let uri = str.split(',')[0];
      return <Image style={styles.reportItem_Img}
      source={{ uri: uri }} />
    } else {
      return <Image style={styles.reportItem_Img}
      source={{ uri: str }} />
    }
  }

  render() {
    const { data, navigation, type } = this.props;
    let router = ''
    if (type === 'report') {
      router = 'ReportDetail'
    } else {
      router = 'WorkDatalis'
    }
    return (
      <View style={styles.container}>
        <View style={styles.report_container}>
          <TouchableOpacity
            onPress={() => navigation.navigate(router, {
              id: data.id,
              taskType: data.type,
              TaskId: data.taskId,
            })}>
            <View style={styles.reportItem}>
              {
                this._renderImage(data._mainPics)
              }
              <View style={styles.reportBox}>
                <Text
                  style={[styles.reportBox_con, styles.reportBox_con_other]}>
                  {
                    data.type === 1
                      ? '所在平台：'
                      : '商品类别：'
                  }
                  {
                    data.type === 1
                      ? data.platformName
                      : data.kind
                  }
                </Text>
                <Text style={styles.reportBox_con}>举报时间：{data.reportTime}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
export default ReportItem
const styles = StyleSheet.create({
  container: {
    paddingTop: ScreenUtil.scaleSize(30),
    paddingLeft: ScreenUtil.scaleSize(30),
    paddingRight: ScreenUtil.scaleSize(30)
  },
  reportItem: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: ScreenUtil.scaleSize(20)
  },
  reportItem_Img: {
    width: ScreenUtil.scaleSize(160),
    height: ScreenUtil.scaleSize(160),
    borderRadius: ScreenUtil.scaleSize(20)
  },
  reportBox: {
    paddingLeft: ScreenUtil.scaleSize(20),
    flex: 1
  },
  reportBox_con: {
    lineHeight: ScreenUtil.scaleSize(60),
    color: '#ababab',
    fontSize: ScreenUtil.setSpText(12),
  },
  reportBox_con_other: {
    fontSize: ScreenUtil.setSpText(14),
    color: '#8f8f8f'
  }
})