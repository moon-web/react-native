/**
 * 前端路由配置
 * 
 */
import { Dimensions } from 'react-native';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation'
// 页面组件引入
import Footer from './components/common/footer/connect'
import Search from './components/serach/serach'
import Peiqi from './components/company/peiqi'
import Introduce from './components/company/introduce'

// 广场
import TaskDetails from './components/plaza/detail/details';//任务详情
import Perfect from './components/plaza/perfect';//补全信息提示
import TaskSuccessful from './components/plaza/TaskSuccessful';//申领任务成功

// 举报
import OfflineInform from './components/inform/offline/connect'
import VolunteerInform from './components/inform/volunteer/connect'
import InformSuccess from './components/inform/success'
import Investigation from './components/inform/investigation/connect'
import WorkDatalis from './components/users/work_detail/connect'  // 作业详情
import HomeWork from './components/users/work/connect'  // 作业
import TaskDetailsInf from './components/users/task_list/connect';//我的任务

// 用户中心
import Intrgral from './components/users/integral/index'
import UserCenterReport from './components/users/report_list/connect'
import ReportDetail from './components/users/report_detail/connect'
import RegisterSuccess from './components/users/register/register_success'
import Register from './components/users/register/volunteer/register'
import Login from './components/users/login/connect'
import ForgetPw from './components/users/forget_pw/connect'
import zyhLogin from './components/users/zyhLogin/connect'
import ModifyInformation from './components/users/information/connect'
import Investigator from './components/users/register/investigator/register'//调查员注册
import AuthLoadingScreen from './authLoading'
import RegisterCompany from './components/users/register/investigator_company/register'
import MyInvitation from './components/users/my_invitation/connect'
import MyCompany from './components/users/my_company/connect'
import RewardTask from './components/users/reward_list/connect'
import RewardDetail from './components/users/reward_detail/connect'
import RewardCompletDetail from './components/users/reward_details/connect'
import TotalReward from './components/users/reward_center/total_reward/connect'
import ChangeReward from './components/users/reward_center/change_reward/connect'
import ApplyReward from './components/users/reward_center/apply_reward/connect'
import InvestigationList from './components/users/investigation_list/connect'
import InvestigationDetail from './components/users/investigation_detail/connect'

import { ScreenUtil } from './utils/util';
const screenWidth = Dimensions.get('window').width;
// 路由配置表

/**
 * @param screen 页面组件
 * @param title 页面标题
 */
function createTitle(screen, title = '') {
    return {
        screen: screen,
        navigationOptions: () => ({
            headerTitle: title,
            headerTintColor: '#292929',
            headerTitleStyle: {
                fontWeight: '400',
                textAlign: 'center'
            },
            headerBackTitle: null,
            headerTruncatedBackTitle: ''
        }),
    }

}

const AppStack = createStackNavigator(
    {
        Home: createTitle(Footer, ''),
        Search: createTitle(Search, '搜索'),
        TaskDetails: createTitle(TaskDetails, '任务详情'),
        TaskSuccessful: createTitle(TaskSuccessful, '报名成功'),
        Perfect: createTitle(Perfect, '完善信息'),
        InformSuccess: createTitle(InformSuccess, '举报成功'),
        Introduce: createTitle(Introduce, 'IP公社简介'),
        UserCenterReport: createTitle(UserCenterReport, '我的举报'),
        ReportDetail: createTitle(ReportDetail, '举报详情'),
        Peiqi: createTitle(Peiqi, '任务描述'),
        TaskDetailsInf: createTitle(TaskDetailsInf, '我的任务'),
        WorkDatalis: createTitle(WorkDatalis, '作业详情'),
        OfflineInform: createTitle(OfflineInform, '线下举报'),
        VolunteerInform: createTitle(VolunteerInform, '志愿举报'),
        Investigation: createTitle(Investigation, '调查举报'),
        Work: createTitle(HomeWork, '作业详情'),
        Intrgral: createTitle(Intrgral, '我的积分'),
        ModifyInformation: createTitle(ModifyInformation, '个人信息'),
        MyInvitation: createTitle(MyInvitation, '我的邀请'),
        MyCompany: createTitle(MyCompany, '我的公司'),
        RewardTask: createTitle(RewardTask, '打赏任务'),
        RewardDetail: createTitle(RewardDetail, '任务详情'),
        RewardCompletDetail: createTitle(RewardCompletDetail, '任务详情'),
        TotalReward: createTitle(TotalReward, '累计奖励'),
        ChangeReward: createTitle(ChangeReward, '申领奖励'),
        ApplyReward: createTitle(ApplyReward, '申领奖励'),
        InvestigationList: createTitle(InvestigationList, '调查任务'),
        InvestigationDetail: createTitle(InvestigationDetail, '任务详情')
    }
);

const AuthStack = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: () => ({
            headerStyle: {
                display: 'none',
            },
        }),
    },
    Register: createTitle(Register, "志愿者注册"),
    RegisterCompany: createTitle(RegisterCompany, "调查公司注册"),
    RegisterSuccess: createTitle(RegisterSuccess, "注册成功"),
    ForgetPw: createTitle(ForgetPw, "忘记密码"),
    zyhLogin: createTitle(zyhLogin, "志愿汇登录"),
    Investigator: createTitle(Investigator, "调查员注册"),
})
const RootStack = createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
);

export default RootStack;

