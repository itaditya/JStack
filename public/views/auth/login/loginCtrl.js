angular.module('auth').controller('loginCtrl', function($scope, authFactory, $routeParams) {
  $scope.login = function(form) {
    if (form.$valid) {
      console.log($scope.user);
      authFactory.loginUser($scope.user).success(function(data) {
        console.log(data);
        if(data.status == 1){
          alert("Yeah !");
        }
      });
    }
  }
});
