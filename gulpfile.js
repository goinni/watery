// 引入 gulp及组件
var gulp    = require('gulp'),                 //基础库
    imagemin = require('gulp-imagemin'),       //图片压缩
    sass = require('gulp-ruby-sass'),          //sass
    minifycss = require('gulp-minify-css'),    //css压缩
    jshint = require('gulp-jshint'),           //js检查
    uglify  = require('gulp-uglify'),          //js压缩
    rename = require('gulp-rename'),           //重命名
    concat  = require('gulp-concat'),          //合并文件
    merge = require('gulp-merge'),             //merge 
    fileinclude = require('gulp-file-include'),// include 文件用
    autoprefixer = require('gulp-autoprefixer'),//根据浏览器版本自动处理浏览器兼容前缀
    notify = require('gulp-notify'),           //消息通知
    clean = require('gulp-clean'),             //清空文件夹
    livereload = require('gulp-livereload');   //livereload

//原文件路径
var pathSrc = {
    //[注]按顺序加载时需要把文件依次写全
    angularLib: [
        './src/common/lib/jquery/jquery-1.11.3.min.js',
        './src/common/lib/angular-1.4.8/angular.min.js',
        './src/common/lib/angular-1.4.8/angular-locale_zh.js',
        './src/common/lib/angular-1.4.8/angular-animate.min.js',
        './src/common/lib/angular-1.4.8/angular-ui-router.js',
        './src/common/lib/angular-1.4.8/ui-bootstrap-tpls-0.14.0.min.js',
        './src/common/lib/angular-1.4.8/moment.js',
        './src/common/lib/bootstrap-3.3.5/js/bootstrap.min.js',
        './src/common/lib/angular-1.4.8/daterangepicker.js',
        './src/app.js'
    ],
    bootstrapLib: [
        './src/common/lib/bootstrap-3.3.5/**/*'
    ],
    callCenterLib: [
        './src/common/lib/edb/**/**/*'
    ],
    baseScript: [
        './src/common/widget/*'
    ],
    css:[
       './src/common/css/*' 
    ],
    images:[
       './src/common/images/*' 
    ],
    js:[
       './src/common/js/*' 
    ],
    pages:[
       './src/pages/**/*'
    ],
    componentsJs:[
       './src/components/**/*'   //【注】打包合并时的单独处理了，见下面
    ],
    tempData:[
       './src/tempdata/*'   //测试数据 
    ]
};
//生成文件路径
var pathDes= {
    commonDir: './release/common',
    pages: './release/pages',
    tempData: './release/tempdata',
    componentsJs: './release/components'
};
// 测试数据 处理
gulp.task('tempData', function () {
    gulp.src(pathSrc.tempData)
        .pipe(gulp.dest(pathDes.tempData))
        .pipe(livereload())
        .pipe(notify({message: 'temp Data completed!'}));
});
//angularLib 处理
gulp .task('angularLib', function(){
    return gulp.src(pathSrc.angularLib)
            .pipe(jshint())
            .pipe(concat('core.min.js'))
           // .pipe(uglify())
            .pipe(gulp.dest(pathDes.commonDir))
            .pipe(livereload())
            .pipe(notify({message: 'componentJS completed!'}));
});
//baseScript 处理
gulp .task('baseScript', function(){
    return gulp.src(pathSrc.baseScript)
            .pipe(jshint())
            .pipe(concat('basescript.min.js'))
           // .pipe(uglify())
            .pipe(gulp.dest(pathDes.commonDir))
            .pipe(livereload())
            .pipe(notify({message: 'componentJS completed!'}));
});

