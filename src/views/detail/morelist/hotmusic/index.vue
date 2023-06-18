<template>
  <div class="hottop">
    <van-grid :border="false" 

        :column-num="3">
    <van-grid-item 
    v-if="hotlist"
    v-for="value in hotlist" 
    :key="value.id"
    text="111s">
        <van-image :src="value.al.picUrl">
        </van-image>
        <div class="text">{{value.name}}</div>
    </van-grid-item>
</van-grid>
  </div>
</template>

<script>
import Vue from 'vue';
import { Grid, GridItem } from 'vant';
import { Image as VanImage } from 'vant';


Vue.use(VanImage);
Vue.use(Grid);
Vue.use(GridItem);
export default {
    name: 'index',
    props:['item1'],
    data(){
        return {
            // 列表
            hotlist:{}
        }
      },
      mounted(){
        this.gethotmusic()
        console.log('gethotmusic',JSON.parse(this.item1));
      },
      methods:{
        gethotmusic(){
            this.hotlist=JSON.parse(this.item1)
        }
      }
}


</script>

<style scoped>
.hottop{
    width: 100%;
    margin-top: 5vh;
}
 .van-grid-item{
        height: 25vh;
    }
    .van-grid-item .text{
        height: 5.3vh;
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
</style>