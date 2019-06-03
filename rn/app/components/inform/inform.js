import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, Platform, StatusBar } from 'react-native';
import { Carousel } from 'teaset'
import { ScreenUtil } from '../../utils/util'

export default class Inform extends Component {
  constructor(props) {
    super(props)
    this.state = {
      swiper: {
        options: {
          carousel: true,       // 是否自动播放
          cycle: true,      // 水平/垂直轮播
          interval: 2500,
          control: true
        },
        data: [
          require('../../../assets/images/join.png'),
          require('../../../assets/images/pigpeiqi.jpg'),
          require('../../../assets/images/qidainide-jiaru.jpg')
        ]
      }
    }
  }
  render() {
    const { options } = this.state.swiper;
    let userInfo = this.props.userInfo;
    return (
      <View style={styles.container}>
        <View style={Platform.OS === 'ios' ? styles.statusBar : styles.statusBarAndroid }></View>
        <ScrollView>
          <View style={styles.reportBanners}>
            <Carousel
              style={styles.swiperWrapper}
              cycle={options.cycle}
              carousel={options.carousel}
              control={options.control}
              interval={options.interval}>
              {
                this.state.swiper.data.map((item, index) => {
                  return (
                    <View style={styles.slider} key={index}>
                      <Image style={styles.sliderImag} source={item} />
                    </View>
                  )
                })
              }
            </Carousel>
          </View>
          {/* <View style={styles.reportEmpey}></View> */}
          <View style={styles.reportWrapper}>
            {
              (userInfo.type === 5 || userInfo.type === 4) && userInfo.checkStatus === 1
                ? <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigation.navigate('Investigation')} style={styles.InvestigationReport}>
                  <View style={styles.InvestigationReport_Img}>
                    <Image source={require('../../../assets/images/InvestigationReport.png')} style={styles.reportImg}></Image>
                  </View>
                  <View style={styles.InvestigationReport_wrapper}>
                    <View style={styles.InvestigationReport_Text}>
                      <Text style={styles.InvestigationReport_TextTitle}>调查举报</Text>
                      <Text style={styles.InvestigationReport_TextInf}>调查员线索举报专用入口</Text>
                    </View>
                    <View>
                      <Image source={require('../../../assets/images/reportextend.png')} style={styles.reportsextend}></Image>
                    </View>
                  </View>
                </TouchableOpacity>
                : null
            }
            <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigation.navigate('OfflineInform')} style={styles.InvestigationReport}>
              <View style={styles.InvestigationReport_Img}>
                <Image source={require('../../../assets/images/p_underLine.png')} style={styles.reportImg}></Image>
              </View>
              <View style={styles.InvestigationReport_wrapper}>
                <View style={styles.InvestigationReport_Text}>
                  <Text style={styles.InvestigationReport_TextTitle}>线下举报</Text>
                  <Text style={styles.InvestigationReport_TextInf}>志愿者可参与活动进行举报</Text>
                </View>
                <View>
                  <Image source={require('../../../assets/images/reportextend.png')} style={styles.reportsextend}></Image>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigation.navigate('VolunteerInform')} style={styles.InvestigationReport}>
              <View style={styles.InvestigationReport_Img}>
                <Image source={require('../../../assets/images/p_onLine.png')} style={styles.reportImg}></Image>
              </View>
              <View style={styles.InvestigationReport_wrapper}>
                <View style={styles.InvestigationReport_Text}>
                  <Text style={styles.InvestigationReport_TextTitle}>志愿举报</Text>
                  <Text style={styles.InvestigationReport_TextInf}>线上平台的假货线索举报</Text>
                </View>
                <View>
                  <Image source={require('../../../assets/images/reportextend.png')} style={styles.reportsextend}></Image>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

let { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  statusBar: {
    height: ScreenUtil.scaleSize(40),
    backgroundColor: '#fff'
  },
  statusBarAndroid: {
    height: 0
  },
  reportWrapper: {
    backgroundColor: '#fff',
    paddingBottom: ScreenUtil.scaleSize(40),
    paddingLeft: ScreenUtil.scaleSize(30),
    paddingRight: ScreenUtil.scaleSize(30),
  },
  reportBanners: {
    backgroundColor: '#fff',
    paddingTop: ScreenUtil.scaleSize(30),
    paddingLeft: ScreenUtil.scaleSize(30),
    paddingRight: ScreenUtil.scaleSize(30),
    paddingBottom: ScreenUtil.scaleSize(30),
  },
  swiperWrapper: {
    height: ScreenUtil.scaleSize(360),
    flex: 1
  },
  slider: {
    width: width - ScreenUtil.scaleSize(60),
    height: ScreenUtil.scaleSize(360),
    borderRadius: ScreenUtil.scaleSize(10),
    overflow: 'hidden'
  },
  sliderImag: {
    width: width - ScreenUtil.scaleSize(60),
    height: ScreenUtil.scaleSize(360),
  },
  reportEmpey: {
    height: ScreenUtil.scaleSize(20),
  },
  InvestigationReport: {
    height: ScreenUtil.scaleSize(220),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  InvestigationReport_Img: {
    width: ScreenUtil.scaleSize(180),
    height: ScreenUtil.scaleSize(180),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: ScreenUtil.scaleSize(10),
  },
  InvestigationReport_Text: {
    width: ScreenUtil.scaleSize(450),
    height: 120,
  },
  InvestigationReport_TextTitle: {
    fontSize: ScreenUtil.setSpText(18),
    color: '#4d4d4d',
    lineHeight: ScreenUtil.scaleSize(130),
    height: ScreenUtil.scaleSize(100),
    fontWeight: '600'
  },
  InvestigationReport_TextInf: {
    fontSize: ScreenUtil.setSpText(14),
    color: '#b3b3b3',
    lineHeight: ScreenUtil.scaleSize(60),
    height: ScreenUtil.scaleSize(60),
    fontWeight: '400'
  },
  reportsextend: {
    width: ScreenUtil.scaleSize(48),
    height: ScreenUtil.scaleSize(60)
  },
  InvestigationReport_wrapper: {
    borderBottomWidth: ScreenUtil.scaleSize(2),
    borderColor: '#f2f2f2',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1
  },
  reportImg: {
    width: ScreenUtil.scaleSize(120),
    height: ScreenUtil.scaleSize(120),
  }


})