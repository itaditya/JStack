angular.module('auth').controller('loginCtrl', function($scope,$location, authFactory,localStorageService, $routeParams,SessionService) {
  SessionService.setUserAuthenticated(false);
  $(document).ready(function(){
    $scope.isLoaded = true;
    $scope.isValidating = false;
    $scope.login = function(form) {
      $scope.isValidating = true;
      if (form.$valid) {
        console.log($scope.user);
        authFactory.loginUser($scope.user).success(function(data) {
          console.log(data);
          data.type = "author";
          // authorization.loadDashboard(data);
          if(data.status === "1"){
            SessionService.setUserAuthenticated(true);
            $location.path("/profile");
          }
        });
      }
    }
  });
});
