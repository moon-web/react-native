import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, Button } from 'react-native'
import { ScreenUtil } from '../../../../utils/util'
class TaskItem extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    const { data, navigation } = this.props;
    let statusText = '';
    if (data.status === 1) {
      statusText = '待审核'
    } else if(data.status === 2) {
      statusText = '审核通过'
    } else {
      statusText = '不通过'
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('Work', {
          TaskId: data.taskId,
          taskType: data.taskType,
          brandName: data.brandName
        })} key={data.taskId}>
          <View style={styles.reportItem}>
            <View style={styles.reportBox}>
              <View style={styles.taskDataTitle}>
                <Text style={styles.reportBox_con}>{data.taskType === 1 ? '线上任务' : '线下任务'}</Text>
              </View>
              <View style={styles.TaskBottomInf}>
                <Image style={styles.reportItem_Img} source={data._mainPics ? { uri: data._mainPics } : require('../../../../../assets/images/peple.png')} />
                <Text style={styles.titles} numberOfLines={2}>{data.taskName}</Text>
                <View style={styles.Taskoperation} >
                  <Text style={styles.TaskoperationText}>{statusText}</Text>
                  <View style={styles.Taskoperationwarpper}>
                    <Image style={styles.timericon} source={require('../../../../../assets/images/timer.png')} />
                    <Text style={styles.TaskoperationText}>{data.endTime}</Text>
                  </View>
                </View>
              </View>
              {data.status === 2 ?
                <View style={styles.btn}>
                  <View style={styles.TaskoperationBtn}>
                    <Text style={styles.Taskwork}>作业</Text>
                  </View>
                </View>
                : ''
              }

            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}
export default TaskItem
const styles = StyleSheet.create({
  container: {
    paddingLeft: ScreenUtil.scaleSize(30),
    paddingRight: ScreenUtil.scaleSize(30),
    paddingTop: ScreenUtil.scaleSize(30)
  },
  reportItem: {
    backgroundColor: '#fff',
    padding: ScreenUtil.scaleSize(20),
    borderRadius: ScreenUtil.scaleSize(10)
  },
  reportBox: {
    flexDirection: 'column',
  },
  taskDataTitle: {
    borderBottomWidth: 2,
    borderColor: 'rgb(236, 236, 236)'
  },
  reportBox_con: {
    lineHeight: ScreenUtil.scaleSize(60),
    color: '#8f8f8f',
    fontSize: ScreenUtil.setSpText(16),
    paddingLeft: ScreenUtil.scaleSize(10)
  },
  TaskBottomInf: {
    flexDirection: 'row',
    paddingTop: ScreenUtil.scaleSize(10),
    paddingBottom: ScreenUtil.scaleSize(10),
    marginLeft: ScreenUtil.scaleSize(20),
  },
  reportItem_Img: {
    width: ScreenUtil.scaleSize(100),
    height: ScreenUtil.scaleSize(100),
  },
  titles: {
    lineHeight: ScreenUtil.scaleSize(40),
    fontSize: ScreenUtil.setSpText(16),
    flex: 1,
    flexWrap: 'nowrap',
    paddingRight: ScreenUtil.scaleSize(10),
    paddingLeft: ScreenUtil.scaleSize(20),
    color: '#8f8f8f'
  },
  Taskoperation: {
    width: ScreenUtil.scaleSize(170),
    height: ScreenUtil.scaleSize(100),
  },
  timericon: {
    width: ScreenUtil.scaleSize(28),
    height: ScreenUtil.scaleSize(28),
  },
  TaskoperationText: {
    fontSize: ScreenUtil.setSpText(14),
    lineHeight: ScreenUtil.scaleSize(50),
    textAlign: 'right',
    color: '#8f8f8f'
  },
  Taskoperationwarpper: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'flex-end',
  },
  btn: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'flex-end',
  },
  TaskoperationBtn: {
    width: ScreenUtil.scaleSize(160),
    height: ScreenUtil.scaleSize(50),
    backgroundColor: '#4887e5',
    borderRadius: ScreenUtil.scaleSize(10),
  },
  Taskwork: {
    color: '#fff',
    fontSize: ScreenUtil.setSpText(18),
    textAlign: 'center',
    lineHeight: ScreenUtil.scaleSize(50),
  }
})