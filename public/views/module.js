angular.module('JStack', ['ngRoute', 'auth', 'blogs', 'dashboard', 'LocalStorageModule', 'ngFileUpload']).config(function(localStorageServiceProvider, $locationProvider, $httpProvider) {
    $locationProvider.html5Mode(true);
    localStorageServiceProvider.setPrefix('JStack').setStorageType('localStorage');
    notification.configProfile('global', {
        notification: {
            position: ['right', 'top'],
            autoHide: 1
        }
    });
    $httpProvider.interceptors.push(function($q, $location, localStorageService) {
        var token = localStorageService.cookie.get("authToken");
        return {
            'request': function(config) {
                config.headers = config.headers || {};
                if (token) {
                    config.headers.authorization = 'Bearer ' + token;
                }
                return config;
            },
            'responseError': function(response) {
                if (response.status === 401 || response.status === 403) {
                    $location.path('/login');
                }
                return $q.reject(response);
            }
        };
    });
}).service('SessionService', function(localStorageService) {
    // var userType;
    this.setUserAuthenticated = function(value, allowEdit) {
        localStorageService.cookie.set("userIsAuthenticated", value);
    };
    this.getUserAuthenticated = function() {
        return localStorageService.cookie.get("userIsAuthenticated");
    };
    this.setUserType = function(value) {
        localStorageService.cookie.set("userType", value);
    };
    this.getUserType = function() {
        return localStorageService.cookie.get("userType");
    };
    this.setEditableBlog = function(blogs) {
        localStorageService.cookie.set("editBlogs", blogs);
    };
    this.getEditableBlog = function() {
        return localStorageService.cookie.get("editBlogs");
    };
    this.getCanEditBlog = function(blogId) {
        var blogs = localStorageService.cookie.get("editBlogs");
        if (blogs && blogs.indexOf(blogId) != -1) {
            return true;
        }
        return false;
    };
}).filter('groupBy', ['pmkr.filterStabilize', function(stabilize){
    return stabilize( function (data, key) {
        if (!(data && key)) return;
        var result = {};
        for (var i=0;i<data.length;i++) {
            if (!result[data[i][key]])
                result[data[i][key]]=[];
            result[data[i][key]].push(data[i])
        }
        return result;
    });
}])
.factory('pmkr.filterStabilize', [
  'pmkr.memoize',
  function(memoize) {
    function service(fn) {
      function filter() {
        var args = [].slice.call(arguments);
        // always pass a copy of the args so that the original input can't be modified
        args = angular.copy(args);
        // return the `fn` return value or input reference (makes `fn` return optional)
        var filtered = fn.apply(this, args) || args[0];
        return filtered;
      }
      var memoized = memoize(filter);
      return memoized;
    }
    return service;
  }
])
.factory('pmkr.memoize', [
  function() {
    function service() {
      return memoizeFactory.apply(this, arguments);
    }
    function memoizeFactory(fn) {
      var cache = {};
      function memoized() {
        var args = [].slice.call(arguments);
        var key = JSON.stringify(args);
        var fromCache = cache[key];
        if (fromCache) {
          return fromCache;
        }
        cache[key] = fn.apply(this, arguments);
        return cache[key];
      }
      return memoized;
    }
    return service;
  }
]).run(function($rootScope, $route, $templateCache, $http) {
    // $templateCache.removeAll()
    $rootScope.d = function(elem) {
        elem = document.querySelector(elem);
        return (elem || document.querySelector(".null"));
    }
    $rootScope.dd = function(elem) {
        return document.querySelectorAll(elem);
    }
    $rootScope.debounce = function(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this,
                args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    if (navigator.serviceWorker) {
        console.log('Yeah serviceWorker');
        // navigator.serviceWorker.register('./service-worker.js', {scope: './'})
        //     .then(function (registration) {
        //         console.log(registration);
        //     })
        //     .catch(function (e) {
        //         console.error(e);
        //     })
    } else {
        console.log('Service Worker is not supported in this browser.')
    }
});