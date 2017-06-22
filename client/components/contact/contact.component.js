'use strict';

(function() {
  class ContactController {

    constructor($http, $resource) {
      this.http = $http;
      this.resource = $resource;
      this.formData = {
        name: 'henrique',
        phone: '3424234324324',
        email: 'sadas@sadasd',
        description: 'zsdasdsadsadsadsdasdsadsadasdsa'
      };
    }

    sendEmail(form) {
      if(!form.contactForm.$valid) {
        return;
      }

      const EmailService = this.resource('/email');
      let email = new EmailService(this.formData);
      this.isSubmitted = true;
      debugger;
      email.$save().then((response) => {
        this.message = response.status;
        this.data = response.data;
        this.formData = {};
        console.log(response);
      }, (response) => {
        console.log('err');
        console.log(response);
        this.data = response.data || 'Request failed';
        this.status = response.status;
      });

    }

  }

  angular.module('webapp')
    .component('contact', {
      templateUrl: 'components/contact/contact.html',
      controller: ContactController,
    });
})();
