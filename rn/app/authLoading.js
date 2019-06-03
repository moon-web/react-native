import React,{ Component } from 'react';
import {
    ActivityIndicator,
    StatusBar,
    View,
} from 'react-native';
import myStorage from './utils/myStorage'
myStorage._getStorage()
class AuthLoadingScreen extends Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
        this.state = {
            userId:''
        }
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () =>{
        let _this = this
        myStorage._load('user3',function(data){
            _this.setState({
                userId:data.userId
            },() => {
                _this.props.navigation.navigate(_this.state.userId != undefined ? 'App' : 'Auth' );
            },function(err){
                _this.props.navigation.navigate('Login')
            })
        })
    };

    // Render any loading content that you like here
    render() {
        return (
            <View>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}
export default AuthLoadingScreen