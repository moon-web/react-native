import React, { Component } from 'react'
import { ScrollView, Keyboard, TouchableWithoutFeedback, View } from 'react-native'

export default class Container extends Component {
    // 收起小键盘
    _dismissKeyBoard() {
        Keyboard.dismiss()
    }

    render() {
        return (
            <ScrollView {...this.props.scrollViewProps} keyboardShouldPersistTaps='handled'>
                <TouchableWithoutFeedback onPress={this._dismissKeyBoard}>
                    <View>
                        {
                            this.props.children
                        }
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        )
    }
}
