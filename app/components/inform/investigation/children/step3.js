import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import RadioGroup from 'react-native-radio-buttons-group'
import MyInput from '../../../common/extends/myInput'
import styles from './styles'

export default class Investigation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      law: '',
      laws:
        [
          {
            key: 1,
            title: '公安'
          },
          {
            key: 2,
            title: '工商'
          },
          {
            key: 3,
            title: '质监'
          }
        ],
      investigates:
        [
          {
            label: '有',
            color: '#ccc',
            num: 1,
            selected: false
          },
          {
            label: '无',
            color: '#ccc',
            num: 2,
            selected: true
          }
        ],
      investigate: 2,
      note: ''
    }
  }

  componentWillMount() {
    let { law, investigate, note } = this.props;
    this.setState({
      law,
      investigate,
      note
    })
  }

  _selectLaw(key) {
    this.setState({
      law: key
    })
    if (this.props.setLaw) {
      this.props.setLaw(key)
    }
  }

  onPress(data) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].selected === true) {
        this.setState({
          investigate: data[i].num,
        })
        if (this.props.setInvestigate) {
          this.props.setInvestigate(data[i].num)
        }
      }
    }
  }

  _changeNote(text) {
    this.setState({
      note: text
    })
    if (this.props.setNote) {
      this.props.setNote(text)
    }
  }

  render() {
    return (
      <View>
        <View>
          <View style={styles.content}>
            <View style={styles.inputWrap}>
              <Text style={styles.label}>
                调查资源
              </Text>
              <RadioGroup radioButtons={this.state.investigates} onPress={this.onPress.bind(this)} style={styles.radioGroups} flexDirection='row' size={20} />
            </View>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.itemTitle}>
            <Text style={styles.itemTitle_text}>执法资源</Text>
          </View>
          <View style={[styles.content, { flexDirection: 'row' }]}>
            {
              this.state.laws.map((item, index) => {
                return (
                  <TouchableOpacity style={[styles.tag, item.key === this.state.law ? styles.tag_active : '']} key={index} onPress={() => this._selectLaw(item.key)} activeOpacity={0.5}>
                    {
                      item.title
                        ? <Text style={styles.tagText}>
                          {item.title}
                        </Text>
                        : null
                    }
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.itemTitle}>
            <Text style={styles.itemTitle_text}>备注</Text>
          </View>
          <View style={styles.content}>
            <View style={styles.textareaWrap}>
              <MyInput style={styles.textarea} onChangeText={text => this._changeNote(text)} value={this.state.note} placeholder='请输入你认为是假货嫌疑的理由' multiline={true} />
            </View>
          </View>
        </View>
      </View>
    )
  }
}
