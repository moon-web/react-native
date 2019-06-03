import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity,  } from 'react-native';
import styles from './styles'
export default class IndustyryItem extends Component {
    constructor(props){
        super(props)
        this.state = {
            value:''
        }
    }

    _deleteIndustry(){
        if (this.props.deleteIndustry) {
            this.props.deleteIndustry(this.props.data)
        }
    }
    render() {
        let item = this.props.data;
        return (
            <View style={styles.industryItem}>
                <View style={styles.industryWrap}>
                    <Text style={styles.industryText}>
                    {item}
                    </Text>
                </View>
                <TouchableOpacity style={styles.industryOn} onPress={this._deleteIndustry.bind(this)}>
                    <Image style={styles.industryDel} source={require('../../../../assets/images/testDel.png')}></Image>
                </TouchableOpacity>
            </View>
        );
    }
}
