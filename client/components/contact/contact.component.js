'use strict';

(function() {
  class ContactController {

    constructor($http, $resource, $q) {
      this.http = $http;
      this.q = $q;
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

      const EmailService = this.resource('/api/emails', {},
          {
            sendEmail: {
              method: 'POST'
            }
          }
      );

      this.isSubmitted = true;
debugger;
var deferred = this.q.defer();
 var data = JSON.stringify(this.formData);

 this.http({
   method: 'POST',
   url: 'http://localhost:9000/api/emails',
   data: this.formData,
   headers: {
     'Content-Type': 'application/json',
     'Method': 'POST'
   }
 }).then(function(response) {
   console.log(response)
 });

 this.http.post('http://localhost:9000/api/emails', data)
     .then(function(response) {
       debugger;
         if (typeof response.data === 'object') {
             deferred.resolve(response.data);
         } else {
             deferred.reject(response.data);
         }
      })
      .catch(function(response) {
        debugger;
         return deferred.reject(response.data);
      });

return deferred.promise;


  }
}

  angular.module('webapp')
    .component('contact', {
      templateUrl: 'components/contact/contact.html',
      controller: ContactController,
    });
})();
