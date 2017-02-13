angular.module('blogs').controller('editBlogCtrl', function($scope, $rootScope, blogFactory, tagFactory, $rootScope, userFactory, $routeParams, localStorageService, SessionService) {
    console.log(SessionService.getUserType());
    // console.log(localStorageService.cookie.get("authorId"));
    userFactory.get(localStorageService.cookie.get("authorId")).then(function(author) {
        // console.log(author.data);
        var simplemde = new SimpleMDE({
            element: document.querySelector(".editor"),
            promptURLs: true,
            showIcons: ["code", "table"]
        });
        var tagEditSelect;
        $scope.author = author.data;
        console.log($scope.author);
        blogFactory.get($routeParams.id).then(function(blog) {
            $scope.blog = blog.data;
            console.log($scope.blog);
            simplemde.value($scope.blog.mdString);
            $rootScope.d(".blog-title").innerHTML = $scope.blog.title;
            $scope.$watch("$viewContentLoaded", function() {
                tagEditSelect = new Choices('.tag-edit-choice', {
                    removeItems: false,
                    removeItemButton: false,
                    flip: false,
                    placeholderValue: "Selected Tags",
                    duplicateItems: false
                });
                tagFactory.getTagList("select=name category").then(function(res) {
                    $scope.tagsChoices = res.data;
                    tagEditSelect.setChoices($scope.tagsChoices, '_id', 'name', true);
                    for (var i = $scope.blog.tagsData.length - 1; i >= 0; i--) {
                        tagEditSelect.setValueByChoice($scope.blog.tagsData[i].value);
                    }
                });
                tagEditSelect.disable();
            });
        });
        $scope.saveBlog = function() {
            console.log(tagEditSelect.getValue());
            $scope.blog.title = $rootScope.d(".blog-title").innerHTML;
            $scope.blog.content = simplemde.value();
            $scope.blog.authorId = localStorageService.get("authorId");
            blogFactory.save($routeParams.id, $scope.blog).then(function(message) {
                $scope.postid = message.data.id;
                notification.notify('success', 'Save Successfull');
            });
        }
    });
});