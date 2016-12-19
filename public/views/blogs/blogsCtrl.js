angular.module('blogs').controller('blogsCtrl', function($scope, $sce, $timeout, $rootScope, blogFactory, $routeParams) {
    blogFactory.getList("limit=9&design=short").then(function(blogs) {
        $scope.featuredBlogs = blogs.data;
        $scope.postsLoaded = true;
        $scope.trustAsHtml = $sce.trustAsHtml;
        window.sr = ScrollReveal({});
        blogFactory.getList("limit=3&design=short&sort=-date").then(function(blogs) {
            $scope.recentBlogs = blogs.data;
            // console.log($rootScope.d(".mainPage"));
            $scope.$watch("$viewContentLoaded", function() {
                console.log('test');
                sr.reveal(document.querySelectorAll('.scrollThis'), {
                    container: ".mainPage",
                    origin: 'top',
                    reset: true,
                    // opacity: 0.3,
                    duration: 1000
                }, 200);
                // sr.sync();
            });
        });
        $scope.isBig = function(index) {
            index = index % 9;
            if (index == 2 || index == 3 || index == 7) {
                return true;
            }
            return false;
        }
    });
});