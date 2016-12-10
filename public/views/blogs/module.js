angular.module('blogs', [])
    // ['permission', 'permission.ng']
    .constant('blogRoutes', {
        '/blogs/edit/:id': {
            templateUrl: 'views/blogs/editBlog/editBlog.html',
            controller: 'editBlogCtrl',
            requireLogin: true,
            requireAuthor: true
        },
        '/admin/:id': {
            templateUrl: 'views/blogs/editBlog/editBlog.html',
            controller: 'editBlogCtrl',
            requireLogin: true
        }
    }).config(function($routeProvider, blogRoutes) {
        // route for the home page
        for (var path in blogRoutes) {
            $routeProvider.when(path, blogRoutes[path]);
        };
        $routeProvider.when('/blogs/create', {
                templateUrl: 'views/blogs/createBlog/createBlog.html',
                controller: 'createBlogCtrl'
            })
            /*
            .when('/blogs/edit/:id', {
                templateUrl: 'views/blogs/editBlog/editBlog.html',
                controller: 'editBlogCtrl',
                data: {
                    permissions: {
                        only: ['AUTHOR','ADMIN'],
                        redirectTo: '/'
                    }
                }
            })
            */
            .when('/blogs/:id', {
                templateUrl: 'views/blogs/viewBlog/viewBlog.html',
                controller: 'viewBlogCtrl'
            });
    }).run(function($rootScope, $location, SessionService, blogRoutes) {
        $rootScope.$on("$locationChangeStart", function(event, next, current) {
            var location = $location.$$path;
            var blogId = location.substring(location.lastIndexOf('/') + 1);
            console.log("a", blogId);
            for (var i in blogRoutes) {
                var path = i.substring(0, i.lastIndexOf('/'));
                if (next.indexOf(path) != -1) {
                    if (blogRoutes[i].requireLogin && !SessionService.getUserAuthenticated()) {
                        $location.path("/login");
                        // event.preventDefault();
                    } else {
                        if (blogRoutes[i].requireAuthor && !SessionService.getCanEditBlog(blogId)) {
                            $location.path("/");
                        } else {
                            $rootScope.isAuthor = true;
                        }
                    }
                }
            }
        });
    });