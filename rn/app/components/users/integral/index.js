import React, {Component} from 'react';
import {View, Text, Image, FlatList} from 'react-native';
import API from '../../../utils/index'
import Loading from '../../common/Loading/Loading'
import myStorage from '../../../utils/myStorage'
import styles from './styles'
myStorage._getStorage()
class Intrgral extends Component {
    constructor(){
        super()
        this.state = {
            userId:'',
            record:0,
            data:[],
            Loading:true,
            // 下拉刷新
            isRefresh:false,
            // 加载更多
            isLoadMore:false,
            totalPages:0,
            pageSize:20,
            pageNo:1

        }
    }
    loadData=(data)=>{
        API.my_point(data).then(res => {
            if(res.success === true) {
                if(res.result && res.result.length>0) {
                    if (this.state.pageNo === 1) {
                        this.setState({
                            data: res.result,
                            Loading: false,
                            totalPages: res.totalPages,
                            record: res.msg,
                        })
                    } else {
                        this.setState({
                            data: this.state.data.concat(res.result),
                            Loading: false,
                            totalPages: res.totalPages,
                            record: res.msg,
                        })
                    }
                }
            }else{
                this.setState({
                    Loading:false
                })
            }
        })
    }
    componentWillMount(){
        let _this=this;
        myStorage._load('user3',function(data) {
            _this.setState({
                userId: data.userId
            }, () => {
                let data = {
                    userId: _this.state.userId,
                }
                _this.loadData(data);
            })
        })
    }
    /**
     * 创建尾部布局
     */
    _createListFooter(){
        return (
            <View>
                {
                    this.state.data.length != 0 ? <Text style={styles.end}>已经到底了哦~</Text> :<Text></Text>
                }
            </View>
        )
    }
    /**
     * 创建布局
     */
    _createListItem(item,index){
        return (
            <View style={styles.wrapper_box} key={index}>
                <View style={styles.wrappermoney}>
                    <Text style={styles.wrappermoneyname}>{item.gmtCreate}</Text>
                    <Text style={[styles.wrappermoneyname,styles.mon]}>
                        {item.point<0 ?item.point: '+' + item.point}
                    </Text>
                </View>
            </View>
        );
    }


    /**
     * 空布局
     */
    _createEmptyView(){
        return (
            <View style={{height:'100%', alignItems:'center', justifyContent:'center'}}>
                <Text style={{fontSize:16}}>
                    暂无列表数据，下拉刷新
                </Text>
            </View>
        );
    }

    /**
     * 下拉刷新
     * @private
     */
    _onRefresh=()=>{
        // 不处于 下拉刷新
        if(!this.state.isRefresh){
            let pageNo = 1
            this.setState({
                pageNo: pageNo
            })
            let data = {
                userId: this.state.userId,
                pageNo: pageNo,
                pageSize: this.state.pageSize,
            }
            this.loadData(data)
        }
    };

    /**
     * 加载更多
     * @private
     */
    _onLoadMore(){
        // 不处于正在加载更多 && 有下拉刷新过，因为没数据的时候 会触发加载
        if (!this.state.isLoadMore && this.state.data.length > 0){
            let pageNo = this.state.pageNo + 1
            this.setState({
                pageNo:pageNo
            })
            if( pageNo <= this.state.totalPages ){
                let data = {
                    userId: this.state.userId,
                    pageNo: pageNo,
                    pageSize: this.state.pageSize,
                }
                this.loadData(data)
            }else{
                return ;
            }
        }
    }
    render() {
        return (
            <View style={styles.container}>
                    <View style={styles.intrgralImg}>
                        <View style={styles.intrgralImg_Inf}>
                            <Text style={styles.intrgralImgtitles}>我的积分</Text>
                            <Text style={styles.intrgralMoney}>{this.state.record}</Text>
                        </View>
                        <View style={styles.img}>
                            <Image style={styles.PersonalOrdinary_box1_item_image} source={require('../../../../assets/images/Integralgift.png')}/>
                        </View>
                    </View>
                    <View style={styles.titlename}>
                        <Text style={styles.name}>获取记录</Text>
                    </View>
                    <View style={styles.wrapper}>
                        {
                            this.state.data ?
                                <FlatList
                                    style={styles.scrollBox}
                                    data={this.state.data}
                                    //item显示的布局
                                    renderItem={({item}) => this._createListItem(item)}
                                    // 空布局
                                    ListEmptyComponent={this._createEmptyView}
                                    //添加头尾布局
                                    ListFooterComponent={() => this._createListFooter()}
                                    //下拉刷新相关
                                    onRefresh={() => this._onRefresh()}
                                    refreshing={this.state.isRefresh}
                                    keyExtractor={(item)=> item.id.toString()}
                                    //加载更多
                                    onEndReached={() => this._onLoadMore()} onEndReachedThreshold={0.5}
                                /> : ''}
                    </View>
            </View>
        );
    }
}
export default Intrgral;
