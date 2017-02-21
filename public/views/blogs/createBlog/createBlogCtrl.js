angular.module('blogs').controller('createBlogCtrl', function($scope, $filter, $rootScope, $interval, $timeout, localStorageService, blogFactory, tagFactory, userFactory, $routeParams, SessionService) {
    userFactory.get(localStorageService.cookie.get("authorId")).then(function(author) {
        console.log(localStorageService.cookie.get("authorId"),author);
        var simplemde = new SimpleMDE({
            element: document.querySelector(".editor"),
            promptURLs: true,
            showIcons: ["code", "table", "strikethrough", "heading-bigger"],
            placeholder: "Type here...",
            renderingConfig: {
                codeSyntaxHighlighting: true,
            },
            // toolbar: [{
            //         name: "Insert Image",
            //         action: function customFunction(editor) {
            //             console.log(editor);
            //         },
            //         className: "fa fa-star",
            //         title: "Insert Image",
            //     }, "|" ,// Separator
            // ],
            parsingConfig: {
                allowAtxHeaderWithoutSpace: true
            },
            hideIcons: ["fullscreen", "side-by-side"]
        });
        // console.log(simplemde.toolbar);
        var tagSelect = new Choices('.tag-choice', {
            removeItems: true,
            removeItemButton: true,
            flip: false,
            placeholderValue: "Select Tags",
            duplicateItems: false,
            callbackOnChange: function(value) {
                $scope.tagItemsLength = this.getValue(true).length;
                console.log($scope.tagItemsLength);
            }
        });
        $scope.author = author.data;
        var parent = $rootScope.d('.main');
        $rootScope.d(".menu").addEventListener("click", function() {
            document.querySelector(".sidebar").classList.toggle("sm-hide");
        });
        tagFactory.getTagList("select=name category").then(function(res) {
            // $scope.tagsChoices = res.data;
            var choices = $filter('groupBy')(res.data, 'category');
            var index = 0;
            $scope.tagsChoices = [{
                label: "Frontend",
                id: 0,
                choices: []
            }, {
                label: "Backend",
                id: 1,
                choices: []
            }, {
                label: "Design",
                id: 2,
                choices: []
            }, {
                label: "Technical",
                id: 3,
                choices: []
            }];
            angular.forEach(choices,function(value,key){
                $scope.tagsChoices[index].choices = value;
                console.log(index);
                index++;
            });
            tagSelect.setChoices($scope.tagsChoices, '_id', 'name', true);
            var blog = localStorageService.get("blog");
            if (blog) {
                $scope.blog = blog;
                console.log($scope.blog);
                simplemde.value($scope.blog.content);
                for (var i = $scope.blog.tagsData.length - 1; i >= 0; i--) {
                    tagSelect.setValueByChoice($scope.blog.tagsData[i].value);
                }
            } else {
                $scope.blog = {
                    coverImg: "hero.jpg",
                    title: "Write Title Here",
                    tagsData: []
                }
            }
        });
        $scope.saveBlog = function(unnotify) {
            $scope.blog.title = $rootScope.d(".blog-title").innerHTML;
            $scope.blog.content = simplemde.value();
            $scope.blog.tagsData = tagSelect.getValue();
            console.log($scope.blog.tagsData);
            localStorageService.set("blog", $scope.blog);
            if (!unnotify) {
                notification.notify('success', 'Blog Saved !');
            }
        }
        $scope.saveChoice = function() {
            $scope.startFade = true;
            $timeout(function() {
                $scope.endFade = true;
            }, 2000);
            if ($scope.save.choice === "1") {
                $interval(function() {
                    $scope.saveBlog(true);
                }, 10000);
            }
        }
        $scope.uploadBlog = function() {
            $scope.blog.tags = tagSelect.getValue(true);
            $scope.blog.tagsData = tagSelect.getValue();
            $scope.blog.title = $rootScope.d(".blog-title").innerHTML;
            $scope.blog.content = simplemde.value();
            $scope.blog.authorId = $scope.author._id;
            $scope.blog.authorName = $scope.author.name;
            tagSelect.disable();
            blogFactory.create($scope.blog).then(function(message) {
                $scope.postid = message.data.id;
                notification.notify('success', 'Blog Created !');
                var editableBlogs = SessionService.getEditableBlog();
                console.log($scope.postid);
                editableBlogs.push($scope.postid);
                SessionService.setEditableBlog(editableBlogs);
                tagSelect.enable();
            });
            $timeout(function() {
                console.log($scope.postid);
                $scope.postid = undefined;
            }, 10000);
        }
        $scope.discardBlog = function(choice) {
            if (choice) {
                if (choice === 1) {
                    $rootScope.d(".blog-title").innerHTML = "Write Title Here";
                    simplemde.value("");
                    $scope.blog.description = "";
                    tagSelect.highlightAll();
                    tagSelect.removeHighlightedItems();
                }
                $scope.discardBtnClicked = false;
            } else {
                $scope.discard = 0;
                $scope.discardBtnClicked = true;
            }
        }
        $scope.getTags = function() {
            $scope.blog.tags = tagSelect.getValue();
            console.log($scope.blog.tags);
            if ($scope.blog.tags.length > 0) {
                $timeout(function() {
                    $rootScope.dd(".tagCols li")[1].click();
                }, 0);
            } else {
                tagSelect.showDropdown();
            }
        }
        $scope.chooseCoverTag = function(tag) {
            tagFactory.getTag(tag.value).then(function(tagData) {
                $scope.coverImages = tagData.data.coverImages;
                $timeout(function() {
                    $scope.carousel = new SCarousel({
                        element: ".carousel-1",
                        animation: "elastic"
                    });
                }, 0);
            });
        }
        $scope.chooseCoverImage = function(image) {
            if (image) {
                $scope.blog.coverImg = image;
            } else {
                var index = $scope.carousel.getIndex();
                $scope.blog.coverImg = $scope.coverImages[index];
            }
            notification.notify('info', 'Cover Image Changed');
        }
    });
});