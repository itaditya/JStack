angular.module('blogs').controller('blogsCtrl', function($scope, blogFactory,$routeParams) {
    blogFactory.getList("len=9").success(function(blogs) {
        $scope.blogs = blogs;
        $scope.postsLoaded = true;
        console.log(blogs);
        $scope.isBig = function(index){
            index = index%9;
            if(index == 2 || index == 3 || index == 7){
                return true;
            }
            return false;
        }
    });
});
