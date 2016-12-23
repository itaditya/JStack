angular.module('blogs').controller('createBlogCtrl', function($scope, $filter, $rootScope, $interval, $timeout,localStorageService, blogFactory, tagFactory, userFactory, $routeParams) {
    $(document).ready(function() {
        // localStorageService.set("authorId", "57fcdedcea223b1a2c8411cb");
        userFactory.get(localStorageService.get("authorId")).then(function(author) {
            var simplemde = new SimpleMDE({
                element: document.querySelector(".editor"),
                promptURLs: true,
                showIcons: ["code", "table", "strikethrough", "heading-bigger"],
                placeholder: "Type here...",
                renderingConfig: {
                    codeSyntaxHighlighting: true,
                },
                hideIcons: ["fullscreen", "side-by-side"]
            });
            $scope.author = author.data;
            var parent = $rootScope.d('.main');
            $rootScope.d(".menu").addEventListener("click", function() {
                document.querySelector(".sidebar").classList.toggle("sm-hide");
            });
            var blog = localStorageService.get("blog");
            if (blog) {
                $scope.blog = blog;
                $scope.blog.tags = $scope.blog.tags || [];
                simplemde.value($scope.blog.content);
            } else {
                $scope.blog = {
                    coverImg: "hero.jpg",
                    title: "Write Title Here",
                    tags: []
                }
            }
            // console.log($scope.blog.tags);
            const tagSelect = new Choices('.tag-choice', {
                // items: ["ada","svf"],
                removeItems: true,
                removeItemButton: true,
                flip: false,
                placeholderValue: "Select Tags",
                duplicateItems: false
            });
            tagFactory.getTagList("design=tags").then(function(categories) {
                tagSelect.setChoices(categories.data, 'value', 'label', false);
            });
            // var btnList = $rootScope.dd('.btn');
            // for (var i = btnList.length - 1; i >= 0; i--) {
            //     btnList[i].addEventListener("click", function() {
            //         this.classList.add("btn-click");
            //         $timeout(function() {
            //             if ($rootScope.d('.btn-click')) {
            //                 $rootScope.d('.btn-click').classList.remove("btn-click");
            //             }
            //         }, 600);
            //     });
            // }
            $scope.saveBlog = function() {
                $scope.blog.title = $rootScope.d(".blog-title").innerHTML;
                $scope.blog.content = simplemde.value();
                $scope.blog.tags = tagSelect.getValue();
                // localStorageService.set("blog", $scope.blog);
                console.log($scope.blog.coverImage);
            }
            $scope.uploadBlog = function() {
                $scope.blog.tags = tagSelect.getValue(true);
                $scope.blog.title = $rootScope.d(".blog-title").innerHTML;
                $scope.blog.content = simplemde.value();
                $scope.blog.authorId = localStorageService.get("authorId");
                blogFactory.create($scope.blog).then(function(message) {
                    $scope.postid = message.data.id;
                    notification.notify('success', 'Blog Created');
                });
                $timeout(function(){
                    console.log($scope.postid);
                    $scope.postid = undefined;
                },10000);
            }
            $scope.subscribe = function() {
                blogFactory.subscribe($scope.emailId).then(function(message) {
                    console.log(message.data);
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
        });
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