angular.module('JStack').factory('userFactory', function($http) {
    var urlBase = '/api/users';
    return {
        // call to get all blogs
        get: function(id) {
            return $http.get(urlBase + "/" + id);
        },
        getList: function() {
            return $http.get(urlBase);
        },
        // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new blog
        create: function(blogData) {
            return $http.post(urlBase, blogData);
        },
        save: function(id, blogData) {
            return $http.put((urlBase + "/" + id), blogData);
        },
        // call to DELETE a blog
        delete: function(id) {
            return $http.delete(urlBase + "/" + id);
        }
    }
});
