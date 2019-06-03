import React, { Component } from 'react'
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import { SegmentedView, Toast } from 'teaset'
import { uploadImag } from '../../../../utils/util';
import MyInput from '../../../common/extends/myInput'
import ImageItem from './imageItem'
import styles from './styles'

export default class Investigation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uploadImage: [],
      num: '',
      brand: '',
      money: '',
      storeAddress: '',
      warehouseAddress: '',
      factoryAddress: '',
      address: '',
      type: '',
      types: [
        {
          type: 1,
          title: '刑事'
        },
        {
          type: 2,
          title: '行政'
        }
      ]
    }
  }

  componentWillMount() {
    let { imgs, num, brand, money, storeAddress, warehouseAddress, factoryAddress, address, type } = this.props;
    this.setState({
      uploadImage: imgs,
      num: num,
      brand: brand,
      money: money,
      storeAddress: storeAddress,
      warehouseAddress: warehouseAddress,
      factoryAddress: factoryAddress,
      address: address,
      type: type,
    })
  }

  // 上传图片
  _uploadImage() {
    let uploadImage = this.state.uploadImage;
    if (uploadImage.length > 9) {
      Toast.message('已选择 9 张图片.');
      return
    }
    uploadImag((res) => {
      let obj = {
        key: uploadImage.length + 1,
        msgCode: res.msgCode,
        imgDescrible: '',
        address: this.props.address,
        fileName: res.fileName
      }
      uploadImage.push(obj)
      this.setState({
        uploadImage
      })
    })
    this._submitImages(uploadImage)
  }

  // 回传到主页面
  _submitImages(uploadImage) {
    if (this.props.submitImges) {
      this.props.submitImges(uploadImage)
    }
  }

  // 编辑描述
  editDesc(data) {
    let uploadImage = this.state.uploadImage;
    for (let i = 0; i < uploadImage.length; i++) {
      if (uploadImage[i].fileName === data.fileName) {
        uploadImage[i].imgDescrible = data.imgDescrible
      }
    }
    this.setState({
      uploadImage: uploadImage
    })
    this._submitImages(uploadImage)
  }

  // 删除图片
  deleteImage(data) {
    let uploadImage = this.state.uploadImage;
    let uploadResult = uploadImage.filter(item => {
      return item.fileName !== data.fileName
    })
    this.setState({
      uploadImage: uploadResult
    })
    this._submitImages(uploadResult)
  }

  // 渲染图片
  _renderImage(data) {
    if (data.length) {
      let imgs = [];
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        imgs.push(<ImageItem item={element} key={element.fileName} editDesc={text => this.editDesc(text)} deleteImage={(data) => this.deleteImage(data)} />)
      }
      return imgs
    } else {
      return ''
    }
  }

  // 修改品牌
  _setBrand(text) {
    if (this.props.setBrand) {
      this.props.setBrand(text)
    }
    this.setState({
      brand: text
    })
  }

  // 修改数量
  _setNum(text) {
    if (this.props.setNum) {
      this.props.setNum(text)
    }
    this.setState({
      num: text
    })
  }

  // 修改金额
  _setMoney(text) {
    if (this.props.setMoney) {
      this.props.setMoney(text)
    }
    this.setState({
      money: text
    })
  }

  // 修改经营地址
  _setStoreAddress(text) {
    if (this.props.setStoreAddress) {
      this.props.setStoreAddress(text)
    }
    this.setState({
      storeAddress: text
    })
  }

  // 修改仓库地址
  _setWarehouseAddress(text) {
    if (this.props.setWarehouseAddress) {
      this.props.setWarehouseAddress(text)
    }
    this.setState({
      warehouseAddress: text
    })
  }

  // 修改工厂地址
  _setFactoryAddress(text) {
    if (this.props.setFactoryAddress) {
      this.props.setFactoryAddress(text)
    }
    this.setState({
      factoryAddress: text
    })
  }

  // 修改地址
  _setAddress(text) {
    if (this.props.setAddress) {
      this.props.setAddress(text)
    }
    this.setState({
      address: text
    })
  }

  // 选择案件性质
  _selectedType(type) {
    if (this.props.setType) {
      this.props.setType(type)
    }
    this.setState({
      type: type
    })
  }

  render() {
    let { uploadImage, num, brand, money, storeAddress, warehouseAddress, factoryAddress, address } = this.state;
    return (
      <View>
        <View style={styles.item}>
          <View style={styles.itemTitle}>
            <Text style={styles.itemTitle_text}>侵权照片</Text>
            <Text style={[styles.itemTitle_text, styles.itemTitle_text_small]}>（至多9张）</Text>
          </View>
          <View style={styles.content}>
            <ScrollView horizontal={true}>
              {
                this._renderImage(uploadImage)
              }
              <View style={styles.uploadItem}>
                <TouchableOpacity activeOpacity={0.5} onPress={() => this._uploadImage()}>
                  <Image style={styles.loadImag} source={require('../../../../../assets/images/cardUpload.png')} />
                  <Text style={styles.uploadText}>
                    上传图片
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
        <View style={styles.line}></View>
        <View>
          <View style={styles.content}>
            <View style={styles.inputWrap}>
              <Text style={styles.label}>
                品牌
              </Text>
              <MyInput
              	style={[styles.input, styles.input_right]}
              	onChangeText={text => this._setBrand(text)}
              	value={brand}
              	placeholder='请输入品牌名称'
              	placeholderTextColor='#ccc'
              />
            </View>
            <View style={styles.inputWrap}>
              <Text style={styles.label}>
                预估商品数量
              </Text>
              <MyInput 
                style={[styles.input, styles.input_right]} 
                onChangeText={text => this._setNum(text)} 
                value={num} 
                keyboardType='numeric' 
                placeholder='请输入预估商品数量' 
                placeholderTextColor='#ccc' 
              />
            </View>
            <View style={styles.inputWrap}>
              <Text style={styles.label}>
                预计商品金额
              </Text>
              <MyInput 
                style={[styles.input, styles.input_right]} 
                onChangeText={text => this._setMoney(text)} 
                value={money} 
                keyboardType='numeric' 
                placeholder='请输入预估商品金额' 
                placeholderTextColor='#ccc' 
              />
            </View>
          </View>
        </View>
        <View style={styles.item}>
          <View style={styles.itemTitle}>
            <Text style={styles.itemTitle_text}>案件地址</Text>
            <Text style={[styles.itemTitle_text, styles.itemTitle_text_small]}>（至少三选一）</Text>
          </View>
          <SegmentedView
            type='projector'
            indicatorType='boxWidth'
            style={styles.tabView}
            barStyle={styles.tabBar}>
            <SegmentedView.Sheet title='经营点' titleStyle={styles.tabBarTitle} activeTitleStyle={styles.tabBarTitle}>
              <View style={styles.content}>
                <View style={styles.textareaWrap}>
                  <MyInput 
                    style={styles.textarea} 
                    placeholder='请输入经营点地址' 
                    onChangeText={text => this._setStoreAddress(text)} 
                    value={storeAddress} 
                    multiline={true} 
                  />
                </View>
              </View>
            </SegmentedView.Sheet>
            <SegmentedView.Sheet title='仓库' titleStyle={styles.tabBarTitle} activeTitleStyle={styles.tabBarTitle}>
              <View style={styles.content}>
                <View style={styles.textareaWrap}>
                  <MyInput 
                    style={styles.textarea} 
                    placeholder='请输入仓库地址' 
                    onChangeText={text => this._setWarehouseAddress(text)} 
                    value={warehouseAddress} 
                    multiline={true} 
                  />
                </View>
              </View>
            </SegmentedView.Sheet>
            <SegmentedView.Sheet title='工厂' titleStyle={styles.tabBarTitle} activeTitleStyle={styles.tabBarTitle}>
              <View style={styles.content}>
                <View style={styles.textareaWrap}>
                  <MyInput 
                    style={styles.textarea} 
                    placeholder='请输入工厂地址' 
                    onChangeText={text => this._setFactoryAddress(text)} 
                    value={factoryAddress} 
                    multiline={true} 
                  />
                </View>
              </View>
            </SegmentedView.Sheet>
          </SegmentedView>
        </View>
        <View style={styles.item}>
          <View style={styles.itemTitle}>
            <Text style={styles.itemTitle_text}>案发地址</Text>
          </View>
          <View style={styles.content}>
            <View style={styles.inputWrap}>
              <MyInput 
                style={styles.input} 
                onChangeText={text => this._setAddress(text)} 
                value={address} 
                placeholder='请输入您的地址' 
              />
            </View>
          </View>
          <View style={styles.itemTitle}>
            <Text style={styles.itemTitle_text}>案件性质</Text>
          </View>
          <View style={[styles.content, { flexDirection: 'row' }]}>
            {
              this.state.types.map((item, index) => {
                return (
                  <TouchableOpacity activeOpacity={0.5} onPress={() => this._selectedType(item.type)} style={[styles.tag, item.type === this.state.type ? styles.tag_active : '']} key={index}>
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
      </View>
    )
  }
}

