import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import HeaderDetail from '../reward_list/common/item2_detail'
import LawDetail from '../reward_detail/common/law_detail'
import styles from './styles'

export default class InvestigationDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      taskActiveIndex: 0
    }
  }

  componentWillMount() {
    let id = this.props.navigation.getParam('id')
    this.props.getInvestigationDetail({id})
  }


  render() {
    let { detail } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <View style={styles.blue_container}>
            </View>
            <View style={styles.posi_header}>
              <HeaderDetail data={detail} />>
              </View>
          </View>
          <View style={styles.tab_content}>
            <LawDetail data={detail}/>
          </View>
        </ScrollView>
      </View>
    )
  }
}