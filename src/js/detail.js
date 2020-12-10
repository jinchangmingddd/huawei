$(function () {

    $('.spxq').on('click','span',function(){
        $(this).addClass('spxqactive').siblings().removeClass('spxqactive');
    })



  // 0.提前准备一个存储商品信息的空变量，用于加入购物车
  let info = null;
  // 1.拿到cookie中的goods_id
  const id = getCookie("goods_id");

  getGoodInfo();
  async function getGoodInfo() {
    const goodsInfo = await $.get(
      "../server//getGoodsInfo.php",
      { goods_id: id },
      null,
      "json"
    );
    // console.log(goodsInfo);

    // 3.进行页面渲染
    bindHtml(goodsInfo.info);
    // 给提前准备好的变量进行赋值
    // 这个赋值是在页面渲染完毕后才执行，如果页面不渲染完毕，我们页面上没有东西，就无法点击
    info = goodsInfo.info;
  }

  function bindHtml(info) {
    // 使用info信息去渲染页面
    $("#box1").html(`
        <div class="show">
            <img src="${info.goods_big_logo}" alt=""/>
            <div class="mask"></div>
        </div>
            <div class="list">
                <p class="activeList activedetail">
                    <img
                    src="${info.goods_small_logo}"
                    alt=""/>
                </p>
                <p>
                    <img
                    src="${info.goods_small_logo}"
                    alt=""/>
                </p>
            </div>
            <div class="enlarge">
            </div>
        `);
    // 2.商品详细信息渲染
    $(".goodsdetail .right").html(`
            <p class="desc">
                ${info.goods_name}
            </p>
            <span style="color: red">①购机赠耳机 ②以旧换新最高补贴1212元</span>
            <div class="size">
                <button type="button" class="btn">S</button>
                <button type="button" class="btn">M</button>
                <button type="button" class="btn">L</button>
                <button type="button" class="btn">XL</button>
            </div>
            <div class="price">
                <span>价 &ensp;&ensp; 格</span>
                <span
                class="text-danger"
                style="color: red; font-size: 22px; margin-left: 20px"
                ><span>￥</span>${info.goods_price}</span>
                <p>
                <span style="margin-left: 0">促 &ensp;&ensp; 销</span
                ><span style="color: red; border: 1px solid red; padding: 3px"
                    >赠品</span>
                </p>
                <p class="p_2">
                <span style="color: red; border: 1px solid red; padding: 3px"
                    >一站式换新</span
                ><span>以旧换新最高补贴500元</span>
                </p>
                <p class="p_1">
                <span style="color: red; border: 1px solid red; padding: 3px"
                    >赠送积分</span><span>购买即赠送商城积分积分可抵现~</span>
                </p>
            </div>
            <div class="num">
                <button class="subNum">-</button>
                <input type="text" value="1" class="inp"/>
                <button class="cartNum">+</button>
            </div>
            <div class="bon">
                <button class="btn btn-success mai"><a href="../pages/cart.html" style="color:white;">去结算</a></button>
                <button class="btn btn-warning addCart">加入购物车</button>
            </div>
         `);
        $('.goodsDesc').html(info.goods_introduce);
        $('.enlarge').css(
            {'background-image':`url('${info.goods_small_logo}')`})
        // new一个放大镜实例
        new Enlarge();
  }

      // 4.加入购物车的操作
      $('.goodsdetail').on('click','.addCart',function(){
        console.log('加入购物车');
        const cart = JSON.parse(window.localStorage.getItem('cart')) || [];
          const flag = cart.some(item => item.goods_id == id)
          if(flag){
          const cart_goods = cart.filter(item => item.goods_id == id)[0];
          console.log(cart_goods);
          cart_goods.cart_number = cart_goods.cart_number - 0 + ($('.inp').val() - 0);
          }else{
            // 表示没有，直接push进去就可以
            info.cart_number = 1;
            cart.push(info);
          }
          window.localStorage.setItem('cart',JSON.stringify(cart));
      })
  
  
      // 5.操作 + - 按钮
      $('.goodsdetail').on('click','.subNum',function(){
          let num = $('.inp').val() - 0;
          console.log(num);
          if(num === 1) return;
          $('.inp').val(num - 1);
      });
      $('.goodsdetail').on('click','.cartNum',function(){
        let num = $('.inp').val() - 0;
        console.log(num);
        $(".inp").val(num + 1);
    });


  


});
