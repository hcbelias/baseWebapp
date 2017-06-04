'use strict';

(function () {
    class FooterController {

      constructor($window) {
        this.window = $window;
    }

    
  }

  angular.module('webapp')
    .component('footer', {
      templateUrl: 'components/footer/footer.html',
      controller: FooterController
    });
})();
