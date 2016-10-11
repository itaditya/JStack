angular.module('blogs').controller('blogsCtrl', function($scope, blogFactory,$routeParams) {
  function getUsers() {
    blogFactory.get().success(function(data) {
      $scope.users = data;
    });
  }
  $(document).ready(function() {
    // getUsers();
  })
});
