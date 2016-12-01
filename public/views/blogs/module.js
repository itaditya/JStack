angular.module('blogs', [])
    // ['permission', 'permission.ng']
    .config(function($routeProvider) {
        // route for the home page
        $routeProvider.when('/blogs/:id', {
                templateUrl: 'views/blogs/viewBlog/viewBlog.html',
                controller: 'viewBlogCtrl'
            })
            .when('/blogs/:id/edit', {
                templateUrl: 'views/blogs/editBlog/editBlog.html',
                controller: 'editBlogCtrl',
                // data: {
                //     permissions: {
                //         only: ['AUTHOR','ADMIN'],
                //         redirectTo: '/'
                //     }
                // }
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
