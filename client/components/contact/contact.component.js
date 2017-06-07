'use strict';

(function() {
  class ContactController {

    constructor() {

    }

    submitEmail() {
      debugger;
    }

  }

  angular.module('webapp')
    .component('contact', {
      templateUrl: 'components/contact/contact.html',
      controller: ContactController,           
    });
})();
