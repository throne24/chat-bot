//验证是否有登录，若没登陆跳转到登录页
(async function(){
    const resp = await API.profile();
    const user = resp.data;
    if(!user){
        alert('未登录或登录已过期，请重新登录');
        location.href = './login.html';
        return;       
    }

    //下面的代码一定是登录状态
})()
