angular.module('JStack', ['ngRoute', 'auth', 'blogs','LocalStorageModule'])
.config(function($routeProvider,localStorageServiceProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'views/blogs/blogs.html',
        controller: 'blogsCtrl'
    })
    .when('/login', {
        templateUrl: 'views/auth/login/login.html',
        controller: 'loginCtrl',
    })
    .when('/register', {
        templateUrl: 'views/auth/register/register.html',
        controller: 'registerCtrl'
    })
    .otherwise({
        redirectTo: '/'
    });
    localStorageServiceProvider
    .setPrefix('JStack')
    .setStorageType('sessionStorage');
})
.service('SessionService', function(){
    var userIsAuthenticated = false;

    this.setUserAuthenticated = function(value){
        userIsAuthenticated = value;
    };

    this.getUserAuthenticated = function(){
        return userIsAuthenticated;
    };
})
.run(function($rootScope,localStorageService) {
    // ,PermRoleStore, PermPermissionStore
    $rootScope.d = function(elem) {
        elem = document.querySelector(elem);
        return (elem || document.querySelector(".null"));
    }
    $rootScope.dd = function(elem) {
        return document.querySelectorAll(elem);
    }
    /*
    PermRoleStore.defineManyRoles({
        'AUTHOR' : ['editBlog'],
        'ADMIN' : ['seeDashboard','editBlog']
    });
    PermPermissionStore.definePermission('seeDashboard', function() {
        // return authorization.hasPermission();
        return false;
    })
    PermPermissionStore.definePermission('editBlog', function() {
        return true;
    });
    */
});