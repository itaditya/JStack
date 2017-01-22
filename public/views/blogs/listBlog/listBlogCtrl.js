angular.module('blogs').controller('listBlogCtrl', function($scope, $rootScope, $sce, $timeout, tagFactory, blogFactory, userFactory, $routeParams) {
    $scope.postsLoaded = false;
    $scope.blogsLoaded = 0;
    $scope.user = {};
    tagFactory.getTag($routeParams.id).then(function(tag) {
        var blogs = tag.data.blogs;
        if (blogs.length === 0) {
            $scope.blogsLoaded = -1;
        } else {
            $scope.blogs = [];
            $scope.trustAsHtml = $sce.trustAsHtml;
            for (var i = blogs.length - 1; i >= 0; i--) {
                blogFactory.get(blogs[i]).then(function(blog) {
                    $scope.blogs.push(blog.data);
                    $scope.blogsLoaded += 1;
                });
            }
            blogFactory.getList("limit=3").then(function(recentBlogs) {
                $scope.posts = recentBlogs.data;
                $scope.postsLoaded = true;
            });
        }
    });
});