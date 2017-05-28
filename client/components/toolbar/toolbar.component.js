'use strict';


(function() {
  class ToolbarController {

    constructor($mdSidenav, $stateParams) {
      this.title = 'Advocacia Terra Moreira';
      this.toggleLeft = this.buildToggler('left');
      this.toggleRight = this.buildToggler('right');
      this.navbar = this.getNavbar();
    }

    getNavbar() {
      return [
        {
          title: 'Home'
        },
        {
          title: 'Quem Somos'
        },
        {
          title: 'Áreas de Atuação'
        },
        {
          title: 'Área do Cliente'
        },
        {
          title: 'Dicionário Jurídico'
        },
        {
          title: 'Contato'
        },
      ];
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
