import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Image } from 'react-native'
import { ScreenUtil } from '../../../../utils/util'

class PlazaItem extends Component {
    constructor() {
        super()
        this.state = {}
    }

    render() {
        let { data } = this.props
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('TaskDetails', { id: data.id })} activeOpacity={0.7}>
                <View style={styles.squareBanner}>
                    <View style={styles.squareBannerTab}>
                        <Image 
                            source={ data.mainPics ? {uri: data.mainPics.replace(/\_/,''), cache: 'force-cache'} : require('../../../../../assets/images/squareBanner.jpg')}
                            style={styles.squareBannerTabImg} 
                        />
                    </View>
                    <Text style={styles.squareBannerText} numberOfLines={1}>{data.name}</Text>
                    <View style={styles.squareBannerInf}>
                        <Text style={styles.squareBannerTiME}>{data.startTime}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

export default PlazaItem

let { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    squareBanner: {
        paddingBottom: ScreenUtil.scaleSize(40),
        paddingTop: ScreenUtil.scaleSize(40),
        paddingLeft: ScreenUtil.scaleSize(30),
        paddingRight: ScreenUtil.scaleSize(30),
        backgroundColor: '#fff',
        marginBottom: ScreenUtil.scaleSize(20)
    },
    squareBannerTab: {
        height: ScreenUtil.scaleSize(300),
        width: width - ScreenUtil.scaleSize(60),
    },
    squareBannerTabImg: {
        width: width - ScreenUtil.scaleSize(60),
        height: ScreenUtil.scaleSize(300),
        borderRadius: ScreenUtil.scaleSize(10)
    },
    squareBannerText: {
        fontSize: ScreenUtil.setSpText(16),
        lineHeight: ScreenUtil.scaleSize(48),
        paddingTop: ScreenUtil.scaleSize(10),
        color: '#4d4d4d',
        fontWeight: '600'
    },
    squareBannerTiME: {
        fontSize: ScreenUtil.setSpText(14),
        color: '#808080',
        lineHeight: ScreenUtil.scaleSize(48),
        flex: 1
    },
    squareBannerEndTiME: {
        fontSize: ScreenUtil.setSpText(14),
        color: '#808080',
        lineHeight: ScreenUtil.scaleSize(48)
    },
    squareBannerInf: {
        height: ScreenUtil.scaleSize(48),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    squareBannerTabAddress: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: ScreenUtil.scaleSize(48),
        flex: 1
    },
    square_address: {
        width: ScreenUtil.scaleSize(30),
        height: ScreenUtil.scaleSize(30),
    }
})