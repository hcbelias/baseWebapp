'use strict';

(function () {
    class FooterController {

      constructor($window) {
        this.window = $window;
    }

      openFacebook() {
        this.window.open("https://www.facebook.com/advterramoreira/", "_blank");
      }

  }

  angular.module('webapp')
    .component('footer', {
      templateUrl: 'components/footer/footer.html',
      controller: FooterController
    });
})();
