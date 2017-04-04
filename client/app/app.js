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
    'pascalprecht.translate'
])
  .config(function ($urlRouterProvider, $locationProvider, $translateProvider, $mdThemingProvider, appConfig) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
    $translateProvider.useSanitizeValueStrategy('sanitize');
    $translateProvider.translations('pt', appConfig.I18N.pt);
    $translateProvider.preferredLanguage('pt');
    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .warnPalette('orange');
  });
