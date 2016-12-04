angular.module('blogs', [])
    // ['permission', 'permission.ng']
    .config(function($routeProvider) {
        // route for the home page
        $routeProvider
            .when('/blogs/create', {
                templateUrl: 'views/blogs/createBlog/createBlog.html',
                controller: 'createBlogCtrl'
            })
            .when('/blogs/edit/:id', {
                templateUrl: 'views/blogs/editBlog/editBlog.html',
                controller: 'editBlogCtrl',
                // data: {
                //     permissions: {
                //         only: ['AUTHOR','ADMIN'],
                //         redirectTo: '/'
                //     }
                // }
            })
            .when('/blogs/:id', {
                templateUrl: 'views/blogs/viewBlog/viewBlog.html',
                controller: 'viewBlogCtrl'
            });
    })
    .run(function($rootScope) {
        $rootScope.d = function(elem) {
            return document.querySelector(elem);
        }
        $rootScope.dd = function(elem) {
            return document.querySelectorAll(elem);
        }
    });
// .run(function(PermRoleStore, PermPermissionStore) {
//     PermRoleStore
//         .defineRole('AUTHOR', ['editBlog']);
//         .defineRole('ADMIN', ['seeDashboard'],['editBlog']);
//     PermPermissionStore
//         .definePermission('seeDashboard', function() {
//             return false;
//         })
//         .definePermission('editBlog', function() {
//             return false;
//         });
// });
