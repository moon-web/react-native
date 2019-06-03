import React, { Component } from 'react'
import { View, ScrollView, Text, Image } from 'react-native'
import styles from './styles'
export default class OnLineReport extends Component {
  constructor() {
    super()
  }
  
  getReportDetail (id) {
    if (this.props.getReportDetail) {
      this.props.getReportDetail(id)
    }
  }

  _renderImage(str) {
    if(!str) {
      return ''
    }
    let imags = [],
        ElementImg = [];
    if(/\,/g.test(str)) {
      imags = str.split(',')
    } else {
      imags = [str]
    }
    for (let i = 0; i < imags.length; i++) {
      const element = imags[i];
      ElementImg.push(
        <Image style={styles.reportItem_Img}
                      source={{uri: element}} key={element} />
      )
    }
    return ElementImg;
  }

  componentWillMount() {
    let id = this.props.navigation.getParam('id')
    this.getReportDetail(id)
  }

  render() {
    let taskType = this.props.navigation.getParam('taskType');
    const detail = this.props.detail;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.reportDetail_box}>
          <View style={styles.reportDetail}>
            {
              taskType === 1
                ? <View style={styles.reportDetail_item}>
                  <Text style={styles.reportDetail_item_title}>所在平台：</Text>
                  <Text style={styles.reportDetail_item_con}>{detail.platformText ? detail.platformText : ''}</Text>
                </View>
                : [
                  <View style={styles.reportDetail_item} key='1'>
                    <Text style={styles.reportDetail_item_title}>商品类别：</Text>
                    <Text style={styles.reportDetail_item_con}>{detail.kind ? detail.kind : ''}</Text>
                  </View>,
                  <View style={styles.reportDetail_item} key='2'>
                    <Text style={styles.reportDetail_item_title}>现场位置：</Text>
                    <Text style={styles.reportDetail_item_con}>{detail.address ? detail.address : ''}</Text>
                  </View>,
                  <View style={styles.reportDetail_item} key='3'>
                    <Text style={styles.reportDetail_item_title}>详细位置：</Text>
                    <Text style={styles.reportDetail_item_con}>{detail.detailAddress ? detail.detailAddress : ''}</Text>
                  </View>]
            }
            <View style={styles.reportDetail_item}>
              <Text style={styles.reportDetail_item_title}>
                {
                  taskType === 1
                    ? '举报时间：'
                    : '现场时间：'
                }
              </Text>
              <Text style={styles.reportDetail_item_con}>{detail.reportTime ? detail.reportTime : ''}</Text>
            </View>
            {
              taskType === 1
                ? <View style={styles.reportDetail_item_other}>
                  <Text style={styles.reportDetail_item_title_other}>商品链接：</Text>
                  <Text style={styles.reportDetail_item_con_other}>{detail.goodsLink ? detail.goodsLink : ''}</Text>
                </View>
                : ''
            }
            <View style={styles.reportDetail_item}>
              <Text style={styles.reportDetail_item_title}>假冒品牌：</Text>
              <Text style={styles.reportDetail_item_con}>{detail.brand ? detail.brand : ''}</Text>
            </View>
            <View style={[styles.reportDetail_item, { borderBottomWidth: 0 }]}>
              <Text style={styles.reportDetail_item_title}>商品截图：</Text>
              <View style={styles.reportDetail_item_con_img}>
                {
                  this._renderImage(detail._mainPics)
                }
              </View>
            </View>
            <View style={styles.reportDetail_item_other}>
              <Text style={styles.reportDetail_item_title_other}>备注：</Text>
              <Text style={styles.reportDetail_item_con_other}>{detail.note ? detail.note : '暂无备注'}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }
}

