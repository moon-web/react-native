import React, { Component } from 'react';
import { Platform, TextInput, StyleSheet } from 'react-native';
import { ScreenUtil } from '../../../utils/util';

export default class MyTextInput extends Component {
    shouldComponentUpdate(nextProps) {
        return (
            Platform.OS !== 'ios'
            || (this.props.value === nextProps.value && (nextProps.defaultValue == undefined || nextProps.defaultValue == ''))
            || (this.props.defaultValue === nextProps.defaultValue && (nextProps.value == undefined || nextProps.value == ''))
        );
    }
    render() {
        let { style, multiline } = this.props;
        return <TextInput {...this.props} underlineColorAndroid='transparent' style={[styles.myInput, multiline ? styles.myInputTop : null ,style]}/>;
    }
}

const styles = StyleSheet.create({
    myInput: {
        padding: 0
    },
    myInputTop: {
        textAlignVertical: 'top'
    }
})
