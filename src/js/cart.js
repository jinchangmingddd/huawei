$(function () {
  // 1.拿到localstorage里面的cart数据
  const cart = JSON.parse(window.localStorage.getItem("cart")) || [];
  console.log(cart);
  // 2.判断cart的length，决定执行哪一个渲染
  if (!cart.length) {
    // 表示没有数据
    $("on").addClass("hide");
    $("off").removeClass("hide");
    return;
  }

  // 3.来到这里说明cart有数据
  // 就要进行渲染了

  $(".off").addClass("hide");
  $(".on").removeClass("hide");

  // 4.根据cart进行页面渲染
  // 写一个方法进行渲染
  bindHtml();
  function bindHtml() {
    // 5.一些细节，进行数据准备
    // 决定全选按钮是不是选中
    let selectAll = cart.every((item) => item.is_select == "1");

    // 5-2计算选中的商品数量和价格
    let total = 0;
    let totalMoney = 0;

    cart.forEach((item) => {
      if (item.is_select == "1") {
        total += item.cart_number - 0;
        totalMoney += item.cart_number * item.goods_price;
      }
    });

    let str = `
        <div class="shang">
                <p class="gwcleft">
                <input class="qx" type="checkbox" ${selectAll ? "checked" : ""}>
                <span>全选</span>
                <span class="sp">商品</span>
                </p>
                <span class="gwcright">
                <span class="span1">单价</span>
                <span class="span2">数量</span>
                <span class="span3">小计</span>
                <span class="span4">操作</span>
                </p>
            </div>    
                <div class="xia">
                    <ul class="gwcul">
        `;

    cart.forEach((item) => {
      str += `
            <li>
            <input class="ip1" type="checkbox" data-id=${item.goods_id} ${
        item.is_select == "0" ? "" : "checked"}>
            <img src="${
              item.goods_small_logo
            }" alt="" style="width: 100px; height: 100px; margin: 0px 20px;">
            <div class="gwcInfo mte">
                ${item.goods_name}
                <p style="width: 64px; height: 20px; padding: 2px 5px; border: 1px solid red; color: red;">分期免息</p>
            </div>
            
            <div class="gwcprice">
              <span><span>￥</span>${item.goods_price}</span>
            </div>

            <div class="num">
              <button class="subNum" data-id=${item.goods_id}>-</button>
              <input type="text" value="${item.cart_number}" class="inp" />
              <button class="addNum" data-id=${item.goods_id}>+</button>
            </div>

            <div class="totle">
              <span><span>￥</span>${(
                item.goods_price * item.cart_number
              ).toFixed(2)}</span>
            </div>

            <div class="del">
              <span  data-id=${item.goods_id}>删除</span>
            </div>
          </li>
            `;
          

    });
    str += `
    </ul>
    </div>
    <div class="wei">
      <div class="null delgwc">清空购物车</div>
      <div class="continue"><a href="../pages/index.html" style="color: white">继续购物</a></div>
      <p class="zj">总计:&ensp;&ensp;<span>￥${totalMoney.toFixed(2)}</span></p>
      <p class="ljjs"><a href="../pages/pay.html" style="color: white">立即付款</a></p>
    </div>
    `;
    $(".on").html(str);
  }

  //   5.给各个按钮添加事件
  $('.on').on('click','.ip1',function(){
    //   console.log(this);
    // 拿到当前标签的状态
    let id = $(this).data('id');
    // 拿到当前标签的id
    let type = this.checked;
    // console.log(id,type);
    // 去cart里面找到id对应的数据，把is_selected修改一下
    let info = cart.filter(item =>item.goods_id == id)[0];
    // 进行设置
    info.is_select = type ? '1' : '0';
    // console.log(info.is_select);

    // 重新渲染页面
    bindHtml();
    // 将最新的cart存起来，因为再刷新页面如果不存储起来的话，cart还是上一次的数据
    window.localStorage.setItem('cart',JSON.stringify(cart));
  })

  $('.on').on('click','.qx',function(){
    // 拿到当前标签的状态
    // console.log(this);
    let type = this.checked;
    // console.log(cart);
    console.log(type);
    if(type){
        // 将每一个的is_select变为1
        for(let i = 0; i < cart.length; i++){
            cart[i].is_select = "1";
        }
        // 然后重新渲染页面
        bindHtml();
        // 然后再将这个值保存下来
        window.localStorage.setItem('cart',JSON.stringify(cart));
    }else{
        // 将每一个的is_select变为1
        for(let i = 0; i < cart.length; i++){
            cart[i].is_select = "0";
        }
        // 然后重新渲染页面
        bindHtml();
        // 然后再将这个值保存下来，刷新页面不会变，因为已经修改了locaLstroage
        window.localStorage.setItem('cart',JSON.stringify(cart));
    }
  })


  //   ++ -- 操作
  $('.on').on('click','.addNum',function(){
    //   1.拿到标签身上的id
    const id = $(this).data('id');
    // 2.找到商品id与我标签上的id一样的，然后修改他的数量
    const info = cart.filter(item=> item.goods_id == id)[0];
    info.cart_number = info.cart_number - 0 + 1;

    // 重新渲染页面
    bindHtml();
    // 重新保存到localStroage
    window.localStorage.setItem('cart',JSON.stringify(cart));
  })
//   --操作
  $('.on').on('click','.subNum',function(){
    //   1.拿到标签身上的id
    const id = $(this).data('id');
    
    // 2.找到商品id与我标签上的id一样的，然后修改他的数量
    const info = cart.filter(item=> item.goods_id == id)[0];
    // 判断是否为1，如果为1 就return 1
    if(info.cart_number == '1')return
    info.cart_number = info.cart_number - 0 - 1;

    // 重新渲染页面
    bindHtml();
    // 重新保存到localStroage
    window.localStorage.setItem('cart',JSON.stringify(cart));
  })


  //   删除操作
$('.on').on('click','.del span',function(){
  //   1.拿到标签身上的id
  console.log(this);
  const id = $(this).data('id');
  console.log(id);
  
//    2.删除操作，使用for循环 因为有break打断
  for(let i = 0; i < cart.length;i++){
      console.log(cart[i].goods_id);
      if(cart[i].goods_id == id){
          cart.splice(i,1);
          break;
      }
  }
  bindHtml();
  window.localStorage.setItem('cart',JSON.stringify(cart));

   // 如果购物车里没数据了，就让一开始那个页面出现
   if(!cart.length) return window.location.reload();
})



//   清空购物车
$('.on').on('click','.delgwc',function(){
  //   console.log(this);
  cart.length = [];
  bindHtml();
  window.localStorage.setItem('cart',JSON.stringify(cart));
  if(!cart.length) return window.location.reload();
})

});
