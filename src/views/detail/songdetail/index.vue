<template>
  <div class="playsong">
    <!-- 顶部导航 -->
    <div class="top">
        <div class="back" @click="$router.go(-1)">
            <img src="./images/tobottom.png"/>
        </div>
        <div class="songtitle">
            <!-- 文字较短时，通过设置 scrollable 属性开启滚动播放 -->
            <van-notice-bar 
            class="songname"
            scrollable 
            speed="30"
            style="border: 0px;"
            :text="song.name"
             />

            <!-- 文字较长时，通过禁用 scrollable 属性关闭滚动播放 -->
            <van-notice-bar
            style="border: 0px;"
            class="ava"
            :scrollable="false"
            >
            <span 
            v-for="(singer,index) in song.ar"
            :key="singer.id"
            >
            {{ singer.name}} {{ index < song.ar.length - 1 ? '/' : '' }}
            </span>
            </van-notice-bar>
        </div>
        <div class="share">
            <img src="./images/share.png"/>
        </div>
    </div>


    <!-- 中间音乐磁盘区 -->
    <div class="main">
        <div class="cd">
            <div class="needle" :class="{'needleRotate':isPlay}">

                <img src="./images/play_needle.png"/>
            </div>
            <div class="discContainer" >
                <div class="disc" :class="{'discAnimation':isPlay}">
                    <img src="./images/placeholder_disk_play_song.png"/>
                </div>
                <div class="imageurl" :class="{'discAnimation':isPlay}" v-if="song && song.al && song.al.picUrl">
                    <img :src="song.al.picUrl"/>
                </div>
            </div>
        </div>
        <div class="icons">
            <div>
                <img src="./images/heart.png"/>
            </div>
            <div>
                <img src="./images/download.png"/>
            </div>
            <div>
                <img src="./images/sing.png"/>
            </div>
            <div>
                <img src="./images/comment.png"/>
            </div>
            <div>
                <img src="./images/more.png"/>
            </div>
        </div>
    </div>

    <!-- 底部播放区 -->
    <div class="bottom" >
            <!-- 播放音频 -->
            <audio  id="myAudio" :src="sdata.url"></audio>
            <div class="progressControl">
                <span>{{currentTime}}</span>
                <!-- 总进度条 -->
                <div class="barControl">
                <!-- 实时进度条 -->
                    <div class="audio-currentTime-Bar" :style="{ width: currentWidth + '%' }">
                        <!-- 小圆球 -->
                        <div class="audio-circle"></div>
                    </div>
                </div>
                <span>{{durationTime}}</span>
        </div>

        <!-- 播放 -->
        <div class="play">
            <div class="way">
                <img src="./images/play_icn_loop.png"/>
            </div>
                <div class="pre" ><img src="./images/play_btn_prev.png"/></div>
                <div class="playbtn" @click="songPlay()">
                    <img :src="imageSrc"/>
                    <!-- <img :src="isPlay? './images/play_rdi_btn_play.png':'./images/play_rdi_btn_pause.png'"/> -->
                </div>
                <div class="next"><img src="./images/play_btn_next.png"/></div>
            <div class="songlist"><img src="./images/play_icn_src.png"/></div>
        </div>
    </div>

  </div>
</template>

<script>
import Vue from 'vue';
import { NoticeBar } from 'vant';
import { mapState } from 'vuex';
import moment from 'moment'

Vue.use(NoticeBar);
const {floor}=Math;
export default {
    name: 'index',
    data(){
        return{
            isPlay:false,
            song:{},//歌曲详情对象
            musicId:'', //音乐id
            musicLink:null,//音乐的链接
            currentTime:'00:00',//实时时间
            durationTime:'00:00',//总时长
            currentWidth:0, //实时进度条宽度
            islike:false//是否喜欢歌曲
        }
    },
    created(){
        // this.$store.detail.commit('GETSONGDATA');
        this.getsongdata()
        // 调用likelist
        // this.like()
    },
    mounted(){
        console.log('sdata',this.sdata);
        // 获取歌曲总时间
        this.getalltime()    

        // 这段代码使用了 this.$once 方法来监听 Vue 实例的 beforeDestroy 生命周期钩子事件，
        // 在该事件触发时清除定时器 this.timer。
        this.$once('hook:beforeDestroy', () => {            
            clearInterval(this.timer);                                    
        })

    },

    beforeDestroy(){
        clearInterval(this.timer)
        this.timer=null
    },
   
    computed:{
        ...mapState({
            songdata:state=>state.detail.songdata,
            likelist:state=>state.likelist.likelist
        }),
        sdata(){
            return this.songdata[0] ||{}
        },

        likesonglist(){
            return this.likelist ||[]
        },

        
         
        // 播放暂停
        imageSrc(){
            if(this.isPlay){
                return require('./images/play_rdi_btn_pause.png')
            }
            else{
                return require('./images/play_rdi_btn_play.png')
            }
        }
    },
    
    methods:{
        
        // 获得歌曲数据和总时长
        async getsongdata() {
                this.song = this.$route.query.item;
            },

        // 获得歌曲的播放路径,点击开始播放
        songPlay(){
            var audio=document.querySelector('#myAudio')
            if(this.isPlay){
                this.isPlay=!this.isPlay
                audio.pause();
                clearInterval(this.timer)
                this.timer=null
            }
            else{
                audio.play();
                this.isPlay=!this.isPlay;
                if (this.timer) {
                    clearInterval(this.timer);
                    this.timer = null;
                }
                else{
                    this.timer = setInterval(() => {
                        this.songtime()
                        }, 1000)
                }
            }
        },

        // 获取歌曲总时间
        getalltime() {
            this.durationTime = '00:00';
            var audio = document.querySelector('#myAudio');
            audio.addEventListener('loadedmetadata', () => {
                let totalSeconds = Math.floor(audio.duration);
                let minutes = Math.floor(totalSeconds / 60);
                let seconds = totalSeconds % 60;
                this.durationTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
                console.log('总时长', this.durationTime);
            });
            },
        
        // 获取歌曲的当前时间
        songtime(){
            var audio=document.querySelector('#myAudio')
             //实时进度条
            this.currentWidth=floor((audio.currentTime/this.sdata.time)*100000)
            let currentTime = moment(audio.currentTime*1000).format('mm:ss')
            this.currentTime=currentTime
            // this.durationTime=moment(this.sdata.time).format('mm:ss')
            if(this.currentTime===this.durationTime){
                clearInterval(this.timer);
                timer=null;
                this.isPlay=false;
                audio.pause();
                this.currentWidth='0'
            }
           
            
            // console.log('进度条',this.currentWidth+'%');
        },

        // 获取喜欢列表
       
    }
}


