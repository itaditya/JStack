angular.module('auth').controller('registerCtrl', function($scope, authFactory) {
  $(document).ready(function(){
    $scope.isLoaded = true;
    $scope.isValidating = false;
  $scope.register = function(form) {
      $scope.isValidating = true;
    if (form.$valid) {
      authFactory.registerUser($scope.user).success(function(data) {
        console.log(data);
      });
    }
  }
});
});
