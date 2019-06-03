import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Keyboard } from 'react-native';
import { Toast, PullPicker } from 'teaset'
import Container from '../../common/container/index'
import MyInput from '../../common/extends/myInput'
import Picker from 'react-native-picker';
import ImageItem from '../common/imageItem'
import { ScreenUtil, uploadImag, formatNum } from '../../../utils/util';
import styles from './styles'

export default class Volunteer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: {
        text: '',
        arr: []
      },
      goodsLink: '',
      uploadImg: [],
      note: '',
      offsetY: 0,
      userId: '',
      platformTypeData: [
        {text: '淘宝', value: 1},
        {text: '天猫', value: 2},
        {text: '1688', value: 3},
        {text: 'alibaba', value: 4},
        {text: 'Aliexpress', value: 5},
        {text: '京东', value: 6},
        {text: '一号店', value: 7},
        {text: '唯品会', value: 8},
        {text: '当当网', value: 9},
        {text: '慧聪', value: 10},
        {text: '未知来源', value: 11}
      ],
      platformType: '',
      platformName: '',
      selectedPlatformIndex: 0,
      brandId: '',
      brand: '',
      selectedBrandIndex: 0
    }
  }

  componentWillMount() {
    this._initTimerPicker()
  };

  // 初始化时间
  _initTimerPicker() {
    let date = new Date();
    let year = date.getFullYear(),
      month = formatNum(date.getMonth() + 1),
      day = formatNum(date.getDate()),
      hours = formatNum(date.getHours()),
      minute = formatNum(date.getMinutes()),
      second = formatNum(date.getSeconds())
    let selectedValue = [year, month, day, hours, minute, second];
    let text = `${year}-${month}-${day} ${hours}:${minute}:${second}`
    this.setState({
      date: {
        text: text,
        arr: selectedValue
      }
    })
  }

  // 上传图片
  selectPhotoTapped() {
    uploadImag((res) => {
      let uploadImg = this.state.uploadImg;
      uploadImg.push(res)
      this.setState({
        uploadImg: uploadImg
      })
    })
  }

  // 提交举报
  _submitInform() {
    const { platformType, goodsLink, brandId, brand, note, date, uploadImg } = this.state;
    const { userInfo, counts } = this.props;
    let imgs = [];
    for (let i = 0; i < uploadImg.length; i++) {
      imgs.push(uploadImg[i].msgCode)
    }
    imgs = imgs.toString()
    if (!platformType) {
      Toast.message("请选择所在平台")
    } else if (!goodsLink) {
      Toast.message("请输入商品链接")
    } else if (!brandId) {
      Toast.message("请输入品牌")
    } else if (!date.text) {
      Toast.message("请选择时间")
    } else if (!imgs) {
      Toast.message("请上传图片")
    } else {
      let lineData = {
        reportTime: date.text,
        goodsLink: goodsLink,
        type: 1,
        platformType: platformType,
        userId: userInfo.userId,
        mainPics: imgs,
        note: note,
        brandId: brandId,
        brand: brand
      }
      this.props.inform(lineData, counts, () => {
        this.setState({
          date: {
            text: '',
            arr: []
          },
          goodsLink: '',
          uploadImg: [],
          note: '',
          offsetY: 0,
          userId: '',
          platformType: '',
          platformName: '',
          selectedPlatformIndex: 0,
          brandId: '',
          brand: '',
          selectedBrandIndex: 0
        })
        this._initTimerPicker()
      })
    }
  }

  // 显示选择分类
  _showPlatformTypePicker() {
    let { platformTypeData, selectedPlatformIndex } = this.state;
    this._dismissKeyboard()
    PullPicker.show(
      '选择平台',
      platformTypeData,
      selectedPlatformIndex,
      (item, index) => this.setState({platformType: item.value, selectedPlatformIndex: index, platformName: item.text}),
      {
        getItemText: (item, index) => item.text
      }
    ) 
  }

  // 显示时间picker
  _showTimePicker() {
    this._dismissKeyboard()
    let years = [],
      months = [],
      days = [],
      hours = [],
      minutes = [],
      seconds = [];
    for (let i = 1; i < 51; i++) {
      years.push(i + 1980);
    }
    for (let i = 1; i < 13; i++) {
      months.push(formatNum(i));
    }
    for (let i = 1; i < 32; i++) {
      days.push(formatNum(i));
    }
    for (let i = 1; i < 25; i++) {
      hours.push(formatNum(i));
    }
    for (let i = 1; i < 61; i++) {
      minutes.push(formatNum(i));
    }
    for (let i = 1; i < 61; i++) {
      seconds.push(formatNum(i));
    }
    let pickerData = [years, months, days, hours, minutes, seconds];
    let selected = this.state.date.arr;
    Picker.init({
      pickerData,
      selectedValue: selected,
      pickerTitleText: '时间选择器',
      pickerCancelBtnText: '取消',
      pickerConfirmBtnText: '确定',
      wheelFlex: [2, 1, 1, 2, 1, 1],
      onPickerConfirm: pickedValue => {
        let date = `${pickedValue[0]}-${pickedValue[1]}-${pickedValue[2]} ${pickedValue[3]}:${pickedValue[4]}:${pickedValue[5]}`
        this.setState({
          date: {
            text: date,
            arr: pickedValue
          }
        })
      },
      // onPickerCancel: pickedValue => {
      //   // 取消按钮事件
      //   console.log('area', pickedValue);
      // },
      onPickerSelect: pickedValue => {
        let targetValue = [...pickedValue];
        if (parseInt(targetValue[1]) === 2) {
          if (targetValue[0] % 4 === 0 && targetValue[2] > 29) {
            targetValue[2] = 29;
          }
          else if (targetValue[0] % 4 !== 0 && targetValue[2] > 28) {
            targetValue[2] = 28;
          }
        }
        else if (targetValue[1] in { 4: 1, 6: 1, 9: 1, 11: 1 } && targetValue[2] > 30) {
          targetValue[2] = 30;
        }
        // forbidden some value such as some 2.29, 4.31, 6.31...
        if (JSON.stringify(targetValue) !== JSON.stringify(pickedValue)) {
          // android will return String all the time，but we put Number into picker at first
          // so we need to convert them to Number again
          targetValue.map((v, k) => {
            if (k !== 3) {
              targetValue[k] = parseInt(v);
            }
          });
          Picker.select(targetValue);
          pickedValue = targetValue;
        }
      }
    });
    Picker.show();
  }

  // 选择品牌
  _showBrandPicker() {
    let { brandList } = this.props;
    let { selectedBrandIndex } = this.state;
    this._dismissKeyboard()
    PullPicker.show(
      '选择品牌', 
      brandList, 
      selectedBrandIndex, 
      (item, index) => this.setState({brandId: item.id, brand: item.name, selectedIndex: index}),
      {
        getItemText: (item, index) => item.name,
      }
    )
  }

  // 隐藏小键盘
  _dismissKeyboard() {
    Keyboard.dismiss()
    Picker.hide()
  }

  // 删除图片
  deleteImage(data) {
    let uploadImg = this.state.uploadImg;
    let uploadImgResult = uploadImg.filter((item) => {
      return item.fileName !== data.fileName
    })
    this.setState({
      uploadImg: uploadImgResult
    })
  }

  render() {
    let { brand, platformName, uploadImg, date, goodsLink, note } = this.state;
    return (
      <Container scrollViewProps={{ style: styles.container }}>
        <View style={styles.content}>
          <View style={styles.from}>
            <View style={styles.cell}>
              <Text style={styles.label}>
                所在平台：
              </Text>
              <View style={styles.inputWarp}>
                <TouchableOpacity onPress={() => this._showPlatformTypePicker()} activeOpacity={0.7}>
                  <Text style={[styles.input, { lineHeight: ScreenUtil.scaleSize(80) }]}>
                    {
                      platformName 
                      ? platformName
                      : '请选择所在平台'
                    }
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.cell}>
              <Text style={styles.label}>
                举报时间：
              </Text>
              <View style={styles.inputWarp}>
                <TouchableOpacity onPress={this._showTimePicker.bind(this)} activeOpacity={0.7}>
                  {
                    date.text
                    ? <Text style={[styles.input, { lineHeight: ScreenUtil.scaleSize(80) }]}>{date.text}</Text>
                    : null
                  }
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.note}>
              <Text style={styles.labelNote}>
                商品链接：
              </Text>
              <View style={styles.noteInputWrap}>
                <MyInput 
                  multiline={true} 
                  onChangeText={(text) => this.setState({ goodsLink: text })} 
                  value={goodsLink} style={styles.noteInput} 
                  placeholder='请输入商品链接' 
                />
              </View>
            </View>
            <View style={styles.cell}>
              <Text style={styles.label}>
                品牌：
              </Text>
              <View style={styles.inputWarp}>
                <TouchableOpacity onPress={() => this._showBrandPicker()} activeOpacity={0.7}>
                  <Text style={[styles.input, { lineHeight: ScreenUtil.scaleSize(80) }]}>
                    {
                      brand
                        ? brand
                        : '该商品假冒哪个品牌'
                    }
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.cell}>
              <Text style={styles.label}>
                商品截图：
              </Text>
              <View style={styles.imgWarp}>
                {
                  uploadImg.map((item, index) => {
                    return (
                      <ImageItem deleteImage={this.deleteImage.bind(this)} data={item} key={index} />
                    )
                  })
                }
                {
                  uploadImg.length < 6
                  ? (
                    <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)} activeOpacity={0.5} style={styles.addItem}>
                      <Image style={styles.uploadImag} source={require('../../../../assets/images/cardUpload.png')} />
                    </TouchableOpacity>
                  )
                  : null
                }
              </View>
            </View>
            <View style={styles.note}>
              <Text style={styles.labelNote}>
                备注：
              </Text>
              <View style={styles.noteInputWrap}>
                <MyInput 
                  multiline={true} 
                  onChangeText={(text) => this.setState({ note: text })} 
                  value={note} 
                  style={styles.noteInput} 
                  placeholder='请输入你认为是假货嫌疑的理由' 
                />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.btnWrap}>
          <TouchableOpacity style={styles.submitBtn} onPress={this._submitInform.bind(this)} activeOpacity={0.7}>
            <Text style={styles.btnText}>立即举报</Text>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }
}