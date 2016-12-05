angular.module('blogs',[])
    // ['permission', 'permission.ng']
    .constant('routes',{
            '/blogs/edit/:id': {
                templateUrl: 'views/blogs/editBlog/editBlog.html',
                controller: 'editBlogCtrl',
                requireLogin: true
            },
            '/admin/:id': {
                templateUrl: 'views/blogs/editBlog/editBlog.html',
                controller: 'editBlogCtrl',
                requireLogin: true
            }
    })
    .config(function($routeProvider,routes) {
        // route for the home page
        for(var path in routes) {
            console.log(path,typeof routes);
            $routeProvider.when(path, routes[path]);
        };
        $routeProvider
            .when('/blogs/create', {
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
    })
    .run(function($rootScope,$location,SessionService,routes){

        $rootScope.$on("$locationChangeStart", function(event, next, current) {
            for(var i in routes) {
                var path = i.substring(0, i.lastIndexOf('/'));
                if(next.indexOf(path) != -1) {
                    if(routes[i].requireLogin && !SessionService.getUserAuthenticated()) {
                        alert("You need to be authenticated to see this page!");
                        $location.path( "/login" );
                        // event.preventDefault();
                    }
                }
            }
        });

    });
