angular.module('blogs').controller('blogsCtrl', function($scope, $sce, $timeout, $rootScope, blogFactory, $routeParams, userFactory) {
    blogFactory.getList("limit=9&design=short").then(function(blogs) {
        $scope.featuredBlogs = blogs.data;
        $scope.postsLoaded = true;
        $scope.trustAsHtml = $sce.trustAsHtml;
        window.sr = ScrollReveal({});
        $scope.$watch("$viewContentLoaded", function() {
            console.log('test1');
            // sr.sync();
            sr.reveal($rootScope.dd('.animateFeaturedBlogs'), {
                // container: ".mainPage",
                viewFactor: 0.6,
                easing: 'ease-in-out',
                // opacity: 0.3,
                duration: 1000
            });
        });
        blogFactory.getList("limit=3&design=short&sort=-date").then(function(blogs) {
            $scope.recentBlogs = blogs.data;
            $scope.$watch("$viewContentLoaded", function() {
                sr.reveal($rootScope.dd('.animateRecentBlogs'), {
                    // container: ".mainPage",
                    // reset: true,
                    duration: 800
                }, 150);
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