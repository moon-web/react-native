import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import styles from '../styles'
import { Overlay } from 'teaset'
import LawModal from './law_modal'
import { getFormatDate } from '../../../../../../utils/util';
const editImage = require('../../../../../../../assets/images/Criminal-photo.png');

export default class Law extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      num: '',
      note: '',
      type: '',
      uploadImgs: []
    }
  }
  // 显示嫌疑人弹窗
  _showOverlay(type, data) {
    this.overlayView = (
      <Overlay.PullView side='bottom' modal={false} ref={v => this.overlayView = v}>
        <LawModal closeModal={() => this.overlayView && this.overlayView.close()}
          commitSuspect={(suspect) => this.commitSuspect(suspect)}
          editType={type}
          data={data}/>
      </Overlay.PullView>
    );
    Overlay.show(this.overlayView);
  }

  commitSuspect(object) {
    let index, compensableDetail = this.props.compensableDetail;
    let data = Object.assign({},compensableDetail);
    let userInfo = this.props.userInfo;
    switch (object.name) {
      case 'communication':
        index = 0;
        break;
      case 'resource':
        index = 1;
        break;
      case 'isPolice':
        index = 2;
        break;
      case 'notice':
        index = 3;
        break;
      case 'hitTime':
        index = 4;
        break;
      case 'move':
        index = 5;
        break;
      case 'law':
        index = 6;
        break;
    }
    data.userInfo[index]['nickName' + index] =  userInfo.type === 4 ? userInfo.chargeNick : (userInfo.type === 5 ? userInfo.nickName : null);
    data.userInfo[index]['headImage' + index] =  userInfo.headImage;
    data.userInfo[index]['time' + index] = getFormatDate('yyyy-MM-dd hh:mm:ss');
    data[object.name] = object.data;
    let detailData = {
      compensableId: data.compensableId,
      communication: data.communication,
      resource: data.resource,
      isPolice: data.isPolice,
      notice: data.notice.toString(),
      hitTime: data.hitTime,
      move: data.move.toString(),
      law: data.law.toString(),
      userInfo:  JSON.stringify(data.userInfo)
    }
    if (this.props.updateLaw) {
      this.props.updateLaw(detailData, data)
    }
  }

  render() {
    let { compensableDetail } = this.props;
    return (
      <View>
        <View style={styles.suspect}>
          <View style={styles.suspect_title}>
            <View style={styles.userInfo}>
              <Text style={styles.suspect_name}>{compensableDetail.userInfo ? compensableDetail.userInfo[0].nickName0 : ''}</Text>
              <Text style={styles.suspect_time}>{compensableDetail.userInfo ? compensableDetail.userInfo[0].time0 : ''}</Text>
            </View>
            {
              compensableDetail.status === 13 || compensableDetail.status === 23 || compensableDetail.status === 33 || compensableDetail.status === 14 || compensableDetail.status === 24 || compensableDetail.status === 34
                ? <TouchableOpacity activeOpacity={0.5} onPress={() => this._showOverlay('string',  {title: '执法沟通情况', data: compensableDetail.communication, name: 'communication'})}>
                  <Image style={styles.edit_icon} source={editImage} />
                </TouchableOpacity>
                : null
            }
          </View>
          <View style={styles.suspect_detail}>
            <Text style={styles.law_info}>执法沟通情况</Text>
          </View>
          <View style={styles.law_footer}>
            <Text style={styles.law_note}>{compensableDetail.communication}</Text>
          </View>
        </View>
        <View style={styles.suspect}>
          <View style={styles.suspect_title}>
            <View style={styles.userInfo}>
              <Text style={styles.suspect_name}>{compensableDetail.userInfo ? compensableDetail.userInfo[1].nickName1 : ''}</Text>
              <Text style={styles.suspect_time}>{compensableDetail.userInfo ? compensableDetail.userInfo[1].time1 : ''}</Text>
            </View>
            {
              compensableDetail.status === 13 || compensableDetail.status === 23 || compensableDetail.status === 33 || compensableDetail.status === 14 || compensableDetail.status === 24 || compensableDetail.status === 34
                ? <TouchableOpacity activeOpacity={0.5} onPress={() => this._showOverlay('string', {title: '执法资源情况', data: compensableDetail.resource, name: 'resource'})}>
                  <Image style={styles.edit_icon} source={editImage} />
                </TouchableOpacity>
                : null
            }
          </View>
          <View style={styles.suspect_detail}>
            <Text style={styles.law_info}>执法资源情况</Text>
          </View>
          <View style={styles.law_footer}>
            <Text style={styles.law_note}>{compensableDetail.resource}</Text>
          </View>
        </View>
        <View style={styles.suspect}>
          <View style={styles.suspect_title}>
            <View style={styles.userInfo}>
              <Text style={styles.suspect_name}>{compensableDetail.userInfo ? compensableDetail.userInfo[2].nickName2 : ''}</Text>
              <Text style={styles.suspect_time}>{compensableDetail.userInfo ? compensableDetail.userInfo[2].time2 : ''}</Text>
            </View>
            {
              compensableDetail.status === 13 || compensableDetail.status === 23 || compensableDetail.status === 33 || compensableDetail.status === 14 || compensableDetail.status === 24 || compensableDetail.status === 34
                ? <TouchableOpacity activeOpacity={0.5} onPress={() => this._showOverlay('boolean', {title: '是否已报案', data: compensableDetail.isPolice, name: 'isPolice'})}>
                  <Image style={styles.edit_icon} source={editImage} />
                </TouchableOpacity>
                : null
            }
          </View>
          <View style={styles.suspect_detail}>
            <Text style={styles.law_info}>是否已报案</Text>
          </View>
          <View style={styles.law_footer}>
            <Text style={styles.law_note}>{compensableDetail.isPolice === 1 ? '已报案' : '未报案'}</Text>
          </View>
        </View>
        <View style={styles.suspect}>
          <View style={styles.suspect_title}>
            <View style={styles.userInfo}>
              <Text style={styles.suspect_name}>{compensableDetail.userInfo ? compensableDetail.userInfo[3].nickName3 : ''}</Text>
              <Text style={styles.suspect_time}>{compensableDetail.userInfo ? compensableDetail.userInfo[3].time3 : ''}</Text>
            </View>
            {
              compensableDetail.status === 13 || compensableDetail.status === 23 || compensableDetail.status === 33 || compensableDetail.status === 14 || compensableDetail.status === 24 || compensableDetail.status === 34
                ? <TouchableOpacity activeOpacity={0.5} onPress={() => this._showOverlay('file', {title: '立案通知书', data: compensableDetail.notice, name: 'notice'})}>
                  <Image style={styles.edit_icon} source={editImage} />
                </TouchableOpacity>
                : null
            }
          </View>
          <View style={styles.suspect_detail}>
            <Text style={styles.law_info}>立案通知书</Text>
          </View>
          <View style={styles.law_footer}>
            <View style={styles.law_img_wrap}>
              {
                compensableDetail.notice.length > 0
                  ? <Image style={styles.law_img} source={require('../../../../../../../assets/images/Criminal-book-note-bg.png')} />
                  : <Image style={styles.law_img} source={editImage} />
              }
            </View>
          </View>
        </View>
        <View style={styles.suspect}>
          <View style={styles.suspect_title}>
            <View style={styles.userInfo}>
              <Text style={styles.suspect_name}>{compensableDetail.userInfo ? compensableDetail.userInfo[4].nickName4 : ''}</Text>
              <Text style={styles.suspect_time}>{compensableDetail.userInfo ? compensableDetail.userInfo[4].time4 : ''}</Text>
            </View>
            {
              compensableDetail.status === 13 || compensableDetail.status === 23 || compensableDetail.status === 33 || compensableDetail.status === 14 || compensableDetail.status === 24 || compensableDetail.status === 34
                ? <TouchableOpacity activeOpacity={0.5} onPress={() => this._showOverlay('time', {title: '打击时间', data: compensableDetail.hitTime, name: 'hitTime'})}>
                  <Image style={styles.edit_icon} source={editImage} />
                </TouchableOpacity>
                : null
            }
          </View>
          <View style={styles.suspect_detail}>
            <Text style={styles.law_info}>打击时间</Text>
          </View>
          <View style={styles.law_footer}>
            <Text style={styles.law_note}>{compensableDetail.hitTime}</Text>
          </View>
        </View>
        <View style={styles.suspect}>
          <View style={styles.suspect_title}>
            <View style={styles.userInfo}>
              <Text style={styles.suspect_name}>{compensableDetail.userInfo ? compensableDetail.userInfo[5].nickName5 : ''}</Text>
              <Text style={styles.suspect_time}>{compensableDetail.userInfo ? compensableDetail.userInfo[5].time5 : ''}</Text>
            </View>
            {
              compensableDetail.status === 13 || compensableDetail.status === 23 || compensableDetail.status === 33 || compensableDetail.status === 14 || compensableDetail.status === 24 || compensableDetail.status === 34
                ? <TouchableOpacity activeOpacity={0.5} onPress={() => this._showOverlay('file', {title: '打击完成', data: compensableDetail.move, name: 'move'})}>
                  <Image style={styles.edit_icon} source={editImage} />
                </TouchableOpacity>
                : null
            }
          </View>
          <View style={styles.suspect_detail}>
            <Text style={styles.law_info}>打击完成</Text>
          </View>
          <View style={styles.law_footer}>
            <View style={styles.law_img_wrap}>
              {
                compensableDetail.move.length > 0
                  ? <Image style={styles.law_img} source={require('../../../../../../../assets/images/Criminal-book-note-bg.png')} />
                  : <Image style={styles.law_img} source={editImage} />
              }

            </View>
          </View>
        </View>
        <View style={styles.suspect}>
          <View style={styles.suspect_title}>
            <View style={styles.userInfo}>
              <Text style={styles.suspect_name}>{compensableDetail.userInfo ? compensableDetail.userInfo[6].nickName6 : ''}</Text>
              <Text style={styles.suspect_time}>{compensableDetail.userInfo ? compensableDetail.userInfo[6].time6 : ''}</Text>
            </View>
            {
              compensableDetail.status === 13 || compensableDetail.status === 23 || compensableDetail.status === 33 || compensableDetail.status === 14 || compensableDetail.status === 24 || compensableDetail.status === 34
                ? <TouchableOpacity activeOpacity={0.5} onPress={() => this._showOverlay('file',  {title: '执法文书', data: compensableDetail.law, name: 'law'})}>
                  <Image style={styles.edit_icon} source={editImage} />
                </TouchableOpacity>
                : null
            }
          </View>
          <View style={styles.suspect_detail}>
            <Text style={styles.law_info}>执法文书</Text>
          </View>
          <View style={styles.law_footer}>
            <View style={styles.law_img_wrap}>
              {
                compensableDetail.law.length > 0
                  ? <Image style={styles.law_img} source={require('../../../../../../../assets/images/Criminal-book-note-bg.png')} />
                  : <Image style={styles.law_img} source={require('../../../../../../../assets/images/Criminal-book-note.png')} />
              }
            </View>
            <Text style={styles.law_msg}>【行政处罚通知书、取保候审通知书/逮捕证】均可上传</Text>
          </View>
        </View>
      </View>
    )
  }
}

