angular.module('blogs').controller('listBlogCtrl', function($scope, $rootScope,$sce, $timeout, tagFactory, blogFactory, userFactory, $routeParams) {
    $(document).ready(function() {
        $scope.postsLoaded = false;
        $scope.user = {};
        console.log($routeParams.id);
        tagFactory.getBlogs($routeParams.id).then(function(tag) {
            // console.log("blog",blog);
            var blogs = tag.data.blogs;
            $scope.blogs = [];
            $scope.trustAsHtml = $sce.trustAsHtml;
            for (var i = blogs.length - 1; i >= 0; i--) {
                blogFactory.get(blogs[i]).then(function(blog){
                    $scope.blogs.push(blog.data);
                });
            }
            $rootScope.d(".menu").addEventListener("click", function() {
                document.querySelector(".sidebar").classList.toggle("sm-hide");
            });
            blogFactory.getList("len=3").then(function(recentBlogs) {
                $scope.posts = recentBlogs.data;
                $scope.postsLoaded = true;
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
            $rootScope.d(".mainPage").addEventListener('scroll', function(e) {
                sidebarFix();
            });
        });
        $scope.subscribe = function() {
            blogFactory.subscribe($scope.emailId).then(function(message) {
                console.log(message.data);
            });
        }

        function sidebarFix() {
            var heroheight = $rootScope.d('.hero-banner').clientHeight;
            var scrolled = $rootScope.d(".mainPage").scrollTop;
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
    });
});