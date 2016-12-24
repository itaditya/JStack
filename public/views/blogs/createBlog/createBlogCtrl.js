angular.module('blogs').controller('createBlogCtrl', function($scope, $filter, $rootScope, $interval, $timeout, localStorageService, blogFactory, tagFactory, userFactory, $routeParams) {
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
        const tagSelect = new Choices('.tag-choice', {
            removeItems: true,
            removeItemButton: true,
            flip: false,
            placeholderValue: "Select Tags",
            duplicateItems: false
        });
        tagFactory.getTagList("design=tags").then(function(categories) {
            tagSelect.setChoices(categories.data, 'value', 'label', false);
        });
        $scope.saveBlog = function() {
            $scope.blog.title = $rootScope.d(".blog-title").innerHTML;
            $scope.blog.content = simplemde.value();
            $scope.blog.tags = tagSelect.getValue();
            localStorageService.set("blog", $scope.blog);
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
            $timeout(function() {
                console.log($scope.postid);
                $scope.postid = undefined;
            }, 10000);
        }
        $scope.getTags = function() {
            $scope.blog.tags = tagSelect.getValue();
            $scope.chooseCoverTag($scope.blog.tags[0]);
        }
        $scope.chooseCoverTag = function(tag) {
            tagFactory.getTag(tag.value).then(function(tagData) {
                $scope.coverImages = tagData.data.coverImages;
                $scope.carousel = new SCarousel({
                    element: ".carousel-1",
                    animation: "elastic"
                });
                $scope.carousel.init();
            });
        }
        $scope.chooseCoverImage = function(image) {
            if (image) {
                $scope.blog.coverImg = image;
            } else {
                var index = $scope.carousel.getIndex();
                $scope.blog.coverImg = $scope.coverImages[index];
            }
        }
    });
});