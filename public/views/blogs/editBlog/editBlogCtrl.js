angular.module('blogs').controller('editBlogCtrl', function($scope, $rootScope, blogFactory, $rootScope, userFactory, $routeParams, localStorageService) {
    $(document).ready(function() {
        console.log($rootScope.isAuthor);
        userFactory.get(localStorageService.get("authorId")).success(function(author) {
            var simplemde = new SimpleMDE({
                element: document.querySelector(".editor"),
                promptURLs: true,
                showIcons: ["code", "table"]
            });
            $scope.author = author;
            blogFactory.get($routeParams.id).success(function(blog) {
                $scope.blog = blog;
                simplemde.value($scope.blog.mdString);
                $rootScope.d(".blog-title").innerHTML = $scope.blog.title;
            });
            var parent = $rootScope.d('.main');
            $rootScope.d(".menu").addEventListener("click", function() {
                document.querySelector(".sidebar").classList.toggle("sm-hide");
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
            $scope.saveBlog = function() {
                $scope.blog.title = $rootScope.d(".blog-title").innerHTML;
                $scope.blog.content = simplemde.value();
                $scope.blog.authorId = localStorageService.get("authorId");
                blogFactory.save($routeParams.id, $scope.blog).success(function(message) {
                    $scope.postid = message.id;
                    notification.notify('success', 'Save Successfull');
                });
            }
            $scope.subscribe = function() {
                blogFactory.subscribe($scope.emailId).success(function(message) {
                    notification.notify('success', 'Subscribed Successfully');
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