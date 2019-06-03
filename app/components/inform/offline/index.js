import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Keyboard } from 'react-native';
import { Toast, PullPicker } from 'teaset'
import Picker from 'react-native-picker';
import Container from '../../common/container/index'
import ImageItem from '../common/imageItem'
import MyInput from '../../common/extends/myInput'
import { ScreenUtil, uploadImag, formatNum } from '../../../utils/util';
import styles from './styles'

export default class Offline extends Component {
  constructor(props) {
    super(props)
    this.state = {
      position: '',
      address: '',
      date: {
        text: '',
        arr: []
      },
      uploadImg: [],
      note: '',
      categoryData: [
        { text: '服饰箱包', value: 1 },
        { text: '日化百货', value: 2 },
        { text: '运动户外', value: 3 },
        { text: '书籍', value: 4 },
        { text: '电器', value: 5 },
        { text: '家装', value: 6 },
        { text: '其他', value: 7 }
      ],
      brandId: '',
      brand: '',
      selectedBrandIndex: 0,
      categoryName: '',
      category: '',
      selectedCategoryIndex: 0
    }
  }

  componentWillMount() {
    this._initTimerPicker()
    this.setState({
      position: this.props.currentAddress
    })
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
    const { category, position, brand, brandId, note, date, address, uploadImg } = this.state;
    const { userInfo, counts } = this.props;
    let imgs = [];
    for (let i = 0; i < uploadImg.length; i++) {
      imgs.push(uploadImg[i].msgCode)
    }
    imgs = imgs.toString()
    if (!category) {
      Toast.message("请选择商品分类")
    } else if (!brandId) {
      Toast.message("请输入品牌")
    } else if (!date.text) {
      Toast.message("请选择时间")
    } else if (!address) {
      Toast.message("请输入详细地址")
    } else if (!imgs) {
      Toast.message("请上传图片")
    } else {
      let lineData = {
        reportTime: date.text,
        address: position,
        detailAddress: address,
        type: 2,
        goodsType: category,
        userId: userInfo.userId,
        mainPics: imgs,
        note: note,
        brand: brand,
        brandId
      }
      this.props.inform(lineData, counts, () => {
        this.setState({
          address: '',
          date: {
            text: '',
            arr: []
          },
          uploadImg: [],
          note: '',
          brandId: '',
          brand: '',
          selectedBrandIndex: 0,
          categoryName: '',
          category: '',
          selectedCategoryIndex: 0
        })
        this._initTimerPicker()
      })
    }
  }

  // 显示选择分类
  _showCategoryPicker() {
    let { categoryData, selectedCategoryIndex } = this.state;
    this._dismissKeyboard()
    PullPicker.show(
      '选择分类',
      categoryData,
      selectedCategoryIndex,
      (item, index) => this.setState({ category: item.value, selectedCategoryIndex: index, categoryName: item.text }),
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

  _showBrandPicker() {
    let { brandList } = this.props;
    let { selectedBrandIndex } = this.state;
    this._dismissKeyboard()
    PullPicker.show(
      '选择品牌',
      brandList,
      selectedBrandIndex,
      (item, index) => this.setState({ brandId: item.id, brand: item.name, selectedIndex: index }),
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
    let { brand, categoryName } = this.state;
    return (
      <Container scrollViewProps={{ style: styles.container }}>
        <View style={styles.content}>
          <View style={styles.from}>
            <View style={styles.cell}>
              <Text style={styles.label}>
                现场位置：
              </Text>
              <View style={styles.inputWarp}>
                <MyInput onChangeText={(text) => this.setState({ position: text })} value={this.state.position} style={styles.input} />
              </View>
            </View>
            <View style={styles.cell}>
              <Text style={styles.label}>
                详细位置：
              </Text>
              <View style={styles.inputWarp}>
                <MyInput onChangeText={(text) => this.setState({ address: text })} value={this.state.address} style={styles.input} placeholder='请输入具体门牌号/几幢几单元' />
              </View>
            </View>
            <View style={styles.cell}>
              <Text style={styles.label}>
                现场时间：
              </Text>
              <View style={styles.inputWarp}>
                <TouchableOpacity onPress={this._showTimePicker.bind(this)} activeOpacity={0.7}>
                  <Text style={[styles.input, { lineHeight: ScreenUtil.scaleSize(80) }]}>{this.state.date.text}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.cell}>
              <Text style={styles.label}>
                商品类别：
              </Text>
              <View style={styles.inputWarp}>
                <TouchableOpacity onPress={this._showCategoryPicker.bind(this)} activeOpacity={0.7}>
                  <Text style={[styles.input, { lineHeight: ScreenUtil.scaleSize(80) }]}>
                    {
                      categoryName
                        ? categoryName
                        : '请选择商品类别'
                    }
                  </Text>
                </TouchableOpacity>
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
                现场照片：
              </Text>
              <View style={styles.imgWarp}>
                {
                  this.state.uploadImg.map((item, index) => {
                    return (
                      <ImageItem deleteImage={this.deleteImage.bind(this)} data={item} key={index} />
                    )
                  })
                }
                <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)} activeOpacity={0.5} style={styles.addItem}>
                  <Image style={styles.uploadImag} source={require('../../../../assets/images/cardUpload.png')} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.note}>
              <Text style={styles.labelNote}>
                备注：
              </Text>
              <View style={styles.noteInputWrap}>
                <MyInput multiline={true} onChangeText={(text) => this.setState({ note: text })} value={this.state.note} style={styles.noteInput} placeholder='请输入你认为是假货嫌疑的理由' />
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

