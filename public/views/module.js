angular.module('JStack', ['ngRoute', 'auth', 'blogs', 'dashboard', 'LocalStorageModule','ngFileUpload']).config(function(localStorageServiceProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    localStorageServiceProvider.setPrefix('JStack').setStorageType('localStorage');
    notification.configProfile('global', {
        notification: {
            position: ['right', 'top'],
            autoHide: 1
        }
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
    this.getCanEditBlog = function(blogId) {
        var blogs = localStorageService.cookie.get("editBlogs");
        if (blogs && blogs.indexOf(blogId) != -1) {
            return true;
        }
        return false;
    };
}).run(function($rootScope,$route, $templateCache, $http) {
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
});