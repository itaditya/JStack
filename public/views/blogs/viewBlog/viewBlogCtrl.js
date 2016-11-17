angular.module('blogs').controller('viewBlogCtrl', function($scope, blogFactory, $routeParams) {
    function getUsers() {
        blogFactory.get().success(function(data) {
            $scope.users = data;
        });
    }
    $(document).ready(function() {
        // getUsers();
        console.log($routeParams.id);
    })
});