</script>
<style scoped>
img{
    width: 100%;
    height: 100%;
}

.playsong{
    /* padding-top: 2vh; */
    width: 100%;
    height: 100vh;
    background: linear-gradient(45deg, #130911, #7a3b1c);
    /* background-color: rgb(250, 215, 215); */
}

/* 顶部标签 */
.top{
    width: 90%;
    height: 6vh;
    /* background-color: brown; */
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 1vh;
}

.back{
    width: 7vw;
    height: 4vh;
}

.songtitle{
    /* display: flex */
    width: 30vw;
    height: 6vh;
    /* background-color: black; */
    color: white;
    text-align: center;
}

.songname{
    height: 3vh;
   padding: 0px;
   font-size: 1rem;
   color: white;
   background-color: rgba(255, 0, 0, 0);
   /* background-color: brown; */
   border: 0px;
   opacity: 0.8;
}

.ava{
    height: 3vh;
    padding: 0px;
   font-size: 10px;
   color: #dcd6d6;
   opacity: 0.6;
   background-color: rgba(255, 0, 0, 0);
   border-top: 0px;
   font-family: Arial, Helvetica, sans-serif;
}

.share{
    width: 7vw;
    height: 4vh;
}


/* 中间 */vh
.main{
    width: 100%;
    height: 80vh;
    /* background-color: aqua; */
}

.cd{
    width: 100%;
    height: 70vh;
    /* background-color: antiquewhite; */
}

.needle{
    width: 25vw;
    height: 13vh;
    position: relative;
    z-index: 99;
    top:5vh;
    left:45%;
    /* 要先设置好旋转的中心点 */
    transform-origin:2.5vh 5vw;
    transform: rotate(-20deg);
    transition: transform 1s;
    /* background-color: red; */
}


.needleRotate{
  transform: rotate(20deg);
}

.discContainer{
  position: relative;
  top:-5vh;
  width: 90%;
  height: 40vh;
  margin: 0 auto;
  /* background-color: aquamarine; */
}


.discAnimation{
  animation: disc 10s linear infinite;
  animation-delay:1s;
}
/*
  @keyframes：设置动画帧
  1、from to 
    使用于简单的动画，只有起始帧和结束帧
  
  2、百分比
    多用于复杂的动画，动画不止两帧
*/
@keyframes disc{
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
}


.disc{
        width: 50vw;
        height: 28vh;
        background-color: #fff;
        position: relative;
        top: 7vh;
        left: 19vw;
        border-radius: 50%;
        overflow: hidden;
        box-shadow: 0 0 20px red;
}

.imageurl{
    position: relative;
        top: -17vh;
        background-color: #fff;
        width: 36vw;
        height: 20vh;
        left: 26vw;
        border-radius: 50%;
        overflow: hidden;
}

/* icons 图标 */
.icons{
    width: 100%;
    display: flex;
    flex: 1;
}

.icons div{
    width: 20%;
    height: 5vh;
    /* background-color: rebeccapurple; */
    text-align: center;
}

.icons div img{
    width: 40%;
    
}

/* 底部 */
.bottom{
    width: 90%;
    height: 13vh;
    /* background-color: rgb(235, 233, 237); */
    margin: 0px auto;
    margin-top: 2vh;
    color: white;
}

/* 进度条 */

.progressControl {
  position: relative;
  /* background-color: red; */
  top: 1vh;
  width: 100%;
  height: 5vh;
  /* line-height: 20vw; */
  display: flex;
  align-items: center;
  font-size: 10px;
}

.barControl{
    position: relative;
    background-color: #595558;
    width: 90%;
    height: 0.1vh;
    margin: 0 6vw;
}

.audio-currentTime-Bar{
        position: absolute;
        top: 0px;
        width: 50%;
        height: 0.1vh;
        /* left: 0vw; */
        background-color: bisque;
}

.audio-circle{
        position: absolute;
        width: 1.4vw;
        height: 0.8vh;
        right: 0vw;
        top: -0.3vh;
        border-radius: 50%;
        background-color: white;
}

.play{
    width: 100%;
    height: 7vh;
    display: flex;
    margin: 0 auto;
    margin-top: 1vh;
    /* background-color: aqua; */
    flex: 1;
    align-items: center;
    justify-content: center;
}

.play>div{
    width: 20%;
    height: 5vh;
    text-align: center;
    line-height: 5vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.play>div>img{
    width: 7vw ;
    height: 4vh ;
    line-height: 5vh;

}

.playbtn>img{
    width:11vw !important;
    height: 6vh !important;
}
.way{
    width: 10vw;
    height: 2vh;
}

.playbtn{
}

.songlist{
}


</style>