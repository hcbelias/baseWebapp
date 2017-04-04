import passport from 'passport';
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';
import error from '../../components/errors';
import config from '../../config/environment'
import request from 'request';

function getDataFromDB(User, username, domain, email, profile, token, done){
  User.findOne({'username': username }).exec()
   .then(user => {
     const tokenObject = token ? { 'ssoToken':  token} : undefined;
     if (user) {
       return done(null, user, tokenObject);
     }

     user = new User({
       name: profile.displayName,
       email: email,
       username: username,
       provider: 'google',
       google: profile._json
     });

     user.save()
       .then(user => done(null, user, tokenObject))
       .catch(err => done(err));
   })
   .catch(err => done(err));

}

export function setup(User, config) {
  passport.use(new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    const email = profile.emails[0].value;
    const fields = email.split('@');
    const username = fields[0];
    const domain = fields[1];
    console.log('Google accessToken: ' + accessToken);
    let endpoint = `${config.ssoUrl}?access_token=${accessToken}`;

    request(endpoint, function(error, response, body){
      console.log('SSO endpoint: ' + endpoint);
      console.log('SSO response: ' + response.statusCode + ' - ' + response.statusMessage);

      let bodyToken;


      if(config.domain !== domain){
        return done(null, false, { message : "error-message-invalid-account" });
      }

      if(error){
        console.log('SSO Error: ' + error);
      }

      const contentType = response.headers['content-type'];
      console.log('SSO content type: ' + contentType);
      switch (response.statusCode) {
        case 200:
          if(contentType === "text/html; charset=utf-8"){
            bodyToken = { token: `${endpoint} + - 200 HTML` };
            console.log('SSO 200 Status Code returning HTML: ' + response.body);
          }else if(contentType === "application/json; charset=utf-8"){
            bodyToken = JSON.parse(body);
            console.log('SSO accessToken: ' + bodyToken.token);
          }else{
            bodyToken = { token: `${endpoint} + - 200 Unknown` };
            console.log('SSO 200 Status Code returning content not identified: ' + response.body);
          }
          break;
        case 401:
          bodyToken = { token: `${endpoint} + - 401` };
          console.log('SSO Unauthorized.');
          break;
        case 500:
          bodyToken = { token: `${endpoint} + - 500` };
          console.log('SSO Error: ' + body);
          break;
        default:
          bodyToken = { token: `${endpoint} + - None` };
          console.log('SSO Unrecognized Status Code: ' + body);
      }


      return getDataFromDB(User, username, domain, email, profile, bodyToken, done);
    });

  }));
}
