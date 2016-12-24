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
        controller: function($scope, tagFactory,blogFactory, $timeout,tagsService) {
            $scope.subscribe = function() {
                console.log('test');
                blogFactory.subscribe($scope.emailId).then(function(message) {
                    console.log(message.data);
                });
            }
            $timeout(tagFactory.getTagList("design=category").then(function(categories) {
                $scope.categories = categories.data;
                tagsService.setTags(categories.data);
            }), 0);
        }
    };
}).directive('sideBar', function() {
    return {
        restrict: 'A',
        controller: function($scope, $element, $attrs, $rootScope) {
                function sidebarFix() {
                    var sidebar = $element[0];
                    var sidebarTop = sidebar.getBoundingClientRect().top;
                    var bannerBottom = $rootScope.d(".hero-banner").getBoundingClientRect().bottom;
                    if (sidebarTop <= 0 && bannerBottom <= 0) {
                        sidebar.style.position = 'fixed';
                    } else {
                        sidebar.style.position = 'relative';
                    }
                }
                angular.element(document).bind("scroll", function() {
                    sidebarFix();
                });
            }
    };
}).directive('modalPane', function() {
    return {
        // scope: {
        //     modalId: "@"
        // },
        restrict: 'A',
        controller: function($scope, $attrs,$element) {
            console.log($attrs.modalId);
            $element.bind("click",function(a){
                // console.info(this);
                toggleCommentModal();
            })
            function toggleCommentModal() {
                var comModal = toggler();
                // var that = this;
                var that = $element[0];
                comModal.querySelector(".closeModal").addEventListener('click', function() {
                    that.click();
                });
                // comModal.addEventListener('blur', function() {
                //     that.click();
                // });
                function escKeyQuit(event) {
                    var evt = event || window.event;
                    if (evt.keyCode == 27) {
                        evt.preventDefault();
                        that.click();
                    }
                }
                document.addEventListener('keydown', escKeyQuit);
            }

            function toggler(elem) {
                var comModal = $attrs.modalId;
                comModal = document.getElementById(comModal);
                setTimeout(function() {
                    comModal.focus();
                }, 0);
                if (comModal.style.display == 'block') {
                    comModal.style.display = 'none';
                } else {
                    comModal.style.display = 'block';
                    comModal.classList.add('animated');
                    comModal.classList.add('fadeIn');
                }
                return comModal;
            }
            // $rootScope.d("#" + $attrs.active).classList.add("active");
        }
    };
});