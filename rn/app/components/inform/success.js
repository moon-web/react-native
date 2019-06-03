import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ScreenUtil } from '../../utils/util';
export default class InformSuccess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: ''
        }
    }

    componentWillMount() {
        const { navigation } = this.props;
        const type = navigation.getParam('type', '');
        this.setState({
            type: type
        })
    }

    _linkToListPage() {
        let { type } = this.state;
        let { navigation } = this.props;
        if (type === 3) {
            navigation.navigate("InvestigationList")
        } else {
            navigation.navigate("UserCenterReport", {type: type})
        }
    }

    render() {
        
        return (
            <View style={styles.container}>
                <View style={styles.TaskSuccessFul}>
                    <Image source={require('../../../assets/images/repsuc.png')} style={styles.TaskSuccessImg} />
                    <Text style={styles.TaskSuccessTitle}>举报成功,请等待工作人员审核</Text>
                </View>
                <View style={styles.TaskSuccessBtn} >
                    <TouchableOpacity style={styles.brannerWrap} onPress={() => { this.props.navigation.goBack()}}>
                        <View style={styles.TaskSuccessBtnStyle}>
                            <Text style={styles.TaskSuccessBtnStyleFONT}>继续举报</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.brannerWrap} onPress={() => this._linkToListPage()}>
                        <View style={styles.TaskSuccessBtnStyle}>
                            <Text style={styles.TaskSuccessBtnStyleFONT}>查看举报列表</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: ScreenUtil.scaleSize(100),
        paddingBottom: ScreenUtil.scaleSize(100),
        paddingLeft: ScreenUtil.scaleSize(30),
        paddingRight: ScreenUtil.scaleSize(30),
    },
    TaskSuccessFul: {
        height: ScreenUtil.scaleSize(500),
        backgroundColor: '#fff',
        borderRadius: ScreenUtil.scaleSize(10),
        shadowColor: '#808080',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: ScreenUtil.scaleSize(10),
        elevation: ScreenUtil.scaleSize(100),
        justifyContent: 'center',
        alignItems: 'center'
    },
    TaskSuccessImg: {
        width: ScreenUtil.scaleSize(130),
        height: ScreenUtil.scaleSize(100),
        marginTop: ScreenUtil.scaleSize(40),
    },
    TaskSuccessTitle: {
        height: ScreenUtil.scaleSize(200),
        lineHeight: ScreenUtil.scaleSize(200),
        fontSize: ScreenUtil.setSpText(20),
        color: '#668fff',
        fontWeight: '600',
    },
    TaskSuccessBtn: {
        marginTop: ScreenUtil.scaleSize(146),
        height: ScreenUtil.scaleSize(90),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    TaskSuccessBtnStyle: {
        width: ScreenUtil.scaleSize(250),
        height: ScreenUtil.scaleSize(90),
        borderRadius: ScreenUtil.scaleSize(10),
        backgroundColor: '#4887e5',
        marginRight: ScreenUtil.scaleSize(30),
        marginLeft: ScreenUtil.scaleSize(30),

    },
    TaskSuccessBtnStyleFONT: {
        fontSize: ScreenUtil.setSpText(16),
        color: '#fff',
        lineHeight: ScreenUtil.scaleSize(90),
        textAlign: 'center',
    }
})