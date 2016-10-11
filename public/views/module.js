angular.module('JStack', ['ngRoute', 'auth', 'blogs']).config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/blogs/blogs.html',
            controller: 'blogsCtrl'
        })
        .when('/login', {
            templateUrl: 'views/auth/login/login.html',
            controller: 'loginCtrl'
        })
        .when('/register', {
            templateUrl: 'views/auth/register/register.html',
            controller: 'registerCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});
