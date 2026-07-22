//用户登录和注册的表单项验证的通用代码
/**
 * 对某一个表单项进行验证的构造函数
 */
class FieldValidator {
    /**
     * 
     * @param {String} txtId 待验证文本框的ID
     * @param {Function} validatorFunc 验证规则函数，传入的是当前输入的文本，若有规则错误会返回错误消息，无返回则表示正确
     */
    constructor(txtId,validatorFunc){
        this.input = $('#'+txtId);
        this.p = this.input.nextElementSibling;
        this.validatorFunc = validatorFunc;
        this.input.onblur = ()=>{
            this.validate();
        }
    }
    /**
     * 验证成功返回true，失败返回false
     */
    async validate(){
        const err = await this.validatorFunc(this.input.value)
        if(err){
            //有错误
            this.p.innerText = err;
            return false
        }else{
            this.p.innerText = '';
            return true;
        }
    }

    /**
     * 对传入的所有验证器进行统一的验证,如果所有的验证都通过则返回true，否则返回false
     * @param {FieldValidator[]} validators
     */
    static async validate(...validators){
        const proms = validators.map(v => v.validate());
        const result =await Promise.all(proms);
        return result.every(r => r)
    }
}

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
const nicknameValidator = new FieldValidator('txtNickname',async function(val){
    if(!val){
        return '请填写昵称!';
    }
})

function test(){
    FieldValidator.validate(loginIdValidator,nicknameValidator).then(result => console.log(result))
}
