<template>
  <div class="topp" >
    <div class="left">
            <div class="out" @click="back">
                <img src="./images/left.png"/>
            </div>
            <div style="padding-left: 2vw;">歌单</div>
    </div>
    <div class="right">
        <div> 
            <img src="./images/search.png"/>
        </div>
        <div>
            <img src="./images/more.png"/>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'index',
    methods:{
        // 返回上一页
        back(){
            this.$router.go(-1)
        }
    }
}


</script>

<style scoped>
img{
    width: 100%;
    height: 100%;
}
.topp{
    width: 100%;
    height: 5vh;
    background-color: #985161;
    display: flex;
    flex: 1;
    margin: 0 auto;
    /* align-items: center; */
    justify-content: space-between;
    font-size: 18px;
    margin-top:1vh;
    color: white;
    position: fixed;
    top:-6px;
    left: 0vw;
    z-index:99;
    padding-top: 1vh;
}

.left{
    display: flex;
    height: 3vh;
}


.left .out{
    width: 8vw;
    height: 4vh;
}
.right{
    display: flex;
    height: 3vh;
}

.right>div{
    width: 8vw;
    height: 4vh;
}
</style>