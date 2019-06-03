import {combineReducers} from 'redux'
import commonReducer from './commonReducer'
import loginReducer from './user/loginReducer'
import personalCountReducer from './user/personalCount'
import addressReducer from './addressReducer'
import forgetpwReducer from './user/forgetpwReducer'
import taskListReducer from './task/taskListReducer'
import workDetailReducer from './task/workDetailReducer'
import reportListReducer from './task/reportListReducer'
import reportDetailReducer from './task/reportDetailReducer'
import PlazaListReducer from './task/plazaListReducer'
import invitationReducer from './user/invitationReducer'
import mycompanyReducer from './user/mycompanyReducer'
import rewardTaskReducer from './task/rewardListReducer'
import rewardDetailReducer from './task/rewardDetailReducer'
import rewardCenterReducer from './user/rewardTotalReducer'
import rewardReducer from './user/rewardReducer'
import applyRewardReducer from './user/applyRewardReducer'
import taskLogsReducer from './task/taskLogsReducer'
import investigationListReducer from './task/investigationListReducer'
import investigationDetailReducer from './task/investigationDetailReducer'
const rootReducer = combineReducers({
    commonReducer: commonReducer,
    loginReducer: loginReducer,
    personalCountReducer: personalCountReducer,
    addressReducer: addressReducer,
    forgetpwReducer: forgetpwReducer,
    taskListReducer: taskListReducer,
    workDetailReducer: workDetailReducer,
    reportListReducer: reportListReducer,
    reportDetailReducer: reportDetailReducer,
    PlazaListReducer: PlazaListReducer,
    invitationReducer:invitationReducer,
    mycompanyReducer:mycompanyReducer,
    rewardTaskReducer:rewardTaskReducer,
    rewardDetailReducer:rewardDetailReducer,
    rewardCenterReducer:rewardCenterReducer,
    rewardReducer:rewardReducer,
    applyRewardReducer:applyRewardReducer,
    taskLogsReducer: taskLogsReducer,
    investigationListReducer: investigationListReducer,
    investigationDetailReducer: investigationDetailReducer
})

export default rootReducer;