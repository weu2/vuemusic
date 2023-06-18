const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer:{
    host: '0.0.0.0',
    port:3030,
    proxy: {
      '/music': {//这里的api很重要，表示前缀
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true,
        pathRewrite:{
          '^/music':''//正则表达式，将api替换为空字符
        }
      },
    },
    client: {
      webSocketURL: 'ws://0.0.0.0:3030/ws',
    },
    // headers: {
    //   'Access-Control-Allow-Origin': '*',
    // }
  }
})
