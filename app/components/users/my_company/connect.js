import { connect } from 'react-redux'
import { actionCreator, union } from '../../../utils/util'
import MyCompany from './my_company'
import * as types from '../../../constants/users/myCompanyTypes'
import API from '../../../utils/index'
import { Toast } from 'teaset'
// 重新组织订单列表数据
const organizeTasks = (oldTasks, newTasks) => {
    let taskList = [];
    oldTasks = oldTasks || [];
    newTasks = newTasks || [];
    taskList = union(oldTasks, newTasks);
    return taskList;
};
function mapStateToProps(state){
    const { isFetching, oldListResult, newListResult, pageNo, total } = state.mycompanyReducer;
    const companyMemberList = organizeTasks(oldListResult, newListResult);
    return{
        userInfo: state.loginReducer.userInfo,
        isFetching,
        companyMemberList,
        companyMember: newListResult || [],
        pageNo,
        total
    }
}

function mapDispatchToProps(dispatch,props){
    return{
        //公司成员列表
        CompanyMemberList:(data,oldCompanyResult,callback) => {
            API.my_companyMembers(data).then(res => {
                if(res.success === true){
                    if(res.result && res.result.length>0){
                        dispatch(actionCreator(types.MYCOMPANY_LIST,{companyMember:res.result,oldCompanyResult,pageNo:data.pageNo,total:res.totalPages}))
                    }
                    if(typeof callback === 'function'){
                        callback()
                    }
                }else{
                    Toast.fail('公司成员列表查询失败')
                }
            })
        },
        //增加公司成员
        CompnayMemberAdd:(data,callback) => {
            API.my_add_companyMembers(data).then(res => {
                if(res.success === true){
                    if (typeof callback === 'function'){
                        callback()
                    }
                }else{
                    Toast.fail(res.msg)
                }
            })
        },
        //删除公司成员
        CompanyMemberDel:(data,callback) => {
            API.my_remove_companyMembers(data).then(res => {
                if(res.success === true){
                    if(typeof callback === 'function'){
                        callback()
                    }
                }else{
                    Toast.fail('删除公司成员失败')
                }
            })
        },
        //编辑公司成员
        ComapnyMemberEdit:(data,callback) => {
            API.my_modify_companyMembers(data).then(res => {
                if(res.success === true){
                    if(typeof callback === 'function'){
                        callback()
                    }
                }else{
                    Toast.fail('编辑公司成员失败')
                }
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyCompany)