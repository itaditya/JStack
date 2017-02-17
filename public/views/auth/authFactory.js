angular.module('auth').factory('authFactory', function($http) {
  return {
    loginUser: function(credentials) {
      return $http.post('/api/login',credentials);
    },
    recoverPassword: function(credentials) {
      return $http.post('/api/recoverPassword',credentials);
    },
    changePassword: function(credentials) {
      return $http.put('/api/changePassword',credentials);
    },
    registerUser: function(credentials) {
      return $http.post('/api/register',credentials);
    }
  }
});
