const gulp = require('gulp');
const sass = require('gulp-sass');
const cssmin = require('gulp-cssmin');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify')
const babel = require('gulp-babel');
const htmlmin = require('gulp-htmlmin');
const del = require('del');
const webserver = require('gulp-webserver')

// 1.打包sass文件 -gulp4的书写信息
const sassHandler = ()=>{
    return gulp
        .src('./src/sass/*.scss')
        .pipe(sass())//转码
        .pipe(autoprefixer()) //添加前缀
        .pipe(cssmin()) //压缩
        .pipe(gulp.dest('./dist/sass/'))//存放到指定目录
}
// 打包css文件
const cssHandler = () => {
    return gulp
      .src('./src/css/*.css')
      .pipe(autoprefixer())
      .pipe(cssmin())
      .pipe(gulp.dest('./dist/css/'))
  }

// 2.打包js文件
const jsHandler = ()=>{
    return gulp
        .src('./src/js/*.js')
        .pipe(babel({presets: ['@babel/env']}))  //ES6
        .pipe(uglify())  //压缩
        .pipe(gulp.dest('./dist/js/'))
}

// 3.打包html文件
const htmlHandler = ()=>{
    // 4-1. 找到 html 文件
    return gulp
      .src('./src/pages/*.html')
      // 因为 htmlmin 的所有打包信息都需要以参数的形式进行配置
      .pipe(htmlmin({ // 压缩
        removeAttributeQuotes: true, // 去除属性上的双引号
        removeComments: true, // 去除注释
        removeEmptyElements: true, // 去除空元素
        removeEmptyAttributes: true, // 去除空的属性
        removeScriptTypeAttributes: true, // 去除 script 标签上的 type 属性
        removeStyleLinkTypeAttributes: true, // 去除 style 标签和 link 标签上的 type 属性
        minifyJS: true, // 压缩内嵌式 js 代码, 不认识 ES6
      }))
      .pipe(gulp.dest('./dist/pages/')) // 保存
  }

//   4.打包images文件
const imgHandler = () => {
    // 找到文件
    return gulp
      .src('./src/images/*.**')
      .pipe(gulp.dest('./dist/images/'))
  }
  
  
//   5.转存asset文件
const assetsHandler = () => {
    return gulp
      .src('./src/assets/*/**')
      .pipe(gulp.dest('./dist/assets/'))
  }
//   6.转存php文件
// const serverHandler = () => {
//     return gulp
//       .src('./src/server/*/php')
//       .pipe(gulp.dest('./dist/server/'))
//   }

//  7.删除dist
const delHandler = () => {
    return del('./dist/')
  }     


// 8.开启监控任务,进行热更新
 const watchHandler = ()=>{
    
    gulp.watch('./src/sass/*.sass', sassHandler)
    gulp.watch('./src/assets/*.**', assetsHandler)
    gulp.watch('./src/images/*.**', imgHandler)
    gulp.watch('./src/js/*.js', jsHandler)
    gulp.watch('./src/pages/*.html', htmlHandler)
    gulp.watch('./src/css/*.css', cssHandler)
 }


const defaultHandler = gulp.series(
    delHandler,
    gulp.parallel(sassHandler,jsHandler,htmlHandler,imgHandler,assetsHandler,cssHandler),
    watchHandler,
)


// const watchHandler = () => {
//     // 不需要 return
//     // 实时开启监控, 多个任务执行的时候, 需要把这个任务放在最后
//     gulp.watch('./src/css/*.css', cssHandler)
//     gulp.watch('./src/sass/*.sass', sassHandler)
//     gulp.watch('./src/js/*.js', jsHandler)
//     gulp.watch('./src/pages/*.html', htmlHandler)
//   }


// module.exports.sassHandler = sassHandler;
// module.exports.jsHandler = jsHandler;
module.exports.htmlHandler = htmlHandler;
// module.exports.imgHandler = imgHandler;
// module.exports.assetsHandler = assetsHandler;
// module.exports.cssHandler = cssHandler;
module.exports.default = defaultHandler;