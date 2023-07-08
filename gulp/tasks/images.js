import webp from "gulp-webp";
import imagemin, { gifsicle, mozjpeg, optipng, svgo } from "gulp-imagemin";


export const images = () => {
  return app.gulp.src(app.path.src.images)
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "IMAGES",
        message: "Error: <%= error.message %>"
      })))
    .pipe(app.plugins.newer(app.path.build.images))
    .pipe(
      webp()
    )
    .pipe(
      app.gulp.dest(app.path.build.images)
    )
    .pipe(
      app.gulp.src(app.path.src.images)
    )
    .pipe(
      app.plugins.newer(app.path.build.images)
    )
    .pipe(
      imagemin(
        [
          gifsicle({ interlaced: true }),
          mozjpeg({ quality: 75, progressive: true }),
          optipng({ optimizationLevel: 3 })
        ]
      )
    )
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.gulp.src(app.path.src.svg))
    .pipe(
      imagemin(
        [
          svgo({
            plugins: [
              {
                name: 'removeViewBox',
                active: false
              }
            ]
          })
        ]
      )
    )
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.plugins.browsersync.stream());
}
