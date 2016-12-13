angular.module('JStack', ['ngRoute', 'auth', 'blogs', 'dashboard', 'LocalStorageModule','smoothScroll']).config(function(localStorageServiceProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    localStorageServiceProvider.setPrefix('JStack').setStorageType('localStorage');
}).service('SessionService', function(localStorageService) {
    this.setUserAuthenticated = function(value, allowEdit) {
        localStorageService.set("userIsAuthenticated", value);
    };
    this.getUserAuthenticated = function() {
        return localStorageService.get("userIsAuthenticated");
    };
    this.getCanEditBlog = function(blogId) {
        var blogs = localStorageService.cookie.get("editBlogs");
        if (blogs && blogs.indexOf(blogId) != -1) {
            return true;
        }
        return false;
    };
}).run(function($rootScope) {
    $rootScope.d = function(elem) {
        elem = document.querySelector(elem);
        return (elem || document.querySelector(".null"));
    }
    $rootScope.dd = function(elem) {
        return document.querySelectorAll(elem);
    }
    notification.configProfile('global', {
        notification: {
            position: ['right', 'top']
        }
    });
});