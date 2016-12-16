angular.module('blogs').controller('createBlogCtrl', function($scope,$filter, $rootScope, $interval, localStorageService, blogFactory, tagFactory, userFactory, $routeParams) {
    $(document).ready(function() {
        localStorageService.set("authorId", "57fcdedcea223b1a2c8411cb");
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
            $scope.cats = ['frontend', 'design', 'backend', 'technical'];
            // $scope.tags = ['css flexbox', 'css triangles', 'cross browser', 'animations'];
            $scope.selectCategory = function() {
                var category = $scope.category;
                console.log(category);
                if (typeof category === "string") {
                    var query = "design=category" + "&category=" + category;
                    console.log(query);
                    tagFactory.getTagList(query).then(function(categories) {
                        $scope.tags = categories.data;
                        // console.log($scope.tags);
                    })
                }
            }
            $scope.selectTag = function(tag) {
                console.log(tag);
                // tag.checked = true;
                tag.checked = !tag.checked;
            }
            var blog = localStorageService.get("blog");
            if (blog) {
                $scope.blog = blog;
                simplemde.value($scope.blog.content);
            } else {
                $scope.blog = {
                    coverImg: "hero.jpg",
                    title: "Write Title Here"
                }
            }
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
            $scope.saveBlog = function() {
                    $scope.blog.title = $rootScope.d(".blog-title").innerHTML;
                    $scope.blog.content = simplemde.value();
                    // localStorageService.set("blog", $scope.blog);
                    var applytags = $filter("filter")($scope.tags,{checked:true});
                    console.log(applytags);
                    // console.log($scope.blog.title);
                }
                // $interval($scope.saveBlog(), 300000);
            $scope.uploadBlog = function() {
                // = $filter("filter")($scope.tags,{checked:true});
                var tags = [];
                for (var i = $scope.tags.length - 1; i >= 0; i--) {
                    if($scope.tags[i].checked){
                        tags.push($scope.tags[i].id);
                    }
                }
                // console.log(tags);
                $scope.blog.tags = tags;
                $scope.blog.category = $scope.category;
                $scope.blog.title = $rootScope.d(".blog-title").innerHTML;
                $scope.blog.content = simplemde.value();
                $scope.blog.authorId = localStorageService.get("authorId");
                blogFactory.create($scope.blog).then(function(message) {
                    $scope.postid = message.data.id;
                    notification.notify('success', 'Blog Created');
                });
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