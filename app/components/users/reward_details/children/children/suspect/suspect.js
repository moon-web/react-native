import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { Overlay } from 'teaset'
import styles from '../styles'
import SuspectModal from './modal'
import { getFormatDate } from '../../../../../../utils/util';

export default class Suspect extends Component {
  constructor(props) {
    super(props);
    this.overlayView = null;
    this.state = {
      CriminalAddress: '',
      CriminalName: '',
      CriminalNote: '',
      CriminalPhone: '',
      imgSrc: [],
      uploadImgs: [],
      currentIndex: 0
    }
  }

  // 编辑嫌疑人
  _editSuspect(element, index) {
    let imgs = [];
    element.imgSrc.split(',').map(item => {
      imgs.push({ msgCode: item })
    })
    this.setState({
      CriminalAddress: element.CriminalAddress,
      CriminalName: element.CriminalName,
      CriminalNote: element.CriminalNote,
      uploadImgs: imgs,
      CriminalPhone: element.CriminalPhone,
      currentIndex: index
    }, () => {
      this._showOverlay('edit')
    })
  }

  // 显示嫌疑人弹窗
  _showOverlay(type) {
    this.overlayView = (
      <Overlay.PullView side='bottom' modal={false} ref={v => this.overlayView = v}>
        <SuspectModal closeModal={() => this.overlayView && this.overlayView.close()}
          commitSuspect={(suspect) => this.commitSuspect(suspect)}
          type={type}
          CriminalAddress={this.state.CriminalAddress}
          CriminalName={this.state.CriminalName}
          CriminalNote={this.state.CriminalNote}
          imgSrc={this.state.uploadImgs}
          CriminalPhone={this.state.CriminalPhone} />
      </Overlay.PullView>
    );
    Overlay.show(this.overlayView);
  }

  commitSuspect(suspect) {
    let { suspectJson, userInfo, compensableDetail } = this.props;
    let data = [].concat(suspectJson);
    const index = this.state.currentIndex;
    data[index].CriminalAddress = suspect.CriminalAddress;
    data[index].CriminalName = suspect.CriminalName;
    data[index].CriminalNote = suspect.CriminalNote;
    data[index].CriminalPhone = suspect.CriminalPhone;
    data[index].imgSrc = suspect.imgSrc;
    data[index].time = getFormatDate('yyyy-MM-dd hh:mm:ss');
    data[index].nickName = userInfo.type === 4 ? userInfo.chargeNick : (userInfo.type === 5 ? userInfo.nickName : null) ;
    data[index].headImage = userInfo.headImage;
    let suspectData = {
      compensableId: compensableDetail.compensableId,
      suspectJson: JSON.stringify(data),
      suspectUserId: userInfo.userId
    }
    if (this.props.updateSuspect) {
      this.props.updateSuspect(suspectData, data)
    }
  }

  render() {
    let { suspectJson, compensableDetail } = this.props;
    return (
      <View>
        {
          suspectJson.map((item, index) => {
            return (
              <View style={styles.suspect} key={index}>
                <View style={styles.suspect_title}>
                  <View style={styles.userInfo}>
                    <Text style={styles.suspect_name}>{item.nickName}</Text>
                    <Text style={styles.suspect_time}>{item.time}</Text>
                  </View>
                  {
                    compensableDetail.status === 13 || compensableDetail.status === 23 || compensableDetail.status === 33 || compensableDetail.status === 14 || compensableDetail.status === 24 || compensableDetail.status === 34
                      ? <TouchableOpacity activeOpacity={0.5} onPress={() => this._editSuspect(item, index)}>
                        <Image style={styles.edit_icon} source={require('../../../../../../../assets/images/Criminal-photo.png')} />
                      </TouchableOpacity>
                      : null
                  }
                </View>
                <View style={styles.suspect_detail}>
                  <View style={styles.suspect_item}>
                    <View style={styles.label}>
                      <Image style={styles.label_icon} source={require('../../../../../../../assets/images/Criminal-info-name.png')} />
                      <Text style={styles.label_text}>姓名</Text>
                    </View>
                    <Text style={styles.item_text}>{item.CriminalName}</Text>
                  </View>
                  <View style={styles.suspect_item}>
                    <View style={styles.label}>
                      <Image style={styles.label_icon} source={require('../../../../../../../assets/images/Criminal-info-phone.png')} />
                      <Text style={styles.label_text}>电话</Text>
                    </View>
                    <Text style={styles.item_text}>{item.CriminalPhone}</Text>
                  </View>
                  <View style={styles.suspect_item}>
                    <View style={styles.label}>
                      <Image style={styles.label_icon} source={require('../../../../../../../assets/images/Criminal-info-address.png')} />
                      <Text style={styles.label_text}>地址</Text>
                    </View>
                    <Text style={styles.item_text}>{item.CriminalAddress}</Text>
                  </View>
                </View>
                <View style={styles.suspect_note}>
                  <Text style={styles.label_text}>备注：</Text>
                  <Text style={styles.item_text}>{item.CriminalNote}</Text>
                </View>
                <View style={styles.suspect_imgs}>
                  {
                    item.imgSrc ?
                      item.imgSrc.split(',').map((data, i) => {
                        return (
                          <Image key={i} style={styles.suspect_img} source={{ uri: data }} />
                        )
                      })
                      : null
                  }
                </View>
              </View>
            )
          })
        }
        {
          compensableDetail.status === 13 || compensableDetail.status === 23 || compensableDetail.status === 33 || compensableDetail.status === 14 || compensableDetail.status === 24 || compensableDetail.status === 34
            ? <View style={styles.btn_wrap}>
              <TouchableOpacity style={styles.add_btn} activeOpacity={0.5} onPress={() => this._showOverlay()}>
                <Text style={styles.btn_text}> + 新建嫌疑人</Text>
              </TouchableOpacity>
            </View>
            : null
        }
      </View>
    )
  }
}

