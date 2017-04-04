'use strict';

import passport from 'passport';
import config from '../config/environment';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import compose from 'composable-middleware';

var validateJwt = expressJwt({
  secret: config.secrets.session
});

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
export function isAuthenticated() {
  return compose()
    // Validate jwt
    .use(function (req, res, next) {
      // allow access_token to be passed through query parameter as well
      if (req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
      }
      validateJwt(req, res, next);
    });
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
export function hasRole(roleRequired) {
  if (!roleRequired) {
    throw new Error('Required role needs to be set');
  }

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      if (config.userRoles.indexOf(req.user.role) >=
        config.userRoles.indexOf(roleRequired)) {
        next();
      } else {
        res.status(403).send('Forbidden');
      }
    });
}

/**
 * Returns a jwt token signed by the app secret
 */
export function signToken(id, role) {
  return jwt.sign({
    _id: id,
    role: role
  }, config.secrets.session, {
    expiresIn: 60 * 60 * 5
  });
}

/**
 * Set token cookie directly for oAuth strategies
 */
export function setTokenCookie(req, res) {
  if (!req.user) {
    return res.status(404).send('It looks like you aren\'t logged in, please try again.');
  }
  res.cookie('token', signToken(req.user._id, req.user.role));
  res.redirect('/');
}


export function hasPermissionToEdit(req, res) {
  return compose()
    .use(isAuthenticated())
    .use(function hasPermission(req, res, next) {
      var userData = req.user;
      if (userData.username === req.user.username || req.user.role === 'admin') {
        next();
      } else {
        res.status(403).send({
          message: 'This user does not have permission to edit.'
        });
      }
    });
}

export function hasPermissionToAddEntity(req, res) {
  return compose()
    .use(isAuthenticated())
    .use(function hasPermission(req, res, next) {
      if (req.user.role === 'admin') {
        next();
      } else {
        res.status(403).send({
          message: 'This user does not have permission to edit.'
        });
      }
    });
}
