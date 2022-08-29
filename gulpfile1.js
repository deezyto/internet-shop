//gulp буде використовувати такі пакети
const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const autoPrefix = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

//Static server
//сервер сам знайде файл index.html
gulp.task('server', function() {
  browserSync.init({
    server: {
      baseDir: 'dist' //src
    }
  });
  gulp.watch('src/**/*.html').on('change', browserSync.reload);
});

//створюєм задачу по компіляції стилів sass в css
gulp.task('styles', function() {
  return gulp.src('src/scss/*.+(scss|sass)') //берем файли sass або scss
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)) //компілюєм в css і одночасно оптимізовуєм
    .pipe(rename({ //після компіляції файла переіменовуєм його (щоб він не заміщував файл style.css)
      prefix: '',
      suffix: '.min',
    }))
    //закоментував щоб autoprefixer брав налаштування з package.json
    .pipe(autoPrefix(/* { //добавляєм вендорні префікси в готовий css файл
      browsers: ['last 2 versions'],
      cascade: false
    } */))
    .pipe(cleanCss({ //оптимізовуєм файл css
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest('dist/css')) //src зкомпільовані css файли ставимо в папку css
    .pipe(browserSync.stream()); //запускаєм browserSync щоб зміни відобразились на сайті
});

//включаєм слідкування gulp за оновленням файлів
gulp.task('watch', function() {
  gulp.watch('./src/scss/**/*.+(scss|sass|css)', gulp.parallel('styles'));
  gulp.watch('src/**/*.html').on('change', gulp.parallel('html'));
  //слідимо за любими js файлами, файлами fonts, icons, img
  //change - слідить за зміною файла, all - слідить за всім (за добавленням файлів в папку і тд)
  gulp.watch('src/js/**/*.js').on('change', gulp.parallel('scripts'));
  gulp.watch('src/fonts/**/*').on('all', gulp.parallel('fonts'));
  gulp.watch('src/icons/**/*').on('all', gulp.parallel('icons'));
  gulp.watch('src/img/**/*').on('all', gulp.parallel('images'));
});

//отримуєм файл html, зжимаєм його і ложимо в папку dist
gulp.task('html', function() {
  return gulp.src('src/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true}))
    .pipe(gulp.dest('dist/'));
});

//отримуєм файли js і ложимо в папку js в папці dist
gulp.task('scripts', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(gulp.dest('dist/js'))
    //після добавлення файлів в папку dist перезавантажуєм сторінку
    .pipe(browserSync.stream());
});

//отримуєм файли fonts і ложимо в папку fonts в папці dist
gulp.task('fonts', function() {
  return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
    //після добавлення файлів в папку dist перезавантажуєм сторінку
    .pipe(browserSync.stream());
});

//отримуєм картинки з папки icons і ложимо в папку icons в папці dist
gulp.task('icons', function() {
  return gulp.src('src/icons/**/*')
    .pipe(gulp.dest('dist/icons'))
    //після добавлення файлів в папку dist перезавантажуєм сторінку
    .pipe(browserSync.stream());
});

//отримуєм файли mailer і ложимо в папку mailer в папці dist
gulp.task('mailer', function() {
  return gulp.src('src/mailer/**/*')
    .pipe(gulp.dest('dist/mailer'))
    //після добавлення файлів в папку dist перезавантажуєм сторінку
    .pipe(browserSync.stream());
});

//отримуєм картинки з папки img, зтискаємо їх і ложимо в папку img в папці dist
gulp.task('images', function() {
  return gulp.src('src/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'))
    //після добавлення файлів в папку dist перезавантажуєм сторінку
    .pipe(browserSync.stream());
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'scripts', 'fonts', 'icons', 'mailer', 'html', 'images')); //запускаєм декілька задач одночасно