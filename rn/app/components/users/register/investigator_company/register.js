import React from 'react'
import {View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import Container from '../../../common/container/index'
import MyInput from '../../../common/extends/myInput'
import styles from './styles'
import API from '../../../../utils/index'
import { Toast, Overlay, BasePage } from 'teaset'
import Picker from 'react-native-picker';
import ImageItem from '../../../inform/common/imageItem'
import IndustryItem from '../../../common/industryItem/industryItem'
import { ScreenUtil, uploadImag } from '../../../../utils/util'
// 读取本地地区json文件
import area from '../../../common/area.json';
class Register extends BasePage {
    static defaultProps = {
        ...BasePage.defaultProps,
        // scene: Navigator.SceneConfigs.FloatFromBottom,
      };
    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <TouchableOpacity onPress={navigation.getParam('submits')} activeOpacity={0.5}>
                    <Text style={styles.goback}>
                        志愿者注册
                    </Text>
                </TouchableOpacity>
            ),
            headerRightContainerStyle:{
                color: '#292929'
            },
            headerTintColor: '#292929'
        };
    }
    constructor(props) {
        super(props)
        Object.assign(this.state, {
            mobile: '',//手机
            code: '',//验证码
            password: '',//密码
            address: '',//居住地址
            detailAddress: '',//详细地址
            checkId:'',//验证验证码id
            experience: '',//调查经验时间,
            scale: '',//公司调查员规模
            protocol: false,
            codeText: '获取验证码',
            count: 60,
            eyes: true,
            secureTextEntry: true,//密码框还是input
            registerBtag: false,//注册颜色
            nextStep: 'one',
            uploadImg:[],
            getCoverRangeData:[{key:0,coverRange:''}],//公司业务覆盖范围信息
            industryItemData:['服装'],
            owenSourceTag:true,//工商公安资源
            getRangeData:[{key:0,coverRange:''}],//工商公安地址范围信息
            hasFlag: true
          });
        this._submits = this._submits.bind(this)
    }
    componentDidMount() {
        this.props.navigation.setParams({ submits: this._submits });
    }
    _submits(){
        this.props.navigation.navigate('Register')
    }
    //获取验证码
    _getCode = () => {
        let { hasFlag, mobile } = this.state;
        let myreg=/^(0|86|17951)?(13[0-9]|14[5-9]|15[012356789]|16[56]|17[0-8]|18[0-9]|19[189])[0-9]{8}$/;
        if (!myreg.test(mobile)){
            Toast.info('请输入正确的手机号');
            return;
        }
        if (hasFlag) {
            this.setState({
                hasFlag: false
            }, () => {
                API.register_identifying({mobile: mobile}).then(res => {
                    if (res.success) {
                        this.timer = setInterval(()=>{
                            let count = this.state.count;
                            count--;
                            if(count < 0){
                                clearInterval(this.timer);
                                this.setState({
                                    hasFlag: true,
                                    count: 60
                                })
                            } else {
                                this.setState({
                                    count: count
                                })
                            }
                        },1000)
                    } else {
                        Toast.fail(res.msg)
                        this.setState({
                            hasFlag: true
                        })
                    }
                })
            })
        }        
    }
    //手机号失去焦点
    _mobileBlur = () => {
        let myreg = /^(0|86|17951)?(13[0-9]|14[5-9]|15[012356789]|16[56]|17[0-8]|18[0-9]|19[189])[0-9]{8}$/;
        if (!myreg.test(this.state.mobile)) {
            Toast.info('请输入正确的手机号')
        } else {
            return true;
        }
    }
    //密码失去焦点
    _passwordBlur = () => {
        let myreg = /^\w{6,18}$/;
        if (!myreg.test(this.state.password)) {
            Toast.info('请输入6-18的数字，字符或字符串')
        } else {
            return true;
        }
    }
    //显示小眼睛
    _changeEyes = () => {
        if (this.state.eyes) {
            this.setState({
                eyes: false,
                secureTextEntry: false
            })
        } else {
            this.setState({
                eyes: true,
                secureTextEntry: true
            })
        }
    }
    //下一步
    _NextStep = () => {
        let { mobile, password, code} = this.state
        if (this.state.nextStep === 'one') {
            if (mobile==='' || mobile===undefined) {
                Toast.info('请输入手机号')
                return false;
            }
            if (password==='' || password===undefined) {
                Toast.info('请输入密码')
                return false;
            }
            if (code==='' || code===undefined) {
                Toast.info('请输入验证码')
                return false;
            }
            let data = {
                mobile: this.state.mobile,
                code: this.state.code
            }
            API.register_code(data).then(res => {
                if (res.success === true) {
                    let id = res.dataObject;
                    this.setState({
                        nextStep: false,
                        registerBtag: true,
                        checkId: id,
                        nextStep: 'two'
                    })
                } else {
                    Toast.fail(res.msg)
                }
            })
        } else if (this.state.nextStep === 'two') {
            this.setState({
                nextStep: 'three'
            })
        }
    }
    //注册协议
    _protocolCheck = () => {
        if (this.state.protocol) {
            this.setState({
                protocol: false
            })
        } else {
            this.setState({
                protocol: true
            })
        }
    }

    //公司所在地
    _createAreaData = () => {
        let data = [];
        let len = area.length;
        for (let i = 0; i < len; i++) {
            let city = [];
            for (let j = 0, cityLen = area[i]['city'].length; j < cityLen; j++) {
                let _city = {};
                _city[area[i]['city'][j]['name']] = area[i]['city'][j]['area'];
                city.push(_city);
            }
            let _data = {};
            _data[area[i]['name']] = city;
            data.push(_data);
        }
        return data;
    }

    _showAreaPicker(index,str){
        Picker.init({
            pickerData: this._createAreaData(),
            selectedValue: ['北京', '北京', '东城区'],
            pickerTitleText: '选择地区',
            pickerCancelBtnText: '取消',
            pickerConfirmBtnText: '确定',
            onPickerConfirm: pickedValue => {
                if(str === 'overRange'){
                    this.state.getCoverRangeData[index].coverRange = pickedValue.join(',')
                    this.setState({
                        getCoverRangeData:this.state.getCoverRangeData
                    })
                }else if(str === 'range'){
                    this.state.getRangeData[index].coverRange = pickedValue.join(',')
                    this.setState({
                        getRangeData:this.state.getRangeData
                    })
                }else{
                    this.setState({
                        address: pickedValue.join(',')
                    })
                }
            },
            onPickerCancel: pickedValue => {
                this.setState({
                    address: ''
                })
            },
            onPickerSelect: pickedValue => {
                this.setState({
                    address: ''
                })
            }
        });
        Picker.show();
    }

    //调查员人数
    _showInvestigatorPicker() {
        let ExperienceData = ['5人以下', '5-10人', '10-20人', '20人以上']
        Picker.init({
            pickerData: ExperienceData,
            selectedValue: ['5人以下'],
            pickerTitleText: '选择规模',
            pickerCancelBtnText: '取消',
            pickerConfirmBtnText: '确定',
            onPickerConfirm: pickedValue => {
                this.setState({
                    scale: pickedValue.join(',')
                })
            },
            onPickerCancel: pickedValue => {
                this.setState({
                    scale: ''
                })
            },
            onPickerSelect: pickedValue => {
                this.setState({
                    scale: ''
                })
            }
        });
        Picker.show();
    }

    //添加
    addArray(data,index,obj){
        data.push({key:index+1,coverRange:''})
        this.setState({
            obj:data
        })
    }
    //删除
    delArray(data,index,obj){
        data.splice(index,1)
        data.map(function(v,i){
            v.key = i;
        })
        this.setState({
            obj:data
        })
    }
    //公司业务覆盖范围
    _getCoverRange(index){
        this.addArray(this.state.getCoverRangeData,index,'getCoverRangeData')
    }
    //删除公司业务覆盖范围
    _delCoverRange(index){
        this.delArray(this.state.getCoverRangeData,index,'getCoverRangeData')
    }
    //营业执照 上传图片
    selectPhotoTapped() {
        let uploadImg = this.state.uploadImg;
        uploadImag((res) => {
          uploadImg.push({fileName: res.fileName, msgCode: res.msgCode});
            this.setState({
                uploadImg
            })
        })
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
    //增加公司熟悉行业弹出层
    _addIndustryItem = () =>{
        let overlayView = (
            <Overlay.View
                style={{alignItems: 'center', justifyContent: 'center'}}
                modal={true}
                overlayOpacity={0.5}
                ref={v => this.overlayView = v}
            >
                <View style={styles.addBox}>
                    <Text style={{height:88,fontSize: 20,lineHeight: 88,color:'#4d4d4d'}}>新增公司熟悉行业</Text>
                    <View Style={styles.addInput}>
                        <MyInput placeholder='请输入信息（不超过6个字符）'
                                   style={styles.input}
                                    autoCapitalize='none'
                                    keyboardType='default'
                                   onChangeText={ (text) => this.setState({value: text})}
                        />
                        <Image style={styles.addDelImg} source={require('../../../../../assets/images/login_del.png')}></Image>
                    </View>
                    <View style={styles.addMake}>
                        <TouchableOpacity onPress={() => this.overlayView && this.overlayView.close()}>
                            <Text style={styles.addMakeItem}>取消</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this._addIndustry.bind(this)}>
                            <Text style={styles.addMakeItem}>确认</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Overlay.View>
        );
        Overlay.show(overlayView);
    }
    _addIndustry =() =>{
        let newArr = this.state.industryItemData
        newArr.push(this.state.value)
        this.setState({
            industryItemData:newArr
        },() => {
            this.overlayView && this.overlayView.close()
        })
    }
    //删除熟悉行业
    deleteIndustry(data){
        let industryItemData = this.state.industryItemData;
        let industryResult = industryItemData.filter((item) => {
            return item !== data
        })
        this.setState({
            industryItemData: industryResult
        })

    }

    //工商公安资源
    _owenSource(data){
        this.setState({
            owenSourceTag:data
        })
    }
    //工商公安范围
    _getRange(index){
        this.addArray(this.state.getRangeData,index,'getRangeData')
    }
    //删除工商公安范围
    _delRange(index){
        this.delArray(this.state.getRangeData,index,'getRangeData')
    }
    //注册
    _Register = () => {
        let {getCoverRangeData,industryItemData,uploadImg,getRangeData} = this.state
        let imgs = [];
        for (let i = 0; i < uploadImg.length; i++) {
            imgs.push(uploadImg[i].msgCode)
        }
        imgs = imgs.toString()

        let range=[];//公安工商范围
        for(let i=0;i<getRangeData.length;i++){
            range.push(getRangeData[i].range)
        }

        let policeRange = [],iacRange = []
        if(this.state.owenSourceTag === true) {
            policeRange = range
        }else{
            iacRange = range
        }
        if (this.state.protocol) {
            let registerData = {
                mobile: this.state.mobile,
                password: this.state.password,
                code: this.state.code,
                checkId: this.state.checkId,
                type: 4,//调查公司
                chargeName: this.state.chargeName,//负责人姓名
                chargeNick: this.state.chargeNick,//负责人昵称
                address: this.state.address,//地址
                detailAddress: this.state.detailAddress,//详细地址
                scale: this.state.scale,//公司调查员规模
                coverRange:JSON.stringify(getCoverRangeData),//公司业务覆盖范围
                industry:JSON.stringify(industryItemData),//熟悉行业
                businessLicence:imgs,//营业执照
                policeRange: JSON.stringify(policeRange),//公安范围
                iacRange:JSON.stringify(iacRange),//工商范围
            }
            API.register(registerData).then(res => {
                if (res.success === true) {
                    this.props.navigation.navigate('RegisterSuccess')
                } else {
                    Toast.fail(res.msg)
                }
            })
        } else {
            Toast.fail('请先同意注册协议')
        }
    }

    _reigsterFirst() {
        let { hasFlag, count } = this.state;
        return (
            <View>
                <View style={styles.register_step}>
                    <View style={styles.register_step_item}>
                        <View style={styles.register_step_box_active}>
                            <Text style={styles.register_step_num_active}>1</Text>
                        </View>
                        <Text style={styles.register_step_title_active}>基本信息</Text>
                    </View>
                    <View style={styles.register_step_item}>
                        <View style={styles.register_step_box}>
                            <Text style={styles.register_step_num}>2</Text>
                        </View>
                        <Text style={styles.register_step_title}>公司信息</Text>
                    </View>
                    <View style={styles.register_step_item}>
                        <View style={styles.register_step_box}>
                            <Text style={styles.register_step_num}>3</Text>
                        </View>
                        <Text style={styles.register_step_title}>执法资源</Text>
                    </View>
                </View>
                <Text style={styles.register_title}>调查公司注册</Text>
                <View style={styles.register_box}>
                    <View style={styles.register_item}>
                        <Text style={styles.register_item_title}>手机号码</Text>
                        <View style={styles.register_item_box}>
                            <Text style={styles.register_item_number}>中国 +86</Text>
                            <MyInput placeholder='请输入手机号'
                                       onChangeText={(text) => {
                                           this.setState({mobile: text})
                                       }}
                                       onFocus={() => {
                                           this.setState({registerBtag: true})
                                       }}
                                       onBlur={this._mobileBlur}
                                       style={styles.register_item_input}
                                       keyboardType="numeric"/>
                        </View>
                    </View>
                    <View style={styles.register_item}>
                        <Text style={styles.register_item_title}>验证码</Text>
                        <View style={styles.register_item_box}>
                            <MyInput placeholder='请输入手机验证码'
                                       onChangeText={(text) => {
                                           this.setState({code: text})
                                       }}
                                       style={styles.register_item_input}
                                       keyboardType="numeric"/>
                            {
                                hasFlag
                                ? (
                                    <TouchableOpacity onPress={this._getCode}>
                                        <Text style={[styles.register_item_number, styles.register_item_code]}>发送验证码</Text>
                                    </TouchableOpacity>
                                )
                                : <Text style={[styles.register_item_number, styles.register_item_code]}>{`${count}秒后重发`}</Text>
                            }
                        </View>
                    </View>
                    <View style={styles.register_item}>
                        <Text style={styles.register_item_title}>设置密码</Text>
                        <View style={styles.register_item_box}>
                            <MyInput placeholder='请设置您的密码'
                                       onChangeText={(text) => {
                                           this.setState({password: text})
                                       }}
                                       onBlur={this._passwordBlur}
                                       style={styles.register_item_input}
                                       secureTextEntry={this.state.secureTextEntry}
                                       />
                            <TouchableOpacity onPress={this._changeEyes}>
                                {
                                    this.state.eyes ? <Image style={styles.passwordEyes}
                                                             source={require('../../../../../assets/images/close_eyes.png')}/> :
                                        <Image style={styles.passwordEyes}
                                               source={require('../../../../../assets/images/open_eyes.png')}/>
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.register_item}>
                        <Text style={styles.register_item_title}>负责人姓名</Text>
                        <View style={styles.register_item_box}>
                            <MyInput placeholder='请输入负责人姓名'
                                       onChangeText={(text) => {
                                           this.setState({chargeName: text})
                                       }}
                                       autoCapitalize='none'
                                       keyboardType='default'
                                       style={styles.register_item_input}
                                       />
                        </View>
                    </View>
                    <View style={styles.register_item}>
                        <Text style={styles.register_item_title}>负责人昵称</Text>
                        <View style={styles.register_item_box}>
                            <MyInput placeholder='请输入负责人昵称'
                                       onChangeText={(text) => {
                                           this.setState({chargeName: text})
                                       }}
                                       autoCapitalize='none'
                                       keyboardType='default'
                                       style={styles.register_item_input}
                                       />
                        </View>
                    </View>
                    <View style={styles.register_item}>
                        <Text style={styles.register_item_title}>公司所在地区</Text>
                        <View style={styles.register_item_box}>
                            <MyInput placeholder='请输入地区信息'
                                       value={this.state.address}
                                       autoCapitalize='none'
                                       keyboardType='default'
                                       style={styles.register_item_input}
                                       onFocus={this._showAreaPicker.bind(this)}
                            />
                            <Image style={styles.passwordEyes}
                                   source={require('../../../../../assets/images/address.png')}/>
                        </View>
                    </View>
                    <View style={styles.register_item}>
                        <Text style={styles.register_item_title}>详细地址</Text>
                        <View style={styles.register_item_box}>
                            <MyInput placeholder='街道门牌信息'
                                       onChangeText={(text) => {
                                           this.setState({detailAddress: text})
                                       }}
                                       value={this.state.detailAddress}
                                       autoCapitalize='none'
                                       keyboardType='default'
                                       style={styles.register_item_input}
                            />
                        </View>
                    </View>
                    <View style={styles.register_register}>
                        {
                            this.state.registerBtag ?
                                <TouchableOpacity onPress={this._NextStep} style={styles.register_register_btn}>
                                    <Text style={styles.register_register_btn_text}>下一步</Text>
                                </TouchableOpacity> : <View style={styles.register_register_btn_other}>
                                    <Text style={styles.register_register_btn_text}>下一步</Text>
                                </View>
                        }
                    </View>
                </View>
            </View>
        )
    }

    _reigsterNext() {
        return (
            <View>
                <View style={styles.register_step}>
                    <View style={styles.register_step_item}>
                        <View style={styles.register_step_box_active}>
                            <Text style={styles.register_step_num_active}>1</Text>
                        </View>
                        <Text style={styles.register_step_title_active}>基本信息</Text>
                    </View>
                    <View style={styles.register_step_item}>
                        <View style={styles.register_step_box_active}>
                            <Text style={styles.register_step_num_active}>2</Text>
                        </View>
                        <Text style={styles.register_step_title_active}>公司信息</Text>
                    </View>
                    <View style={styles.register_step_item}>
                        <View style={styles.register_step_box}>
                            <Text style={styles.register_step_num}>3</Text>
                        </View>
                        <Text style={styles.register_step_title}>执法资源</Text>
                    </View>
                </View>
                <View style={styles.register_box}>
                    <View style={styles.register_item}>
                        <Text style={styles.register_item_title}>公司调查员规模</Text>
                        <View style={styles.register_item_box}>
                            <MyInput placeholder='请输入调查人数'
                                       value={this.state.scale}
                                       style={styles.register_item_input}
                                       onFocus={this._showInvestigatorPicker.bind(this)}
                            />
                            <Image style={styles.passwordEyes}
                                   source={require('../../../../../assets/images/my.png')}/>
                        </View>
                    </View>
                    <View style={styles.register_item}>
                        <Text style={styles.register_item_title}>公司业务覆盖范围</Text>
                        {
                            this.state.getCoverRangeData.map((item,index) => {
                                return(
                                    <View style={styles.register_item_box}>
                                        <View style={styles.register_item_index}>
                                            <Text style={styles.register_item_index_text}>{index+1}</Text>
                                        </View>
                                        <MyInput placeholder='请输入覆盖地区信息'
                                                   value={item.coverRange}
                                                   style={styles.register_item_input}
                                                   onFocus={() => this._showAreaPicker(index,'overRange')}
                                        />
                                        {
                                            index > this.state.getCoverRangeData.length - 2 ?
                                                <TouchableOpacity onPress={() => this._getCoverRange(index)}>
                                                    <Text
                                                        style={[styles.register_item_number, styles.register_item_code]}>添加地区</Text>
                                                </TouchableOpacity> :
                                                <TouchableOpacity onPress={() => this._delCoverRange(index)}>
                                                    <Image style={styles.passwordEyes}
                                                           source={require('../../../../../assets/images/login_del.png')}/>
                                                </TouchableOpacity>
                                        }

                                    </View>
                                )
                            })
                        }
                    </View>
                    <View style={styles.register_item}>
                        <Text style={styles.register_item_title}>公司熟悉行业</Text>
                        <View style={styles.imgWarp}>
                            {
                                this.state.industryItemData.map((item,index) => {
                                    return(
                                        <IndustryItem data={item} key={index} deleteIndustry={this.deleteIndustry.bind(this)}/>
                                    )
                                })
                            }
                            <TouchableOpacity onPress={this._addIndustryItem.bind(this)} activeOpacity={0.5} style={styles.addItem}>
                                <Image style={styles.addItemImage} source={require('../../../../../assets/images/testAdd.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.register_item}>
                        <Text style={styles.register_item_title}>营业执照</Text>
                        <View style={styles.imgWarp}>
                            {
                                this.state.uploadImg.map((item, index) => {
                                    return (
                                        <ImageItem deleteImage={this.deleteImage.bind(this)} data={item} key={index} />
                                    )
                                })
                            }
                            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)} activeOpacity={0.5} style={styles.addItem}>
                                <Image style={styles.uploadImage} source={require('../../../../../assets/images/cardUpload.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.register_register}>
                        {
                            this.state.registerBtag ?
                                <TouchableOpacity onPress={this._NextStep} style={styles.register_register_btn}>
                                    <Text style={styles.register_register_btn_text}>下一步</Text>
                                </TouchableOpacity> : <View style={styles.register_register_btn_other}>
                                    <Text style={styles.register_register_btn_text}>下一步</Text>
                                </View>
                        }
                    </View>
                </View>
            </View>
        )
    }

    _reigsterLast() {
        return (
            <View>
                <View style={styles.register_step}>
                    <View style={styles.register_step_item}>
                        <View style={styles.register_step_box_active}>
                            <Text style={styles.register_step_num_active}>1</Text>
                        </View>
                        <Text style={styles.register_step_title_active}>基本信息</Text>
                    </View>
                    <View style={styles.register_step_item}>
                        <View style={styles.register_step_box_active}>
                            <Text style={styles.register_step_num_active}>2</Text>
                        </View>
                        <Text style={styles.register_step_title_active}>公司信息</Text>
                    </View>
                    <View style={styles.register_step_item}>
                        <View style={styles.register_step_box_active}>
                            <Text style={styles.register_step_num_active}>3</Text>
                        </View>
                        <Text style={styles.register_step_title_active}>执法资源</Text>
                    </View>
                </View>
                <Text style={styles.register_title}>请选择您拥有的执法资源</Text>
                <View style={styles.register_box}>
                    <View style={styles.register_item}>
                        <View style={styles.register_source}>
                            <TouchableOpacity onPress={() => this._owenSource(true)}>
                                <Text style={this.state.owenSourceTag === true ? styles.owenSource_active : styles.owenSource}>公安</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this._owenSource(false)}>
                                <Text style={this.state.owenSourceTag === false ? styles.owenSource_active : styles.owenSource}>工商</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.register_item}>
                        {
                            this.state.owenSourceTag === true ? <Text style={styles.register_item_title}>公安范围</Text> : <Text style={styles.register_item_title}>工商范围</Text>
                        }
                        {
                            this.state.getRangeData.map((item,index) => {
                                return(
                                    <View style={styles.register_item_box} key={index}>
                                        <View style={styles.register_item_index}>
                                            <Text style={styles.register_item_index_text}>{index+1}</Text>
                                        </View>
                                        <MyInput placeholder='请选取地址范围'
                                                   value={item.coverRange}
                                                   style={styles.register_item_input}
                                                   onFocus={() => this._showAreaPicker(index,'range')}
                                                   keyboardType='default'
                                        />
                                        {
                                            index > this.state.getRangeData.length - 2 ?
                                                <TouchableOpacity onPress={() => this._getRange(index)}>
                                                    <Text
                                                        style={[styles.register_item_number, styles.register_item_code]}>添加范围</Text>
                                                </TouchableOpacity> :
                                                <TouchableOpacity onPress={() => this._delRange(index)}>
                                                    <Image style={styles.passwordEyes}
                                                           source={require('../../../../../assets/images/login_del.png')}/>
                                                </TouchableOpacity>
                                        }
                                    </View>
                                )
                            })
                        }
                    </View>
                    <View style={styles.register_item_protocol}>
                        <TouchableOpacity onPress={this._protocolCheck}>
                            {
                                this.state.protocol ?
                                    <Image source={require('../../../../../assets/images/checkbox_true.png')}/> :
                                    <Image source={require('../../../../../assets/images/checkbox_false.png')}/>
                            }
                        </TouchableOpacity>
                        <View style={styles.register_item_protocol_con}>
                            <Text style={styles.register_item_protocol_title}>使用IP公社表示同意协议：</Text>
                            <Text style={styles.register_item_protocol_pro}>《IP公社-注册协议》</Text>
                        </View>
                    </View>
                    <View style={styles.register_register}>
                        {
                            this.state.registerBtag ?
                                <TouchableOpacity onPress={this._Register} style={styles.register_register_btn}>
                                    <Text style={styles.register_register_btn_text}>注册</Text>
                                </TouchableOpacity> : <View style={styles.register_register_btn_other}>
                                    <Text style={styles.register_register_btn_text}>注册</Text>
                                </View>
                        }
                    </View>
                </View>
            </View>
        )
    }

    renderPage() {
        return (
            <Container scrollViewProps={{style: styles.container}}>
                <ScrollView>
                    {
                        this.state.nextStep === 'one' ? this._reigsterFirst() : null
                    }
                    {
                        this.state.nextStep === 'two' ? this._reigsterNext() : null
                    }
                    {
                        this.state.nextStep === 'three' ? this._reigsterLast() : null
                    }
                </ScrollView>
            </Container>
        )
    }
}

export default Register
