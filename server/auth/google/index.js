'use strict';

import express from 'express';
import passport from 'passport';
import {setTokenCookie} from '../auth.service';

var router = express.Router();

router
  .get('/', passport.authenticate('google', {
    failureRedirect: '/login',
    failureFlash: true,
    scope: [
      'profile',
      'email'
    ],
    session: false,
    prompt: 'select_account',
    hd: 'avenuecode.com',
    login_hint: 'you@avenuecode.com'
  }))
  .get('/callback', passport.authenticate('google', {
    failureRedirect: '/login',
    failureFlash: true,
    session: false
  }), setTokenCookie);

export default router;
