import React, { Component } from 'react';
import { View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Carousel } from 'teaset'
import Header from '../../components/common/header/index'
import styles from './styles'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      swiper: {
        options: {
          carousel: true,       // 是否自动播放
          cycle: true,      // 水平/垂直轮播
          interval: 3000
        },
        data: [
          require('../../../assets/images/join.png')
        ]
      },
    }
  }

  // 渲染Item
  _renderImage() {
    const navigation = this.props.navigation;
    let imgs = this.state.swiper.data;
    let images = [];
    for (let i = 0; i < imgs.length; i++) {
      const element = imgs[i];
      images.push(
        <TouchableOpacity key={i} style={styles.slider} onPress={() => navigation.navigate("Introduce")}>
          <Image source={element} resizeMode='stretch' style={styles.sliderImag} />
        </TouchableOpacity>
      )
    }
    return images;
  }

  _switchTab(index) {
    if (this.props.switchTab) {
      this.props.switchTab(index)
    }
  }

  render() {
    const { navigation, address } = this.props;
    const { options } = this.state.swiper;
    return (
      <View style={styles.container}>
        <Header navigation={navigation} address={address} />
        <ScrollView>
          <Carousel style={styles.swiperWrapper}
            cycle={options.cycle}
            carousel={options.carousel}
            interval={options.interval}>
            {
              this._renderImage()
            }
          </Carousel>
          <TouchableOpacity style={styles.brannerWrap} activeOpacity={0.5} onPress={() => this._switchTab(2)}>
            <Image style={styles.branner} source={require('../../../assets/images/banner.jpg')} />
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}


