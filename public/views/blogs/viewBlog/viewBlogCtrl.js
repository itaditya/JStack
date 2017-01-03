angular.module('blogs').controller('viewBlogCtrl', function($scope, $location, $sce, SessionService, $rootScope, blogFactory, userFactory, $routeParams) {
    $scope.postsLoaded = false;
    $scope.user = {};
    $scope.trustAsHtml = $sce.trustAsHtml;
    $scope.isAuthor = SessionService.getCanEditBlog($routeParams.id);
    console.log("$scope.isAuthor",$scope.isAuthor);
    blogFactory.get($routeParams.id).then(function(blog) {
        $scope.blog = blog.data;
        $rootScope.d('.main').insertAdjacentHTML('beforeend', $scope.blog.content);
        var codeBlocks = $rootScope.dd('.main pre');
        var imgBlocks = $rootScope.dd('.main img');
        for (var i = codeBlocks.length - 1; i >= 0; i--) {
            codeBlocks[i].classList.add("prettyprint");
        }
        for (var i = imgBlocks.length - 1; i >= 0; i--) {
            imgBlocks[i].parentNode.classList.add("support-image");
        }
        prettyPrint();
        $rootScope.d(".menu").addEventListener("click", function() {
            document.querySelector(".sidebar").classList.toggle("sm-hide");
        });
        userFactory.get($scope.blog.authorId).then(function(author) {
            $scope.author = author.data;
        });
        blogFactory.getList("limit=3&sort=-date").then(function(recentBlogs) {
            $scope.topics = $scope.posts;
            $scope.postsLoaded = true;
        });
    });
});