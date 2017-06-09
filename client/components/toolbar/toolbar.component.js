'use strict';


(function() {
  class ToolbarController {

    constructor($mdSidenav, $state) {
      this.title = 'Terra Moreira';
      this.toggleLeft = this.buildToggler('left');
      this.toggleRight = this.buildToggler('right');
      this.navbar = this.getNavbar();
      this.state = $state;
      this.image = 'assets/img/cartao.jpg';
    }

    getNavbar() {
      this.currentNavItem = 'Home';
      return [
        {
          title: 'Home',
          state: 'main'
        },
        //{
        //  title: 'Áreas de Atuação',
        //  state: 'main'
        //},
        //{
        //  title: 'Área do Cliente',
        //  state: 'main'
        //},
        //{
        //  title: 'Dicionário Jurídico',
        //  state: 'main'
        //},
        {
          title: 'Contato',
          state: 'message'
        },
      ];
    }

    buildToggler(componentId) {
      return function() {
        this.mdSidenav(componentId).toggle();
      };
    }

    redirectHomePage() {
      this.state.go('main');
    }


  }

  angular.module('webapp')
    .component('toolbar', {
      templateUrl: 'components/toolbar/toolbar.html',
      controller: ToolbarController
    });
})();
