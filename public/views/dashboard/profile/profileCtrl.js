angular.module('dashboard').controller('profileCtrl', function($scope, tagFactory, Upload, $http) {
    const tagSelect = new Choices('.tag-choice', {
        removeItems: true,
        removeItemButton: true,
        flip: false,
        placeholderValue: "Select Tags",
        duplicateItems: false
    });
    $scope.progress = 0;
    tagFactory.getTagList("design=tags").then(function(categories) {
        tagSelect.setChoices(categories.data, 'value', 'label', false);
    });
    $scope.uploadImg = function() {
        console.log($scope.coverImage);
        $scope.tags = tagSelect.getValue(true);
        Upload.upload({
            url: '/api/images?method=0',
            method: 'POST',
            data: {
                'tags': $scope.tags
            },
            file: $scope.coverImage
        }).then(function(resp) {
            // file is uploaded successfully
            console.log('file ' + resp.config.data.file.name + 'is uploaded successfully. Response: ' + resp.data);
        }, function(resp) {
            // handle error
        }, function(evt) {
            // progress notify
            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + $scope.progress + '% file :');
        });
    }
    $scope.uploadUrl = function() {
        console.log($scope.fileUrl);
        $scope.tags = tagSelect.getValue(true);
        $http.post("/api/images?method=1", {
            url: $scope.fileUrl,
            name: $scope.fileName,
            tags: $scope.tags
        });
    }
});