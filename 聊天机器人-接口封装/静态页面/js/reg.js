//针对账号的验证器
const loginIdValidator = new FieldValidator('txtLoginId',async function(val){
    if(!val){
        return '请填写账号!';
    }
    const res = await API.exists(val);
    if(res.data){
        return '账号已存在!';
    }
})

//针对昵称的验证器
const nicknameValidator = new FieldValidator('txtNickname',function(val){
    if(!val){
        return '请填写昵称!';
    }
})

//针对密码的验证器
const PwdValidator = new FieldValidator('txtLoginPwd',function(val){
    if(!val){
        return '请填写密码!';
    }
})

//针对再次输入密码的验证器
const loginPwdConfirmValidator = new FieldValidator('txtLoginPwdConfirm',function(val){
    if(!val){
        return '请再次输入密码!';
    }
    if(PwdValidator.input.value != val){
        return '两次输入的密码不一致！'
    }
})

const form = $('.user-form');

form.onsubmit = async (e) =>{
    e.preventDefault();
    console.log('表单正在提交');
    const result = await FieldValidator.validate(loginIdValidator,nicknameValidator,PwdValidator,loginPwdConfirmValidator);
    if(!result){
        return;
    }
    const formData = new FormData(form);//传入表单dom，得到一个表单dom对象
    const data = Object.fromEntries(formData.entries());//将表单对象转换为普通对象

  const resp = await API.reg(data);
  if (resp.code === 0) {
    alert('注册成功，点击确定，跳转到登录页');
    location.href = './login.html';
  }
}