$('#login').validate({
    // 规则配置
    rules:{
        username:{
            required:true,
            minlength:5,
            maxlength:10
        },
        password: {
            required:true,
            minlength:6,
            maxlength: 12
        }
    },
    // 提示信息配置
    messages: {
            // required: '请填写用户名信息',
            // minlength:'最少5个字符',
            // maxlength: '最多10个字符'
    },
    // 表单提交事件
    submitHandler (form) {    
        const info = $(form).serialize();
        $.post("../server/login.php",info,null,'json').then(res=>{
            // console.log(res);
            
            if(res.code === 0){
                // 登录失败
                $('.login_error').removeClass('hide');
            }else if(res.code === 1){
                $('.login_error').addClass('hide');
                // console.log('登录成功');
                // 3-2登录成功跳转页面，存储cookie，为了在首页使用，登录成功，昵称需要换
                setCookie('nickname',res.nickname,);

                window.location.href = "../pages/index.html";

            }
        })
    }

})