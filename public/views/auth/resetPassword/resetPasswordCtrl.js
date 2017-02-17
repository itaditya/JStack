angular.module('auth').controller('resetPasswordCtrl', function ($scope, $location, authFactory, localStorageService, $routeParams, SessionService) {
    $scope.user = angular.copy($routeParams);
    if (Object.keys($scope.user).length === 2) {
        console.log($scope.user);
        $scope.isLoaded = true;
        $scope.isValidating = false;
        $scope.resetPassword = function (form) {
            $scope.isValidating = true;
            if (form.$valid) {
                authFactory.changePassword($scope.user).then(function (res) {
                    console.log(res.data);
                    if (res.data.status === 1) {
                        notification.notify('success', 'Password is Changed');
                    } else {
                        notification.notify('error', 'Unable To Reset Password');
                    }
                    $scope.isValidating = false;
                });
            } else {
                console.log(form.$error);
                $scope.isValidating = false;
                notification.notify('warning', 'Please Fill Both Fields Correctly');
            }
        }
    }
});
