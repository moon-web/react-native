import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, Dimensions, Image } from 'react-native'
import { ScreenUtil } from '../../../../utils/util'

class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }


    componentWillMount() {
        // this.setState({
        //     taskType: this.props.navigation.state.params.taskType,
        //     id: this.props.navigation.state.params.id,
        // })
        // this.loadData()
    }
    render() {
        let bb, detail = this.props.detail;
        if (detail) {
            let arr = [];
            arr = detail._mainPics.split(",");
            bb = arr.map((v, i) => (
                <Image style={styles.Images} key={i}
                    source={v ? { uri: v } : require('../../../../../assets/images/peple.png')} />
            ))
        } else {
            bb = <Text style={styles.imgtitle}>暂无图片</Text>
        }
        return (
            <View style={styles.container}>
                <ScrollView style={styles.ScrollView}>
                    <View style={styles.reportDetail_box}>
                        {
                            detail.type === 2 ?
                                [
                                    <View style={styles.reportDetail_item} key='1'>
                                        <Text style={styles.reportDetail_item_title}>现场位置：</Text>
                                        <Text style={styles.Input}>{detail.address ? detail.address : ''}</Text>
                                    </View>,
                                    <View style={styles.reportDetail_item} key='2'>
                                        <Text style={styles.reportDetail_item_title}>详细地址：</Text>
                                        <Text style={styles.Input}>{detail.detailAddress ? detail.detailAddress : ''}</Text>
                                    </View>,
                                    <View style={styles.reportDetail_item} key='3'>
                                        <Text style={styles.reportDetail_item_title}>商品类别：</Text>
                                        <Text style={styles.Input}>{detail.goodsText ? detail.goodsText : ''}</Text>
                                    </View>
                                ]
                                : [
                                    <View style={styles.reportDetail_item} key='4'>
                                        <Text style={styles.reportDetail_item_title}>所在平台：</Text>
                                        <Text style={styles.Input}>{detail.platformText ? detail.platformText : ''}</Text>
                                    </View>,
                                    <View style={[styles.reportDetail_item, styles.workWrapper]} key='5'>
                                        <Text style={styles.reportDetail_item_title}>商品链接：</Text>
                                        <View style={styles.TextArea}>
                                            <Text style={styles.fontstyle}>{detail.goodsLink ? detail.goodsLink : ''}</Text>
                                        </View>
                                    </View>
                                ]
                        }
                        <View style={styles.reportDetail_item}>
                            <Text style={styles.reportDetail_item_title}>
                                {
                                    this.state.taskType === 2
                                        ? '现场时间：'
                                        : '举报时间：'
                                }
                            </Text>
                            <Text style={styles.Input}>{detail.reportTime ? detail.reportTime : ''}</Text>
                        </View>
                        <View style={styles.reportDetail_item}>
                            <Text style={styles.reportDetail_item_title}>品牌：</Text>
                            <Text style={styles.Input}>{detail.brand ? detail.brand : ''}</Text>
                        </View>
                        <View style={[styles.reportDetail_item, styles.bottom]}>
                            <Text style={styles.reportDetail_item_title}>商品截图：</Text>
                            <View style={styles.ImageWrapper}>
                                {bb}
                            </View>
                        </View>
                        <View style={[styles.reportDetail_item, styles.workWrapper]}>
                            <Text style={styles.reportDetail_item_title}>备注：</Text>
                            <View style={styles.TextArea}>
                                <Text style={styles.fontstyle}>{detail.note ? detail.note : ''}</Text>
                            </View>
                        </View>
                        {
                            detail.status != undefined && detail.status === 2 ?
                                <Image style={styles.statusImg} source={require('../../../../../assets/images/success_status.png')} /> : <Text style={styles.reportDetail_item_title}></Text>
                        }
                        {
                            detail.status != undefined && detail.status === 3 ?
                                <Image style={styles.statusImg} source={require('../../../../../assets/images/fail_status.png')} /> : <Text style={styles.reportDetail_item_title}></Text>
                        }
                    </View>
                </ScrollView>
            </View>
        )
    }
}
export default Detail;
const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    reportDetail_box: {
        flex: 1,
        paddingLeft: ScreenUtil.scaleSize(30),
        paddingRight: ScreenUtil.scaleSize(30),
        paddingBottom: ScreenUtil.scaleSize(30),
        marginTop: ScreenUtil.scaleSize(30),
        backgroundColor: '#fff',
        position: 'relative'
    },
    reportDetail: {
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
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        borderBottomColor: '#e6e6e6',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        marginTop: ScreenUtil.scaleSize(20),
        position: 'relative'
    },
    workWrapper: {
        flexDirection: 'column',
        flexWrap: 'nowrap',
        alignItems: 'flex-start',
    },
    reportDetail_item_title: {
        fontSize: ScreenUtil.setSpText(16),
        lineHeight: ScreenUtil.scaleSize(60)
    },
    reportDetail_item_con: {
        fontSize: ScreenUtil.setSpText(16),
        lineHeight: ScreenUtil.scaleSize(80)
    },
    Input: {
        width: ScreenUtil.scaleSize(500),
        height: ScreenUtil.scaleSize(59),
        backgroundColor: '#fff',
        textAlign: 'right',
        lineHeight: ScreenUtil.scaleSize(59),
        fontSize: ScreenUtil.setSpText(16),
    },
    TextArea: {
        width: ScreenUtil.scaleSize(690),
        backgroundColor: '#e6e6e6',
        padding: ScreenUtil.scaleSize(30),
        justifyContent: 'center',
        marginTop: ScreenUtil.scaleSize(10),
    },
    btns: {
        width: ScreenUtil.scaleSize(500),
        height: ScreenUtil.scaleSize(60),
        backgroundColor: '#668fff',
        borderRadius: ScreenUtil.scaleSize(50),
        marginBottom: ScreenUtil.scaleSize(10),
    },
    btnWraps: {
        width: screenWidth,
        paddingLeft: ScreenUtil.scaleSize(40),
        paddingRight: ScreenUtil.scaleSize(40),
        height: ScreenUtil.scaleSize(200),
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconInput: {
        paddingLeft: ScreenUtil.scaleSize(10),
        fontSize: ScreenUtil.setSpText(16),
    },
    workAddress: {
        position: 'absolute',
        width: ScreenUtil.scaleSize(40),
        height: ScreenUtil.scaleSize(40),
        left: ScreenUtil.scaleSize(155),
        top: ScreenUtil.scaleSize(10),
    },
    platformsTyles: {
        width: ScreenUtil.scaleSize(50),
    },
    fontstyle: {
        textAlign: 'left',
        fontSize: ScreenUtil.setSpText(16),
        lineHeight: ScreenUtil.scaleSize(40),
    },
    ImageWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',

    },
    Images: {
        width: ScreenUtil.scaleSize(160),
        height: ScreenUtil.scaleSize(160),
        marginLeft: ScreenUtil.scaleSize(10),
        marginTop: ScreenUtil.scaleSize(10),
        borderRadius: ScreenUtil.scaleSize(10),
    },
    imgtitle: {
        fontSize: ScreenUtil.setSpText(16),
        lineHeight: ScreenUtil.setSpText(59),
    },
    bottom: {
        borderBottomWidth: 0
    },
    statusImg: {
        position: 'absolute',
        top: ScreenUtil.scaleSize(30),
        right: ScreenUtil.scaleSize(100),
        width: ScreenUtil.scaleSize(200),
        height: ScreenUtil.scaleSize(150)
    },
    reportDetail_item_title: {
        fontSize: ScreenUtil.setSpText(14),
        lineHeight: ScreenUtil.scaleSize(60)
    },
})