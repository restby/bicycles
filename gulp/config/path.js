// получаем имя папки проекта
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve())

const buildFolder = './build'; //можно заменить на название папки проетка (rootFolder) или любое другое
const srcFolder = './source';

export const path = {
  build: {
    html: `${buildFolder}/`,
    css: `${buildFolder}/css/`,
    js: `${buildFolder}/js/`,
    images: `${buildFolder}/img/`,
    fonts: `${buildFolder}/fonts/`,
    files: `${buildFolder}/files/`,
    favicons: `${buildFolder}/favicons/`,
    lint: `${buildFolder}/**/*.html`,
  },
  src: {
    // html: `${srcFolder}/*.pug`, // Для файлов PUG
    html: `${srcFolder}/*.html`,
    scss: `${srcFolder}/scss/style.scss`,
    js: `${srcFolder}/js/app.js`,
    images: `${srcFolder}/img/**/*.{png,jpg,jpeg,webp,gif}`,
    svg: `${srcFolder}/img/svg/**/*.svg`,
    svgicons: `${srcFolder}/img/icons/*.svg`,
    files: `${srcFolder}/files/**/*.*`,
    favicons: `${srcFolder}/favicons/**/*.*`,
    lint: `${srcFolder}/**/*.html`,
  },
  watch: {
    // html: `${srcFolder}/**/*.pug`, // Для файлов PUG
    html: `${srcFolder}/**/*.html`,
    scss: `${srcFolder}/scss/**/*.scss`,
    js: `${srcFolder}/js/**/*.js`,
    images: `${srcFolder}/img/**/*.{png,jpg,jpeg,svg,webp,gif}`,
    files: `${srcFolder}/files/**/*.*`,
  },
  clean: buildFolder,
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
  ftp: `test`
}
