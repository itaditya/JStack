angular.module('dashboard', []).constant('dashboardRoutes', {
    '/profile/': {
        templateUrl: '/views/dashboard/profile/profile.html',
        controller: 'profileCtrl',
        requireLogin: true
    },
    '/admin/:id': {
        templateUrl: 'views/blogs/editBlog/editBlog.html',
        controller: 'editBlogCtrl',
        requireLogin: true
    }
}).config(function($routeProvider, dashboardRoutes) {
    for (var path in dashboardRoutes) {
        $routeProvider.when(path, dashboardRoutes[path]);
    };
}).run(function($rootScope, $location, SessionService, dashboardRoutes) {
    $rootScope.$on("$locationChangeStart", function(event, next, current) {
        for (var i in dashboardRoutes) {
            var path = i.substring(0, i.lastIndexOf('/'));
            if (next.indexOf(path) != -1) {
                if (dashboardRoutes[i].requireLogin && !SessionService.getUserAuthenticated()) {
                    $location.path("/login");
                }
            }
        }
    });
});