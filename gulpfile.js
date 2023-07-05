import gulp from 'gulp';
import plumber from 'gulp-plumber';
import gulpIf from 'gulp-if';
import dartSass from "sass";
import gulpSass from "gulp-sass";
import postcss from 'gulp-postcss';
import postUrl from 'postcss-url';
import autoprefixer from 'autoprefixer';
import csso from 'postcss-csso';
import terser from 'gulp-terser';
import squoosh from 'gulp-libsquoosh';
import svgo from 'gulp-svgmin';
import { stacksvg } from "gulp-stacksvg";
import { deleteAsync } from 'del';
import browser from 'browser-sync';
import bemlinter from 'gulp-html-bemlinter';
import { htmlValidator } from "gulp-w3c-html-validator";
import fs, { existsSync } from "fs";
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";

const sass = gulpSass(dartSass);
let isDevelopment = true;

export function processMarkup() {
  return gulp.src('source/*.html')
    .pipe(gulp.dest('build'));
}

export function lintBem() {
  return gulp.src('source/*.html')
    .pipe(bemlinter());
}

export function validateMarkup() {
  return gulp.src('source/*.html')
    .pipe(htmlValidator.analyzer())
    .pipe(htmlValidator.reporter({ throwErrors: true }));
}

export function processStyles() {
  return gulp.src('source/sass/*.scss', { sourcemaps: isDevelopment })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      postUrl({ assetsPath: '../' }),
      autoprefixer(),
      csso()
    ]))
    .pipe(gulp.dest('build/css', { sourcemaps: isDevelopment }))
    .pipe(browser.stream());
}

export function processScripts() {
  return gulp.src('source/js/**/*.js')
    .pipe(terser())
    .pipe(gulp.dest('build/js'))
    .pipe(browser.stream());
}

export function optimizeImages() {
  return gulp.src('source/img/**/*.{png,jpg}')
    .pipe(gulpIf(!isDevelopment, squoosh()))
    .pipe(gulp.dest('build/img'))
}

export function createWebp() {
  return gulp.src('source/img/**/*.{png,jpg}')
    .pipe(squoosh({
      webp: {}
    }))
    .pipe(gulp.dest('build/img'))
}

export function optimizeVector() {
  return gulp.src(['source/img/**/*.svg', '!source/img/icons/**/*.svg'])
    .pipe(svgo())
    .pipe(gulp.dest('build/img'));
}

export function createStack() {
  return gulp.src('source/img/icons/**/*.svg')
    .pipe(svgo())
    .pipe(stacksvg())
    .pipe(gulp.dest('build/img/icons'));
}

export function copyAssets() {
  return gulp.src([
    'source/fonts/**/*.{woff2,woff}',
    'source/*.ico',
    'source/*.webmanifest',
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'));
}

export function startServer(done) {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

function reloadServer(done) {
  browser.reload();
  done();
}

function watchFiles() {
  gulp.watch('source/sass/**/*.scss', gulp.series(processStyles));
  gulp.watch('source/js/script.js', gulp.series(processScripts));
  gulp.watch('source/*.html', gulp.series(processMarkup, reloadServer));
}

/**fonts */
function otfToTtf() {
  //Ищем файлы шрифтов .otf
  return gulp.src('source/fonts/*.{otf,eot}')
    //Конвертируем в .ttf
    .pipe(fonter({
      formats: ['ttf']
    }))
    //Выгружаем в исходную папку
    .pipe(gulp.dest('source/fonts/'))
}
function ttfToWoff() {
  //Ищем файлы шрифтов .ttf
  return gulp.src('source/fonts/*.ttf', {})
    //Конвертируем в .woff
    .pipe(fonter({
      formats: ['woff']
    }))
    //Выгружаем в папку с результатом
    .pipe(gulp.dest('build/fonts/'))
    //Ищем файлы шрифтов .ttf
    .pipe(gulp.src('source/fonts/*.ttf'))
    //Конвертируем в .woff2
    .pipe(ttf2woff2())
    //Выгружаем в папку с результатом
    .pipe(gulp.dest('build/fonts/'))
}
function fontsStyle() {
  //Файл стилей подключения шрифтов
  let fontsFile = 'source/sass/global/fonts.scss';
  //Проверяем существуют ли файлы шрифтов
  fs.readdir('build/fonts/', function (err, fontsFiles) {
    if (fontsFiles) {
      //Проверяем существует ли файл стилей для подключения шрифтов
      if (!existsSync(fontsFile)) {
        //Если файла нет, создаем его
        fs.writeFile(fontsFile, '', cb);
        let newFileOnly;
        for (let i = 0; i < fontsFiles.length; i++) {
          //Записываем подключеие шрифтов в файл стилей
          let fontFileName = fontsFiles[i].split('.')[0];
          if (newFileOnly !== fontFileName) {
            let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
            let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
            if (fontWeight.toLowerCase() === 'thin') { fontWeight = 100; }
            else if (fontWeight.toLowerCase() === 'extralight') { fontWeight = 200; }
            else if (fontWeight.toLowerCase() === 'light') { fontWeight = 300; }
            else if (fontWeight.toLowerCase() === 'medium') { fontWeight = 500; }
            else if (fontWeight.toLowerCase() === 'semibold') { fontWeight = 600; }
            else if (fontWeight.toLowerCase() === 'bold') { fontWeight = 700; }
            else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') { fontWeight = 800; }
            else if (fontWeight.toLowerCase() === 'black') { fontWeight = 900; }
            else { fontWeight = 400; }
            // fs.appendFile(fontsFile,
            //   `@font-face {
            //     font-family: ${fontName};
            //   }`)
            fs.appendFile(fontsFile, `@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;}\n\r\n`, cb);
            newFileOnly = fontFileName;
          }
        }
      } else {
        //Если файл есть, выводим сообщение
        console.log('Файл sass/global/fonts.scss уже существует. Для обновления файла нужено его удалить!');
      }
    }
  });

  return gulp.src('source');
  function cb() { }
}
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);
/**fonts */

function compileProject(done) {
  gulp.series(fonts,
    gulp.parallel(
      processMarkup,
      processStyles,
      processScripts,
      optimizeVector,
      createStack,
      copyAssets,
      optimizeImages,
      createWebp
    )
  )(done);
}

function deleteBuild() {
  return deleteAsync('build');
}

export function buildProd(done) {
  isDevelopment = false;
  gulp.series(
    deleteBuild,
    compileProject
  )(done);
}

export function runDev(done) {
  gulp.series(
    deleteBuild,
    compileProject,
    startServer,
    watchFiles
  )(done);
}
