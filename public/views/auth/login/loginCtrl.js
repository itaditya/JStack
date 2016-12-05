angular.module('auth').controller('loginCtrl', function($scope, authFactory,PermPermissionStore,localStorageService, $routeParams) {
  PermPermissionStore.clearStore();
  localStorageService.clearAll();
  $scope.login = function(form) {
    if (form.$valid) {
      console.log($scope.user);
      authFactory.loginUser($scope.user).success(function(data) {
        console.log(data);
        data.type = "author";
        // authorization.loadDashboard(data);
        if(data.status === 1){
          alert("Yeah !");
        }
      });
    }
  }
});
