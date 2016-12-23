angular.module('dashboard').controller('profileCtrl', function($scope, Upload, $http) {
    $scope.uploadImg = function() {
        console.log($scope.coverImage);
        Upload.upload({
            url: '/api/images',
            method: 'POST',
            file: $scope.coverImage
                // data: "data"// Any data needed to be submitted along with the files
        });
    }
    $scope.uploadUrl = function() {
        console.log($scope.fileUrl);
        $http.post("/api/imgUrl", {
            url: $scope.fileUrl,
            name: $scope.fileName
        });
    }
});