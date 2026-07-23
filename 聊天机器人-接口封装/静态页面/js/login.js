//针对账号的验证器
const loginIdValidator = new FieldValidator('txtLoginId',async function(val){
    if(!val){
        return '请填写账号!';
    }
})

//针对密码的验证器
const PwdValidator = new FieldValidator('txtLoginPwd',function(val){
    if(!val){
        return '请填写密码!';
    }
})

const form = $('.user-form');

form.onsubmit = async (e) =>{
    e.preventDefault();
    console.log('表单正在提交');
    const result = await FieldValidator.validate(loginIdValidator,PwdValidator);
    if(!result){
        return;
    }
    const formData = new FormData(form);//传入表单dom，得到一个表单dom对象
    const data = Object.fromEntries(formData.entries());//将表单对象转换为普通对象

  const resp = await API.login(data);
  if (resp.code === 0) {
    alert('登录成功，点击确定，跳转到首页');
    location.href = './index.html';
  }else{
    loginIdValidator.p.innerText = '登录失败，账号或密码错误';
    PwdValidator.input.value = '';
  }
}