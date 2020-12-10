
    const inp = document.querySelector('.inp10');
    const ul = document.querySelector('.searchul');
    // 1.给文本框绑定一个input事件
    // console.log(inp);
    // console.log(ul);
    inp.addEventListener('input',function(){
        const value = this.value.trim();
        if(!value) ul.classList.remove('active');
        // console.log('111111111111111');
        // 3.准备发送请求
        // 动态创建script的标签
        const script = document.createElement('script');
        // 准备一个请求地址
        // wd这个参数要是换成我文本框里面输入的内容 
        const url = `
        https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=1446,32857,33124,33061,32973,33099,33101,32962,22159&wd=${value}&req=2&csor=1&cb=bindHtml&_=1605768936993
        `;

        script.src = url;
        // 将script标签插入页面里面
        document.body.appendChild(script);

        // script.remove();

    })
    // 全局准备一个jsonp的处理函数
    function bindHtml(res){
        // console.log(res);
        if(!res.g){
            ul.classList.remove('active');
            return;
        }



        let str = '';
        for(let i = 0; i < res.g.length;i++){
            str += `
                <li>${res.g[i].q}</li>
            `
        }
        ul.innerHTML = str
      // 让 ul 显示出来
        ul.classList.add('active')
    }   

    

