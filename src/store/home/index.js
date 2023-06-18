import {getLoginState,getuserdetail,playlist} from '@/api'

    const actions={
        // 登录状态
       async loginstate({commit}){
        await getLoginState().then(res=>{
            // console.log("用户状态action",res.data)
            commit('LOGINSTATE',res.data)
        }) 
        },

        // 用户详情
        async usrdetail({commit},value){
            // console.log(value)
            await getuserdetail(value).then(res=>{
                // console.log("用户详情action",res.data)
                commit('USERDETAIL',res.data)
            }) 
            }, 
            
        //获取歌单
        async getsonglist({commit},value){
            // console.log(value)
            await playlist(value).then(res=>{
                // console.log("获取歌单action",res)
                commit('GETSONGLIST',res.data)
            }) 
            }, 
    }


    const mutations={
        //登录状态
        LOGINSTATE(state,value){
            state.userInfo=value.data
        },

        //用户详情
        USERDETAIL(state,value){
            state.userdetaillist=value
            
        },

        //获取歌单
        GETSONGLIST(state,value){
            state.playlist=value
            // console.log(state);
        }
    }
    const state={
        userInfo:{},
        userdetaillist:{},
        playlist:{}
    }
    
    
    export default{
        actions,
        mutations,
        state
    }