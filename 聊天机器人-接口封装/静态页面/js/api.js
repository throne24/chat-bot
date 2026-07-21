var API = (function(){
    const BASE_URL = 'https://study.duyiedu.com';
const TOKEN_KEY = 'token';
const token = localStorage.getItem(TOKEN_KEY);

function get(path){
    const headers = {};
    token;
    return fetch(BASE_URL+path,headers,{headers})
}

function post(path,bodyObj){
    const headers ={
        'Content-Type': 'application/json'
    }
    token;
    if(token){
        headers.authorization = `Bearer ${token}`;
    }
    return fetch(BASE_URL+path,{
        method:'POST',
        headers,
        body:JSON.stringify(bodyObj)})
}

//注册接口函数
async function reg(userinfo){
    const resp = await post('api/user/reg',userinfo);
    return await resp.json();
}

//登录接口函数
async function login(loginInfo){
    const resp = await post('/api/user/login',loginInfo)
    const result = await resp.json();
    if(result.code === 0){
    //登录成功
    //将响应头中token保存起来（LocalStorage）
    const token = resp.headers.get('authorization');
    localStorage.setItem(TOKEN_KEY,token);
    }
    return result;
}

async function exists(loginid){
    const resp = await get('/api/user/exists?loginId='+loginid);
    return await resp.json();
}

async function profile(){
    const resp = await get('/api/user/profile');
    return await resp.json();
}

async function sendChat(content){
    const resp = await post('/api/chat',{content});
    return await resp.json();
}

async function getHistory(){
    const resp = await get('/api/chat/history');
    return await resp.json();
}

function loginOut(){
    localStorage.removeItem(TOKEN_KEY);
}

return {
    reg,
    login,
    exists,
    profile,
    sendChat,
    getHistory,
    loginOut,
  };
})()
