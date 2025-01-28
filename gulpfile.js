
import pkg from 'gulp'
const { gulp, src, dest, parallel, series, watch: gulpWatch } = pkg

import browserSync from 'browser-sync'
import bssi from 'browsersync-ssi'
import pug from 'gulp-pug'
import webpackStream from 'webpack-stream'
import webpack from 'webpack'
import named from 'vinyl-named'
import TerserPlugin from 'terser-webpack-plugin'
import gulpSass from 'gulp-sass'
import dartSass from 'sass'
import sassglob from 'gulp-sass-glob'
const sass = gulpSass(dartSass)
import postCss from 'gulp-postcss'
import cssnano from 'cssnano'
import autoprefixer from 'autoprefixer'
import imagemin, { gifsicle, mozjpeg, optipng, svgo } from 'gulp-imagemin'
import changed from 'gulp-changed'
import concat from 'gulp-concat'
import del from 'del'
import formatHTML from 'gulp-format-html'
import webp from 'gulp-webp';
import mediaQueries from 'postcss-sort-media-queries';
const pathCurrent = process.cwd();
import pngQuant from 'imagemin-pngquant'

function browsersync() {
  browserSync.init({
    server: {
      baseDir: './dist/',
      middleware: bssi({ baseDir: './dist/', ext: '.html' })
    },
    notify: false,
    online: true,
    ghostMode: false,
  })
}
function startwatch() {
  gulpWatch(['./dist/**/*.*'], { usePolling: true }).on('change', browserSync.reload)
}


const watch = series(parallel(browsersync, startwatch))


export { watch }
export default watch;