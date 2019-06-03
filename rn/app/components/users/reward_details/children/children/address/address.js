import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { Overlay } from 'teaset'
import styles from '../styles'
import AddressModal from './address_modal'
import { getFormatDate } from '../../../../../../utils/util';

export default class Address extends Component {
  constructor(props) {
    super(props);
    this.overlayView = null;
    this.state = {
      address: '',
      note: '',
      num: '',
      type: '',
      imgSrc: [],
      uploadImgs: [],
      currentIndex: 0
    }
  }

  // 编辑地址
  _editAddress(element, index) {
    let imgs = [];
    element.imgs.map(item => {
      imgs.push({ msgCode: item })
    })
    this.setState({
      address: element.address,
      note: element.note,
      num: element.num,
      type: element.type,
      uploadImgs: imgs,
      currentIndex: index
    }, () => {
      this._showOverlay('edit')
    })
  }

  // 显示嫌疑人弹窗
  _showOverlay(type) {
    this.overlayView = (
      <Overlay.PullView side='bottom' modal={false} ref={v => this.overlayView = v}>
        <AddressModal closeModal={() => this.overlayView && this.overlayView.close()}
          commitSuspect={(address) => this.commitSuspect(address)}
          editType={type}
          address={this.state.address}
          num={this.state.num}
          note={this.state.note}
          type={this.state.type}
          imgSrc={this.state.uploadImgs} />
      </Overlay.PullView>
    );
    Overlay.show(this.overlayView);
  }

  _addAddress() {
    this.setState({
      address: '',
      note: '',
      num: '',
      type: '',
      uploadImgs: [],
      currentIndex: 'add'
    }, () => {
      this._showOverlay()
    })
  }

  commitSuspect(object) {
    let { addressJson, userInfo, compensableDetail } = this.props;
    let data = [].concat(addressJson);
    const index = this.state.currentIndex;
    let obj = {};
    if (object.type === 1) {
      obj.Jaddress = object.address;
      obj.Jnote = object.note;
      obj.Jnum = object.num;
      obj.operatePic = object.imgSrc;
    } else if (object.type === 2) {
      obj.Caddress = object.address;
      obj.Cnote = object.note;
      obj.Cnum = object.num;
      obj.warehousePic = object.imgSrc;
    } else if (object.type === 3) {
      obj.Gaddress = object.address;
      obj.Gnote = object.note;
      obj.switchBtag = object.num;
      obj.GPic = object.imgSrc;
    }
    obj.type = object.type;
    obj.time = getFormatDate('yyyy-MM-dd hh:mm:ss');
    obj.nickName = userInfo.type === 4 ? userInfo.chargeNick : (userInfo.type === 5 ? userInfo.nickName : null);
    obj.headImage = userInfo.headImage;
    if (index === 'add') {
      data.unshift(obj)
    } else {
      data[index] = obj;
    }
    for (let i = 0; i < data.length; i++) {
      delete data[i].address;
      delete data[i].imgs;
      delete data[i].note;
      delete data[i].num;
    }
    let addressData = {
      compensableId: compensableDetail.compensableId,
      addressJson: JSON.stringify(data)
    }
    if (this.props.updateAddress) {
      this.props.updateAddress(addressData, data)
    }
  }

  render() {
    let { addressJson, compensableDetail } = this.props;
    for (let i = 0; i < addressJson.length; i++) {
      if (addressJson[i].type === 1) {
        addressJson[i].address = addressJson[i].Jaddress;
        addressJson[i].num = addressJson[i].Jnum;
        addressJson[i].note = addressJson[i].Jnote;
        addressJson[i].imgs = addressJson[i].operatePic.split(',') || [];
      } else if (addressJson[i].type === 2) {
        addressJson[i].address = addressJson[i].Caddress;
        addressJson[i].num = addressJson[i].Cnum;
        addressJson[i].note = addressJson[i].Cnote;
        addressJson[i].imgs = addressJson[i].warehousePic.split(',') || [];
      } else if (addressJson[i].type === 3) {
        addressJson[i].address = addressJson[i].Gaddress;
        addressJson[i].num = addressJson[i].switchBtag;
        addressJson[i].note = addressJson[i].Gnote;
        addressJson[i].imgs = addressJson[i].GPic.split(',') || [];
      }
    }
    return (
      <View>
        {
          addressJson.map((item, index) => {
            return (
              <View style={styles.suspect} key={index}>
                <View style={styles.suspect_title}>
                  <View style={styles.userInfo}>
                    <Text style={styles.suspect_name}>{item.nickName}</Text>
                    <Text style={styles.suspect_time}>{item.time}</Text>
                  </View>
                  {
                    compensableDetail.status === 13 || compensableDetail.status === 23 || compensableDetail.status === 33 || compensableDetail.status === 14 || compensableDetail.status === 24 || compensableDetail.status === 34
                      ? <TouchableOpacity activeOpacity={0.5} onPress={() => this._editAddress(item, index)}>
                        <Image style={styles.edit_icon} source={require('../../../../../../../assets/images/Criminal-photo.png')} />
                      </TouchableOpacity>
                      : null
                  }
                </View>
                <View style={styles.suspect_detail}>
                  <View style={styles.suspect_item}>
                    <View style={styles.label}>
                      <Image style={styles.label_icon} source={require('../../../../../../../assets/images/Criminal-info-name.png')} />
                      <Text style={styles.label_text}>
                        {
                          item.type === 1
                            ? '经营点地址'
                            : item.type === 2
                              ? '仓库地址'
                              : '工厂地址'
                        }
                      </Text>
                    </View>
                    <Text style={styles.item_text}>{item.address}</Text>
                  </View>
                  <View style={styles.suspect_item}>
                    <View style={styles.label}>
                      <Image style={styles.label_icon} source={require('../../../../../../../assets/images/Criminal-info-phone.png')} />
                      <Text style={styles.label_text}>
                        {
                          item.type === 1
                            ? '经营点货物数量'
                            : item.type === 2
                              ? '仓库货物数量'
                              : '工厂生产情况'
                        }
                      </Text>
                    </View>
                    <Text style={styles.item_text}>
                      {
                        typeof item.num === 'boolean'
                          ? item.num === true ? '已确认' : '未确认'
                          : item.num
                      }
                    </Text>
                  </View>
                </View>
                <View style={styles.suspect_note}>
                  <Text style={styles.label_text}>备注：</Text>
                  <Text style={styles.item_text}>
                    {
                      item.note
                    }
                  </Text>
                </View>
                <View style={styles.suspect_imgs}>
                  {
                    item.imgs.map((data, i) => {
                      return (
                        <Image key={i} style={styles.suspect_img} source={{ uri: data }} />
                      )
                    })
                  }
                </View>
              </View>
            )
          })
        }
        {
          compensableDetail.status === 13 || compensableDetail.status === 23 || compensableDetail.status === 33 || compensableDetail.status === 14 || compensableDetail.status === 24 || compensableDetail.status === 34
            ? <View style={styles.btn_wrap}>
              <TouchableOpacity style={styles.add_btn} activeOpacity={0.5} onPress={() => this._addAddress()}>
                <Text style={styles.btn_text}> + 新建地址</Text>
              </TouchableOpacity>
            </View>
            : null
        }
      </View>
    )
  }
}