// callCenter 处理
gulp.task('callCenter', function () {
    gulp.src(pathSrc.callCenterLib)
        .pipe(gulp.dest(pathDes.commonDir+'/edb'))
        .pipe(livereload())
        .pipe(notify({message: 'callCenter completed!'}));
});
// bootstrap 处理
gulp.task('bootstrapLib', function () {
    gulp.src(pathSrc.bootstrapLib)
        .pipe(gulp.dest(pathDes.commonDir+'/bootstrap'))
        .pipe(livereload())
        .pipe(notify({message: 'view completed!'}));
});
// view 处理
gulp.task('views', function () {
    var currentTime = new Date().getTime();
    //pathSrc.pages
    gulp.src(['./src/pages/**/*.html','./src/pages/**/tpls/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file',
            context: {
                version: currentTime
            }
        }))
        .pipe(gulp.dest(pathDes.pages))
        .pipe(livereload())
        .pipe(notify({message: 'view completed!'}));
    //temp index page 
    gulp.src('./src/index.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file',
            context: {
                version: currentTime
            }
        }))
        .pipe(gulp.dest('./release/'))
});
// 图片处理
gulp.task('images', function(){

    return gulp.src(pathSrc.images)
        .pipe(imagemin())
        .pipe(gulp.dest(pathDes.commonDir+'/images'))
        .pipe(livereload())
        .pipe(notify({message: 'images completed!'}));
});
// scss 样式处理
gulp.task('scss', function () {

    return sass(['./src/common/css/*','./src/pages/**/css/*.scss'], {style:'expanded', "sourcemap=none": true})
        .pipe(iAutoprefixer())
        .pipe(concat('public.min.css'))
        .pipe(minifycss())
        .pipe(gulp.dest(pathDes.commonDir))
        .pipe(livereload())
        .pipe(notify({message: 'scss completed!'}));
});

//componentsJs 处理
gulp .task('componentsJs', function(){
    gulp.src(['./src/components/**/module.js','./src/components/**/[^module]*.js'])
        .pipe(jshint())
        .pipe(concat('components.min.js'))
        // .pipe(uglify())
        .pipe(gulp.dest(pathDes.componentsJs))
        .pipe(livereload())
        .pipe(notify({message: 'componentsJs components completed!'}));
});

// 清空图片、样式、js
gulp.task('clean', function() {
    return gulp.src(releaseDir(), {read: false})
        .pipe(clean())
        .pipe(notify({message: 'clean completed!'}));
});

// 默认任务 清空图片、样式、js并重建 运行语句 gulp
gulp.task('default', ['clean'], function(){
    gulp.start('tempData', 'angularLib','baseScript','callCenter','componentsJs','bootstrapLib','views', 'images', 'scss');
});

// 监听任务 运行语句 gulp watch
gulp.task('watch',function(){
        // 监听angularLib
        gulp.watch(pathSrc.angularLib, function(event){
            gulp.run('angularLib');
        })
        // 监听css
        gulp.watch(pathSrc.css, function(){
            gulp.run('scss');
        });
        // 监听css
        gulp.watch('./src/pages/**/css/*.scss', function(){
            gulp.run('scss');
        });
        
        // 监听script
        gulp.watch(pathSrc.pages, function(){
            gulp.run('views');
        });
        //监听 js lib
        gulp.watch(pathSrc.componentsJs, function(){
            gulp.run('componentsJs');
        });
        //监听 bootstrap lib
        gulp.watch(pathSrc.bootstrapLib, function(){
            gulp.run('bootstrapLib');
        });
        //监听 callCenter lib
        gulp.watch(pathSrc.callCenterLib, function(){
            gulp.run('callCenter');
        });
        //监听 baseScript lib
        gulp.watch(pathSrc.baseScript, function(){
            gulp.run('baseScript');
        });
        //监听 tempData
        gulp.watch(pathSrc.tempData, function(){
            gulp.run('tempData');
        });
        
        // 建立即时重整伺服器
        livereload.listen();
});

//共用pipe
function iAutoprefixer(){
    return autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4');
}
//release相关目录文件集合
function releaseDir(){
    return [pathDes.commonDir + '/*', pathDes.pages + '/**/*',pathDes.componentsJs + '/**/*'];
}
