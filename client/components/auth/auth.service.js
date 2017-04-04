'use strict';

(function () {

  function AuthService($location, $http, $cookies, $q, appConfig, Util, User) {
    var safeCb = Util.safeCb;
    var currentUser = {};
    var userRoles = appConfig.userRoles || [];

    if ($cookies.get('token') && $location.path() !== '/logout') {
      currentUser = User.getMyUser();
    }

    var Auth = {

      logout() {
        $cookies.remove('token');
        $cookies.remove('ssotoken');
        currentUser = {};
      },

      /**
       * Create a new user
       *
       * @param  {Object}   user     - user info
       * @param  {Function} callback - optional, function(error, user)
       * @returns {Promise}
       */
      createUser(user, callback) {
        return User.save(user, function (data) {
            $cookies.put('token', data.token);
            currentUser = User.getMyUser();
            return safeCb(callback)(null, user);
          }, function (err) {
            Auth.logout();
            return safeCb(callback)(err);
          })
          .$promise;
      },


      /**
       * Gets all available info on a user
       *   (synchronous|asynchronous)
       *
       * @param  {Function|*} callback - optional, funciton(user)
       * @returns {Object|Promise}
       */
      getCurrentUser(callback) {
        if (arguments.length === 0) {
          return currentUser;
        }

        var value = currentUser.hasOwnProperty('$promise') ? currentUser.$promise : currentUser;
        return $q.when(value)
          .then(user => {
            safeCb(callback)(user);
            return user;
          }, () => {
            safeCb(callback)({});
            return {};
          });
      },

      /**
       * Check if a user is logged in
       *   (synchronous|asynchronous)
       *
       * @param  {Function|*} callback - optional, function(is)
       * @returns {Bool|Promise}
       */
      isLoggedIn(callback) {
        if (arguments.length === 0) {
          return currentUser.hasOwnProperty('role');
        }

        return Auth.getCurrentUser(null)
          .then(user => {
            var is = user.hasOwnProperty('role');
            safeCb(callback)(is);
            return is;
          });
      },

      compareRole(r, h) {
        return userRoles.indexOf(r) >= userRoles.indexOf(h);
      },

      /**
       * Check if a user has a specified role or higher
       *   (synchronous|asynchronous)
       *
       * @param  {String}     role     - the role to check against
       * @param  {Function|*} callback - optional, function(has)
       * @returns {Bool|Promise}
       */
      hasRole(role, callback) {
        if (arguments.length < 2) {
          return Auth.compareRole(currentUser.role, role);
        }

        return Auth.getCurrentUser(null)
          .then(user => {
            var has = user.hasOwnProperty('role') ? Auth.compareRole(user.role, role) : false;
            safeCb(callback)(has);
            return has;
          });
      },

      /**
       * Check if a user is an admin
       *   (synchronous|asynchronous)
       *
       * @param  {Function|*} callback - optional, function(is)
       * @return {Bool|Promise}
       */
      isAdmin() {
        return Auth.hasRole.apply(Auth, [].concat.apply(['admin'], arguments));
      },

      /**
       * Get auth token
       *
       * @returns {String} - a token string used for authenticating
       */
      getToken() {
        return $cookies.get('token');
      },

      hasPermissionToEdit(profileUserName, callback) {
        return Auth.getCurrentUser(null)
          .then(user => {
            const isAdmin = user.hasOwnProperty('role') ? Auth.compareRole(user.role, 'admin') : false;
            const hasPermission = isAdmin || profileUserName === user.username;
            safeCb(callback)(hasPermission);
            return hasPermission;
          });
      }
    };

    return Auth;
  }

  angular.module('webapp.auth')
    .factory('Auth', AuthService);
})();
