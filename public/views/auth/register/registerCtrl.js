angular.module('auth').controller('registerCtrl', function($scope, $location, authFactory) {
    $(document).ready(function() {
        $scope.isLoaded = true;
        $scope.isValidating = false;
        $scope.register = function(form) {
            $scope.isValidating = true;
            if (form.$valid) {
                authFactory.registerUser($scope.user).then(function(data) {
                    notification.notify('success', 'Register Successfully');
                    $location.path("/login");
                });
            } else {
                console.log(form.$error);
                $scope.isValidating = false;
                notification.notify('warning', 'Please Fill All Fields Correctly');
            }
        }
    });
});