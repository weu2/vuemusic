<template>
  <div class="list">

    <!-- 顶部返回 -->
    <div class="top">
        <div class="image-back" @click="goback()">
            <img src="./image/left.png"/>
        </div>
        <div style="line-height: 5vh;font-size: 20px;padding-left: 10px;">
            <div v-if="$route.query.index==1">推荐歌单</div>
            <div v-else>热门歌曲</div>
        </div>
    </div>
    <div class="content">
        <div v-if="$route.query.index==1">
            <recommend :item="JSON.stringify($route.query.list)"></recommend>
        </div>
        <div v-else>
            <hotmusic :item1="JSON.stringify($route.query.list)"></hotmusic>
        </div>
    </div>  
</div>
</template>

<script>

import recommend from './recommendmusic/index.vue'
import hotmusic from './hotmusic/index.vue'
export default {
    name: 'index',
    components:{
        recommend,
        hotmusic
    },
    data(){
        return{
            // 获取的列表数据
            list:{},
            
        }
    },
    mounted(){
        console.log(this.$route.query);
        this.getlist()
    },
    methods:{
        goback(){
            this.$router.go(-1)
        },
        getlist(){
            this.list=this.$route.query.list
            console.log('list',this.list);
            this.slist=JSON.stringify(this.$route.query.list)
            // if(this.$route.index===1){
                
            // }else if(this.$route.index===2){

            // }
        }
    }
}


</script>

<style scoped>
body{
    height: 100%;
    width: 100%;
    
}

.top{
    width: 100%;
    height: 5vh;
    display: flex;
    /* background-color: antiquewhite; */
    position: fixed;
    top:0px;
    left: 0;
}

img{
    width: 100%;
    height: 100%;
}
.image-back{
    width:8%;
    height: 100%;
}
</style>