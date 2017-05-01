'use strict';

(function() {
  class ContactInfoController {

    constructor() {

    }

  }

  angular.module('webapp')
    .component('contactInfo', {
      templateUrl: 'components/contact-info/contact-info.html',
      controller: ContactInfoController,
      bindings: {
        icon: '@',
        phone1: '@',
        phone2: '@',
        phone3: '@',
      }
    });
})();
