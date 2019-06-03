import React, { Component  } from 'react';
import {View,Text,ProgressBarAndroid,Modal,StyleSheet} from 'react-native';
export default class Loading extends Component {
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }
    render() {
        return(
            <Modal
                transparent = {true}
                onRequestClose={()=> this.onRequestClose()}
            >
                <View style={styles.loadingBox}>
                    <ProgressBarAndroid styleAttr='Inverse' color='#668fff' />
                </View>
            </Modal>
        );
    }
}
const styles = StyleSheet.create({
    loadingBox: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'rgba(0, 0, 0, 0.1)',
    }
});