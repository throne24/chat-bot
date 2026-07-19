const BASE_URL = 'https://study.duyiedu.com';
async function reg(userinfo){
    return await fetch(BASE_URL+'/api/user/reg',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(userinfo),
    }).then(resp => resp.json())
}

function login(userinfo){}

function exists(loginid){}

function profile(){}

function sendChat(content){}

function getHistory(){}