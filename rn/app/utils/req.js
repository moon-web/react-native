/**
 * This file includes all remote apis.
 */
// const baseUrl = 'https://api.ipcommune.com/ipcommune'; // 线上
const baseUrl = 'http://test.ipcommune.com:9001/ipcommune'; // 测试环境

export default {
    SECOND_SQUARE_PAY_TASK:`${baseUrl}/compensable/queryCompensableReportByPage`,//有偿举报列表
    SECOND_CLUE:`${baseUrl}/compensable/createCompensableReport`,//新增有偿举报接口


    REWARDLISTDETAIL:`${baseUrl}/compensable/queryCompensableDetailById`,//任务详情

    InvestigationTask:`${baseUrl}/compensable/modifyTeam`,//调查任务  allot分配  team组团<0>

    SECOND_CASEPROGRESS:`${baseUrl}/compensable/comfirmLaw`,//执法接口
    SECOND_SUSPECT_CONFIRM:`${baseUrl}/compensable/comfirmSuspect`,//嫌疑人确认
    SECOND_BUSINESS_ADDRESS_CONFIRM:`${baseUrl}/compensable/comfirmOperate`,//经营地址确认
    SECOND_WAREHOUSE_ADDRESS_CONFIRM:`${baseUrl}/compensable/comfirmWarehouse`,//仓库地址确认
    SECOND_FACTORY_ADDRESS_CONFIRM:`${baseUrl}/compensable/comfirmFactory`,//工厂地址确认接口
    SECOND_ADDRESS_CONFIRM:`${baseUrl}/compensable/comfirmAddress`,//地址确认接口


    SECOND_MY_LINEREPORT:`${baseUrl}/compensable/queryCompensableDetailByPage`,//我的 ----调查举报（userId用户id  status  0未审核 1通过 2不通过）




    SECOND_MY_IDENTIFICATION:`${baseUrl}/user/user_queryAppraisalByPage`,// 查询我的鉴定列表userId  pageNo pageSize
    SECOND_MY_IDENTIFICATION_Id:`${baseUrl}/user/user_queryAppraisalById`,//我的鉴定列表详情
    ADD_IDENTIFICATION:`${baseUrl}/user/user_createAppraisal`,// 新增鉴定 userId name brand address num cate appraisalTime contactCompany contactName contactMobile

    SECOND_FENPEI:`${baseUrl}/compensable/modifyAllot`,//分配 allot compensableId
    SECOND_ZUTUAN:`${baseUrl}/compensable/modifyTeam`,//组团 team compensableId
    SECOND_ADDRIZHI:`${baseUrl}/compensable/createCompensableLog`,//新增日志 compensableId opStr userId
    SECOND_RIZHI:`${baseUrl}/compensable/queryCompensableLogPage`,//查询日志 compensableId
    SECOND_USERNAME:`${baseUrl}/user/user_queryUserByMobileAndName`,//     userName  mobile 这个接口用用户名查询用户是否存在

    checkStatus:`${baseUrl}/user/user_queryUserById`,//获取用户详细信息



    //一期举报
    ONLINE_REPORT:`${baseUrl}/report/createReport`,//线上举报<0>

    FINSHTASK:`${baseUrl}/compensable/finishNotice`,//完成任务提示后台







    CREATE_REPORT:`${baseUrl}/report/createReport`,//举报
    CREATE_TASK_APPLY:`${baseUrl}/task/createTaskApply`,//报名任务



    MY_POINT:`${baseUrl}/user/user_queryPointByPage`,//我的积分
    JIFEN_DUI:`${baseUrl}/user/user_exchangeScoreflow`,

    UPLOAD:`${baseUrl}/image/upload`,//图片上传
    UPLOADFILE:`${baseUrl}/image/upload2`,//图片上传
    QRCODE: `${baseUrl}/image/uploadByText`, // 二维码接口







    //用户信息
    USER_INFO:`${baseUrl}/user/user_queryUserById`,//用户信息（userId）
    //个人中心数量统计
    PERSONAL_COUNT:`${baseUrl}/user/user_queryTotalCount`,// （userId）
    //我的举报
    MY_REPORT:`${baseUrl}/report/queryReportByPage`,//我的举报（type 1线上 2线下 pageNo，pageSize，userId，type）
    //我的举报详情
    MY_REPORT_DETAIL:`${baseUrl}/report/queryReportById`,//举报详情 （id）
    //注册获取手机验证码
    REGISTER_IDENTIFYING: `${baseUrl}/user/user_registerMobileCheckCode`,//注册手机验证码
    //注册验证验证码
    REGISTER_CODE: `${baseUrl}/user/user_registerValidateMobileCheckCode`,//注册验证验证码
    //注册
    REGISTER:`${baseUrl}/user/user_register`,//注册 （mobile，code，password，checkId,type）
    //登录
    LOGIN:`${baseUrl}/user/user_login`,//用户登录
    //忘记密码获取验证码
    FORGET_IDENTIFYING:`${baseUrl}/user/user_forgetCheckcode`,//修改密码,获取验证
    //忘记密码验证验证码
    FORGET_CODE:`${baseUrl}/user/user_forgetValidateMobileCheckcode`,//检验验证码
    //忘记密码
    FORGET:`${baseUrl}/user/user_forget`,//确定修改密码
    //邀请
    MY_MYINVITATION:`${baseUrl}/user/user_queryInviteUserPage`,//查询我的邀请接口
    //查询公司成员接口
    MY_COMPANYMEMBERS:`${baseUrl}/user/user_queryCompanyUserPage`,//查询公司成员接口  上传companyId也就是当前用户id
    //创建公司成员
    MY_ADD_COMPANYMEMBERS:`${baseUrl}/user/user_createCompanyUser`,//创建公司成员  userId   userName nickName password mobile
    //修改公司成员
    MY_MODIFY_COMPANYMEMBERS:`${baseUrl}/user/user_modifyCompanyUser`,//修改公司成员
    //删除公司成员
    MY_REMOVE_COMPANYMEMBERS:`${baseUrl}/user/user_removeCompanyUser`,//删除公司成员  userId
    //打赏任务列表
    REWARDLIST:`${baseUrl}/compensable/queryCompensableDetailByPage`,//打赏任务列表
    //打赏任务详情(线索)
    REWARDDETAIL:`${baseUrl}/compensable/queryCompensableReportById`,//调查线索详情
    // 协商接口
    CONSULT:`${baseUrl}/compensable/consult`,// 协商接口compensableId  money consultType 类别1调查 2执法 3调查+执法
    //申领任务
    APPLYTASK:`${baseUrl}/compensable/receiveCompensable`,//申领任务 compensableId userId consultType
    //放弃任务
    GIVEUP_TASK:`${baseUrl}/compensable/giveupCompensable`,//放弃任务 compensableId
    //累计奖励（申请奖励 //支出奖励）
    TOTAL_REWARD:`${baseUrl}/user/user_queryApplyByPage`,//申请奖励记录
    //收入奖励
    INCOME_REWARD:`${baseUrl}/user/user_queryIncomeByPage`,//收入记录

    //申请奖励信息回显
    APPLY_REWARD_BACKINFO:`${baseUrl}/user/user_queryApplyById`,//奖励申请信息回显 id
    //申请奖励
    APPLY_REWARD:`${baseUrl}/user/user_createApply`,//创建奖金申请userId bankNo bankName userName idNo idFront idBack address contactName contactMobile price
    REWARDLISTDetails:`${baseUrl}/compensable/queryCompensableReportById`,//调查线索详情


    //曹江珍 07-04
    TaskSquaresList:`${baseUrl}/task/queryTaskByPage`,//任务广场
    TaskDetails:`${baseUrl}/task/queryTaskById`,//任务详情
    MY_TaskAllData:`${baseUrl}/task/queryTaskApplyByPage`,//我的任务-任务袋
    CREATETASKWORK:`${baseUrl}/task/createTaskWork`,//新增我的作业
    MY_TASKWork:`${baseUrl}/task/queryTaskWorkByPage`,//我的任务-作业
    TASKWORKDetils:`${baseUrl}/task/queryTaskWorkById`,//获取作业详情数据
    Location:`${baseUrl}/user/user_queryCurrentAddressById`,//获取地址
    ZYHLOGIN:`${baseUrl}/ZYHlogin/ZYHlogin`,//志愿汇登录
    PERSONALDATA:`${baseUrl}/user/user_modifyUser`,//修改用户信息

    getBrandList: `${baseUrl}/brand/queryBrandPage`, // 获取品牌数据

}