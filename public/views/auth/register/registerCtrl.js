angular.module('auth').controller('registerCtrl', function ($scope, $location, authFactory, $timeout) {
    $scope.isLoaded = true;
    $scope.isValidating = false;
    $scope.user = {};
    $scope.register = function (form) {
        $scope.isValidating = true;
        if (form.$valid) {
            authFactory.registerUser($scope.user).then(function (res) {
                console.log(res.data);
                if (res.data.status === 1) {
                    authFactory.validateUser(res.data.id).then(function () {
                        $scope.isValidating = false;
                        notification.notify('success', 'Register Successfully');
                        $location.path("/login");
                    });
                } else {
                    notification.notify('error', res.data.message);
                    if (res.data.status === -1) {
                        $timeout(function () {
                            $location.path("/login").search({
                                email: $scope.user.email
                            });
                        }, 3000);
                    }
                }
            });
        } else {
            console.log(form.$error);
            $scope.isValidating = false;
            notification.notify('warning', 'Please Fill All Fields Correctly');
        }
    }
});
