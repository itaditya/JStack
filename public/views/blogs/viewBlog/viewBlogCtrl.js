angular.module('blogs').controller('viewBlogCtrl', function($scope, $sce, $location,SessionService, $rootScope, $anchorScroll, $timeout, blogFactory, tagsService, userFactory, $routeParams) {
    $(document).ready(function() {
        $scope.postsLoaded = false;
        $scope.user = {};
        $scope.scrollTo = function(id) {
            var old = $location.hash();
            $location.hash(id);
            $anchorScroll();
            //reset to old to keep any additional routing logic from kicking in
            $location.hash(old);
        };
        $scope.trustAsHtml = $sce.trustAsHtml;
        $scope.isAuthor = SessionService.getCanEditBlog($routeParams.id);
        blogFactory.get($routeParams.id).then(function(blog) {
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
            blogFactory.getList("limit=4&design=links").then(function(popularLinks) {
                $scope.popularLinks = popularLinks.data;
            });
            blogFactory.getList("limit=3&sort=-date").then(function(recentBlogs) {
                $scope.topics = $scope.posts;
                $scope.postsLoaded = true;
            });
            // $rootScope.$on('tagsSet', function() {
            $scope.$watch("$viewContentLoaded", function() {
                var footerTags = tagsService.getTags()
                $scope.tags = footerTags[3].tags;
                console.log("t", $scope.tags);
            });
            // console.log(tagsService.getTags());
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
    });
});
// .progress(function(evt) {
//             console.info(evt.loaded, "/", evt.total);
//         })