'use strict';
import path from 'path';

import config from '../../config/environment';
import nodemailer from  'nodemailer';

function handleError(res, reply) {
  return function(err) {
    const msg = {
      error: err,
      reply: reply
    };
    return res.status(500).send(msg);
  };
}

function getTransporter(config){
  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: config.auth
  });

  return transporter;
}
debugger;
exports.sendEmail = function sendEmail(req, res) {
  const config = config.email;
  debugger;
  let transporter = getTransporter(config);

  let mailOptions = {
    from: '"Advocacia Terra Moreira" <admin@terramoreira.com>', // sender address
    to: config.destination,
    subject: 'Contato via site', // Subject line
    text: req.body.text, // plain text body
  };

  return transporter.sendMail(mailOptions, handleError);
};
