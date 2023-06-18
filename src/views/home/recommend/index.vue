<template>
  <div class="recommend border">
ge
    <!-- 顶部 -->
    <div class="top">
        <div class="title">为你推荐</div>
        <div class="x border">
            <img src="../images/close.png"/>
        </div>
    </div>

    <!-- 内容 -->
    <van-grid :border="false" 
    
    :column-num="3">
        <van-grid-item 
        v-if="recommendlist"
        v-for="value in recommendlist" 
        :key="value.id"
        text="111s">
            <van-image :src="value.picUrl">
            </van-image>
            <div class="text">{{value.name}}</div>
         </van-grid-item>
    </van-grid>
    <!-- 更多热门推荐 -->
    <div class="more">
        更多热门歌单 >
    </div>

  </div>
</template>

<script>
import Vue from 'vue';
import { Grid, GridItem } from 'vant';
import { Image as VanImage } from 'vant';
import {recomendsix} from '@/api/index'
import axios from 'axios';

Vue.use(VanImage);
Vue.use(Grid);
Vue.use(GridItem);
export default {
  name: 'index',
  data(){
    return{
    recommendlist:{}     
    }
  },
  mounted(){
    this.getReCommend()
  },
  methods:{
   async getReCommend(){
        // let 
      await axios.get('/music/personalized?limit=6').then(res=>{
            this.recommendlist=res.data.result
            // console.log('推荐成功',this.recommendlist)
        }).catch(err=>{
            // console.log('推荐失败')
        })
    }
  }
}


</script>

<style scoped>
    /* 边框 */
    .border{
        border-radius: 12px;
        overflow: hidden;
    }


    /* 图片 */
    img{
        width:100%;
        height: 100%;
    }
    .recommend{
        width: 90%;
        margin: 1vh auto;
        /* background-color: antiquewhite; */
    }


    /* 顶部 */
    .top{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .title{
        font-size: 18px;
        padding: 1vh;
        font-weight: bold;
    }

    .x{
        width: 5vw;
        height: 3vh;
        margin-right: 3vw;
    }

    /* 内容 */
    .van-grid-item{
        height: 25vh;
    }
    .van-grid-item .text{
        height: 5.5vh;
        /* background-color: antiquewhite; */
        margin-top: 1vh;
        width: 25vw;
        overflow: hidden;
        font-size: 13px;
        padding-right: 0.5vw;
      
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
    }
    .van-image{
        width: 25vw;
        height: 15vh;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 5px 5px 2px 0px #b9b7b7;
    }

    .van-image::after{
        display: block;
        width: 6vw;
        height: 3vh;
        position: absolute;
        top:1vh;
        margin-right: 4vw;
        background-color: aqua;
    }

    /* 更多热门推荐 */
    .more{
       width: 40vw;
       height: 5vh;
       /* background-color: antiquewhite; */
       border-radius: 20px;
       margin: 2ch auto;
       text-align: center;
       line-height: 5vh;
       color: #a9a7a7;
       border: 1px solid #a9a7a7
    }
   
</style>