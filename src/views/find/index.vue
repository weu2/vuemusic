<template>
  <div class="box">
    <!-- 搜索模块 -->
    <div class="search">
      <div class="category">
        <img src="@/assets/images/cate.png"/>
      </div>  
      <div class="input">
        <van-search v-model="value" 
        placeholder="请输入搜索关键词" 
        shape="round"
        />
      </div>  
      <div class="sing">
        <img src="./images/yuyin.png"/>
      </div>  
    </div>

    <!-- 推荐模块 -->
    <div class="recommend">
      <div class="recommend-img">
        <van-swipe class="my-swipe" 
        :autoplay="3000" 
        indicator-color="red"
        loop>
          <van-swipe-item 
          v-for="banner in bannerList"
          :key="banner.bannerId"
          ><img :src="banner.pic"/></van-swipe-item>
        </van-swipe>
      </div>
     
    </div>


    <!-- 推荐歌单 -->
    <div class="songList">
      <div class="title">
        <div class="rname">
        推荐歌单 >
        </div>
        <div class="more">
        <img src="./images/more.png">
        </div>
      </div>
      
      <div class="song-list">
        <van-swipe :loop="false" 
        :width="136"
        :height="200"
        :show-indicators="false">
      <van-swipe-item
        v-if="recommendlist"
        v-for="value in recommendlist" 
        :key="value.id"
      >
      <van-image :src="value.picUrl">
      </van-image>
      <div class="text">{{value.name}}</div>
      </van-swipe-item>
      
    </van-swipe>
      </div>
    </div>
    <div class="songList">
      <div class="title">
        <div class="rname">
        热门音乐 >
        </div>
        <div class="more">
        <img src="./images/more.png">
        </div>
      </div>
      
      <div class="song-list">
        <van-swipe :loop="false" 
        :width="136"
        :height="200"
        :show-indicators="false">
      <van-swipe-item
        v-if="hotmusic"
        v-for="value in hotmusic" 
        :key="value.id"
      >
      <van-image :src="value.picUrl">
      </van-image>
      <div class="text">{{value.name}}</div>
      </van-swipe-item>
      
    </van-swipe>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { getbannerList } from '@/api';
import Vue from 'vue';
import axios from 'axios';
import { Image as VanImage } from 'vant';
import { Search,Swipe, SwipeItem } from 'vant';

Vue.use(Search);
Vue.use(Swipe);
Vue.use(SwipeItem);

export default {
  name: 'index',
  data(){
    return {
      value:'',
      bannerList:'',
      // 推荐列表
      recommendlist:{},
      // 热门音乐
      hotmusic:{}
    }
  },
  mounted(){
    this.getbanner();
    this.getReCommend();
    this.getHotMusic()
  },
  methods:{
    // 获取轮播图
    async getbanner(){
      let res=await getbannerList()
      console.log("banner",res.data.banners);
      this.bannerList=res.data.banners
    },
    
    // 获取热门推荐
   async getReCommend(){
        // let 
      await axios.get('/music/personalized?limit=6').then(res=>{
            this.recommendlist=res.data.result
            console.log('推荐成功',this.recommendlist)
        }).catch(err=>{
            // console.log('推荐失败')
        })
  },

  // 获取每日热门音乐推荐
  async getHotMusic(){
        // let 
      await axios.get('/music/recommend/songs').then(res=>{
            this.hotmusic=res.data
            console.log('热门音乐',this.hotmusic)
        }).catch(err=>{
            // console.log('推荐失败')
        })
  },

  }
}


</script>

<style scoped>
*{
  margin: 0px;
  padding:0px;
}

.search{
width: 100%;
height: 30px;
display: flex;
flex: 1;
flex-wrap: nowrap;
align-items: center;
justify-content: space-between;
padding:10px 0px;
background-color: white;
}

.category{
  height: 100%;
  width: 30px;
  margin-left: 10px;
}

/* 图片 */
img{
  height: 100%;
  width: 100%;
}

.sing{
  height: 100%;
  width: 30px;
  margin-right: 10px;
}

/* 推荐模块 */
.recommend{
  width: 90%;
  height: 20vh;
  /* background-color: aqua; */
  margin: 10px auto;
  border-radius:12px
}

.recommend .recommend-img{
  width: 100%;
  height: 20vh;
  background-color: beige;
  border-radius:15px;
  margin-bottom:15px;
  overflow: hidden;
}

.recommend .recommend-pic{
  height: 60px;
  /* background-color: brown; */
  margin:0px auto;
  padding-left: 10px;
  padding-right: 10px;
  /* display: flex;
  flex:1; */
}

.recommend-pic .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    /* line-height: 150px; */
    text-align: center;
    /* background-color: #39a9ed; */
  }

/* 推荐歌单 */
.songList{
  width: 100vw;
  height: 32vh;
  /* background-color: #39a9ed; */
  margin-top:10px
}

.songList .title{
  width: 95%;
  height: 40px;
  background-color: #fff;
  margin:0px auto;
  display:flex;
  flex: 1;
  align-content: center;
  justify-content: space-between;
}

.songList .title .rname{
  height: 100%;
  line-height: 40px;
  font-size:20px;
  font-weight: bold;
}

/* 热门推荐 */
.van-image{
        width: 30vw;
        height: 18vh;
        border-radius: 12px;
        margin-left: 6vw;
        overflow: hidden;
        box-shadow: 5px 5px 2px 0px #b9b7b7;
}

.text{
        height: 5.5vh;
        /* background-color: antiquewhite; */
        margin-top: 1vh;
        width: 30vw;
        overflow: hidden;
        font-size: 13px;
        padding-right: 0.5vw;
        margin-left: 6vw;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
    }

  
</style>