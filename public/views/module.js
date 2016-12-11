angular.module('JStack', ['ngRoute', 'auth', 'blogs','dashboard','LocalStorageModule'])
.config(function(localStorageServiceProvider,$locationProvider) {
    $locationProvider.html5Mode(true);
    localStorageServiceProvider
    .setPrefix('JStack')
    .setStorageType('localStorage');
})
.service('SessionService', function(localStorageService){

    this.setUserAuthenticated = function(value,allowEdit){
        localStorageService.set("userIsAuthenticated",value);
    };

    this.getUserAuthenticated = function(){
        return localStorageService.get("userIsAuthenticated");
    };

    this.getCanEditBlog = function(blogId){
        var blogs = localStorageService.cookie.get("editBlogs");
        if(blogs && blogs.indexOf(blogId) != -1){
            return true;
        }
        return false;
    };
})
.directive('preLoader', function() {
  return {
    restrict: 'E',
    template: '<div class="page bg-dk-purple"><div class="preloader-box"><img class="preloader" src="/assets/img/preloaderLg.svg" alt=""></div></div>'
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
    notification.configProfile( 'global', {
        notification: {
            position: [ 'right', 'top' ]
        }
    });
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