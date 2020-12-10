$(function(){
    // 1.很据cookie里面的信息nickname来进行页面的改变
    const nickname = getCookie('nickname');
    // console.log(nickname);

    // 2.根據nickname信息进行判断
    if(nickname){
        // 表示存在的
        $('.loginone').addClass('hide').siblings().removeClass('hide').text(`欢迎您：${nickname}`);
        // 当用户登录的时候，我们才制作购物车联动
        // setCartNum();
    }else{
        // 表示不存在
        $('.logintwo').addClass('hide').siblings().removeClass('hide');
    }
})