var gulp = require('gulp'),
    jspm = require('jspm'),
    serve = require('browser-sync'),
    sass = require('gulp-sass'),
    htmlReplace = require('gulp-html-replace'),
    fs = require('fs'),
    path = require('path'),
    uglify = require('gulp-uglify'),
    deletee = require('del'),
    rename = require('gulp-rename'),
    ngAnnotate = require('gulp-ng-annotate'),
    sassJspm = require('sass-jspm-importer'),
    documentation = require('gulp-documentation'),
    concat = require('gulp-concat'),
    vinylPaths = require('vinyl-paths');

var paths = {
    components: 'src/components',
    html: [
        'src/examples/**/*.html',
    ]
};

gulp.task('serve', function () {
    'use strict'
	/* sass compile on change
	 * browserSync will handle live updates to browser
	 *
	*/
    gulp.watch('src/**/*.scss', ['sass']);
	/**
	 * component file change reload
	 */
    gulp.watch(path.join(paths.components, '/**/*.js'), ['documentation', 'reload']);
	/**
	 * browserSync for local
	 */
    serve({
        port: process.env.PORT || 8080,
        host: 'k-devarakonda.adm.aamc.org',
        https: false,
        open: false,
        files: [].concat(
            'src/examples/assets/example.css',
            paths.html
        ),
        server: {
            baseDir: ['src', 'src/examples'],
            routes: {
                '/config.js': './config.js',
                '/install.md': './install.md',
                '/contribute.md': './contribute.md',
                '/jspm_packages': './jspm_packages',
                '/src': './src'
            }
        },
    });
});

/**
 * browserSync to test out the gallery bundle
 */
gulp.task('serve-gallery', function () {
    'use strict'
    serve({
        port: process.env.PORT || 8080,
        host: 'k-devarakonda.adm.aamc.org',
        https: false,
        open: false,
        server: {
            baseDir: ['dist']
        }
    });
});
/**
 * sass compile
 * using jspm importer to resolve sass imports from
 * within jspm packages
 */
gulp.task('sass', function () {
    return gulp.src('src/examples/scss/example.scss')
        .pipe(sass({
            errLogToConsole: true,
            functions: sassJspm.resolve_function("/jspm_packages/"),
            importer: sassJspm.importer
        }).on('error', sass.logError))
        .pipe(gulp.dest("src/examples/assets/css"));
});
/**
 * generates documentation per component
 * places a markdown file in each component
 */
gulp.task('documentation', function () {
    var components = getFolders(paths.components);
    var tasks = components.map(function (component) {
        return gulp.src([path.join(paths.components, component, '/**/*.js'), '!src/components/**/*.spec.js'])
            .pipe(documentation({ format: 'md' }))
            .pipe(rename("readme.md"))
            .pipe(gulp.dest(function (file) {
                return "src/components/" + component;
            }));
    });
    return tasks;
});

gulp.task('reload', function (done) {
    console.log("reloading.....");
    serve.reload();
});

/**
 * create a jspm bundle containing all the examples
 * for deployment
 */
gulp.task('build-gallery', function () {
    var dist = 'dist';
    deletee.sync(dist);
    jspm.setPackagePath('.');
	/*
	 * the boostrap css file has an import from
	 * googleapis.com and our certificate is not trusted...
	 * there must be a better way to do this
	 */
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    return jspm.bundle('src/examples/app', dist + "/example-build.js", {})
        .then(function () {
            return gulp.src(dist + "/example-build.js")
                .pipe(vinylPaths(deletee))
                .pipe(ngAnnotate())
                .pipe(uglify())
                .pipe(rename("examples.min.js"))
                .pipe(gulp.dest(dist));
        })
        .then(function () {
            gulp.src(["jspm_packages/system.js", "jspm_packages/system-polyfills.js"])
                .pipe(gulp.dest(dist + "/jspm_packages"));
            gulp.src("config.js")
                .pipe(gulp.dest(dist));
            gulp.src("src/examples/index.html")
                .pipe(htmlReplace({
                    "js": "examples.min.js"
                }))
                .pipe(gulp.dest(dist));
        });

});
/**
 * create a self executing bundle exported as global format
 * so that it can be used by those doing a bower install
 */
gulp.task('build-lib-global', function () {
    var dist = 'dist';
    deletee.sync("lib");
    return jspm.bundleSFX("src/components/components - angular - jquery", "lib/lib-build.js", { sourceMaps: true, format: "global", globalDeps: { 'angular': 'angular', 'jquery': '$' } })
        .then(function () {
            gulp.src("lib/lib-build.js")
                .pipe(vinylPaths(deletee))
                .pipe(ngAnnotate())
                .pipe(rename(function (path) {
                    path.basename = "components.global.min"
                }))
                .pipe(gulp.dest("lib"));
            gulp.src("lib/lib-build.js.map")
                .pipe(rename("components.global.min.js.map"))
                .pipe(gulp.dest("lib"));

        });


});

gulp.task('rootreadme', function () {
    return gulp.src(['install.md', 'contribute.md'])
        .pipe(concat('readme.md'))
        .pipe(gulp.dest('./'));
});

gulp.task('default', ['sass', 'documentation', 'serve']);

/*helper to get an array of component folders */
function getFolders(dir) {
    return fs.readdirSync(dir)
        .filter(function (file) {
            return fs.statSync(path.join(dir, file)).isDirectory();
        });
}

