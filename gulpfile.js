// Основной модуль
import gulp from "gulp";
// Импорт путей
import { path } from "./gulp/config/path.js"
// Импорт общих плагинов
import { plugins } from "./gulp/config/plugins.js";

// Передаем значения в глобальную переменную
global.app = {
  isBuild: process.argv.includes('--build'),
  isDev: !process.argv.includes('--build'),
  path: path,
  gulp: gulp,
  plugins: plugins
}

// Импорт задач
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { svgSprive } from "./gulp/tasks/svgSprive.js";
import { zip } from "./gulp/tasks/zip.js";
import { ftp } from "./gulp/tasks/ftp.js";
import bemlinter from 'gulp-html-bemlinter';
import { htmlValidator } from "gulp-w3c-html-validator";

export function lintBem() {
  return app.gulp.src(app.path.src.lint)
    .pipe(bemlinter());
}

export function validateMarkup() {
  return app.gulp.src(app.path.build.lint)
    .pipe(htmlValidator.analyzer())
    .pipe(htmlValidator.reporter({ throwErrors: true }));
}
// Наблюдатель за изменениями в файлах

function watcher() {
  gulp.watch(path.watch.files, copy);//gulp.series(html,ftp)
  gulp.watch(path.watch.html, html);// вместо html заменить на gulp.series(html,ftp)
  gulp.watch(path.watch.scss, scss);// вместо scss заменить на gulp.series(scss,ftp)
  gulp.watch(path.watch.js, js);// вместо js заменить на gulp.series(js,ftp)
  gulp.watch(path.watch.images, images);// вместо images заменить на gulp.series(images,ftp)
}
// export { svgSprive }

//Последовательная обработка шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle)
//Основные задачи
const mainTasks = gulp.series(fonts, svgSprive, gulp.parallel(copy, html, scss, js, images));
// Построение сценариев выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp);

export { dev }
export { build }
export { deployZIP }
export { deployFTP }

// Выполнение сценариев по умолчанию
gulp.task('default', dev);
