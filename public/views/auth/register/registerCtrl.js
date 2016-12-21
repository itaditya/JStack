angular.module('auth').controller('registerCtrl', function($scope,$location, authFactory) {
    $(document).ready(function() {
        $scope.isLoaded = true;
        $scope.isValidating = false;
        $scope.register = function(form) {
            $scope.isValidating = true;
            if (form.$valid) {
                authFactory.registerUser($scope.user).then(function(data) {
                    // console.log(data);
                    notification.notify('success', 'Register Successfully');
                    $location.path("/login");
                });
            }
        }
    });
});