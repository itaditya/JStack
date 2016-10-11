angular.module('blogs', []).config(function($routeProvider) {
  // route for the home page
  $routeProvider.when('/blogs/:id', {
    templateUrl: 'views/blogs/viewBlog/viewBlog.html',
    controller: 'viewBlogCtrl'
  })
  .when('/blogs/:id/edit', {
      templateUrl: 'views/blogs/editBlog/editBlog.html',
      controller: 'editBlogCtrl'
    });
});
