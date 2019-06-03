import { AppRegistry } from 'react-native';
import App from './App';
import {Theme} from 'teaset';
Theme.set({fitIPhoneX: true});
AppRegistry.registerComponent('ipcommune_app', () => App);
