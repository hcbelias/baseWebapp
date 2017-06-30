/**
 * Main application routes
 */

'use strict';

import path from 'path';
import nodemailer from 'nodemailer';
console.log('load');
export default function(app, config) {
  console.log('load2');
  // All undefined asset or api routes should return a 404
  app.route('/api/emails').post(function(req, res){
    console.log('sadasdsa');
    debugger;
//    email.sendEmail(req,res);
  });

  // All undefined asset or api routes should return a 404


  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      console.log('sadas');
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
}
