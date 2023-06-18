import requests from "./request";
import axios from "axios";


// 1、登录状态
export const getLoginState=()=>{
    return requests({
        url:'/login/status',
        method:'get'
    })
}

//2、获取用户详情
export const getuserdetail=(id)=>{
    return requests({
        url:'/user/detail?uid='+id,
        method:'get'
    })
}


// 3、获取用户信息 , 歌单，收藏，mv, dj 数量
export const playlist=(params)=>{
    // console.log('api',params)
    return requests({
        url:'/user/playlist?uid='+params,
        method:'get',
        
    })
}


// 4、获取为你推荐 限制为6
export const recomendsix=()=>{
    // console.log('api',params)
    return requests({
        url:'/personalized?limit=6',
        method:'get',
    })
}

// 5、获取歌单所有歌曲
export const track=(listid)=>{
    // console.log('api',params)
    return requests({
        url:'/playlist/track/all?id='+listid+"&limit=30",
        method:'get',
    })
}

// 6、获取音乐 urlUid
export const getSongUrl=(id)=>{
    // console.log('api',params)
    return requests({
        url:`/song/url?id=${id}`,
        method:'get',
    })
}
// ,

// 7、获取喜欢列表
export const getLikeList=(usrid)=>{
    return requests({
        url:`/likelist?uid=${usrid}`,
        method:"get"
    })
}

// 8、获取banner
export const getbannerList=()=>{
    return requests({
        url:'/banner?type=2',
        methods:'get'
    })
}