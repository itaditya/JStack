angular.module('JStack').factory('blogFactory', function($http) {
    var urlBase = '/api/blogs';
    return {
        // call to get all blogs
        get: function(id) {
            return $http.get(urlBase + "/" + id);
        },
        getList: function(query) {
            if (query) {
                return $http.get(urlBase + "?" + query);
            } else {
                return $http.get(urlBase);
            }
        },
        recent: function() {
            return $http.get("/api/recentBlogs");
        },
        // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new blog
        create: function(blogData) {
            return $http.post(urlBase, blogData);
        },
        subscribe: function(email) {
            return $http.post("/api/subscribe", {
                emailId: email
            });
        },
        userChoice: function(id,choice) {
            return $http.post(urlBase + "/userChoice/" + id, {
                value: choice
            });
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