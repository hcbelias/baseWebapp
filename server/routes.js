/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import email from './components/email';
import path from 'path';

export default function(app, config) {
  // All undefined asset or api routes should return a 404
  app.route('/email').post(function(req, res){

    debugger;
    email.sendEmail(req,res);
  });

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
}
