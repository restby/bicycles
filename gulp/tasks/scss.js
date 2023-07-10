import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";

import cleanCss from "gulp-clean-css";//Сжатие CSS файлв
import webpcss from "gulp-webpcss";//Вывод WEBP изображений
import autoprefixer from "gulp-autoprefixer";//Добавление вендорных префиксов
import groupCssMediaQueries from "gulp-group-css-media-queries";//Групировка медиа запросов

const sass = gulpSass(dartSass);

export const scss = () => {
  return app.gulp.src(`${app.path.srcFolder}/scss/blocks/**/*.scss`)
    .pipe(app.plugins.replace(/@img\//g, '../img/'))
    .pipe(app.gulp.dest(`${app.path.srcFolder}/scss/blocks/`))
}

export const style = () => {
  return app.gulp.src(app.path.src.style, { sourcemaps: app.isDev })
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "SCSS",
        message: "Error: <%= error.message %>"
      })))
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(
      app.plugins.if(
        app.isBuild, groupCssMediaQueries()
      )
    )
    .pipe(
      app.plugins.if(
        app.isBuild, webpcss({
          webpClass: ".webp",
          noWebpClass: ".no-webp"
        })
      )
    )
    .pipe(
      app.plugins.if(
        app.isBuild, autoprefixer({
          grid: true,
          overrideBrowserlist: ["last 2 versions"],
          cascade: true
        })
      )
    )
    .pipe(app.gulp.dest(app.path.build.css))//Если нужен не сжатый css файл
    .pipe(cleanCss())
    .pipe(rename({
      extname: ".min.css"
    }))
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.browsersync.stream());
}
