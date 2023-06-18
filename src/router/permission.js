import router from "./index";

router.beforeEach((to,from,next) => {
    const tokenStr = window.localStorage.getItem('cookie')//获取token
    if(to.path === '/login')
    {
        next();
    } //如果用户访问登录页，直接放行
    if(tokenStr)
    {
        next()
    }//如果没有token 则强制登录
    else{
        next('/login')
    }//如果用户携带了 token 则放行
  }) 