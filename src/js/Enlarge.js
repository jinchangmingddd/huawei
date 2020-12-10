// 分析：
    // 1.移入移出
    // 移入，mask和enlarge盒子消失
    // 移出，mask和enlarge盒子消失
    // 2.移动的时候
        // 移动的时候，mask盒子在show盒子范围内移动
        // 移动的时候，enalrge里面的背景图也跟着移动
    // 3.点击列表项
    // 点击的时候,可以一整套的切换图片
    // 切换show里面img标签的图片
    // 切换enlarge盒子的背景图片、


    function Enlarge(){
        // 范围元素
        this.box = document.getElementById("box1");
        this.show = this.box.querySelector(".show");
        this.mask = this.box.querySelector(".show > .mask");
        this.enlarge = this.box.querySelector(".enlarge");
        // 获取列表盒子
        this.list = this.box.querySelector(".list");
        this.show_width = this.show.clientWidth;
        this.show_height = this.show.clientHeight;
        // 拿到enlarge的宽高   因为enlarge不移入的时候，不显示，他的尺寸都为0。所以需要换一种方式来获取样式。
        // this.enlarge_width = this.enlarge.clientWidth;
        // this.enlarge_Height = this.enlarge.clientHeight;
        
        this.enlarge_width = parseInt(window.getComputedStyle(this.enlarge).width);
        this.enlarge_height = parseInt(window.getComputedStyle(this.enlarge).height);
        // split可以将字符串按照规定切割成数组
        // 获取背景图片的尺寸
        this.bg_width = parseInt(getComputedStyle(this.enlarge).backgroundSize.split(' ')[0]);
        this.bg_height = parseInt(getComputedStyle(this.enlarge).backgroundSize.split(' ')[1]);
    
        // console.log(this);
        // 直接启动入口函数，执行它将代表执行了所有构造函数身上的方法
        this.init();
    }
    
    // 书写方法
    Enlarge.prototype.init = function(){
        // init方法是被实例调用的
        // 所有这个位置的this就是当前实例
        
        this.setScale();
        this.overOut();
        this.move();
        // this.change();
    }
    
    // 调整比例
    
    // show盒子的尺寸              bgimg的尺寸
    // ---------------- ===   ------------------------
    // mask盒子的尺寸             enlarge盒子的尺寸
    
    // mask盒子的尺寸 = show盒子的尺寸 * enlarge盒子的尺寸 / bgimg的尺寸
    
    Enlarge.prototype.setScale = function(){
        // 根据比例拿到遮罩的尺寸
        this.mask_width = this.show_width * this.enlarge_width / this.bg_width;
        this.mask_height = this.show_height * this.enlarge_height / this.bg_height;
    
        // 设置宽高
        this.mask.style.width = this.mask_width + "px";
        this.mask.style.height = this.mask_height + "px";
    }
    
    // 移入移出
    Enlarge.prototype.overOut = function(){
        // 鼠标移入  为什么要用箭头函数,因为箭头函数内部的this指向上一个作用域的this,事件处理函数的this指向事件源.所以不能写普通函数,因为我们想让this指向我们构造出来的实例
        this.show.addEventListener("mouseover",()=>{
            this.mask.style.display = "block";
            this.enlarge.style.display = "block";
        })
        // 鼠标移出
        this.show.addEventListener("mouseout",()=>{
            this.mask.style.display = "none";
            this.enlarge.style.display = "none";
        })
    }
    
    // 鼠标移动
    // 给show盒子绑定一个鼠标移动事件
    // 拿到光标的坐标哪一组？
    // client ：可视窗口左上角， 
    // page 文档流的左上角
    // offset一组，目标元素左上角
    
    
    // 解决光标问题
        // 方法一：
            // 不管我光标移动到哪里，不管页面是不是滚动，有一个坐标不变，pageX/Y
            // 拿到page的坐标，然后减去最大盒子的left和top，就获取到了具体的坐标
    
        
    // 鼠标移动遮罩
    Enlarge.prototype.move = function () {
        // 添加鼠标遇到事件 随机获取坐标原点
        this.show.addEventListener("mousemove",e =>{
            e = e || window.event;
            // 方法一：
            // let x = e.pageX - this.box.offsetLeft - this.mask_width / 2;
            // let y = e.pageY - this.box.offsetTop - this.mask_height / 2;
            
            
            
            // 方法二：
            // 设置了css属性，获取父元素的坐标，不会触发遮罩的坐标
            let x = e.offsetX - this.mask_width / 2;
            let y = e.offsetY - this.mask_height / 2;
    
    
            if(x <= 0) x = 0;
            if(y <= 0) y = 0;
            if(x >= this.show_width - this.mask_width) x = this.show_width - this.mask_width;
            if(y >= this.show_height - this.mask_height) y = this.show_height - this.mask_height;
            this.mask.style.left = x + "px";
            this.mask.style.top = y + "px";
    
    
            // 根据公式计算出背景图片移动的距离
            // 遮罩的宽             装大图的大盒子的宽
            // ------------- =  -------------- 
            // 遮罩移动的距离       bg移动的距离
    
            // bg移动的距离 = 遮罩移动的距离*装大盒的宽 / 遮罩的宽
            const bg_x = this.enlarge_width * x / this.mask_width;
    
            const bg_y = this.enlarge_height * y / this.mask_height;
            // 设置给enlarge盒子的background-position属性
            // ${}拼接字符串
            this.enlarge.style.backgroundPosition = `-${bg_x}px -${bg_y}px`;
        })
    }
    
    
    
    // 给每一个列表项绑定事件
    // 事件绑定给谁？
    // 事件委托绑定给this.list
    // 点击img的时候，如何进行替换，
    // 解决：将需要替换的图片提前以自定义属性的身份写在img标签上，
    // 当你点击这个元素的时候，拿到这个元素身上提前绑定好的自定义属性，
    // 分别给show盒子里面的img标签赋值，给enlarge盒子的背景图片赋值，
    // 变更p标签的边框颜色，
    // 更换类名，
    // 应该给所有的p标签删除acctive
    // 再给当前加
    // Enlarge.prototype.change = function() {
    //     this.list.addEventListener("click",e=>{
    //         e = e || window.event;
    //         const target = e.target || e.srcElement;
    //         // 判断点击的是哪个img元素
    //         if(target.nodeName === "IMG"){
    //             // 拿到元素身上的自定义属性
    //             const show_url = target.getAttribute("show");
    //             const enlarge_url = target.getAttribute("enlarge");
    
    //             // 在设置给元素
    //             this.show.firstElementChild.src = show_url;
    //             this.enlarge.style.backgroundImage = `url(${enlarge_url})`;
    
    //         //    给点击的p添加高亮边框
    //         for(var  i = 0; i < this.list.children.length; i++){
    //             this.list.children[i].classList.remove("active");
    //         }
    //             // 然后给他的父元素设置上
    //             target.parentElement.classList.add("active");
    //         }
    //     })
    // }
    
    
    