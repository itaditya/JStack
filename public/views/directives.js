angular.module('JStack').directive('preLoader', function() {
    return {
        restrict: 'E',
        replace: 'true',
        template: '<div class="preloaderPage bg-dk-purple"><div class="preloader-box"><img class="preloader" src="/assets/img/preloaderLg.svg" alt=""></div></div>'
    }
}).directive('navBar', function() {
    return {
        scope: {
            active: "@"
        },
        restrict: 'E',
        replace: 'true',
        templateUrl: '/views/partials/navbar.html',
        controller: function($scope, $rootScope, $attrs) {
            $rootScope.d("#" + $attrs.active).classList.add("active");
        }
    };
}).directive('navLink', function() {
    return {
        scope: {
            showifuser: "@",
            hideifuser: "@",
            text: "@"
        },
        replace: true,
        template: '<a ng-show="show">{{text}}</a>',
        controller: function($scope, $attrs, SessionService) {
            $scope.userIsAuthenticated = SessionService.getUserAuthenticated();
            if (typeof $attrs.showifuser == "string") {
                $scope.show = $scope.userIsAuthenticated;
            }
            if (typeof $attrs.hideifuser == "string") {
                $scope.show = !$scope.userIsAuthenticated;
            }
        }
    };
}).directive('footerBar', function() {
    return {
        replace: true,
        templateUrl: '/views/partials/footer.html',
        controller: function($scope, tagFactory,$timeout) {
            $timeout(tagFactory.getTagList("design=category").then(function(categories) {
                $scope.categories = categories.data;
                console.log(categories.data);
            }), 0);
        }
    };
});