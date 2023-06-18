import {getLikeList} from '@/api'

    const actions={
        //获取歌单详情
        async likelist({commit},value){
            let res=await getLikeList(value)
            console.log("likelist",res.data.ids)
            commit('LIKELIST',res.data.ids)
        }, 
    }


    const mutations={
        LIKELIST(state,value){
            state.likelist=value
        }
    }


    const state={
        likelist:[]
    }
    
    
    export default{
        actions,
        mutations,
        state
    }