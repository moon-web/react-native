import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Keyboard } from 'react-native'
import { Toast, PullPicker } from 'teaset'
import Picker from 'react-native-picker'
import { ScreenUtil, uploadImag, formatNum } from '../../../../utils/util'
import Container from '../../../common/container/index'
import API from '../../../../utils/index'
import MyInput from '../../../common/extends/myInput'
import ImageItem from '../../../inform/common/imageItem'

class workparticulars extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            platformType: '',//商品类别   线上
            platformName: '',//商品类别   线上
            selectedPlatform: 0,
            goodsLink: '',//商品链接
            brand: '',//品牌
            date: {
                text: '',
                arr: []
            },
            note: '',//备注
            taskType: '',//判断线上线下
            address: '',//现场位置        线下
            detailAddress: '',//详细地址
            goodsType: '',//商品类别
            goodsTypeName: '',//商品类别
            selectedGoodsType: 0,
            isClick: true,
            userId: '',
            categoryData: [
                { text: '服饰箱包', value: 1 },
                { text: '日化百货', value: 2 },
                { text: '运动户外', value: 3 },
                { text: '书籍', value: 4 },
                { text: '电器', value: 5 },
                { text: '家装', value: 6 },
                { text: '其他', value: 7 }
            ],
            platformTypeData: [
                { text: '淘宝', value: 1 },
                { text: '天猫', value: 2 },
                { text: '1688', value: 3 },
                { text: 'alibaba', value: 4 },
                { text: 'Aliexpress', value: 5 },
                { text: '京东', value: 6 },
                { text: '一号店', value: 7 },
                { text: '唯品会', value: 8 },
                { text: '当当网', value: 9 },
                { text: '慧聪', value: 10 },
                { text: '未知来源', value: 11 }
            ],
            uploadImg: []
        }
    }

    componentWillMount() {
        this._initState()
    }

    // 初始化时间
    _initState() {
        let date = new Date();
        let year = date.getFullYear(),
            month = formatNum(date.getMonth() + 1),
            day = formatNum(date.getDate()),
            hours = formatNum(date.getHours()),
            minute = formatNum(date.getMinutes()),
            second = formatNum(date.getSeconds())
        let selectedValue = [year, month, day, hours, minute, second];
        let text = `${year}-${month}-${day} ${hours}:${minute}:${second}`
        let brand = this.props.navigation.getParam('brandName')
        this.setState({
            date: {
                text: text,
                arr: selectedValue,
            },
            brand: brand,
            platformType: '',
            goodsLink: '',
            goodsType: '',
            mainPics: '',
            note: '',
            uploadImg: [],
            detailAddress: '',
            isClick: true
        })
    }

    _submission(index) {
        if (!this.state.isClick) {
            Toast.message('请不要重复点击');
            return;
        }
        let { taskType, TaskId, userInfo, createTaskWork, currentAddress } = this.props;
        let { uploadImg, detailAddress, goodsLink, goodsType, brand, note, platformType, date } = this.state;
        let str = [];
        for (let i = 0; i < uploadImg.length; i++) {
            str.push(uploadImg[i].msgCode);
        }
        str = str.toString()
        let data = null;
        if (taskType === 2) {
            //线下
            if (!detailAddress) {
                Toast.message("请输入详细地址")
            } else if (!goodsType) {
                Toast.message("请选择商品类别")
            } else if (!brand) {
                Toast.message("请输入假冒品牌名称")
            } else if (!uploadImg.length) {
                Toast.message("请上传图片")
            } else {
                data = {
                    taskId: TaskId,
                    userId: userInfo.userId,
                    brand: brand,
                    reportTime: date.text,
                    address: currentAddress,
                    detailAddress: detailAddress,
                    type: 2,
                    goodsType: goodsType,
                    mainPics: str,
                    note: note,
                }
                this.setState({
                    isClick: false
                })
                createTaskWork(data, index, this._initState.bind(this))
            }
        } else {
            if (!platformType) {
                Toast.message("请选择平台")
            } else if (!goodsLink) {
                Toast.message("请填写商品的链接")
            } else if (!brand) {
                Toast.message("请输入假冒品牌名称")
            } else if (!uploadImg.length) {
                Toast.message("请上传图片")
            } else {
                //线上
                data = {
                    platformType: platformType,
                    goodsLink: goodsLink,
                    brand: brand,
                    reportTime: date.text,
                    note: note,
                    type: 1,
                    taskId: TaskId,
                    userId: userInfo.userId,
                    mainPics: str
                }
                this.setState({
                    isClick: false
                })
                createTaskWork(data, index, this._initState.bind(this))
            }
        }


    }

    //商品类别
    _showCategoryPicker() {
        let { categoryData, selectedGoodsType } = this.state;
        this._dismissKeyboard()
        PullPicker.show(
            '选择分类',
            categoryData,
            selectedGoodsType,
            (item, index) => this.setState({ goodsType: item.value, selectedGoodsType: index, goodsTypeName: item.text }),
            {
                getItemText: (item, index) => item.text
            }
        )
    }

    //所在平台
    _PickerplatformType = () => {
        let { platformTypeData, selectedPlatform } = this.state;
        this._dismissKeyboard()
        PullPicker.show(
            '选择平台',
            platformTypeData,
            selectedPlatform,
            (item, index) => this.setState({ platformType: item.value, selectedPlatform: index, platformName: item.text }),
            {
                getItemText: (item, index) => item.text
            }
        )
    }

    //选择时间
    _showTimePicker() {
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
            //     //console.log('area', pickedValue);
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

    _dismissKeyboard() {
        Picker.hide();
        Keyboard.dismiss()
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

    // 删除图片
    deleteImage(data) {
        let { uploadImg } = this.state;
        let uploadImgResult = uploadImg.filter((item) => {
            return item.fileName !== data.fileName
        })
        this.setState({
            uploadImg: uploadImgResult
        })
    }

    render() {
        let { taskType, currentAddress } = this.props;
        let { detailAddress, goodsTypeName, date, platformName, goodsLink, brand, uploadImg, note } = this.state;
        return (
            <Container style={styles.container}>
                <View style={styles.reportDetail_box}>
                    {
                        taskType === 2
                            ? [
                                <View style={styles.reportDetail_item} key='1'>
                                    <Text style={styles.reportDetail_item_title}>现场位置：</Text>
                                    <View style={styles.addressWrap}>
                                        <Image source={require('../../../../../assets/images/reward_address.png')} style={styles.workAddress} />
                                        <Text style={styles.address}>{currentAddress}</Text>
                                    </View>
                                </View>,
                                <View style={styles.reportDetail_item} key='2'>
                                    <Text style={styles.reportDetail_item_title}>详细地址：</Text>
                                    <MyInput
                                        placeholder='请输入详细地址'
                                        onChangeText={(text) => { this.setState({ detailAddress: text }) }}
                                        style={styles.Input}
                                        multiline={false}
                                        value={detailAddress}
                                    />
                                </View>,
                                <View style={styles.reportDetail_item} key='3'>
                                    <Text style={styles.reportDetail_item_title}>商品类别：</Text>
                                    <TouchableOpacity onPress={() => this._showCategoryPicker()} activeOpacity={0.7}>
                                        <Text style={styles.Input}>
                                            {
                                                goodsTypeName
                                                    ? goodsTypeName
                                                    : '请选择商品类别'
                                            }
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            ]
                            : [
                                <View style={styles.reportDetail_item} key='4'>
                                    <Text style={styles.reportDetail_item_title}>所在平台：</Text>
                                    <TouchableOpacity onPress={() => this._PickerplatformType()} activeOpacity={0.7}>
                                        <Text style={styles.Input}>
                                            {
                                                platformName
                                                    ? platformName
                                                    : '请选择所在平台'
                                            }
                                        </Text>
                                    </TouchableOpacity>
                                </View>,
                                <View style={styles.workWrapper} key='5'>
                                    <Text style={styles.reportDetail_item_title}>商品链接：</Text>
                                    <View style={styles.TextAreaWrap}>
                                        <MyInput
                                            placeholder='请填写商品链接'
                                            onChangeText={(text) => { this.setState({ goodsLink: text }) }}
                                            style={styles.TextArea}
                                            multiline={true}
                                            value={goodsLink}
                                        />
                                    </View>
                                </View>
                            ]
                    }
                    <View style={styles.reportDetail_item}>
                        <Text style={styles.reportDetail_item_title}>
                            {
                                taskType === 2
                                    ? '现场时间：'
                                    : '举报时间：'
                            }
                        </Text>
                        <TouchableOpacity onPress={this._showTimePicker.bind(this)} activeOpacity={0.7}>
                            <Text style={styles.Input}>
                                {
                                    date.text
                                        ? date.text
                                        : '请选择时间'
                                }
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.reportDetail_item}>
                        <Text style={styles.reportDetail_item_title}>品牌：</Text>
                        {
                            brand
                                ? <Text style={styles.Input}>{brand}</Text>
                                : null
                        }
                    </View>
                    <View style={styles.reportDetail_item}>
                        <Text style={styles.reportDetail_item_title}>商品截图：</Text>
                        <View style={styles.imgWarp}>
                            {
                                uploadImg.map((item, index) => {
                                    return (
                                        <ImageItem deleteImage={this.deleteImage.bind(this)} data={item} key={index} />
                                    )
                                })
                            }
                            {
                                uploadImg.length <= 9
                                    ?
                                    <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)} activeOpacity={0.5} style={styles.addItem}>
                                        <Image style={styles.uploadImag} source={require('../../../../../assets/images/cardUpload.png')} />
                                    </TouchableOpacity>
                                    : ''
                            }
                        </View>
                    </View>
                    <View style={styles.workWrapper}>
                        <Text style={styles.reportDetail_item_title}>备注：</Text>
                        <View style={styles.TextAreaWrap}>
                            <MyInput
                                placeholder='请填写备注'
                                onChangeText={(text) => { this.setState({ note: text }) }}
                                style={styles.TextArea}
                                multiline={true}
                                value={note}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.btnWraps}>
                    <TouchableOpacity onPress={() => this._submission('1')}>
                        <View style={styles.btns}>
                            <Text style={styles.btntitle}>提交并继续</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this._submission('2')}>
                        <View style={styles.btns}>
                            <Text style={styles.btntitle}>提交</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Container>
        )
    }
}
export default workparticulars;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: ScreenUtil.scaleSize(750),
        backgroundColor: '#f2f2f2',
    },
    reportDetail_box: {
        flex: 1,
        paddingLeft: ScreenUtil.scaleSize(30),
        paddingRight: ScreenUtil.scaleSize(30),
        paddingBottom: ScreenUtil.scaleSize(30),
        marginTop: ScreenUtil.scaleSize(30),
        backgroundColor: '#fff',
    },
    reportDetail: {
        width: ScreenUtil.scaleSize(690),
        backgroundColor: '#fff',
        paddingTop: ScreenUtil.scaleSize(30),
        paddingBottom: ScreenUtil.scaleSize(30),
        paddingLeft: ScreenUtil.scaleSize(30),
        paddingRight: ScreenUtil.scaleSize(30),
        position: 'relative'
    },
    reportDetail_item: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: '#e6e6e6',
        borderBottomWidth: 2,
        borderStyle: 'solid',
        marginTop: ScreenUtil.scaleSize(20),
        position: 'relative',

    },
    workWrapper: {
        flexWrap: 'nowrap',
        alignItems: 'flex-start',
    },
    reportDetail_item_title: {
        fontSize: ScreenUtil.setSpText(16),
        lineHeight: ScreenUtil.scaleSize(60),
        width: ScreenUtil.scaleSize(170)
    },
    reportDetail_item_con: {
        fontSize: ScreenUtil.setSpText(16),
        lineHeight: ScreenUtil.scaleSize(80)
    },
    Input: {
        flex: 1,
        height: ScreenUtil.scaleSize(59),
        lineHeight: ScreenUtil.scaleSize(40),
        backgroundColor: '#fff',
        textAlign: 'right',
        fontSize: ScreenUtil.setSpText(16),
        paddingRight: ScreenUtil.scaleSize(10)
    },
    TextAreaWrap: {
        height: ScreenUtil.scaleSize(300),
        width: ScreenUtil.scaleSize(690),
        padding: ScreenUtil.scaleSize(20),
        borderRadius: ScreenUtil.scaleSize(10),
        backgroundColor: '#e6e6e6'
    },
    TextArea: {
        textAlign: 'left',
        lineHeight: ScreenUtil.scaleSize(60),
        fontSize: ScreenUtil.setSpText(16),
        width: ScreenUtil.scaleSize(650),
        height: ScreenUtil.scaleSize(260),
    },
    addressWrap: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    address: {
        lineHeight: ScreenUtil.scaleSize(60),
        flex: 1,
        textAlign: 'right'
    },
    btns: {
        width: ScreenUtil.scaleSize(500),
        height: ScreenUtil.scaleSize(80),
        backgroundColor: '#668fff',
        borderRadius: ScreenUtil.scaleSize(50),
        marginBottom: ScreenUtil.scaleSize(20),
    },
    btnWraps: {
        paddingLeft: ScreenUtil.scaleSize(40),
        paddingRight: ScreenUtil.scaleSize(40),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: ScreenUtil.scaleSize(40)
    },
    btntitle: {
        fontSize: ScreenUtil.setSpText(16),
        color: '#fff',
        textAlign: 'center',
        lineHeight: ScreenUtil.scaleSize(80),
    },
    iconInput: {
        paddingLeft: ScreenUtil.scaleSize(10),
        fontSize: ScreenUtil.setSpText(16),
    },
    workAddress: {
        width: ScreenUtil.scaleSize(40),
        height: ScreenUtil.scaleSize(40),
    },
    platformsTyles: {
        width: ScreenUtil.scaleSize(50),
    },
    imgWarp: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    addItem: {
        marginBottom: ScreenUtil.scaleSize(15),
        marginRight: ScreenUtil.scaleSize(15),
    },
    uploadImag: {
        width: ScreenUtil.scaleSize(150),
        height: ScreenUtil.scaleSize(150),
    },
    uploadText: {
        fontSize: ScreenUtil.setSpText(14),
        textAlign: 'center',
        height: ScreenUtil.scaleSize(40),
        lineHeight: ScreenUtil.scaleSize(40)
    },
})