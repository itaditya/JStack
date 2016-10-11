angular.module('auth').controller('registerCtrl', function($scope, authFactory) {
  $scope.register = function(form) {
    if (form.$valid) {
      authFactory.registerUser($scope.user).success(function(data) {
        console.log(data);
      });
    }
  }
});
