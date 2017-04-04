/**
 * Main application routes
 */
 import errors from './components/errors';

'use strict';

import path from 'path';

export default function(app, config) {
  // Insert routes below
  app.use('/auth', require('./auth').default);

  app.route('/login').get((req, res) => {
    var errorMessage = req.flash('error');

    if(errorMessage.length > 0)
    {
      var cookieName = 'error-login';
      res.cookie(cookieName, config.I18N.en[config.cookies[cookieName]]);
    }

    res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
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
