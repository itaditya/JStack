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
        controller: function($scope, tagFactory, blogFactory, $timeout, tagsService) {
            $scope.subscribe = function() {
                blogFactory.subscribe($scope.emailId).then(function(message) {
                    console.log(message.data);
                });
            }
            var tags = tagsService.getTags();
            var setTags = function(categories) {
                $scope.categories = categories.data;
                tagsService.setTags(categories.data);
            }
            if (tags) {
                setTags({
                    data: tags
                });
            } else {
                tagFactory.getTagList("design=category").then(setTags);
            }
        }
    };
}).directive('tagWidget', function() {
    return {
        replace: true,
        templateUrl: '/views/partials/tagWidget.html',
        controller: function($scope, tagsService) {
            $scope.$on('tagsSet', function() {
                var min = 0,
                    max = 3;
                var rIndex = Math.floor(Math.random() * (max - min + 1)) + min;
                var footerTags = tagsService.getTags();
                $scope.tags = footerTags[rIndex].tags;
            });
        }
    };
}).directive('quizWidget', function() {
    return {
        replace: true,
        templateUrl: '/views/partials/quizWidget.html'
    };
}).directive('commentsWidget', function() {
    return {
        replace: true,
        templateUrl: '/views/partials/commentsWidget.html'
    };
}).directive('adWidget', function() {
    return {
        replace: true,
        templateUrl: '/views/partials/adWidget.html'
    };
}).directive('likeWidget', function() {
    return {
        replace: true,
        templateUrl: '/views/partials/likeWidget.html',
        controller: function($scope, blogFactory, $timeout, $attrs) {
            $scope.userChoice = function() {
                $scope.startFade = true;
                $timeout(function() {
                    $scope.endFade = true;
                }, 2000);
                blogFactory.userChoice($attrs.blogId, $scope.user.choice).then(function(message) {
                    notification.notify('success', 'Thank You');
                });
            }
        }
    };
}).directive('detailWidget', function() {
    return {
        replace: true,
        templateUrl: '/views/partials/detailWidget.html'
    };
}).directive('linkWidget', function() {
    return {
        replace: true,
        templateUrl: '/views/partials/linkWidget.html',
        controller: function($scope, blogFactory) {
            blogFactory.getList("limit=4&design=links").then(function(popularLinks) {
                $scope.popularLinks = popularLinks.data;
            });
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
                    // sidebar.scrollTop = 0;
                } else {
                    sidebar.style.position = 'relative';
                }
            }
            angular.element(document).bind("scroll", function() {
                sidebarFix();
            });
        }
    };
}).directive('scroller', function() {
    return {
        restrict: 'A',
        controller: function($scope, $location, $anchorScroll, $element, $attrs) {
            var scroll = function() {
                var old = $location.hash();
                $location.hash($attrs.scrollTo);
                $anchorScroll();
                $location.hash(old);
            }
            $element.bind("click", function() {
                scroll();
            });
        }
    };
}).directive('modalPane', function() {
    return {
        // scope: {
        //     modalId: "@"
        // },
        restrict: 'A',
        controller: function($scope, $attrs, $element) {
            $element.bind("click", function(a) {
                var condition = $attrs.modalCondition;
                toggleCommentModal();
                console.log(condition);
                // if (condition) {
                //     if (parseInt(condition)) {
                //         toggleCommentModal();
                //     }
                // } else {
                //     console.log('test');
                //     toggleCommentModal();
                // }
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