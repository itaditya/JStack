angular.module('auth', []).config(function($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'views/auth/login/login.html',
        controller: 'loginCtrl',
    }).when('/register', {
        templateUrl: 'views/auth/register/register.html',
        controller: 'registerCtrl'
    }).when('/forgotPassword', {
        templateUrl: 'views/auth/forgotPassword/forgotPassword.html',
        controller: 'forgotPasswordCtrl'
    }).when('/logout', {
        template: '<pre-loader></pre-loader>',
        controller: 'logoutCtrl'
    })
}).controller('logoutCtrl', function(SessionService, localStorageService, $location) {
    if (SessionService.getUserAuthenticated()) {
        SessionService.setUserAuthenticated(false);
        localStorageService.clearAll()
        localStorageService.cookie.clearAll()
        notification.notify('success', 'Logout Successfull');
    }
    $location.path("/");
})