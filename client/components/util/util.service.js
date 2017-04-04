'use strict';

(function () {

  /**
   * The Util service is for thin, globally reusable, utility functions
   */
  function UtilService($window) {
    var Util = {

      /**
       * Return the menu action items
       *
       * @param  {}
       * @return {array of elements}
       */
      getMenuActionItems(username, loggedUser) {
        return [{
            name: 'Home',
            icon: 'home',
            sref: 'main',
            show: 'all',
            target: ''
          },{
            name: 'My Profile',
            icon: 'account_circle',
            sref: `profile({ username: '${loggedUser}'})`,
            show: 'all',
            target: ''
          }, {
            name: 'Public Profile',
            icon: 'public',
            sref: `publicprofile({ username: ${username}})`,
            show: 'profile',
            target: '_blank'
          },
          {
            name: 'Export Profile',
            icon: 'launch',
            show: 'profile',
            onlyAdmin: true,
            hasOptions: true,
            menuOptions: [{
                icon: '<img src="../../assets/images/docx-icon.svg" height="15" />',
                label: 'Export to DOCX',
                link: `exportprofile({ username: ${username}, to: 'doc'})`
              },
              {
                icon: '<i class="material-icons">insert_drive_file</i>',
                label: 'Export to PDF',
                link: `exportprofile({ username: ${username}, to: 'pdf'})`
              }
            ]
          }
        ];
      },


      /**
       * Return a callback or noop function
       *
       * @param  {Function|*} cb - a 'potential' function
       * @return {Function}
       */
      safeCb(cb) {
        return angular.isFunction(cb) ? cb : angular.noop;
      },

      /**
       * Parse a given url with the use of an anchor element
       *
       * @param  {String} url - the url to parse
       * @return {Object}     - the parsed url, anchor element
       */
      urlParse(url) {
        var a = document.createElement('a');
        a.href = url;

        // Special treatment for IE, see http://stackoverflow.com/a/13405933 for details
        if (a.host === '') {
          a.href = a.href;
        }

        return a;
      },

      /**
       * Test whether or not a given url is same origin
       *
       * @param  {String}           url       - url to test
       * @param  {String|String[]}  [origins] - additional origins to test against
       * @return {Boolean}                    - true if url is same origin
       */
      isSameOrigin(url, origins) {
        url = Util.urlParse(url);
        origins = origins && [].concat(origins) || [];
        origins = origins.map(Util.urlParse);
        origins.push($window.location);
        origins = origins.filter(function (o) {
          let hostnameCheck = url.hostname === o.hostname;
          let protocolCheck = url.protocol === o.protocol;
          // 2nd part of the special treatment for IE fix (see above): 
          // This part is when using well-known ports 80 or 443 with IE,
          // when $window.location.port==='' instead of the real port number.
          // Probably the same cause as this IE bug: https://goo.gl/J9hRta
          let portCheck = url.port === o.port || o.port === '' && (url.port === '80' || url
            .port === '443');
          return hostnameCheck && protocolCheck && portCheck;
        });
        return origins.length >= 1;
      }
    };

    return Util;
  }

  angular.module('webapp.util')
    .factory('Util', UtilService);
})();
