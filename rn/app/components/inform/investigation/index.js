import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import Container from '../../common/container/index'
import MyInput from '../../common/extends/myInput'
import { Toast } from 'teaset'
import Step1 from './children/step1'
import Step2 from './children/step2'
import Step3 from './children/step3'
import styles from './styles'

export default class Investigation extends Component {
  static navigationOptions = {
    title: '调查举报',
    headerStyle: {
      backgroundColor: '#7d8dbd'
    }
  };
  constructor(props) {
    super(props)
    this.state = {
      name: '',//线索名称,
      address: '',// 案发地址
      suspect: [
        {
          suspectName: '',
          suspectPhone: '',
          suspectWeixin: ''
        }
      ],//嫌疑人,
      taobao: [
        {
          shopName: ''
        }
      ],//淘宝店铺,
      factoryAddress: '',//工厂地址,
      warehouseAddress: '',//仓库地址,
      storeAddress: '',//经营点地址,
      uploadImage: [],
      brand: '',//品牌
      num: '',//商品数量,
      money: '',//案件金额,
      investigate: 2,//调查资源
      law: '',//执法资源
      type: '',//案件性质,
      note: '',//备注,
      step: 1
    }
  }

  // 上传图片
  uploadImag(object) {
    this.setState({
      uploadImage: object
    })
  }

  // 添加嫌疑人
  setSuspect(object) {
    this.setState({
      suspect: object
    })
  }

  // 添加店铺
  setShopName(object) {
    this.setState({
      taobao: object
    })
  }

