import React, { Component } from 'react'
import { SegmentedView } from 'teaset'
import TaskDetail from '../../plaza/detail/details'  // 任务详情
import HomeWork from './children/home_work'// 作业
class WorkDatalis extends Component {
    constructor() {
        super()
        this.state = {
            index: 0,
            routes: [
                { key: 'first', title: '作业内容' },
                { key: 'second', title: '作业详情' },
            ],
        }
    }

    render() {
        let { navigation, userInfo } = this.props;
        let TaskId = navigation.getParam('TaskId');
        let taskType = navigation.getParam('taskType')
        return (
            <SegmentedView style={{ flex: 1 }} type='projector'>
                <SegmentedView.Sheet title='作业内容'>
                    <HomeWork taskType={taskType} TaskId={TaskId} {...this.props}/>
                </SegmentedView.Sheet>
                <SegmentedView.Sheet title='作业详情'>
                    <TaskDetail
	                    TaskId={TaskId}
	                    readOnly={true}
                    />
                </SegmentedView.Sheet>
            </SegmentedView>
        )
    }
}

export default WorkDatalis