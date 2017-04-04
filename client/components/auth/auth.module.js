'use strict';

angular.module('webapp.auth', ['webapp.constants', 'webapp.util', 'ngCookies',
    'ui.router'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
