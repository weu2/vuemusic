<template>
  <div class="fixed" >
<van-tabbar
class="tabbar" 
fixed
v-model="active" 
active-color="#ee0a24"
route>
  <van-tabbar-item
  replace
    to="/find">
    <span>发现</span>
    <template #icon="props">
      <img :src="props.active ? icon[0].active : icon[0].inactive" />
    </template>
  </van-tabbar-item>
  <van-tabbar-item
  replace
    to="/community">
    <span>播客</span>
    <template #icon="props">
      <img :src="props.active ? icon[1].active : icon[1].inactive" />
    </template>
  </van-tabbar-item>
  <van-tabbar-item
  replace
    to="/"
    >
    <span>我的</span>
    <template #icon="props">
      <img :src="props.active ? icon[2].active : icon[2].inactive" />
    </template>
  </van-tabbar-item>
  <van-tabbar-item
    to="/focus">
    <span>关注</span>
    <template #icon="props">
      <img :src="props.active ? icon[3].active : icon[3].inactive" />
    </template>
  </van-tabbar-item>
  <van-tabbar-item
  replace
    to="/community">
    <span>社区</span>
    <template #icon="props">
      <img :src="props.active ? icon[4].active : icon[4].inactive" />
    </template>
  </van-tabbar-item>
</van-tabbar>
</div>

</template>
<script>
document.addEventListener('touchmove', function(event) {
  event.preventDefault();
}, false);
import Vue from 'vue';
import { Tabbar, TabbarItem } from 'vant';
Vue.use(Tabbar);
Vue.use(TabbarItem);
export default {
 name: 'tabbar',
 data(){
    return {
      active: 0,
      icon: [
        {
        active: require('@/assets/images/wangyiyun.png'),
        inactive: require('@/assets/images/wangyiyun1.png'),
      },
      {
        inactive: require('@/assets/images/boke.png'),
        active: require('@/assets/images/boke-active.png'),
      },
      {
        inactive: require('@/assets/images/music.png'),
        active: require('@/assets/images/music-active.png'),
      },
      {
        inactive: require('@/assets/images/guanzhu.png'),
        active: require('@/assets/images/guanzhu-active.png'),
      },
      {
        inactive: require('@/assets/images/community.png'),
        active: require('@/assets/images/community-active.png'),
      },
    ],
    };
 },
 methods:{
    onChange(index){
        // console.log(index);
    }
 }
}


</script>

<style scoped>
body{
  overflow-x: hidden;
}

/* .fixed{
  height: 10vh;
} */

/* .tabbar{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
} */

.van-tabbar{
  width: 100vw;
  height: 9vh;
  overflow: hidden;
  /* height: 100%; */
  /* position:fixed; */
  /* margin-top: 90vh; */
  /* top:91vh; */
  left:0px;
  bottom: 0;
}

.van-tabbar-item{
  width: 20px;
  position: relative;
  /* top: 2vh; */
  bottom: 0vh;
}

</style>