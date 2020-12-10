$(function () {
  // // console.log("入口函数");
  // // 鼠标移入加背景颜色
  $(".content").on("mouseover", "span", function () {
    // console.log("鼠标移入");
    $(this).addClass("active1").siblings().removeClass('active1');
  });
  $(".content").on("mouseleave", "span", function () {
    // console.log("鼠标移入");
    $(this).removeClass("active1");
  });
  
  // 0.准备一个变量，接受所有的商品信息
  let list = null;

  // 0.准备一个对象，记录所有可以影响页面商品数据的,相当于一个默认值
  const list_info = {
    cat_one: "all",
    cat_two: "all",
    cat_three: "all",
    sort_method: "综合",
    sort_type: "ASC",

    current: 1, //当前第几页
    pagesize: 10, //一页多少条数据
  };

  // 1.请求一级分类列表
  // 打开页面一级分类肯定有发送请求异步，所以开头写
  getCateOne();
  async function getCateOne() {
    // 1.发送请求获取
    const cat_one_list = await $.get(
      "../server/getCateOne.php",
      null,
      null,
      "json"
    );

    console.log(cat_one_list);

    var str = `<span class="active" data-type="all">全部</span>`;
    // list是从后端发来的对象中的数据，下面包含所有的一级分类
    cat_one_list.list.forEach((item) => {
      // 渲染页面的时候，将每一个标签的内容，再加一个自定义属性，将内容带上 ，将来我点击的时候，拿到我的自定义属性，就知道我代表的哪一个一级分类了
      str += `
             <span data-type="${item.cat_one_id}">${item.cat_one_id}</span>
            `;
    });
    // 将拼接好的字符串插入到一级列表的位置
    $(".cateOneList .right").html(str);
  }


  // 1-2请求二级分类列表
  async function getCateTwo(){
    // 1-2发送请求获取,将一级分类的信息当做参数传递到后端
    const cat_two_list = await $.get('../server/getCateTwo.php',{cat_one:list_info.cat_one},null,'json');
    
    // console.log(cat_two_list);

    // 1-3根据二级列表渲染页面
    var str = `<span data-type='all' class="active">全部</span>`;
    // list是从后端发来的对象中的数据，下面包含所有的一级分类
    cat_two_list.list.forEach(item=>{
        // 渲染页面的时候，将每一个标签的内容，再加一个自定义属性，将内容带上 ，将来我点击的时候，拿到我的自定义属性，就知道我代表的哪一个一级分类了
        str += `
         <span data-type="${item.cat_two_id}">${item.cat_two_id}</span>
        `
    })
    // console.log(str);
    // 将拼接好的字符串插入到一级列表的位置
    $('.cateTwoList .right').html(str);
}


 // 1-3请求三级分类列表
 async function getCateThree(){
    // 1-2发送请求获取,将一级分类的信息当做参数传递到后端
    const cat_three_list = await $.get('../server/getCateThree.php',{cat_one:list_info.cat_one,cat_two:list_info.cat_two},null,'json');
    // 1-3根据二级列表渲染页面
    var str = `<span data-type='all' class="active">全部</span>`;
    // list是从后端发来的对象中的数据，下面包含所有的一级分类
    cat_three_list.list.forEach(item=>{
        // 渲染页面的时候，将每一个标签的内容，再加一个自定义属性，将内容带上 ，将来我点击的时候，拿到我的自定义属性，就知道我代表的哪一个一级分类了
        str += `
         <span data-type="${item.cat_three_id}">${item.cat_three_id}</span>
        `
    })
    // 将拼接好的字符串插入到一级列表的位置
    $('.cateThreeList .right').html(str);
}


  // 2.请求总页数，回来渲染分页器
  getTotalPage();
  async function getTotalPage() {
    // 因为分页器需要根据一级，二级，三级列表，还有一页几条当前页来渲染判断，干脆将怎个默认对象带过去
    // 2-1请求分页数据。
    const totalInfo = await $.get(
      "../server/getTotlePage.php",list_info,null,"json");
    // 2-2渲染分页器内容
    $(".pagination").pagination({
      pageCount: totalInfo.total,
      callback(index) {
        // console.log(index);
        // getCurrent()是jq的获取索引的方法
        list_info.current = index.getCurrent();
          getGoodsList();
      },
    });
  }

  // 3.请求商品列表数据
  getGoodsList();
  async function getGoodsList() {
    const goodsList = await $.get(
      "../server/getGoodsList.php",
      list_info,
      null,
      "json"
    );
    // console.log(goodsList);
    // 渲染页面

    // 给全局变量list赋值   渲染页面之前点击事件没有用
    list = goodsList.list;

    var str = "";
    goodsList.list.forEach((item) => {
      str += `
                <li class="phoneli" data-id="${item.goods_id}">
                <p class="imgp">
                <img class="phoneimg"
                src="${item.goods_big_logo}"
                alt=""/>
                </p>
                <p class="pp1 mte" >${item.goods_name}</p>
                <p class="pp2">${item.cat_id}</p>
                <p class="pp3"><span>￥</span>${item.goods_price}</p>
            </li>
            `;
    });
    $(".phonebox ul").html(str);
  }




  // 4.点击一级分类进行切换操作
    // 4-1事件委托的形式进行事件绑定
    $('.cateOneList').on('click','span',function(){
        
        // console.log(this);
        //4-2 操作类名
        $(this).addClass('active').siblings().removeClass('active');
        
        // 4-3拿到你点击的是哪一个
        // const type = $(this).html();
        // data不能获取但是可以设置
        // 拿到每一个数据的名字
        const type = $(this).data('type');
        console.log(type);

       
        // console.log(list_info);
        // 4-5重新渲染分类信息和列表数据
        
        // 4-6切换二级分类,再次点击二级菜单的时候，需要让二级菜单重新请求数据，要让二级列表先回到全部的位置，因为只有那样在没有点击一级菜单的情况下，三级才可以请求全部的数据。（如果2级列表还是上一次点击的，那么再次请求，拿到的就是这次一级请求的数据和2级菜单上一次请求的，在数据库中没有1级下的这个2级的数据所以请求不到数据）
        list_info.cat_two = 'all';
        list_info.cat_three = 'all';
        // 让当前页回到第一页
        list_info.current = 1;

         // 4-4修改list_info
         list_info.cat_one = type;

        getTotalPage();
        getGoodsList();

        // 4-6只要一级分类进行切换，就将二级列表修改为all
        // 4-6只要一级分类进行切换，就将三级列表修改为all

        // 4-5判断type是否为all信息
        if(type == 'all'){
            // 让二级列表回到全部状态
            $('.cateTwoList .right').html('<span data-type="all" class="active">全部</span>');
            $('.cateThreeList .right').html('<span data-type="all" class="active">全部</span>');
        }else{
            //  根据一级分类请求二级列表渲染
            getCateTwo();
        }

    });


    // 5.给二级列表绑定事件
    $('.cateTwoList').on('click','span',function(){
        // console.log(this);
        // 5-3拿到你点击的是哪一个
        // const type = $(this).html();
        // data不能获取但是可以设置
        // 拿到每一个数据的名字
        const type = $(this).data('type');
        // console.log(type);
        //5-2 操作类名
        $(this).addClass('active').siblings().removeClass('active');
        
        // 5-4---修改list_info
        list_info.cat_two = type;
        list_info.current = 1;
        // console.log(list_info.cat_two);
        // console.log(list_info);

        // 5-6切换三级分类,再次点击二级菜单的时候，需要让三级菜单重新请求数据，要让三级列表先回到全部的位置，因为只有那样在没有点击的情况下，三级才可以请求全部的数据。（如果如果3级列表还是上一次点击的，那么再次请求，拿到的就是这次二级请求的数据和3级菜单上一次请求的，在数据库中没有2级下的这个3级的数据所以请求不到数据）
        // list_info.cat_three = 'all';

        // 5-5重新渲染分类信息和列表数据
        getTotalPage();
        getGoodsList();
        
        // 5-6判断type是否为all信息
        if(type === 'all'){
            // 让三级列表回到全部状态
            $('.cateThreeList .right').html('<span data-type="all" class="active">全部</span>');
        }else{
            //  根据二级分类请求三级列表渲染
            getCateThree();
        }
    });

     // 6.给三级列表绑定事件
     $('.cateThreeList').on('click','span',function(){
        $(this).addClass("active").siblings().removeClass('active');
        const type = $(this).data('type');
        
        list_info.cat_three = type;
        
        getTotalPage();
        getGoodsList();
    })


    // 7.排序
    $('.sortList').on('click','span',function(){
        // 7-1拿到信息
        const method = $(this).attr('data-method');
        const type = $(this).attr('data-type');
        
        // 7-2切换类名
        $(this).addClass('active').siblings().removeClass('active');
        // 7-3修改对象信息
        list_info.sort_method = method;
        list_info.sort_type = type;
        // 7-4重新请求
        getTotalPage();
        getGoodsList();

        // 7-5修改data-type属性
        // 为了下一次准备
        $(this)
            .attr('data-type',type === "ASC" ? "DESC":"ASC")
            .siblings()
            .attr('data-type','ASC')
    })



     // 9.点击跳转到详情页
     $('.phonebox ul').on('click','.phoneli',function(){
        // console.log(this)
        // 9-2拿到标签身上记录的商品id
        // console.log(this);
        const id = $(this).data('id');
        // 9-3将这个cookie存储到cookie里面
        setCookie("goods_id",id);
        // 9-4进行页面跳转
        window.location.href = '../pages/detail.html';
    })

});
