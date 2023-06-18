<template>
 <van-cell-group :border=false>
            <van-cell 
            value="内容" 
            v-for="(item,index) in items"
            :key="item.id"
            :data-item="JSON.stringify(item)"
            @click="tosongpage($event,item.id)"
            >
        <!-- 使用 title 插槽来自定义标题 -->
                <template #default>
                    <div class="value">
                            <div class="left">
                                <div class="index">{{index+1}}</div>
                                <div class="custom-title">
                                    <div class="songname">{{ item.name }}</div>
                                    <span class="avaname" 
                                    v-for="(singer,index) in item.ar"
                                    :key="singer.id">
                                        {{ singer.name }}{{ index < item.ar.length - 1 ? '/' : '' }} 
                                    </span>
                                </div>
                            </div>
                            <div class="right">
                                <img src="./images/more.png"/>
                            </div>
                        </div> 
                    <!-- <span class="">span</span> -->
                </template>
            </van-cell>
</van-cell-group>
</template>

<script>
import Vue from 'vue';
import { Cell, CellGroup } from 'vant';
import { mapState } from 'vuex';

Vue.use(Cell);
Vue.use(CellGroup);
export default {
    name: 'index',
    props:["items"],
    mounted(){
    },
    methods:{
       async tosongpage(event,id){
            // 获取歌曲数据
            const element = event.currentTarget;
            const parent = element.closest('[data-item]');
            const item = JSON.parse(parent.dataset.item);
            const sdata=await this.sdata
            console.log("sdata",sdata)
            // 触发store事件
            this.$store.dispatch('getsongdata',id);
            // 路由跳转到歌曲播放页并传参
            this.$router.push({
                path:'/songdetail',
                query:{
                    item:item
                }
            })
        }
    },
    computed:{
        ...mapState({
            songdata:state=>state.detail.songdata
        }),
        sdata(){
            return this.songdata || {}
        },
    }
}


</script>

<style scoped>
img{
    width: 100%;
    height: 100%;
}
.value{
    display: flex;
    /* background-color: #985161; */
    /* padding-top: 1vh; */
    /* padding-bottom: 1vh; */
    justify-content: space-between;
    align-items: center;
}

/* 左边 */
.left{
    display: flex;
    width: 90vw;
    align-items: center;
    /* background-color: antiquewhite; */
}

.songname{
    font-size: 15px;
    margin-top: 4px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    /* padding:0 2vw; */
    
}

.index{
    color: #9f9f9f;
    width: 8vw;
    font-size: 18px;
    /* padding: 0 4vw; */
    margin-left: 4vw;
    margin-right: 3vw;
    text-align: center;
}

.custom-title{
    width: 75vw;
    height: 100%;
    /* background-color: #9f9f9f; */

   
   
}

.avaname{
    display: inline-block;
    /* padding: 0 2vw; */
    color: #9f9f9f;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.van-cell{
    padding: 0px 0px;
}

.right{
    width: 6vw;
    height: 100%;
    margin-right: 2vw;
    /* background-color: aliceblue; */
    /* margin-left: 55vw; */
}
</style>