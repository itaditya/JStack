angular.module('blogs').controller('viewBlogCtrl', function($scope, $sce,$location, $rootScope,$anchorScroll , $timeout, blogFactory, userFactory, $routeParams) {
    $(document).ready(function() {
        $scope.postsLoaded = false;
        $scope.user = {};
        $scope.tags = [{
            id: 12,
            name: "frontend"
        }, {
            id: 12,
            name: "frontend"
        }, {
            id: 12,
            name: "frontend"
        }, {
            id: 12,
            name: "frontend"
        }, {
            id: 2,
            name: "backend"
        }];
        console.log($routeParams.id);
        $scope.scrollTo = function(id) {
          var old = $location.hash();
          $location.hash(id);
          $anchorScroll();
          //reset to old to keep any additional routing logic from kicking in
          $location.hash(old);
        };
        $scope.trustAsHtml = $sce.trustAsHtml;
        blogFactory.get($routeParams.id).then(function(blog) {
            // console.log("blog",blog);
            $scope.blog = blog.data;
            $rootScope.d('.main').insertAdjacentHTML('beforeend', $scope.blog.content);
            var codeBlocks = $rootScope.dd('.main pre');
            var imgBlocks = $rootScope.dd('.main img');
            for (var i = codeBlocks.length - 1; i >= 0; i--) {
                codeBlocks[i].classList.add("prettyprint");
            }
            for (var i = imgBlocks.length - 1; i >= 0; i--) {
                imgBlocks[i].parentNode.classList.add("support-image");
            }
            prettyPrint();
            $rootScope.d(".menu").addEventListener("click", function() {
                document.querySelector(".sidebar").classList.toggle("sm-hide");
            });
            userFactory.get($scope.blog.authorId).then(function(author) {
                $scope.author = author.data;
            });
            blogFactory.getList("limit=3&sort=-date").then(function(recentBlogs) {
                $scope.posts = recentBlogs.data;
                $scope.postsLoaded = true;
                console.log(recentBlogs);
            });
            var btnList = $rootScope.dd('.btn');
            for (var i = btnList.length - 1; i >= 0; i--) {
                btnList[i].addEventListener("click", function() {
                    this.classList.add("btn-click");
                    setTimeout(function() {
                        if ($rootScope.d('.btn-click')) {
                            $rootScope.d('.btn-click').classList.remove("btn-click");
                        }
                    }, 600);
                });
            }
            var modalBtn = $rootScope.dd('.modalBtn');
            for (var i = modalBtn.length - 1; i >= 0; i--) {
                modalBtn[i].addEventListener('click', toggleCommentModal);
            };
            // $rootScope.d(".mainPage").addEventListener('scroll', function(e) {
            //     sidebarFix();
            // });
            document.addEventListener('scroll', function(e) {
                sidebarFix();
                console.log('test');
            });
            $scope.userChoice = function() {
                console.log($scope.user.choice);
                $scope.startFade = true;
                $timeout(function() {
                    $scope.endFade = true;
                }, 2000);
                blogFactory.userChoice($routeParams.id, $scope.user.choice).then(function(message) {
                    notification.notify('success', 'Thank You');
                });
            }
        });
        $scope.subscribe = function() {
            blogFactory.subscribe($scope.emailId).then(function(message) {
                console.log(message.data);
            });
        }

        function sidebarFix() {
            var heroheight = $rootScope.d('.hero-banner').clientHeight;
            // var scrolled = $rootScope.d(".mainPage").scrollTop;
            var scrolled = $rootScope.d("body").scrollTop;
            // console.log();
            var sidebar = $rootScope.d('.sidebar');
            if (scrolled >= heroheight) {
                sidebar.style.position = 'fixed';
            } else {
                sidebar.style.position = 'relative';
            }
        }
        // ----------------
        // Modal toggling ------------------
        function toggleCommentModal() {
            var comModal = toggler(this);
            var that = this;
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
            var comModal = elem.dataset.toggleId;
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
        // Logic
        // Target all .modalBtn and attach click event
        // toggleCommentModal fnction is to instrct toggler fn to toggle what.
        // toggler returns the close btn element of the crrently opened modal only.
        // that holds the reference to the respective .modalBtn only .
        // Now on clicking the .modalBtn again that modal will be toggled .
        /* _____________ */
    });
});