angular.module('dashboard').controller('profileCtrl', function($scope, $filter,tagFactory, Upload, $http) {
    const tagSelect = new Choices('.tag-choice', {
        removeItems: true,
        removeItemButton: true,
        flip: false,
        placeholderValue: "Select Tags",
        duplicateItems: false
    });
    $scope.progress = 0;
    tagFactory.getTagList("select=name category").then(function(res) {
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
        // tagSelect.setChoices(res.data, 'value', 'label', false);
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