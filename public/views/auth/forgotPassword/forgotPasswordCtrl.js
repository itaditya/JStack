angular.module('auth').controller('forgotPasswordCtrl', function ($scope, $location, authFactory, localStorageService, $routeParams, SessionService) {
    $scope.user = {};
    var email = $routeParams.email;
    if (email) {
        $scope.user.email = email;
    }
    $scope.isLoaded = true;
    $scope.isValidating = false;
    $scope.updatePassword = function (form) {
        $scope.isValidating = true;
        if (form.$valid) {
            authFactory.recoverPassword($scope.user).then(function (res) {
                console.log(res.data);
                if (res.data.status === 1) {
                    notification.notify('success', 'Please Check Your Mail');
                } else {
                    notification.notify('error', 'Unable To Recover Password');
                }
                $scope.isValidating = false;
            });
        } else {
            console.log(form.$error);
            $scope.isValidating = false;
            notification.notify('warning', 'Please Fill Both Fields Correctly');
        }
    }
});
