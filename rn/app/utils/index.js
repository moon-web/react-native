/**
 * The main api service
 */
import req from './req';
import http from './http';
export default {
    //我的 ----调查举报
    second_my_linereport(params){
        return http.post(req.SECOND_MY_LINEREPORT,params)
    },


    //有偿举报列表
    second_square_pay_task(params){
        return http.post(req.SECOND_SQUARE_PAY_TASK,params)
    },
    //新增有偿举报接口
    second_clue(params){
        return http.post(req.SECOND_CLUE,params)
    },

    InvestigationTask(params){
        return http.post(req.InvestigationTask,params)
    },

    //执法接口 compensableId  communication沟通情况  resource资源情况 isPolice notice  hitTime move law
    second_caseProgress(params){
        return http.post(req.SECOND_CASEPROGRESS,params)
    },
    //嫌疑人确认   compensableId主任务ID  suspectJson嫌疑人的json串 suspectUserId操作者id
    second_suspect_confirm(params){
        return http.post(req.SECOND_SUSPECT_CONFIRM,params)
    },
    //经营地址确认  operateAddress operateNote operatePic operateUserId operateTime
    second_business_address_confirm(params){
        return http.post(req.SECOND_BUSINESS_ADDRESS_CONFIRM,params)
    },
    //仓库地址确认  warehouseAddress warehouseNote warehousePic warehouseUserId warehouseTime
    second_warehouse_address_confirm(params){
        return http.post(req.SECOND_WAREHOUSE_ADDRESS_CONFIRM,params)
    },
    //工厂地址确认 compensableId  factoryAddress factoryNote factoryPic factoryUserId factoryTime
    second_factory_address_confirm(params){
        return http.post(req.SECOND_FACTORY_ADDRESS_CONFIRM,params)
    },

    //地址确认   compensableId主任务ID addressJson
    second_address_confirm(params){
        return http.post(req.SECOND_ADDRESS_CONFIRM,params)
    },


    //我的鉴定列表
    SECOND_MY_IDENTIFICATION(params){
        return http.post(req.SECOND_MY_IDENTIFICATION,params)
    },
    SECOND_MY_IDENTIFICATION_Id(params){
        return http.post(req.SECOND_MY_IDENTIFICATION_Id,params)
    },
    //新增鉴定接口
    ADD_IDENTIFICATION(params){
        return http.post(req.ADD_IDENTIFICATION,params)
    },
    //分配
    SECOND_FENPEI(params){
        return http.post(req.SECOND_FENPEI,params)
    },
    //组团
    SECOND_ZUTUAN(params){
        return http.post(req.SECOND_ZUTUAN,params)
    },
    //组团人员查询接口
    SECOND_USERNAME(params){
        return http.post(req.SECOND_USERNAME,params)
    },
    //新增日志
    SECOND_ADDRIZHI(params){
        return http.post(req.SECOND_ADDRIZHI,params)
    },
    //日志列表
    SECOND_RIZHI(params){
        return http.post(req.SECOND_RIZHI,params)
    },

    //我的  申请记录
    ApplicationRecord(params){
        return http.post(req.ApplicationRecord,params)
    },
    checkStatus(params){
        return http.post(req.checkStatus,params)
    },


    //一期
    // 线上举报
    onLine_report(params){
        return http.get(req.ONLINE_REPORT,params)
    },
    //位置信息

    FINSHTASK(params){
        return http.post(req.FINSHTASK,params)
    },
    //用户登录
    user_login(params){
        /*alert(req.USER_LOGIN)*/
        return http.post(req.USER_LOGIN,params)
    },
    task_work(params){
        return http.get(req.TASK_WORK,params)
    },



    create_report(params){
        return http.get(req.CREATE_REPORT,params)
    },
    create_task_apply(params){
        return http.get(req.CREATE_TASK_APPLY,params)
    },

    my_point(params){
        return http.get(req.MY_POINT,params)
    },
    jifen_dui(params){
        return http.post(req.JIFEN_DUI,params)
    },
    Location(params){
        return http.get(req.Location,params)
    },










    //任务广场列表
    TASKSQUARESLIST(params){
        return http.get(req.TaskSquaresList,params)
    },
    TaskDetails(params){
        return http.get(req.TaskDetails,params)
    },
    MY_TaskAllData(params){
        return http.get(req.MY_TaskAllData,params)
    },
    CREATETASKWORK(params){
        return http.get(req.CREATETASKWORK,params)
    },
    MYTASKWORK(params){
        return http.get(req.MY_TASKWork,params)
    },
    TASKWORKDetils(params){
        return http.get(req.TASKWORKDetils,params)
    },




    //用户信息
    user_info(params){
        return http.get(req.USER_INFO,params)
    },
    //个人中心  数量统计
    personal_count(params){
        return http.get(req.PERSONAL_COUNT,params)
    },
    //我的举报
    my_report(params){
        return http.get(req.MY_REPORT,params)
    },
    //举报详情
    my_report_detail(params){
        return http.get(req.MY_REPORT_DETAIL,params)
    },
    upload(params){
        return http.upload(req.UPLOAD, params)
    },
    uploadFile(params) {
        return http.upload(req.UPLOADFILE, params)
    },
    //注册接口
    register(params){
        return http.post(req.REGISTER,params)
    },
    //注册验证码接口
    register_identifying(params){
        return http.post(req.REGISTER_IDENTIFYING,params)
    },
    //注册验证验证码接口
    register_code(params){
        return http.post(req.REGISTER_CODE,params);
    },
    //用户登录
    login(params){
        return http.post(req.LOGIN,params)
    },
    //忘记密码,获取验证码
    forget_identifying(params){
        return http.post(req.FORGET_IDENTIFYING,params)
    },
    //忘记密码，验证验证码
    forget_code(params){
        return http.post(req.FORGET_CODE,params)
    },
    //忘记密码
    forget(params){
        return http.post(req.FORGET,params)
    },
    //志愿汇登录
    zyh_login(params){
        return http.get(req.ZYHLOGIN,params)
    },
    //我的邀请
    my_myInvitation(params){
        return http.post(req.MY_MYINVITATION,params)
    },
    //我的公司 公司成员
    my_companyMembers(params){
        return http.post(req.MY_COMPANYMEMBERS,params)
    },
    //新增公司成员
    my_add_companyMembers(params){
        return http.post(req.MY_ADD_COMPANYMEMBERS,params)
    },
    //修改公司成员
    my_modify_companyMembers(params){
        return http.post(req.MY_MODIFY_COMPANYMEMBERS,params)
    },
    //删除公司成员
    my_remove_companyMembers(params){
        return http.post(req.MY_REMOVE_COMPANYMEMBERS,params)
    },
    //打赏举报列表task
    rewardList(params){
        return http.post(req.REWARDLIST,params)
    },
    //打赏任务详情(线索)
    rewardDetail(params){
        return http.get(req.REWARDDETAIL,params)
    },
    //打赏任务协商金额接口
    cunsult(params){
        return http.post(req.CONSULT,params)
    },
    //申领任务
    applyTask(params){
        return http.post(req.APPLYTASK,params)
    },
    //放弃申领任务
    giveUp_task(params){
        return http.post(req.GIVEUP_TASK,params)
    },
    //累计奖励（支出）
    total_reward(params){
        return http.post(req.TOTAL_REWARD,params)
    },
    //我的  收入记录
    income_reward(params){
        return http.post(req.INCOME_REWARD,params)
    },
    //申请奖励信息回显
    apply_reward_backinfo(params){
        return http.post(req.APPLY_REWARD_BACKINFO,params)
    },
    //申请奖励
    apply_reward(params){
        return http.post(req.APPLY_REWARD,params)
    },


    //打赏任务详情（任务）
    rewardListsDetail(params){
        return http.post(req.REWARDLISTDETAIL,params)
    },






    PERSONALDATA(params){
        return http.post(req.PERSONALDATA,params)
    },

    rewardListsDetails(params) {
        return http.get(req.REWARDLISTDetails,params)
    },

    // 获取二维码
    getQrCode(params) {
        return http.get(req.QRCODE,params )
    },

    // 获取品牌数据
    getBrandList(params) {
        return http.get(req.getBrandList, params)
    }
}