angular.module('blogs', [])
    // ['permission', 'permission.ng']
    .constant('blogRoutes', {
        '/blogs/edit/:id': {
            templateUrl: 'views/blogs/editBlog/editBlog.html',
            controller: 'editBlogCtrl',
            requireLogin: true,
            requireAuthor: true
        }
    }).config(function($routeProvider, blogRoutes) {
        // route for the home page
        for (var path in blogRoutes) {
            $routeProvider.when(path, blogRoutes[path]);
        };
        $routeProvider
            .when('/', {
                templateUrl: 'views/blogs/blogs.html',
                controller: 'blogsCtrl'
            })
            .when('/blogs/create', {
                templateUrl: 'views/blogs/createBlog/createBlog.html',
                controller: 'createBlogCtrl'
            })
            .when('/blogs/:id', {
                templateUrl: 'views/blogs/viewBlog/viewBlog.html',
                controller: 'viewBlogCtrl'
            })
            .when('/tagSearch/:id', {
                templateUrl: 'views/blogs/listBlog/listBlog.html',
                controller: 'listBlogCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }).run(function($rootScope, $location, SessionService, blogRoutes) {
        $rootScope.$on("$locationChangeStart", function(event, next, current) {
            var location = $location.$$path;
            var blogId = location.substring(location.lastIndexOf('/') + 1);
            for (var i in blogRoutes) {
                var path = i.substring(0, i.lastIndexOf('/'));
                if (next.indexOf(path) != -1) {
                    if (blogRoutes[i].requireLogin && !SessionService.getUserAuthenticated()) {
                        $location.path("/login");
                        // event.preventDefault();
                    } else {
                        if (blogRoutes[i].requireLogin && blogRoutes[i].requireAuthor && !SessionService.getCanEditBlog(blogId)) {
                            $location.path("/blogs/"+blogId);
                        } else {
                        }
                    }
                }
            }
        });
    });