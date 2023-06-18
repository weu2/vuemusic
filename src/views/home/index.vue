<template>
  <div>
    <router-view></router-view>
  <div class="mypage" v-if="avatarUrl && $route.meta.hidden">
  <router-view></router-view>
  <!--  -->
    <div class="top">
      <div class="topimg">
        <img src="./images/more.png"/>
      </div>
      <div class="topimg1" >
        <img src="./images/search.png"/>
      </div>
    </div>

  <!-- 我的信息小格子 -->
      <div class="mymsg" v-if="userlist && userlist.profile">
        <div class="msgimg">
          <img :src="avatarUrl"/>
        </div>
        <div>
          <div class="name">{{userlist.profile.nickname}}</div>
        </div>
        <div class="people">
          <div>{{userlist.profile.follows}}关注</div>
          <div> | </div>
          <div>{{userlist.profile.followeds}}粉丝</div>
          <div> | </div>
          <div>Lv.{{userlist.level}}</div>
        </div>
      </div>

      <!-- grid栅栏格 -->
    <grid></grid>

    <!-- 歌单 -->
    <songlist class="songlist"></songlist>

    <!-- 推荐 -->
    <recommend></recommend>
</div>
</div>
</template>

<script>
import { mapState } from "vuex";
import grid from './grid/index.vue'
import songlist from './songlist/index.vue'
import recommend from './recommend/index.vue'

export default {
  name: 'index',
  components:{
    grid,
    songlist,
    recommend
  },
  computed:{
  ...mapState({
    userInfo:state=>state.home.userInfo,
    userdetaillist:state=>state.home.userdetaillist
  }), 
  usrInfo(){
    return this.userInfo
  },
  //用户列表
  userlist(){
    return this.userdetaillist || {}
  }
  },
  
  data(){
    return{
      usermsg:{},
      userid:'',
      userList:{},
      avatarUrl:null
    }
  },
  beforeCreate(){
    
  },
  created(){
    this.userinfo=this.usrInfo
    
  },
  beforeMount(){

  },
  mounted(){
    this.loginState()
    this.userDetail()
  },
  methods:{

    //1、获取用户状态
    async loginState(){
   await this.$store.dispatch('loginstate')
    // console.log("获取用户状态",this.usrInfo);
    this.usermsg=this.usrInfo
    this.userid=this.usrInfo.account.id
    this.avatarUrl=this.usrInfo.profile.avatarUrl
    let usrInfo=JSON.stringify(this.usrInfo)
    await localStorage.setItem('userInfo',usrInfo)

    
    },

    //获取用户详情
    async userDetail(){
    var user=JSON.parse(localStorage.getItem('userInfo')) 
    // console.log('解析后的user',user.account.id);
    await  this.$store.dispatch('usrdetail',user.account.id)
    this.userList=this.userlist
    sessionStorage.setItem('detailinfo',JSON.stringify(this.userlist))
    }
  },
  
}



</script>

<style scoped>
*{
  margin: 0px;
  padding: 0px;
}

/* 顶部导航栏 */
.mypage{
  width: 100vw;
  margin: 0vh auto;
  background-color: #f1f1f1;
}
.top{
  width: 100vw;
  display: flex;
  flex: 1;
  justify-content: space-between;
  padding-top: 2vh;
}

.topimg{
  width: 6vw;
  height: 4vh;
  margin-left:5vw;
  
}
.topimg1{
  width: 5vw;
  height: 4vh;
  margin-right:13vw;
}

img{
  width: 100%;
  height: 100%;
  
}

/* 个人信息 */

.mymsg{
  width: 90%;
  height: 18vh;
  display: flex;
  background-color: white;
  flex-direction: column;
  margin: 0px auto;
  margin-top: 10vh;
  border-radius:12px;
  align-items: center;
}

.mymsg .msgimg{
  width: 20vw;
  height: 11vh;
  background-color: blue;
  margin-top:-5vh;
  border-radius: 50%;
  overflow:hidden
}

.mymsg .name{
  font-size: 1.2rem;
  /* font-weight: bold; */
}

.mymsg .people{
  display: flex;
  flex-direction: row;
  margin-top: 1vh;
  font-size: 14px;
  color:#b0acac;
}

.mymsg .people div{
  margin-right: 3vw;
}

.songlist{
  width: 90%;
  margin: 0px auto;
}




</style>