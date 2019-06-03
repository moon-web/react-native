import React, { Component } from 'react'
import { SegmentedView } from 'teaset'
import TaskDetail from '../../plaza/detail/details'  // 任务详情
import Detail from './children/detail'    // 作业详情
import { ScreenUtil } from '../../../utils/util';

export default class WorkDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentWillMount() {
        let { navigation, getWorkDetail } = this.props;
        let id = navigation.getParam('id')
        getWorkDetail(id)
    }


    render() {
        let { navigation, detail } = this.props;
        let TaskId = navigation.getParam('TaskId')
        return (
            <SegmentedView style={{ flex: 1 }} type='projector' barStyle={{height:ScreenUtil.scaleSize(66)}}>
                <SegmentedView.Sheet title='作业内容'>
                    <Detail detail={detail}/>
                </SegmentedView.Sheet>
                <SegmentedView.Sheet title='任务详情'>
                    <TaskDetail 
                        TaskId={TaskId}
                    />
                </SegmentedView.Sheet>
            </SegmentedView>
        )
    }
}
