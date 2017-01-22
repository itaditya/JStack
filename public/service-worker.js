importScripts('/vendor/cache-polyfill/cache-polyfill.js');
// /public/vendor/cache-polyfill/cache-polyfill.js
var CACHE_VERSION = 'app-v1';
var CACHE_FILES = [
    '/',
    'https://fonts.googleapis.com/css?family=Noto+Sans|Source+Code+Pro',
    '/assets/css/CBstyle.css',
    '/assets/css/content.css',
    '/assets/css/EditAreastyle.css',
    '/assets/css/lightanim.css',
    '/assets/css/login.css',
    '/assets/css/ncsStyle.css',
    '/assets/css/preloader.css',
    '/assets/css/style.css',
    '/assets/css/texteditor.css',
    '/assets/css/fonts/fablet/fabfeltscript-bold.eot',
    '/assets/css/fonts/fablet/fabfeltscript-bold.svg',
    '/assets/css/fonts/fablet/fabfeltscript-bold.ttf',
    '/assets/css/fonts/fablet/fabfeltscript-bold.woff',
    '/assets/css/fonts/fablet/fabfeltscript-bold.woff2',
    '/assets/css/fonts/icon/icomoon.eot',
    '/assets/css/fonts/icon/icomoon.svg',
    '/assets/css/fonts/icon/icomoon.ttf',
    '/assets/css/fonts/icon/icomoon.woff',
    '/assets/css/landing/custom.css',
    '/assets/css/landing/main.css',
    '/assets/css/landing/searchList.css',
    '/assets/css/themes/atelier-cave-dark.css',
    '/assets/css/themes/atelier-cave-dark.min.css',
    '/assets/css/themes/atelier-cave-light.css',
    '/assets/css/themes/atelier-cave-light.min.css',
    '/assets/css/themes/atelier-dune-dark.css',
    '/assets/css/themes/atelier-dune-dark.min.css',
    '/assets/css/themes/atelier-dune-light.css',
    '/assets/css/themes/atelier-dune-light.min.css',
    '/assets/css/themes/atelier-estuary-dark.css',
    '/assets/css/themes/atelier-estuary-dark.min.css',
    '/assets/css/themes/atelier-estuary-light.css',
    '/assets/css/themes/atelier-estuary-light.min.css',
    '/assets/css/themes/atelier-forest-dark.css',
    '/assets/css/themes/atelier-forest-dark.min.css',
    '/assets/css/themes/atelier-forest-light.css',
    '/assets/css/themes/atelier-forest-light.min.css',
    '/assets/css/themes/atelier-heath-dark.css',
    '/assets/css/themes/atelier-heath-dark.min.css',
    '/assets/css/themes/atelier-heath-light.css',
    '/assets/css/themes/atelier-heath-light.min.css',
    '/assets/css/themes/atelier-lakeside-dark.css',
    '/assets/css/themes/atelier-lakeside-dark.min.css',
    '/assets/css/themes/atelier-lakeside-light.css',
    '/assets/css/themes/atelier-lakeside-light.min.css',
    '/assets/css/themes/atelier-plateau-dark.css',
    '/assets/css/themes/atelier-plateau-dark.min.css',
    '/assets/css/themes/atelier-plateau-light.css',
    '/assets/css/themes/atelier-plateau-light.min.css',
    '/assets/css/themes/atelier-savanna-dark.css',
    '/assets/css/themes/atelier-savanna-dark.min.css',
    '/assets/css/themes/atelier-savanna-light.css',
    '/assets/css/themes/atelier-savanna-light.min.css',
    '/assets/css/themes/atelier-seaside-dark.css',
    '/assets/css/themes/atelier-seaside-dark.min.css',
    '/assets/css/themes/atelier-seaside-light.css',
    '/assets/css/themes/atelier-seaside-light.min.css',
    '/assets/css/themes/atelier-sulphurpool-dark.css',
    '/assets/css/themes/atelier-sulphurpool-dark.min.css',
    '/assets/css/themes/atelier-sulphurpool-light.css',
    '/assets/css/themes/atelier-sulphurpool-light.min.css',
    '/assets/css/themes/github-v2.css',
    '/assets/css/themes/github-v2.min.css',
    '/assets/css/themes/github.css',
    '/assets/css/themes/github.min.css',
    '/assets/css/themes/hemisu-dark.css',
    '/assets/css/themes/hemisu-dark.min.css',
    '/assets/css/themes/hemisu-light.css',
    '/assets/css/themes/hemisu-light.min.css',
    '/assets/css/themes/tomorrow-night-blue.css',
    '/assets/css/themes/tomorrow-night-blue.min.css',
    '/assets/css/themes/tomorrow-night-bright.css',
    '/assets/css/themes/tomorrow-night-bright.min.css',
    '/assets/css/themes/tomorrow-night-eighties.css',
    '/assets/css/themes/tomorrow-night-eighties.min.css',
    '/assets/css/themes/tomorrow-night.css',
    '/assets/css/themes/tomorrow-night.min.css',
    '/assets/css/themes/tomorrow.css',
    '/assets/css/themes/tomorrow.min.css',
    '/assets/css/themes/tranquil-heart.css',
    '/assets/css/themes/tranquil-heart.min.css',
    '/assets/css/themes/vibrant-ink.css',
    '/assets/css/themes/vibrant-ink.min.css',
    '/assets/fonts/fablet/fabfeltscript-bold.eot',
    '/assets/fonts/fablet/fabfeltscript-bold.svg',
    '/assets/fonts/fablet/fabfeltscript-bold.ttf',
    '/assets/fonts/fablet/fabfeltscript-bold.woff',
    '/assets/fonts/fablet/fabfeltscript-bold.woff2',
    '/assets/fonts/icon/icomoon.eot',
    '/assets/fonts/icon/icomoon.svg',
    '/assets/fonts/icon/icomoon.ttf',
    '/assets/fonts/icon/icomoon.woff',
    '/assets/img/adi.jpg',
    '/assets/img/b.jpg',
    '/assets/img/dp1.png',
    '/assets/img/dp2.jpg',
    '/assets/img/favicon.png',
    '/assets/img/hero.jpg',
    '/assets/img/l1.jpg',
    '/assets/img/l2.jpg',
    '/assets/img/l3.jpg',
    '/assets/img/preloader.svg',
    '/assets/img/preloader2.svg',
    '/assets/img/preloaderLg.svg',
    '/assets/img/coverImg/ang.jpg',
    '/assets/img/coverImg/ang2.png',
    '/assets/img/coverImg/css.png',
    '/assets/img/coverImg/hero.jpg',
    '/assets/img/coverImg/hero2.jpg',
    '/assets/img/coverImg/html.png',
    '/assets/img/coverImg/js.jpg',
    '/assets/img/coverImg/jsgif.gif',
    '/assets/img/coverImg/node.jpg',
    '/assets/img/coverImg/promise.jpg',
    '/assets/img/coverImg/promises.jpg',
    '/assets/img/landing/img_1.jpg',
    '/assets/img/landing/img_10.jpg',
    '/assets/img/landing/img_11.jpg',
    '/assets/img/landing/img_12.jpg',
    '/assets/img/landing/img_13.jpg',
    '/assets/img/landing/img_14.jpg',
    '/assets/img/landing/img_15.jpg',
    '/assets/img/landing/img_16.jpg',
    '/assets/img/landing/img_17.jpg',
    '/assets/img/landing/img_18.jpg',
    '/assets/img/landing/img_19.jpg',
    '/assets/img/landing/img_2.jpg',
    '/assets/img/landing/img_20.jpg',
    '/assets/img/landing/img_21.jpg',
    '/assets/img/landing/img_22.jpg',
    '/assets/img/landing/img_23.jpg',
    '/assets/img/landing/img_24.jpg',
    '/assets/img/landing/img_25.jpg',
    '/assets/img/landing/img_26.jpg',
    '/assets/img/landing/img_27.jpg',
    '/assets/img/landing/img_28.jpg',
    '/assets/img/landing/img_29.jpg',
    '/assets/img/landing/img_29_large.jpg',
    '/assets/img/landing/img_3.jpg',
    '/assets/img/landing/img_30.jpg',
    '/assets/img/landing/img_4.jpg',
    '/assets/img/landing/img_5.jpg',
    '/assets/img/landing/img_6.jpg',
    '/assets/img/landing/img_7.jpg',
    '/assets/img/landing/img_8.jpg',
    '/assets/img/landing/img_9.jpg',
    '/vendor/angular/angular-csp.css',
    '/vendor/angular/angular.js',
    '/vendor/angular/angular.min.js',
    '/vendor/angular/index.js',
    '/vendor/angular-local-storage/.editorconfig',
    '/vendor/angular-local-storage/.gitattributes',
    '/vendor/angular-local-storage/.travis.yml',
    '/vendor/angular-local-storage/index.js',
    '/vendor/angular-local-storage/dist/angular-local-storage.js',
    '/vendor/angular-local-storage/dist/angular-local-storage.min.js',
    '/vendor/angular-permission/dist/angular-permission-ng.js',
    '/vendor/angular-permission/dist/angular-permission-ng.min.js',
    '/vendor/angular-permission/dist/angular-permission-ui.js',
    '/vendor/angular-permission/dist/angular-permission-ui.min.js',
    '/vendor/angular-permission/dist/angular-permission.js',
    '/vendor/angular-permission/dist/angular-permission.min.js',
    '/vendor/angular-route/angular-route.js',
    '/vendor/angular-route/angular-route.min.js',
    '/vendor/angular-route/index.js',
    '/vendor/angular-sanitize/angular-sanitize.js',
    '/vendor/angular-sanitize/angular-sanitize.min.js',
    '/vendor/angular-sanitize/index.js',
    '/vendor/animate.css/animate.css',
    '/vendor/animate.css/animate.min.css',
    '/vendor/bootstrap/dist/css/bootstrap-theme.css',
    '/vendor/bootstrap/dist/css/bootstrap-theme.min.css',
    '/vendor/bootstrap/dist/css/bootstrap.css',
    '/vendor/bootstrap/dist/css/bootstrap.min.css',
    '/vendor/bootstrap/dist/fonts/glyphicons-halflings-regular.eot',
    '/vendor/bootstrap/dist/fonts/glyphicons-halflings-regular.svg',
    '/vendor/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf',
    '/vendor/bootstrap/dist/fonts/glyphicons-halflings-regular.woff',
    '/vendor/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2',
    '/vendor/bootstrap/dist/js/bootstrap.js',
    '/vendor/bootstrap/dist/js/bootstrap.min.js',
    '/vendor/scrollreveal/dist/scrollreveal.min.js',
    '/vendor/choices.js/index.html',
    '/vendor/choices.js/assets/icons/cross-inverse.svg',
    '/vendor/choices.js/assets/icons/cross.svg',
    '/vendor/choices.js/assets/scripts/dist/choices.js',
    '/vendor/choices.js/assets/scripts/dist/choices.min.js',
    '/vendor/choices.js/assets/styles/css/base.css',
    '/vendor/choices.js/assets/styles/css/base.min.css',
    '/vendor/choices.js/assets/styles/css/choices.css',
    '/vendor/choices.js/assets/styles/css/choices.min.css',
    '/vendor/choices.js/assets/styles/scss/base.scss',
    '/vendor/choices.js/assets/styles/scss/choices.scss',
    '/vendor/desandro-matches-selector/matches-selector.js',
    '/vendor/ev-emitter/ev-emitter.js',
    '/vendor/fizzy-ui-utils/utils.js',
    '/vendor/font-awesome/css/font-awesome.css',
    '/vendor/font-awesome/css/font-awesome.min.css',
    '/vendor/font-awesome/fonts/fontawesome-webfont.eot',
    '/vendor/font-awesome/fonts/fontawesome-webfont.svg',
    '/vendor/font-awesome/fonts/fontawesome-webfont.ttf',
    '/vendor/font-awesome/fonts/fontawesome-webfont.woff',
    '/vendor/font-awesome/fonts/fontawesome-webfont.woff2',
    '/vendor/font-awesome/fonts/FontAwesome.otf',
    '/vendor/font-awesome/scss/font-awesome.scss',
    '/vendor/font-awesome/scss/_animated.scss',
    '/vendor/font-awesome/scss/_bordered-pulled.scss',
    '/vendor/font-awesome/scss/_core.scss',
    '/vendor/font-awesome/scss/_fixed-width.scss',
    '/vendor/font-awesome/scss/_icons.scss',
    '/vendor/font-awesome/scss/_larger.scss',
    '/vendor/font-awesome/scss/_list.scss',
    '/vendor/font-awesome/scss/_mixins.scss',
    '/vendor/font-awesome/scss/_path.scss',
    '/vendor/font-awesome/scss/_rotated-flipped.scss',
    '/vendor/font-awesome/scss/_screen-reader.scss',
    '/vendor/font-awesome/scss/_stacked.scss',
    '/vendor/font-awesome/scss/_variables.scss',
    '/vendor/ftscroller/lib/ftscroller.js',
    '/vendor/get-size/get-size.js',
    '/vendor/google-code-prettify/CHANGES.html',
    '/vendor/google-code-prettify/COPYING',
    '/vendor/google-code-prettify/README-zh-Hans.html',
    '/vendor/google-code-prettify/README.html',
    '/vendor/google-code-prettify/bin/prettify.min.css',
    '/vendor/google-code-prettify/bin/prettify.min.js',
    '/vendor/google-code-prettify/bin/run_prettify.min.js',
    '/vendor/google-code-prettify/styles/desert.css',
    '/vendor/google-code-prettify/styles/doxy.css',
    '/vendor/google-code-prettify/styles/index.html',
    '/vendor/google-code-prettify/styles/sons-of-obsidian.css',
    '/vendor/google-code-prettify/styles/sunburst.css',
    '/vendor/highlight/highlight.pack.js',
    '/vendor/highlight/styles/agate.css',
    '/vendor/highlight/styles/androidstudio.css',
    '/vendor/highlight/styles/arduino-light.css',
    '/vendor/highlight/styles/arta.css',
    '/vendor/highlight/styles/ascetic.css',
    '/vendor/highlight/styles/atelier-cave-dark.css',
    '/vendor/highlight/styles/atelier-cave-light.css',
    '/vendor/highlight/styles/atelier-dune-dark.css',
    '/vendor/highlight/styles/atelier-dune-light.css',
    '/vendor/highlight/styles/atelier-estuary-dark.css',
    '/vendor/highlight/styles/atelier-estuary-light.css',
    '/vendor/highlight/styles/atelier-forest-dark.css',
    '/vendor/highlight/styles/atelier-forest-light.css',
    '/vendor/highlight/styles/atelier-heath-dark.css',
    '/vendor/highlight/styles/atelier-heath-light.css',
    '/vendor/highlight/styles/atelier-lakeside-dark.css',
    '/vendor/highlight/styles/atelier-lakeside-light.css',
    '/vendor/highlight/styles/atelier-plateau-dark.css',
    '/vendor/highlight/styles/atelier-plateau-light.css',
    '/vendor/highlight/styles/atelier-savanna-dark.css',
    '/vendor/highlight/styles/atelier-savanna-light.css',
    '/vendor/highlight/styles/atelier-seaside-dark.css',
    '/vendor/highlight/styles/atelier-seaside-light.css',
    '/vendor/highlight/styles/atelier-sulphurpool-dark.css',
    '/vendor/highlight/styles/atelier-sulphurpool-light.css',
    '/vendor/highlight/styles/atom-one-dark.css',
    '/vendor/highlight/styles/atom-one-light.css',
    '/vendor/highlight/styles/brown-paper.css',
    '/vendor/highlight/styles/brown-papersq.png',
    '/vendor/highlight/styles/codepen-embed.css',
    '/vendor/highlight/styles/color-brewer.css',
    '/vendor/highlight/styles/darcula.css',
    '/vendor/highlight/styles/dark.css',
    '/vendor/highlight/styles/darkula.css',
    '/vendor/highlight/styles/default.css',
    '/vendor/highlight/styles/docco.css',
    '/vendor/highlight/styles/dracula.css',
    '/vendor/highlight/styles/far.css',
    '/vendor/highlight/styles/foundation.css',
    '/vendor/highlight/styles/github-gist.css',
    '/vendor/highlight/styles/github.css',
    '/vendor/highlight/styles/googlecode.css',
    '/vendor/highlight/styles/grayscale.css',
    '/vendor/highlight/styles/gruvbox-dark.css',
    '/vendor/highlight/styles/gruvbox-light.css',
    '/vendor/highlight/styles/hopscotch.css',
    '/vendor/highlight/styles/hybrid.css',
    '/vendor/highlight/styles/idea.css',
    '/vendor/highlight/styles/ir-black.css',
    '/vendor/highlight/styles/kimbie.dark.css',
    '/vendor/highlight/styles/kimbie.light.css',
    '/vendor/highlight/styles/magula.css',
    '/vendor/highlight/styles/mono-blue.css',
    '/vendor/highlight/styles/monokai-sublime.css',
    '/vendor/highlight/styles/monokai.css',
    '/vendor/highlight/styles/obsidian.css',
    '/vendor/highlight/styles/ocean.css',
    '/vendor/highlight/styles/paraiso-dark.css',
    '/vendor/highlight/styles/paraiso-light.css',
    '/vendor/highlight/styles/pojoaque.css',
    '/vendor/highlight/styles/pojoaque.jpg',
    '/vendor/highlight/styles/purebasic.css',
    '/vendor/highlight/styles/qtcreator_dark.css',
    '/vendor/highlight/styles/qtcreator_light.css',
    '/vendor/highlight/styles/railscasts.css',
    '/vendor/highlight/styles/rainbow.css',
    '/vendor/highlight/styles/school-book.css',
    '/vendor/highlight/styles/school-book.png',
    '/vendor/highlight/styles/solarized-dark.css',
    '/vendor/highlight/styles/solarized-light.css',
    '/vendor/highlight/styles/sunburst.css',
    '/vendor/highlight/styles/tomorrow-night-blue.css',
    '/vendor/highlight/styles/tomorrow-night-bright.css',
    '/vendor/highlight/styles/tomorrow-night-eighties.css',
    '/vendor/highlight/styles/tomorrow-night.css',
    '/vendor/highlight/styles/tomorrow.css',
    '/vendor/highlight/styles/vs.css',
    '/vendor/highlight/styles/xcode.css',
    '/vendor/highlight/styles/xt256.css',
    '/vendor/highlight/styles/zenburn.css',
    '/vendor/jquery/dist/core.js',
    '/vendor/jquery/dist/jquery.js',
    '/vendor/jquery/dist/jquery.min.js',
    '/vendor/jquery/dist/jquery.slim.js',
    '/vendor/jquery/dist/jquery.slim.min.js',
    '/vendor/jquery/external/sizzle/dist/sizzle.js',
    '/vendor/jquery/external/sizzle/dist/sizzle.min.js',
    '/vendor/masonry/masonry.js',
    '/vendor/masonry/dist/masonry.pkgd.js',
    '/vendor/masonry/dist/masonry.pkgd.min.js',
    '/vendor/ng-file-upload/FileAPI.min.js',
    '/vendor/ng-file-upload/ng-file-upload-all.min.js',
    '/vendor/ng-file-upload/ng-file-upload-shim.js',
    '/vendor/ng-file-upload/ng-file-upload-shim.min.js',
    '/vendor/ng-file-upload/ng-file-upload.min.js',
    '/vendor/ng-file-upload/package.js',
    '/vendor/ngSmoothScroll/dist/angular-smooth-scroll.min.js',
    '/vendor/ngSmoothScroll/lib/angular-smooth-scroll.js',
    '/vendor/notification-js/Gruntfile.js',
    '/vendor/notification-js/build/notification.min.css',
    '/vendor/notification-js/build/notification.min.js',
    '/vendor/outlayer/item.js',
    '/vendor/outlayer/outlayer.js',
    '/vendor/scrollreveal/dist/scrollreveal.js',
    '/vendor/scrollreveal/dist/scrollreveal.min.js',
    '/views/directives.js',
    '/views/index.html',
    '/views/module.js',
    '/views/auth/authFactory.js',
    '/views/auth/module.js',
    '/views/auth/login/login.html',
    '/views/auth/login/loginCtrl.js',
    '/views/auth/register/register.html',
    '/views/auth/register/registerCtrl.js',
    '/views/blogs/blogFactory.js',
    '/views/blogs/blogs.html',
    '/views/blogs/blogsCtrl.js',
    '/views/blogs/module.js',
    '/views/blogs/static_blogs.html',
    '/views/blogs/tagFactory.js',
    '/views/blogs/userFactory.js',
    '/views/blogs/createBlog/createBlog.html',
    '/views/blogs/createBlog/createBlogCtrl.js',
    '/views/blogs/editBlog/editBlog.html',
    '/views/blogs/editBlog/editBlogCtrl.js',
    '/views/blogs/listBlog/listBlog.html',
    '/views/blogs/listBlog/listBlogCtrl.js',
    '/views/blogs/viewBlog/viewBlog.html',
    '/views/blogs/viewBlog/viewBlogCtrl.js',
    '/views/dashboard/dashboardFactory.js',
    '/views/dashboard/module.js',
    '/views/dashboard/profile/profile.html',
    '/views/dashboard/profile/profileCtrl.js',
    '/views/partials/footer.html',
    '/views/partials/navbar.html'
];


self.addEventListener('install', function(event) {
    event.waitUntil(caches.open(CACHE_VERSION).then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(CACHE_FILES);
    }));
});
self.addEventListener('activate', function(event) {
    event.waitUntil(caches.keys().then(function(keys) {
        if (key !== CACHE_VERSION) {
            return caches.delete(keys[i]);
        }
    }))
});
self.addEventListener('fetch', function(event) {
    event.respondWith(caches.match(event.request).then(function(res) {
        if (res) {
            return res;
        }
        requestBackend(event);
    }))
});

function requestBackend(event) {
    var url = event.request.clone();
    return fetch(url).then(function(res) {
        //if not a valid response send the error
        if (!res || res.status !== 200 || res.type !== 'basic') {
            return res;
        }
        var response = res.clone();
        caches.open(CACHE_VERSION).then(function(cache) {
            cache.put(event.request, response);
        });
        return res;
    })
}