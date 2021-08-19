

let project_folder = 'dest'
let sours_folder = 'src'
let fs = require('fs')

let path = {
    build: {
        html: project_folder+'/',
        css: project_folder+'/css/',
        js: project_folder+'/js/',
        img: project_folder+'/img/',
        fonts: project_folder+'/fonts/',
    },
    src: {
        html: [sours_folder+'/*.html', '!'+sours_folder+'/_*.html'],
        css: sours_folder+'/scss/style.scss',
        js: sours_folder+'/js/script.js',
        img: sours_folder+'/img/**/*.{png, jpg, svg, gif, ico, webp}',
        fonts: sours_folder+'/fonts/*.ttf',
    },
    watch: {
        html: sours_folder+'/**/*.html',
        css: sours_folder+'/scss/**/*.scss',
        js: sours_folder+'/js/**/*.js',
        img: sours_folder+'/img/**/*.{png, jpg, svg, gif, ico, webp}',
    },
    clean: './' + project_folder + '/'
}

let {src, dest} = require('gulp'),
    gulp = require('gulp'),
    browsersync = require('browser-sync').create(),
    fileinclude = require('gulp-file-include'),
    del = require('del'),
    sass = require('gulp-sass')(require('sass')),
    autoprefixer = require('gulp-autoprefixer'),
    group_media = require('gulp-group-css-media-queries'),
    imagemin = require('gulp-imagemin'),
    webp = require('gulp-webp'),
    webphtml = require('gulp-webp-html'),
    ttf2woff = require('gulp-ttf2woff'),
    ttf2woff2 = require('gulp-ttf2woff2')


function browserSync(params) {
    browsersync.init({
        server: {
            baseDir: './' + project_folder + '/'
        },
        port: 3000,
        notify: false
    })
}
function html() {
    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(webphtml())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}

function css() {
    return src(path.src.css)
        .pipe(
            sass({
                outputStyle: 'expanded'
            })
        )
        .pipe(
            autoprefixer({
                overrideBrowserslist: ['last 5 version'],
                cascade: true
            })
        )
        .pipe(
            group_media()
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}

function js() {
    return src(path.src.js)
        .pipe(fileinclude())
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}

function images() {
    return src(path.src.img)
        .pipe(
            webp({
                quality: 70
            })
        )
        .pipe(dest(path.build.img))
        .pipe(src(path.src.img))
        .pipe(
            imagemin ({
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                interlaced: true,
                optimizationLevel: 3
            })
        )

        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
}

function fonts() {
    src(path.src.fonts)
        .pipe(ttf2woff())
        .pipe(dest(path.build.fonts))
    return src(path.src.fonts)
        .pipe(ttf2woff2())
        .pipe(dest(path.build.fonts))
}


function cb() {

}

function watchFiles(params) {
    gulp.watch([path.watch.html], html)
    gulp.watch([path.watch.css], css)
    gulp.watch([path.watch.js], js)
    gulp.watch([path.watch.img], images)
}

function clean(params) {
    return del(path.clean)
}

let build = gulp.series(clean, gulp.parallel(js, css, html, images, fonts))
let watch = gulp.parallel(build, browserSync, watchFiles)

exports.fonts = fonts
exports.images = images
exports.js = js
exports.css = css
exports.html = html
exports.build = build
exports.watch = watch
exports.default = watch