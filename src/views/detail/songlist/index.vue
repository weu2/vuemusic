<template>
  <div>
        <div class="top">
        <div class="toplistt">
            <toplist></toplist>
        </div>
        <div class="cover" v-if="$route.query ">
            <div class="introduce">
                <div class="imgurl">
                    <img :src="imgurl"/>
                </div>
                <div class="like">
                    <div class="titletop">{{name}} </div>
                    <div class="name">
                        <div v-if="avaimg">
                            <img :src="avaimg"/>
                        </div>
                        <span>{{avaname}} ></span>
                    </div>
                </div>
            </div>
            <div class="btnmsg"></div>
        </div>
  </div>
     <!-- 顶部菜单 -->
  <div class="menu">
    <div class="logo">
        <div class="img"><img src="../images/play.png"/></div>
        
        <div><span class="tip">全部播放</span></div>
    </div>
    <div>
      <a href="#" class="link">广告位</a>
      <a href="#" class="link">广告位</a>
      <a href="#" class="link">广告位</a>
    </div>
  </div>
  
  <!-- 内容区域 -->
  <div class="content">
    <songcell :items="trackk.songs"></songcell>
  </div>
  
  </div>
</template>

<script>
import { mapState } from 'vuex';
import toplist from '@/components/detailtop/index.vue';
import songcell from '@/components/songcell/index.vue';

// 监听滑动

export default {
    name: 'index',
    components:{
        toplist,
        songcell
    },
    data(){
        return{
            imgurl:'',
            name:'',
            // 用户头像
            avaimg:'',
            // 用户名字
            avaname:''
        }
    },
    created(){
        this.setcover()
    },
    mounted(){
    // console.log('route',this.$route);
    // 如果当前路由为 /about，则执行其他方法
    if (this.$route.path === '/songlist') {
    window.addEventListener('scroll',this.scrollHandler);
}
    },

    beforeDestroy(){
        window.removeEventListener('scroll', this.scrollHandler);
    },
  
    computed:{
        ...mapState({
            track:state=>state.detail.track ,
            userInfo:state=>state.home.userdetaillist
        }),
        trackk(){
            return this.track;
        },
        user(){
            return this.userInfo
        }

    },
    methods:{
        // 为封面的数据进行渲染
        setcover(){
            let query=this.$route.query
            this.imgurl=query.imgurl
            this.name=query.name
            this.avaimg=this.user.profile.avatarUrl
            this.avaname=this.user.profile.nickname
            // console.log('查看song能不能传',this.trackk.songs)
        },

        //获取滚动数据   
            scrollHandler() {
            var toplist = document.querySelector('.toplistt');
            var menu = document.querySelector('.menu');
            // 获取菜单到顶部的距离
            var toplist = toplist.offsetHeight;
            var menuTop = menu.offsetTop - toplist;
            // 获取菜单高度
            // 获取滚动高度
            var scrollTop = window.pageYOffset;
            // 如果滚动高度大于菜单高度，则添加固定样式
            if (scrollTop >= menuTop) {
            menu.classList.add('fixed');
            } else if (scrollTop < menuTop) {
            menu.classList.remove('fixed');
            }
        },

        
    }
}


</script>

<style scoped>
img{
    width: 100%;
    height: 100%;
}
.top{
    width: 100%;
    height: 30vh;
    display: flex;
    flex-direction: column;
    background-color:#9e5765;
}

.toplistt{
    height: 6vh;
    background-color: #9e5765;
}

.cover{
    width: 90%;
    height: 22vh;
    margin: 3vh auto;
    /* background-color: aqua; */
    display: flex;
    flex: 1;
    flex-direction: column;
}


/* 喜欢的音乐 */
    .cover .introduce{
        width: 100%;
        height: 20vh;
        align-items: center;
        display: flex;
        /* background-color: rgb(215, 250, 222); */
    }

    .cover .introduce .imgurl{
        width: 30vw;
        height: 16vh;
        background-color: #333;
        margin-left: 3vw;
        border-radius: 12px;
        overflow:hidden;
        box-shadow: 3px 3px 2px 0px #b9b7b7;
    }

    .cover .introduce .like{
        /* background-color:rebeccapurple; */
        margin-top: -3vh;
        margin-left: 3vw;
        color:white
    }

    .cover>.introduce>.like>.titletop{
        font-size: 1rem;
        font-weight: bold;
        /* color: white; */
    }

    .name{
        height: 7vh;
        /* background-color: #fff; */
        display: flex;
        margin-top: 2vh;
        color: #d4b0b3;
        font-size: 13px;
        font-weight: bold;

    }
    .name div{
        width: 7vw;
        height: 4vh;
        border-radius: 50%;
        overflow: hidden;
    }

    .name span{
        padding: 1vh;
    }

/* 设置顶部菜单的样式 */
.menu {
      width: 100%;
      height: 7vh;
      background-color: #a36371;
      color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      z-index: 1;
      transition: top 2s ease;
      border-bottom-right-radius: 12px;
      border-bottom-left-radius: 12px;
      overflow: hidden;
    }
    
    /* 设置固定的样式 */
    .menu.fixed {
      position: fixed;
      top: 6vh;
      left: 0;
      width: 100%;
    }
    
    /* 设置菜单中的logo */
    .logo {
      width: 26vw;
      height: 5vh;
      margin-left: 20px;
      display: flex;
      align-items: center;
      font-size: 14px;
    }

    .img{
        width: 9vw;
        height: 5vh;
        margin-right: 2vw;
    }
    
    .tip{
        width: 5vw;
    }
    /* 设置菜单中的链接 */
    .link {
      color: #fff;
      text-decoration: none;
      margin-right: 20px;
    }
    
    /* 设置内容区域 */
    .content {
      background-color: #f1f1f1;
      padding-top: 10px;
    }

    /* .cover{
        width: 100%;
        height:;
    } */
    
</style>