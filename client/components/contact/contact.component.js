'use strict';

(function() {
  class ContactController {

    constructor() {

    }

  }

  angular.module('webapp')
    .component('contact', {
      templateUrl: 'components/contact/contact.html',
      controller: ContactController,           
    });
})();
