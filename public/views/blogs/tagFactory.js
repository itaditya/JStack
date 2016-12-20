angular.module('JStack').factory('tagFactory', function($http) {
    var urlBase = '/api/tags';
    return {
        getBlogs: function(id) {
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
}).service('tagsService', function() {
    var tagsList;
    return {
        setTags: function(data) {
            tagsList = data;
        };
        getTags: function() {
            return tagsList;
        };
    };
});