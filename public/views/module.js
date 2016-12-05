angular.module('JStack', ['ngRoute', 'auth', 'blogs','dashboard','LocalStorageModule'])
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
    // .setStorageType('cookie');
    .setStorageType('sessionStorage');
})
.service('SessionService', function(localStorageService){
    // localStorageService.set("userIsAuthenticated",false);

    this.setUserAuthenticated = function(value){
        localStorageService.set("userIsAuthenticated",value);
        // userIsAuthenticated = value;
    };

    this.getUserAuthenticated = function(){
        return localStorageService.get("userIsAuthenticated");
    };
})
.directive('preLoader', function() {
  return {
    restrict: 'E',
    template: '<div class="page bg-dk-purple" ng-hide="author"><div class="preloader-box"><img class="preloader" src="/assets/img/preloaderLg.svg" alt=""></div></div>'
  }
})
.run(function($rootScope) {
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