  _deleteKey(key, data) {
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      delete element[key]
    }
    return data;
  }

  // 第三步确认提交
  _completeSubmit() {
    let { investigate, law, name } = this.state;
    if (!investigate) {
      Toast.message('请选择调查资源')
      return;
    } else if (!law) {
      Toast.message('请选择执法资源')
      return;
    } else if (!name) {
      Toast.message('请输入线索名称')
      return;
    }
    this._submitInvestigation()
  }

  _submitInvestigation() {
    let { uploadImage, brand, num, money, storeAddress, warehouseAddress, factoryAddress, address, type, suspect, taobao, law, investigate, note, name } = this.state;
    let userInfo = this.props.userInfo;
    uploadImage = this._deleteKey('fileName', uploadImage);
    suspect = this._deleteKey('key', suspect);
    taobao = this._deleteKey('key', taobao);
    let data = {
      name,
      address,
      suspect: JSON.stringify(suspect),
      taobao: JSON.stringify(taobao),
      factoryAddress,
      warehouseAddress,
      storeAddress,
      num,
      money,
      brand,
      type,
      note,
      law,
      investigate,
      mainPics: JSON.stringify(uploadImage),
      userId: userInfo.userId
    }
    if (this.props.createInvestigation) {
      this.props.createInvestigation(data, () => {
        this.setState({
          name: '',//线索名称,
          address: '',// 案发地址
          suspect: [
            {
              suspectName: '',
              suspectPhone: '',
              suspectWeixin: ''
            }
          ],//嫌疑人,
          taobao: [
            {
              shopName: ''
            }
          ],//淘宝店铺,
          factoryAddress: '',//工厂地址,
          warehouseAddress: '',//仓库地址,
          storeAddress: '',//经营点地址,
          uploadImage: [],
          brand: '',//品牌
          num: '',//商品数量,
          money: '',//案件金额,
          investigate: 2,//调查资源
          law: '',//执法资源
          type: '',//案件性质,
          note: '',//备注,
          step: 1
        })
      })
    }
  }

  // 设置步骤
  _setStep(data, step) {
    let { uploadImage, brand, num, money, storeAddress, warehouseAddress, factoryAddress, address, type, suspect, taobao } = this.state;
    if (data === 'next') {
      if (step === 2) {
        if (uploadImage.length === 0) {
          Toast.message('请上传侵权照片')
        } else if (!brand) {
          Toast.message('请输入品牌')
        } else if (!num) {
          Toast.message('请输入预估商品数量')
        } else if (!money) {
          Toast.message('请输入预估商品金额')
        } else if (!storeAddress && !warehouseAddress && !factoryAddress) {
          Toast.message('请输入经营点、仓库、工厂至少一个地址')
        } else if (!address) {
          Toast.message('请输入案发地址')
        } else if (!type) {
          Toast.message('请选择案件性质')
        } else {
          this.setState({
            step: step
          })
        }
      } else if (step === 3) {
        if (suspect.length === 1 && (!suspect[0].suspectName && !suspect[0].suspectPhone && !suspect[0].suspectWeixin)) {
          Toast.message('请输入至少一个嫌疑人信息');
          return;
        } else {
          for (let i = 0; i < suspect.length; i++) {
            const element = suspect[i];
            if (!element.suspectPhone || !(/^(0|86|17951)?(13[0-9]|14[5-9]|15[012356789]|16[56]|17[0-8]|18[0-9]|19[189])[0-9]{8}$/.test(element.suspectPhone))) {
              Toast.message(`第${i + 1}个手机号码为无效号码`);
              return;
            }
          }
        }
        if (taobao.length === 1 && !taobao[0].shopName) {
          Toast.message('请输入至少一条店铺链接')
        } else {
          this.setState({
            step: step
          })
        }
      }
    } else {
      this.setState({
        step: step
      })
    }

  }

  // 清除线索名称
  _clearText() {
    this.setState({
      name: ''
    })
  }

  // 渲染每一步
  _renderStep() {
    let step = this.state.step;
    if (step === 1) {
      return (
        <Step1
          currentAddress={this.props.address}
          submitImges={object => this.uploadImag(object)}
          imgs={this.state.uploadImage}
          setBrand={text => this.setState({ brand: text })}
          brand={this.state.brand}
          setNum={text => this.setState({ num: text })}
          num={this.state.num}
          setMoney={text => this.setState({ money: text })}
          money={this.state.money}
          setAddress={text => this.setState({ address: text })}
          address={this.state.address}
          setWarehouseAddress={text => this.setState({ warehouseAddress: text })}
          warehouseAddress={this.state.warehouseAddress}
          setFactoryAddress={text => this.setState({ factoryAddress: text })}
          factoryAddress={this.state.factoryAddress}
          setStoreAddress={text => this.setState({ storeAddress: text })}
          storeAddress={this.state.storeAddress}
          setType={text => this.setState({ type: text })}
          type={this.state.type} />
      )
    } else if (step === 2) {
      return (
        <Step2
          setShopName={object => this.setShopName(object)}
          taobao={this.state.taobao}
          setSuspect={object => this.setSuspect(object)}
          suspect={this.state.suspect} />
      )
    } else {
      return (
        <Step3
          setInvestigate={text => this.setState({ investigate: text })}
          investigate={this.state.investigate}
          setLaw={text => this.setState({ law: text })}
          law={this.state.law}
          setNote={text => this.setState({ note: text })}
          note={this.state.note} />
      )
    }
  }

  render() {
    let step = this.state.step;
    return (
      <Container scrollViewProps={{ style: styles.container }}>
        <View style={styles.investigationName}>
          <Text style={styles.title}>线索名称</Text>
          <View style={styles.inputWrap_name}>
            <MyInput style={styles.setName} placeholder='请输入线索名称' placeholderTextColor='#fff' onChangeText={text => this.setState({ name: text })} value={this.state.name} />
            <TouchableOpacity activeOpacity={0.5} onPress={() => this._clearText()}>
              <Image style={styles.close} source={require('../../../../assets/images/close.png')} />
            </TouchableOpacity>
          </View>
        </View>
        {this._renderStep()}
        <View style={styles.btn_wrap}>
          {
            step === 1
              ? <TouchableOpacity style={styles.btn} onPress={() => this._setStep('next', 2)} activeOpacity={0.8}>
                <Text style={styles.btnText}>下一步</Text>
              </TouchableOpacity>
              : null
          }
          {
            step === 2
              ? [
                <TouchableOpacity style={styles.btn} onPress={() => this._setStep('prev', 1)} activeOpacity={0.8} key='prev'>
                  <Text style={styles.btnText}>上一步</Text>
                </TouchableOpacity>,
                <TouchableOpacity style={styles.btn} onPress={() => this._setStep('next', 3)} activeOpacity={0.8} key='next'>
                  <Text style={styles.btnText}>下一步</Text>
                </TouchableOpacity>
              ]
              : null
          }
          {
            step === 3
              ?
              [
                <TouchableOpacity style={styles.btn} onPress={() => this._setStep('prev', 2)} activeOpacity={0.8} key='prev'>
                  <Text style={styles.btnText}>上一步</Text>
                </TouchableOpacity>,
                <TouchableOpacity style={styles.btn} onPress={() => this._completeSubmit()} activeOpacity={0.8} key='complete'>
                  <Text style={styles.btnText}>完成</Text>
                </TouchableOpacity>
              ]
              : null
          }
        </View>
      </Container>
    )
  }
}


