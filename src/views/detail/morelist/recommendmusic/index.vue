<template>
    <div class="toprem">    
    <van-grid
    :border="false" 
    :column-num="3">
        <van-grid-item 
            v-if="list"
            v-for="(value,index) in list" 
            :key="value.id"
            text="111s"
            :data-arrid="index"
            @click="listdetail($event,value.id)" >
                <van-image :src="value.picUrl">
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
      props:['item'],
      data(){
        return {
            // 列表
            list:{}
        }
      },
      mounted(){
        this.getrecommend()
        console.log('recommendlist',JSON.parse(this.item));
      },
      methods:{
        getrecommend(){
            this.list=JSON.parse(this.item)
        },
        async listdetail(event,id){
            const element = event.currentTarget;
            const parent = element.closest('[data-arrid]');
            const arrid = parent.dataset.arrid;
            console.log('点击了index',arrid)
            // 获取arrid索引号
            await this.$store.dispatch('likesong',id)
            this.$router.push({
              path:"/songlist",
              query:{
                imgurl:this.list[arrid].picUrl,
                name:this.list[arrid].name
              }
            })
    },
      }
  }
  
  
  </script>
  
  <style scoped>
  .toprem{
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