'use strict';

(function() {
  class FacebookButtonController {

    constructor($window) {
      this.window = $window;

    }
    openFacebook() {
      this.window.open('https://www.facebook.com/advterramoreira/', '_blank');
    }

  }

  angular.module('webapp')
    .component('facebookButton', {
      templateUrl: 'components/facebook-button/facebook-button.html',
      controller: FacebookButtonController
    });
})();
