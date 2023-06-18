import {track,getSongUrl} from '@/api'

    const actions={
        //获取歌单详情
        async likesong({commit},value){
            // console.log(value)
            await track(value).then(res=>{
                // console.log("获取歌单详情action",res.data)
                commit('LIKESONG',res.data)
            }) 
        }, 

        //获取歌曲详情，可以进入歌曲播放页
        async getsongdata({commit},value){
            // console.log(value)
            await getSongUrl(value).then(res=>{
                // sessionStorage.setItem('datasong',JSON.stringify(res.data.data[0]))
                // console.log("获取歌曲详情action",res.data)
                commit('GETSONGDATA',res.data)
            }) 
        }, 

    }


    const mutations={
        //获取歌单
        LIKESONG(state,value){
            state.track=value
            // console.log(state);
        },

        //获取歌曲详情，可以进入歌曲播放页
        GETSONGDATA(state,value){
            state.songdata=value.data
            console.log("statesongdata",state);
        }
    }


    const state={
        // 根据id获取歌单的详情
        track:{},
        songdata:{}
    }
    
    
    export default{
        actions,
        mutations,
        state
    }