//importación de "librerias", series permite ejecutar varias funciones a la vez, src donde está la fuente dest donde se va a compilar 
const { series, src, dest, watch } = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');


//Función que compila SASS

const paths = {
    imagenes: 'src/img/**/*',
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js'

}

function css() {
    return src(paths.scss)
        .pipe(sass({
            outputStyle: 'compressed' //comprime las líneas de codigo  *expanded le da el estilo "clasico"
        })) //compila el archivo
        .pipe(dest('./build/css'))
}

function javascript() {
    return src(paths.js)
        .pipe(concat('bundle.js'))
        .pipe(dest('./build/js'))



}

function imagenes() {
    return src(paths.imagenes)
        .pipe(imagemin())
        .pipe(dest('./build/img'))
        .pipe(notify({ message: 'Imagen Minificada' }));
}

function versionWebp() {
    return src(paths.imagenes)
        .pipe(webp())
        .pipe(dest('./build/img'))
        .pipe(notify({ message: 'Versión Webp Lista' }));
}

function watchArchivos() {
    watch(paths.scss, css); //Recibe dos parametros, la direccion del archivo a "observar" y la función que va a ejecutar cada que haya algún cambio en dicho archivo - * indica la carpeta actual -** indica todas las carpetas o archivos
    watch(paths.js, javascript);
}

exports.css = css;
exports.imagenes = imagenes;
exports.watchArchivos = watchArchivos;
exports.default = series(css, javascript, imagenes, versionWebp, watchArchivos);