'use strict';

angular.module('webapp')
  .directive('toolbar', function() {
    return {
      templateUrl: 'components/toolbar/toolbar.html',
      restrict: 'E'
    };
  });
