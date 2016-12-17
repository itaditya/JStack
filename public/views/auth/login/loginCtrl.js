angular.module('auth').controller('loginCtrl', function($scope, $location, authFactory, localStorageService, $routeParams, SessionService) {
    SessionService.setUserAuthenticated(false);
    $(document).ready(function() {
        // console.log(notification.getProfile('global'));
        $scope.isLoaded = true;
        $scope.isValidating = false;
        $scope.login = function(form) {
            $scope.isValidating = true;
            if (form.$valid) {
                console.log($scope.user);
                authFactory.loginUser($scope.user).then(function(data) {
                    // data = data.data;
                    console.log(data.data);
                    data.data.type = "author";
                    // authorization.loadDashboard(data.data);
                    if (data.data.status === "1") {
                        notification.notify('success', 'Login Successfull');
                        localStorageService.set("authorId", data.data.id);
                        localStorageService.cookie.set("editBlogs", data.data.blogs);
                        SessionService.setUserAuthenticated(true);
                        $location.path("/profile");
                    } else {
                        notification.notify('error', 'Incorrect Username or Password');
                    }
                });
            } else {
                notification.notify('warning', 'Please Fill Both Fields');
            }
        }
    });
});