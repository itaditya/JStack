angular.module('blogs').controller('createBlogCtrl', function($scope, $rootScope, $interval,localStorageService, blogFactory, userFactory, $routeParams) {
    $(document).ready(function() {
        localStorageService.set("authorId", "57fcdedcea223b1a2c8411cb");
        userFactory.get(localStorageService.get("authorId")).success(function(author) {
            var simplemde = new SimpleMDE({
                element: document.querySelector(".editor") ,
                promptURLs: true,
                showIcons: ["code", "table","strikethrough","heading-bigger"],
                placeholder: "Type here...",
                renderingConfig: {
                    codeSyntaxHighlighting: true,
                },
                hideIcons: ["fullscreen","side-by-side"]
            });
            $scope.author = author;
            var parent = $rootScope.d('.main');
            $rootScope.d(".menu").addEventListener("click", function() {
                document.querySelector(".sidebar").classList.toggle("sm-hide");
            });
            $scope.categories = ['Frontend','Design','Backend','Technical'];
            $scope.tags = ['css flexbox','css triangles','cross browser','animations'];
            $scope.selectCategory = function(){
                console.log($scope.category);
            }
            var blog = localStorageService.get("blog");
            if(blog){
                $scope.blog = blog;
                simplemde.value($scope.blog.content);
            }
            else{
                $scope.blog = {
                    coverImg : "hero.jpg",
                    title : "Write Title Here"
                }    
            }
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
            $scope.saveBlog = function(){
                $scope.blog.title = $rootScope.d(".blog-title").innerHTML;
                $scope.blog.content = simplemde.value();
                localStorageService.set("blog",$scope.blog);
                console.log($scope.blog.title);
            }
            // $interval($scope.saveBlog(), 300000);
            $scope.uploadBlog = function(){
                $scope.blog.title = $rootScope.d(".blog-title").innerHTML;
                $scope.blog.content = simplemde.value();
                $scope.blog.authorId = localStorageService.get("authorId");
                blogFactory.create($scope.blog).success(function(message) {
                    $scope.postid = message.id;
                });

            }
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
