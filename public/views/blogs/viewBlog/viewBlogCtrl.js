angular.module('blogs').controller('viewBlogCtrl', function($scope, $rootScope, blogFactory, userFactory, $routeParams) {
    $(document).ready(function() {
        $scope.postsLoaded = false;
        console.log($routeParams.id);
        blogFactory.get($routeParams.id).success(function(blog) {
            console.log(blog);
            $scope.blog = blog;
            $rootScope.d('.main').insertAdjacentHTML('beforeend', $scope.blog.content);
            $rootScope.d('.main pre').classList.add("prettyprint");
            $rootScope.d('.main img').parentNode.classList.add("support-image");
            $rootScope.d(".menu").addEventListener("click", function() {
                document.querySelector(".sidebar").classList.toggle("sm-hide");
            });
            userFactory.get($scope.blog.authorId).success(function(author) {
                $scope.author = author;
            });
            blogFactory.recent().success(function(recentBlogs) {
                $scope.posts = recentBlogs;
                $scope.postsLoaded = true;
                console.log(recentBlogs);
            });

            var btnList = $rootScope.dd('.btn');
            for (var i = btnList.length - 1; i >= 0; i--) {
                btnList[i].addEventListener("click", function() {
                    this.classList.add("btn-click");
                    setTimeout(function() {
                        if($rootScope.d('.btn-click')){
                            $rootScope.d('.btn-click').classList.remove("btn-click");}
                    }, 600);
                });
            }
            var modalBtn = $rootScope.dd('.modalBtn');
            for (var i = modalBtn.length - 1; i >= 0; i--) {
                modalBtn[i].addEventListener('click', toggleCommentModal);
            };
        });
        $scope.subscribe = function(){
            blogFactory.subscribe($scope.emailId).success(function(message) {
                console.log(message);
            });
        }
        $rootScope.d(".page").addEventListener('scroll', function(e) {
            sidebarFix(e);
        }, false);

        function sidebarFix(e) {
            var heroheight = $rootScope.d('.hero-banner').clientHeight;
            var scrolled = $rootScope.d(".page").scrollTop;
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
            setTimeout(function(){
                comModal.focus();
            },0);

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
/*
authorId
date
title
content
tags
likes
*/
