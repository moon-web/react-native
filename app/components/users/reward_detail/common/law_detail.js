import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native'
import { ScreenUtil } from '../../../../utils/util'
export default class LawDetail extends Component {

  render() {
    let data = this.props.data;
    return (
      <View style={styles.container}>
        <View style={styles.cells}>
          <View style={styles.sub_title}>
            <View style={styles.line}></View>
            <View style={styles.sub_title_wrap}>
              <Text style={styles.sub_title_text}>
                嫌疑人信息
              </Text>
            </View>
          </View>
          {
            data.suspect
              ? data.suspect.map((item, index) => {
                return (
                  <View key={index}>
                    <View style={styles.cell}>
                      <View style={styles.label}>
                        <Text style={styles.label_text}>
                          手机号码
                            </Text>
                      </View>
                      <View style={styles.text_warp}>
                        <Text style={styles.text}>
                          {
                            item.suspectName
                              ? item.suspectName
                              : ''
                          }
                        </Text>
                      </View>
                    </View>
                    <View style={styles.cell}>
                      <View style={styles.label}>
                        <Text style={styles.label_text}>
                          手机号码
                            </Text>
                      </View>
                      <View style={styles.text_warp}>
                        <Text style={styles.text}>
                          {
                            item.suspectPhone
                              ? item.suspectPhone
                              : ''
                          }
                        </Text>
                      </View>
                    </View>
                    <View style={styles.cell}>
                      <View style={styles.label}>
                        <Text style={styles.label_text}>
                          微信号
                            </Text>
                      </View>
                      <View style={styles.text_warp}>
                        <Text style={styles.text}>
                          {
                            item.suspectWeixin
                              ? item.suspectWeixin
                              : ''
                          }
                        </Text>
                      </View>
                    </View>
                  </View>
                )
              })
              : null
          }
        </View>
        <View style={styles.cells}>
          <View style={styles.sub_title}>
            <View style={styles.line}></View>
            <View style={styles.sub_title_wrap}>
              <Text style={styles.sub_title_text}>
                位置信息
              </Text>
            </View>
          </View>
          <View style={styles.cell}>
            <View style={styles.label}>
              <Text style={styles.label_text}>
                经营点地址
                  </Text>
            </View>
            <View style={styles.text_warp}>
              <Text style={styles.text} numberOfLines={10}>
                {data.storeAddress}
              </Text>
            </View>
          </View>
          <View style={styles.cell}>
            <View style={styles.label}>
              <Text style={styles.label_text}>
                仓库地址
                  </Text>
            </View>
            <View style={styles.text_warp}>
              <Text style={styles.text} numberOfLines={10}>
                {data.warehouseAddress}
              </Text>
            </View>
          </View>
          <View style={styles.cell}>
            <View style={styles.label}>
              <Text style={styles.label_text}>
                工厂地址
                  </Text>
            </View>
            <View style={styles.text_warp}>
              <Text style={styles.text} numberOfLines={10}>
                {data.factoryAddress}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.cells}>
          <View style={styles.sub_title}>
            <View style={styles.line}></View>
            <View style={styles.sub_title_wrap}>
              <Text style={styles.sub_title_text}>
                店铺连接
              </Text>
            </View>
          </View>
          {
            data.taobao
              ? data.taobao.map((item, index) => {
                return (
                  <View key={index}>
                    <View style={styles.title}>
                      <Text style={styles.label_text}>
                        链接{ index + 1 }
                      </Text>
                    </View>
                    <View style={styles.link_warp}>
                      <Text style={styles.link} numberOfLines={10}>
                        {
                          item.shopName
                            ? item.shopName
                            : ''
                        }
                      </Text>
                    </View>
                  </View>
                )
              })
              : null
          }
        </View>
        <View style={styles.img_content}>
          <View style={styles.sub_title}>
            <View style={styles.line}></View>
            <View style={styles.sub_title_wrap}>
              <Text style={styles.sub_title_text}>
                侵权照片
              </Text>
            </View>
          </View>
          <ScrollView horizontal={true}>
            {
              data._mainPics
                ? data._mainPics.map((item, index) => {
                  return (
                    <TouchableOpacity style={styles.image_item} key={index}>
                      <Image style={styles.image} source={{ uri: item.msgCode }} />
                      <View style={styles.desc_wrap}>
                        <Text style={styles.image_desc}>
                          {
                            item.imgDescrible
                              ? item.imgDescrible
                              : ''
                          }
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )
                })
                : null
            }
          </ScrollView>
        </View>
        <View style={styles.cells}>
          <View style={styles.sub_title}>
            <View style={styles.line}></View>
            <View style={styles.sub_title_wrap}>
              <Text style={styles.sub_title_text}>
                备注
              </Text>
            </View>
          </View>
          <View>
            <View style={styles.link_warp}>
              <Text style={styles.link} numberOfLines={10}>
                {
                  data.note
                }
              </Text>
            </View>
          </View>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: ScreenUtil.scaleSize(40),
    paddingRight: ScreenUtil.scaleSize(40),
    backgroundColor: '#fff'
  },
  cells: {
    paddingTop: ScreenUtil.scaleSize(30),
    paddingBottom: ScreenUtil.scaleSize(30)
  },
  cell: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    width: ScreenUtil.scaleSize(160),
  },
  label_text: {
    color: '#4d4d4d',
    fontSize: ScreenUtil.setSpText(14),
    lineHeight: ScreenUtil.scaleSize(48)
  },
  text_warp: {
    flex: 1
  },
  text: {
    textAlign: 'right',
    color: '#4d4d4d',
    lineHeight: ScreenUtil.scaleSize(40)
  },
  title: {
    height: ScreenUtil.scaleSize(80),
    justifyContent: 'center'
  },
  link_warp: {
    padding: ScreenUtil.scaleSize(20),
    backgroundColor: '#e6e6e6',
    borderRadius: ScreenUtil.scaleSize(10)
  },
  link: {
    lineHeight: ScreenUtil.scaleSize(40),
    color: '#808080'
  },
  img_content: {
    // paddingTop: ScreenUtil.scaleSize(30),
    // paddingBottom: ScreenUtil.scaleSize(30),
  },
  image_item: {
    width: ScreenUtil.scaleSize(280),
    height: ScreenUtil.scaleSize(226),
    marginRight: ScreenUtil.scaleSize(20),
    borderRadius: ScreenUtil.scaleSize(10),
    position: 'relative',
    overflow: 'hidden'
  },
  image: {
    width: ScreenUtil.scaleSize(280),
    height: ScreenUtil.scaleSize(226),
  },
  desc_wrap: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: ScreenUtil.scaleSize(60),
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: ScreenUtil.scaleSize(280),
    alignItems: 'center',
    justifyContent: 'center'
  },
  image_desc: {
    color: '#fff',
    fontSize: ScreenUtil.setSpText(14)
  },
  sub_title: {
    height: ScreenUtil.scaleSize(100),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: ScreenUtil.scaleSize(1),
    borderBottomColor: '#ccc',
    marginBottom: ScreenUtil.scaleSize(20)
  },
  line: {
    width: ScreenUtil.scaleSize(2),
    height: ScreenUtil.scaleSize(40),
    backgroundColor: '#3d569a'
  },
  sub_title_wrap: {
    paddingLeft: ScreenUtil.scaleSize(20),
    flex: 1
  },
  sub_title_text: {
    fontSize: ScreenUtil.setSpText(19),
    color: '#4d4d4d'
  }
})