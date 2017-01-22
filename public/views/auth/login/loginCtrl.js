angular.module('auth').controller('loginCtrl', function($scope, $location, authFactory, localStorageService, $routeParams, SessionService) {
    if (SessionService.getUserAuthenticated()) {
        notification.notify('info', 'You Are Logged Out');
    }
    $scope.user = {};
    var email = $routeParams.email;
    if (email) {
        $scope.user.email = email;
    }
    SessionService.setUserAuthenticated(false);
    localStorageService.clearAll();
    $scope.isLoaded = true;
    $scope.isValidating = false;
    $scope.login = function(form) {
        $scope.isValidating = true;
        if (form.$valid) {
            authFactory.loginUser($scope.user).then(function(res) {
                console.log(res.data);
                if (res.data.status === 1) {
                    notification.notify('success', 'Login Successfull');
                    localStorageService.cookie.set("authorId", res.data.id);
                    localStorageService.cookie.set("authToken", res.data.token);
                    SessionService.setEditableBlog(res.data.blogs);
                    SessionService.setUserAuthenticated(true);
                    SessionService.setUserType(res.data.role);
                    $location.path("/profile");
                } else {
                    notification.notify('error', 'Incorrect Email or Password');
                    $scope.isValidating = false;
                }
            });
        } else {
            console.log(form.$error);
            $scope.isValidating = false;
            notification.notify('warning', 'Please Fill Both Fields Correctly');
        }
    }
});