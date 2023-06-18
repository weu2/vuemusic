<template>
  <div class="shanlan">
    <van-grid :column-num="4"
    :border="false">
        <van-grid-item 
        v-for="(img,index) in images" 
        :key="index" 
        >
        <van-image 
        :src="img.image" 
        height="30px"
        width="30px" 
        />
        <div class="text">{{ img.text }}</div>
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
  data(){
    return{
        images:[
            {
                image:require('../images/recent.png'),
                text:'最近播放'
            },
            {
                image:require('../images/download.png'),
                text:'本地/下载'
            },
            {
                image:require('../images/cloud.png'),
                text:'云盘'
            },
            {
                image:require('../images/buyed.png'),
                text:'已购'
            },
            {
                image:require('../images/friend.png'),
                text:'我的好友'
            },
            {
                image:require('../images/shoucang.png'),
                text:'收藏和赞'

            },
            {
                image:require('../images/boke.png'),
                text:'我的播客'
            },
            {
                image:require('../images/musicteam.png'),
                text:'乐谜团'

            },
        ]
    }
  }
}


</script>

<style scoped>
.shanlan{
    width: 90%;
    margin: 5vh auto;
    border-radius: 12px;
    overflow:hidden
}

.text{
    font-size: 12px;
    color:rgb(82, 81, 81);
    padding-top: 1vh;
}
</style>