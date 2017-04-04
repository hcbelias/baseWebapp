'use strict';

(function () {
    class FooterController {

    constructor() {
    }

  }

  angular.module('webapp')
    .component('footer', {
      templateUrl: 'components/footer/footer.html',
      controller: FooterController
    });
})();
