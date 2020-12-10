class Banner {
    constructor (ele) {
      // 1. 范围元素
      this.ele = document.querySelector(ele)
      // 2. imgBox
      this.imgBox = this.ele.querySelector('.imgBox')
      // 3. pointBox
      this.pointBox = this.ele.querySelector('.pointBox')
      // 4. leftRightBox
      this.leftRightBox = this.ele.querySelector('.leftRightBox')
      // 5. 索引
      this.index = 0
      // 6. 定时器返回值
      this.timer = 0
  
      // 直接启动入口函数
      this.init()
    }
  
    // 1. 入口函数
    init () {
      this.setPoint()
      this.autoPlay()
      this.overOut()
      this.leftRight()
      this.pointEvent()
      this.changePage()
    }
  
    // 2. 设置焦点
    setPoint () {
      const pointNum = this.imgBox.children.length
      const frg = document.createDocumentFragment()
      for (let i = 0; i < pointNum; i++) {
        const li = document.createElement('li')
        if (i === 0) li.className = 'active'
        li.setAttribute('i', i)
        frg.appendChild(li)
      }
  
      this.pointBox.appendChild(frg)
      this.pointBox.style.width = pointNum * 20 * 1.5 + 'px'
    }
  
    // 3. 切换一张
    changeOne (type) {
      // 3-1. 让当前这一张消失
      // 此时 this.index === 0
      this.imgBox.children[this.index].classList.remove('active')
      // 3-4. 焦点同时联动
      this.pointBox.children[this.index].classList.remove('active')
  
      // 3-2. 修改 index 为 n
      if (type === true) {
        this.index++
      } else if (type === false) {
        this.index--
      } else {
        this.index = type
      }
  
      // 4-3. 调整一下 index
      if (this.index >= this.imgBox.children.length) this.index = 0
      if (this.index < 0) this.index = this.imgBox.children.length - 1
  
      // 3-3. 让当前这一张显示
      // 此时 this.index 就是传递进来的 n
      this.imgBox.children[this.index].classList.add('active')
      // 3-4. 焦点同时联动
      this.pointBox.children[this.index].classList.add('active')
    }
  
    // 4. 自动轮播
    autoPlay () {
      // 4-1. 开启定时器
      this.timer = setInterval(() => {
        // 4-2. 切换到下一张
        this.changeOne(true)
      }, 2000)
    }
  
    // 5. 移入移出
    overOut () {
      this.ele.addEventListener('mouseover', () => clearInterval(this.timer))
      this.ele.addEventListener('mouseout', () => this.autoPlay())
    }
  
    // 6. 左右切换
    leftRight () {
      this.leftRightBox.addEventListener('click', e => {
        e = e || window.event
        const target = e.target || e.srcElement
  
        if (target.className === 'left') {
          this.changeOne(false)
        }
  
        if (target.className === 'right') {
          this.changeOne(true)
        }
      })
    }
  
    // 7. 焦点切换
    pointEvent () {
      this.pointBox.addEventListener('mouseover', e => {
        e = e || window.event
        const target = e.target || e.srcElement
  
        if (target.nodeName === 'LI') {
          const i = target.getAttribute('i') - 0
          this.changeOne(i)
        }
      })
    }
  
    // 8. 切换页面
    changePage () {
      document.addEventListener('visibilitychange', () => {
        const state = document.visibilityState
  
        if (state === 'hidden') clearInterval(this.timer)
        if (state === 'visible') this.autoPlay()
      })
    }
  }