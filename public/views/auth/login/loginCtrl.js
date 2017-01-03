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
        console.log(form);
        if (form.$valid) {
            /*
            console.log($scope.user);
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
            */
        } else {
            console.log(form.$error);
            var reqError = form.$error.required;
            console.log(form.Password.$error.minlength);
            for (var i = reqError.length - 1; i >= 0; i--) {
                notification.notify('error', 'Please Enter a ' + reqError[i].$name);
            }
            // for (var i = reqError.length - 1; i >= 0; i--) {
            //     notification.notify('error', 'This ' + reqError[i].$name + ' Is Incorrect');
            // }
            // notification.notify('warning', 'Please Fill Both Fields');
        }
    }
});