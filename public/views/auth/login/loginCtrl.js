angular.module('auth').controller('loginCtrl', function($scope, $location, authFactory, localStorageService, $routeParams, SessionService) {
    if (SessionService.getUserAuthenticated()) {
        notification.notify('info', 'You Are Logged Out');
    }
    SessionService.setUserAuthenticated(false);
    localStorageService.clearAll();
    $scope.isLoaded = true;
    $scope.isValidating = false;
    $scope.login = function(form) {
        $scope.isValidating = true;
        if (form.$valid) {
            authFactory.loginUser($scope.user).then(function(data) {
                console.log(data.data);
                if (data.data.status === "1") {
                    notification.notify('success', 'Login Successfull');
                    localStorageService.cookie.set("authorId", data.data.id);
                    SessionService.setEditableBlog(data.data.blogs);
                    SessionService.setUserAuthenticated(true);
                    SessionService.setUserType(data.data.role);
                    $location.path("/profile");
                } else {
                    notification.notify('error', 'Incorrect Username or Password');
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