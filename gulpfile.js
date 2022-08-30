//list dependences
const { src, dest, watch, series, task } = require('gulp');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const minify = require('gulp-clean-css');
const webp = require('gulp-webp');
const nunjucksRender = require('gulp-nunjucks-render');
const ghPages = require('gulp-gh-pages');

//create function

//deploy
task('deploy', function () {
  return src('./dist/**/*').pipe(ghPages());
});

//html
function htmlTemplate() {
  return src('src/templates/pages/**/*.{html,njk}')
    .pipe(nunjucksRender({ path: ['src/templates/components'] }))
    .pipe(dest('dist'));
}

//scss
function compilescss() {
  return src('src/css/*.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([(tailwindcss()), autoprefixer('last 2 versions'), require('postcss-nested')]))
    .pipe(minify())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/assets/css'));
}

//web images
function webpImage() {
  return src('src/images/*.{jpg,png}').pipe(webp()).pipe(dest('dist/assets/images'));
}

function images() {
  return src('src/images/*.webp').pipe(dest('dist/assets/images'));
}

//svg
function svgCopy() {
  return src('src/icons/*.svg').pipe(dest('dist/assets/icons'));
}

//font
function fontCopy() {
  return src('src/font/*.*').pipe(dest('dist/assets/font'));
}

//library
function libraryCopy() {
  return src('src/library/**/*.*').pipe(dest('dist/assets/library'));
}

//create watch task
function watchTask() {
  watch('src/templates/**/**/*.html', htmlTemplate);
  watch('src/templates/**/**/*.html', compilescss);
  watch('src/css/*.css', compilescss);
  watch('src/images/*.{jpg,png}', webpImage);
  watch('src/images/*.webp', images);
  watch('src/icons/*.svg', svgCopy);
}

//default gulp
exports.default = series(htmlTemplate, compilescss, webpImage, images, svgCopy, fontCopy, libraryCopy, watchTask);
