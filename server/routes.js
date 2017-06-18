/**
 * Main application routes
 */
 import errors from './components/errors';

'use strict';

import path from 'path';

export default function(app, config) {
  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
}
