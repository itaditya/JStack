angular.module('dashboard').factory('dashboardFactory', function($http) {
  return {
    addTag: function(data) {
      return $http.post('/api/tags',data);
    }
  }
});
