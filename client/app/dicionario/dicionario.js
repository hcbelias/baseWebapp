'use strict';

angular.module('webapp')
  .config(function($stateProvider) {
    $stateProvider
      .state('dicionario', {
        name: 'dicionario',
        url: '/dicionario',
        template: '<dicionario layout="column" flex class="home-page"></dicionario>'
      });
  });
