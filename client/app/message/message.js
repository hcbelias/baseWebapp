'use strict';

angular.module('webapp')
  .config(function($stateProvider) {
    $stateProvider
      .state('message', {
        name: 'message',
        url: '/message',
        template: '<message layout="column" flex class="home-page"></message>'
      });
  });
