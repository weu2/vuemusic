<template>
  <div>
    <!-- 我的喜欢 -->
  <div
   
   class="like a"
    data-arrid="0" 
  v-if="playList.playlist && playList.playlist.length > 0"
  @click="likelistdetail($event,playList.playlist[0].id)"
  >
    <div class="cover">
        <img :src="playList.playlist[0].coverImgUrl"/>
    </div>
    <div class="box">
        <div class="name">{{playList.playlist[0].name }}</div>
        <div class="songcount">{{  playList.playlist[0].trackCount}}首</div>
    </div>
  </div>

  <!-- 我的歌单 -->
  <van-tabs  
   background="#f1f1f1"
  >
    <!-- 创建歌单 -->
  <van-tab 
  title="创建歌单"
  title-inactive-color="#95939f"
  title-active-color="#2c2e43"
  title-style="font-weight:bold"
  >
  <!-- toptitle -->
    <div class="create" v-if="slicedArray && slicedArray.length > 0">
      <div class="createlist">
        <div>创建歌单({{slicedArray.length}}个)</div>
        <div class="icon">
          <div class="jia">
            <img src="../images/more1.png"/>
          </div>
          <div class="morecreate">
            <img src="../images/jia.png"/>
          </div>
        </div>
      </div>

      <!-- 歌单列表 -->
      <div class="list a" 
      v-if="slicedArray && slicedArray.length > 0"
      v-for="(list,index) in slicedArray"
      :key="index"
      :data-arrid="index+1"
      @click="likelistdetail($event,playList.playlist[index+1].id)"
      id="i">
        <div class="cover"  v-if="slicedArray && slicedArray.length > 0">
        <img :src="list.coverImgUrl"/>
        </div>
        <div class="box">
            <div class="name">{{list.name }}</div>
            <div class="songcount">{{list.trackCount}}首</div>
        </div>
        <div class="morelist">
          <img src="../images/more1.png"/>
        </div>
      </div>
      <div class="import">
          <div class="cover ">
            <img src="../images/import.png"/>
          </div>
          <div class="box">导入外部歌单</div>
      </div>
      
    </div>
    <div v-else></div>

    
  </van-tab>
  
  <!-- 收藏歌单 -->
  <van-tab title="收藏歌单"
  title-inactive-color="#95939f"
  title-active-color="#2c2e43"
  title-style="font-weight:bold"
  >内容 2</van-tab>
</van-tabs>
</div>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'
import Vue from 'vue';
import { Tab, Tabs } from 'vant';

Vue.use(Tab);
Vue.use(Tabs);

export default {
  name: 'index',
  data(){
    return{
        songlist:{},
        active:0
    }
  },
  mounted(){
    this.getSonglist()
    // console.log(this.slicedArray)
  },
  computed:{
    ...mapState({
      playlist:state=>state.home.playlist
    }),
    playList(){
      return this.playlist
    },


    //分割歌单数组
    slicedArray() {
    const newstr=_.slice(this.playList.playlist,1,this.playList.length)
    return newstr;
  }

  },
  methods:{
    //获取歌单
  async getSonglist(){
        let msg=JSON.parse(localStorage.getItem('userInfo')) 
      await  this.$store.dispatch('getsonglist',msg.account.id)
    },
    

    // 进入喜欢歌单详情页
   async likelistdetail(event,id){
      const element = event.currentTarget;
      const parent = element.closest('[data-arrid]');
      const arrid = parent.dataset.arrid;
      // 获取arrid索引号
      await this.$store.dispatch('likesong',id)
      this.$router.push({
        path:"/songlist",
        query:{
          imgurl:this.playList.playlist[arrid].coverImgUrl,
          name:this.playList.playlist[arrid].name
        }
      })
    },

    //  获取喜欢列表
    
  }
}


</script>

<style scoped>

img{
  width:100%;
  height: 100%;
}
.like{
    width: 90%;
    margin:0 auto;
    height: 10vh;
    background-color: white;
    display: flex;
    border-radius: 12px;
    overflow: hidden;
    padding-left: 5vw;
    align-items: center;
}

.cover{
    width: 13vw;
    height: 7vh;
    margin-right: 3vw;
}
.cover img{
    width: 100%;
    height: 100%;
}


.box{
    display: flex;
    flex-direction: column;
    margin-top: 1vh;
}

.box .name{
    font-size: 14px;
    font-weight: bold;
}

.box .songcount{
    padding-top:1vh;
    font-size: 12px;
    color: #9d9c9c;
}

img{
  width: 100%;
  height: 100%;
}

.van-tabs{
  width: 98%;
  margin: 0px auto;
  /* border-radius: 12px; */
  margin-top:10px;
  /* overflow:hidden; */
  font-weight: bold;
  /* background:#f6f6f6 no-repeat cover */
}

.van-tab {
  font-weight: bold;
}

.create{
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: white;
  border-radius: 12px;
  margin-top: 3vh;
}

.create .createlist{
  all: initial;
  width: 90%;
  height: 8vh;
  /* background-color: #bf5757; */
  border-radius: 12px;
  overflow: hidden;
  margin: 1vh auto;
  line-height: 8vh;
  font-size: 15px;
  color:  #9d9c9c;
  display: flex;
  flex: 1;
  justify-content: space-between;
}


.icon{
  display: flex;
  flex: 1;
  flex-direction: row-reverse;
  padding-bottom: 1vh;
  margin-right: -3vw;
}
.jia{
  width: 5vw;
  height:3vh;
  margin:1vh 5vw;
}

.morecreate{
  width: 5vw;
  height:3vh;
  /* background-color: antiquewhite; */
  margin-left: 2vw;
  margin-top: 1vh;
}

/* 歌单列表 */
.morelist{
  width: 5vw;
  height: 3vh;
  margin-left: 12vw;
  margin-top: 1vh;
}


.list{
    width: 90%;
    margin:1vh auto;
    height: 10vh;
    background-color: white;
    display: flex;
    border-radius: 12px;
    overflow: hidden;
    padding-left: 5vw;
    align-items: center;
}

.list .cover{
  border-radius: 12px;
  overflow: hidden;
}

/* 导入歌单 */
.import{
  width: 90%;
  margin: 1vh auto;
  display: flex;
  flex: 1;
}

.import .cover{

  margin-left: 3vw;
}

.import .box{
  line-height: 7vh;
}



</style>