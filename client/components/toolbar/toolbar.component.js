'use strict';


(function() {
  class ToolbarController {

    constructor() {
      this.title = "Advocacia Terra Moreira";
    }

  }

  angular.module('webapp')
    .component('toolbar', {
      templateUrl: 'components/toolbar/toolbar.html',
      controller: ToolbarController
    });
})();
