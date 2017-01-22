angular.module('JStack', ['ngRoute', 'auth', 'blogs', 'dashboard', 'LocalStorageModule', 'ngFileUpload']).config(function(localStorageServiceProvider, $locationProvider, $httpProvider) {
    $locationProvider.html5Mode(true);
    localStorageServiceProvider.setPrefix('JStack').setStorageType('localStorage');
    notification.configProfile('global', {
        notification: {
            position: ['right', 'top'],
            autoHide: 1
        }
    });
    $httpProvider.interceptors.push(function($q, $location, localStorageService) {
        var token = localStorageService.cookie.get("authToken");
        console.log(token);
        return {
            'request': function(config) {
                config.headers = config.headers || {};
                if (token) {
                    config.headers.authorization = 'Bearer ' + token;
                }
                return config;
            },
            'responseError': function(response) {
                if (response.status === 401 || response.status === 403) {
                    // $location.path('/login');
                }
                return $q.reject(response);
            }
        };
    });
}).service('SessionService', function(localStorageService) {
    // var userType;
    this.setUserAuthenticated = function(value, allowEdit) {
        localStorageService.cookie.set("userIsAuthenticated", value);
    };
    this.getUserAuthenticated = function() {
        return localStorageService.cookie.get("userIsAuthenticated");
    };
    this.setUserType = function(value) {
        localStorageService.cookie.set("userType", value);
    };
    this.getUserType = function() {
        return localStorageService.cookie.get("userType");
    };
    this.setEditableBlog = function(blogs) {
        localStorageService.cookie.set("editBlogs", blogs);
    };
    this.getEditableBlog = function() {
        return localStorageService.cookie.get("editBlogs");
    };
    this.getCanEditBlog = function(blogId) {
        var blogs = localStorageService.cookie.get("editBlogs");
        if (blogs && blogs.indexOf(blogId) != -1) {
            return true;
        }
        return false;
    };
}).run(function($rootScope, $route, $templateCache, $http) {
    // $templateCache.removeAll()
    $rootScope.d = function(elem) {
        elem = document.querySelector(elem);
        return (elem || document.querySelector(".null"));
    }
    $rootScope.dd = function(elem) {
        return document.querySelectorAll(elem);
    }
    $rootScope.debounce = function(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this,
                args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    if (navigator.serviceWorker) {
        console.log('Yeah serviceWorker');
        // navigator.serviceWorker.register('./service-worker.js', {scope: './'})
        //     .then(function (registration) {
        //         console.log(registration);
        //     })
        //     .catch(function (e) {
        //         console.error(e);
        //     })
    } else {
        console.log('Service Worker is not supported in this browser.')
    }
});