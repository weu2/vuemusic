<template>
  <div class="formlogin">
    <!-- <van-form @submit="onSubmit">
    <van-field
    v-model="phone"
    name="phone"
    label="用户名"
    placeholder="用户名"
    :rules="[{ required: true, message: '请填写用户名' }]"
  />
  <van-field
    v-model="password"
    type="password"
    name="password"
    label="密码"
    placeholder="密码"
    :rules="[{ required: true, message: '请填写密码' }]"
  />
  <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit">提交</van-button>
  </div>
</van-form> -->
<div class="image">
<img :src="qrimgs" alt="" style="width:200px;height:200px;">
</div>
<div class="title" style="padding-left:2rem;">扫描二维码进行登录</div>


<div v-if="qrCheckData.code==803">
  <router-link to="/">登录成功，点击进入</router-link>
</div>
<div v-else>未登录</div>


<button @click="penlogin">游客登录</button>
  </div>

</template>

<script>
import Vue from 'vue';
import { Form,Field,Button } from 'vant';
import axios from 'axios';

Vue.use(Form);
Vue.use(Field);
Vue.use(Button);

export default {
  name: 'index',
  data() {
    return {
      phone: '',
      password: '',
      qrimgs:'',//二维码图片
      isLogin: false,
      unikey:'',
      qrCheckData:{}//二维码状态
    };
  },
  mounted(){
    this.getKey()
  },
  
  methods: {
    //1、获取二维码的key
    getKey(){
      axios.get('music/login/qr/key',{
        params:{
          timerstamp: new Date().getTime()
        }
      }).then(res=>{
        console.log(res.data)
        this.unikey=res.data.data.unikey
        this.loginQqr(this.unikey)
      }).catch(err=>{
        console.log('err',err);
      })
    },

    //2、loginQqr 通过key去获取二维码
    loginQqr(key){
      axios.get('music/login/qr/create',{
        params:{
          key:key,
          qrimg: true,
          timerstamp: new Date().getTime()
        }
     
      }).then(res=>{
        console.log("keyres",res.data.data)
        this.qrimgs=res.data.data.qrimg
        this.qrCheck(key)
      }).catch(err=>{
        console.log("key",err);
      })
    },


    //检测二维码状态
    qrCheck(key){
      axios.get('music/login/qr/check',{
        params:{
          key:key,
          timerstamp: new Date().getTime(),
          withCredentials: true
        }
      }).then(res=>{
        console.log('二维码状态',res.data)
        this.qrCheckData=res.data
        // sessionStorage.setItem('cookie', res.data.cookie);
        // this.pushrouter()

        this.isLogin = true 
      }).catch(err=>{
        console.log('二维码错误',err)
      })
    },


    onSubmit(values) {
      console.log('submit', values);
      this.$store.dispatch('getlogin',values)
    //   axios.get('/music/dj/program?rid=336355127').then(res=>{
    //     console.log('成功');
    //   }).catch(err=>{
    //     console.log(err)
    //   })
    },

    // 游客状态
    penlogin(){
      axios.get('/music/register/anonimous').then(res=>{
        console.log("游客状态",res.data);
        localStorage.setItem('cookie',res.data.cookie)
        this.$router.push('/')
      })
    },
    },
    watch:{
    isLogin: function () {
      let check = setInterval(async () => {
          await this.qrCheck(this.unikey)
          if(this.qrCheckData.code==803){
            clearInterval(check)
            console.log(this.qrCheckData)
            // this.isLogin=true
            localStorage.setItem('cookie',this.qrCheckData.cookie)
           await this.$router.push('/')
          }
          else if(this.qrCheckData.code==800 || this.qrCheckData.code==801){
            clearInterval(check)
            console.log('参数不对');
          }
          else{
            clearInterval(check)
            console.log('不对劲');
          }	
				}, 3000)
      }}
    
  }
  // watch:{
  //   isLogin: function () {
  //     let check = setInterval(async () => {
  //         await this.qrCheck(this.unikey)
  //         if(this.qrCheckData.code==803){
  //           clearInterval(check)
  //           console.log(this.qrCheckData)
  //           // this.isLogin=true
  //           localStorage.setItem('cookie',this.qrCheckData.cookie)
  //           this.$router.push('/')
  //         }
  //         else if(this.qrCheckData.code==800 || this.qrCheckData.code==801){
  //           clearInterval(check)
  //           console.log('参数不对');
  //         }
  //         else{
  //           clearInterval(check)
  //           console.log('不对劲');
  //         }	
	// 			}, 3000)
  //           }
  // },
// }


</script>

<style scoped>
body{
  overflow-x: hidden;
}
.formlogin{
    width: 50vw;
    height: 300px;
    /* background-color: aqua; */
    margin: 0px auto;
    margin-top:20px;
}

.formlogin .van-form{
    width: 95vw;
    height: 150px;
    padding: 10px;
    /* background-color: red; */
    margin:10px auto;
}

.formlogin .van-form .van-field{
    width: 95vw;
    height: 60px;
    border:1px solid red;
    margin-bottom:10px
}

.image{
  width: 200px;
  height: 200px;
  /* margin:10px auto */
}



</style>