'use strict';


(function() {
  class ToolbarController {

    constructor($mdSidenav, $stateParams) {
      
      
      
      this.title = 'Advocacia Terra Moreira';
      this.toggleLeft = this.buildToggler('left');
      this.toggleRight = this.buildToggler('right');

      
    }

    buildToggler(componentId) {
      return function() {
        this.mdSidenav(componentId).toggle();
      };
    }



  }

  angular.module('webapp')
    .component('toolbar', {
      templateUrl: 'components/toolbar/toolbar.html',
      controller: ToolbarController
    });
})();
