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
    images: `${buildFolder}/images/`,
    fonts: `${buildFolder}/fonts/`,
    files: `${buildFolder}/files/`,
    lint: `${buildFolder}/**/*.html`,
  },
  src: {
    // html: `${srcFolder}/*.pug`, // Для файлов PUG
    html: `${srcFolder}/*.html`,
    scss: `${srcFolder}/scss/style.scss`,
    js: `${srcFolder}/js/app.js`,
    images: `${srcFolder}/images/**/*.{jpg, jpeg, png, gif, webp}`,
    svg: `${srcFolder}/images/**/*.svg`,
    svgicons: `${srcFolder}/svgicons/*.svg`,
    files: `${srcFolder}/files/**/*.*`,
    lint: `${srcFolder}/**/*.html`,
  },
  watch: {
    // html: `${srcFolder}/**/*.pug`, // Для файлов PUG
    html: `${srcFolder}/**/*.html`,
    scss: `${srcFolder}/scss/**/*.scss`,
    js: `${srcFolder}/js/**/*.js`,
    images: `${srcFolder}/images/**/*.{jpg, jpeg, png, gif, webp, svg}`,
    files: `${srcFolder}/files/**/*.*`,
  },
  clean: buildFolder,
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
  ftp: `test`
}
