'use strict';

(function () {
    class MainController {

    constructor() {
      this.image = 'assets/img/piece.jpg';
    }

  }

  angular.module('webapp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();
