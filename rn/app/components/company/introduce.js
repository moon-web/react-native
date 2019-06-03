import React, { Component } from 'react';
import { ScrollView, Image, StyleSheet, Dimensions } from 'react-native';
import { ScreenUtil } from '../../utils/util';

export default class Introduce extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Image style={styles.introduce} resizeMode='stretch' source={require('../../../assets/images/introduce.png')} />
      </ScrollView>
    );
  }
}
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    width: width
  },
  introduce: {
    width: width,
    height: ScreenUtil.scaleSize(2412)
  }
})