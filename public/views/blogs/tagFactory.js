angular.module('JStack').factory('tagFactory', function($http) {
    var urlBase = '/api/tags';
    return {
        getTag: function(id) {
            return $http.get(urlBase + "/" + id);
        },
        getTagList: function(query) {
            if (query) {
                return $http.get(urlBase + "?" + query);
            } else {
                return $http.get(urlBase);
            }
        }
    }
}).service('tagsService', function($rootScope) {
    var tagsList;
    return {
        setTags: function(data) {
            tagsList = data;
            $rootScope.$broadcast('tagsSet');
            // $rootScope.$emit('tagsSet');
        },
        getTags: function() {
            return tagsList;
        }
    };
});