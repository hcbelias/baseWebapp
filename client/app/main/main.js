'use strict';

angular.module('webapp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        template: '<main layout="column" flex class="home-page"></main>',
      });
  });
