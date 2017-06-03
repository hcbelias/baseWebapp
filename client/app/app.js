'use strict';

angular.module('webapp', [
    'webapp.constants',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'validation.match',
    'ngMaterial',
    'ngMessages',
])
  .config(function ($urlRouterProvider, $locationProvider, $mdThemingProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
    $mdThemingProvider.theme('default')
      .primaryPalette('grey')
      .warnPalette('deep-orange')
      .accentPalette('red').dark();

    $mdThemingProvider.theme('docs-dark')
     .primaryPalette('yellow')
     .dark();

  });
