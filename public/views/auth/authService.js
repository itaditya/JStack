angular.module('auth').factory('authFactory', function($http) {
  return {
    loginUser: function(credentials) {
      return $http.post('/api/login',credentials);
    },
    registerUser: function(credentials) {
      return $http.post('/api/register',credentials);
    }
  }
});
