//验证是否有登录，若没登陆跳转到登录页
(async function(){
    const resp = await API.profile();
    const user = resp.data;
    console.log(user)
    if(!user){
        alert('未登录或登录已过期，请重新登录');
        location.href = './login.html';
        return;       
    }

const doms = {
    aside:{
        nickname:$('#nickname'),
        loginId:$('#loginId')
    },
    close:$('.close'),
    chatContainer:$('.chat-container'),
    txtMsg: $('#txtMsg'),
    msgContainer:$('.msg-container'),
}
    //下面的代码一定是登录状态
    
    //注销事件
    doms.close.onclick = function () {
        API.loginOut();
        location.href = './login.html';
    }

    //加载历史记录
    async function loadHistory(){
        const history = await API.getHistory();
        history.data.forEach(item => addChat(item));
        scrollBottom();
    }
    loadHistory();

    //设置用户信息:昵称和账号
    //强烈建议使用innerText，不使用innerHtml（防止代码攻击）
    function setUserInfo(){
        doms.aside.nickname.innerText = user.nickname;
        doms.aside.loginId.innerText = user.loginId
    }
    setUserInfo();

    //根据消息对象，将其添加到页面中
    /**
     * content: "12121"
     * createdAt:1784158694364
     * from:"189"
     * to:null
     */
    function addChat(chatInfo){

            let formatDate = function(timeStamp){
                const date = new Date(timeStamp);
                const year = date.getFullYear();
                const month = (date.getMonth()+1).toString().padStart(2,'0');
                const day = date.getDate().toString().padStart(2,'0');
                const hour = date.getHours().toString().padStart(2,'0');
                const min = date.getMinutes().toString().padStart(2,'0');
                const sec = date.getSeconds().toString().padStart(2,'0');
            return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
        }

        const div = $$$('div');
        div.classList.add('chat-item');
        if(chatInfo.from){
            div.classList.add('me');
        }

        const img = $$$('img');
        img.classList.add("chat-avatar");
        img.src = chatInfo.from?"./asset/avatar.png":"./asset/robot-avatar.jpg";
        
        const content = $$$('div');
        content.className = 'chat-content';
        content.innerText = chatInfo.content;
        
        const date = $$$('div');
        date.className = 'chat-date';
        date.innerText = formatDate(chatInfo.createdAt);

        div.appendChild(img);
        div.appendChild(content);
        div.appendChild(date);
        doms.chatContainer.appendChild(div);
    }

    //使聊天区域滚动条滚动到底部
    function scrollBottom(){
        doms.chatContainer.scrollTop = doms.chatContainer.scrollHeight;
    }

    //显示消息事件
    async function sendChat(){
    const content = doms.txtMsg.value.trim();
    if (!content) {
      return;
    }
    //在把消息发送到服务器之前，先添加到页面中,提高用户体验
    addChat({
      from: user.loginId,
      to: null,
      createdAt: Date.now(),
      content,
    });
    doms.txtMsg.value = '';
    const resp = await API.sendChat(content);
    ///将服务器返回的消息添加到页面中
    addChat({
        from:null,
        to:user.loginId,
        ...resp.data
    })

    scrollBottom();
    
    }

    //发送消息事件绑定
    doms.msgContainer.onsubmit = function(e){
        e.preventDefault();
        sendChat();
    }

    window.sendChat = sendChat;
})()
