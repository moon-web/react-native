import { StyleSheet } from 'react-native'
import { ScreenUtil } from '../../../utils/util';

const styles = StyleSheet.create({
  tabBar: {
    height: ScreenUtil.scaleSize(66)
  },
  footer: { 
    textAlign: 'center', 
    lineHeight: ScreenUtil.scaleSize(80), 
    color: '#ccc' 
  },
  noData: { 
    height: 100, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
})

export default styles;