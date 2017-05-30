'use strict';


(function() {
  class ToolbarController {

    constructor($mdSidenav, $stateParams) {
      this.title = 'Terra Moreira';
      this.toggleLeft = this.buildToggler('left');
      this.toggleRight = this.buildToggler('right');
      this.navbar = this.getNavbar();

      this.image = 'assets/img/cartao.jpg';
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
