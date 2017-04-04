'use strict';

(function() {

  function authInterceptor($rootScope, $q, $cookies, $injector, Util) {
    var state;
    return {
      // Add authorization token to headers
      request(config) {
        config.headers = config.headers || {};
        if($cookies.get('token') && Util.isSameOrigin(config.url)) { // Internal Superstars call
          config.headers.Authorization = 'Bearer ' + $cookies.get('token');
        } else if($cookies.get('ssotoken') && !Util.isSameOrigin(config.url)) { // Mulesoft and other endpoints
          config.headers.Authorization = 'Bearer ' + $cookies.get('ssotoken');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError(response) {
        if(response.status === 401) {
          (state || (state = $injector.get('$state'))).go('login');
          // remove any stale tokens
          $cookies.remove('token');
        }
        return $q.reject(response);
      }
    };
  }

  angular.module('webapp.auth')
    .factory('authInterceptor', authInterceptor);
})();
