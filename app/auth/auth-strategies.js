var FacebookStrategy = require('passport-facebook').Strategy;
var appConfig = require('../../config/app-config');


var facebookStrategy = new FacebookStrategy({
  clientID: appConfig.authentication.facebook.clientID,
  clientSecret: appConfig.authentication.facebook.clientSecret,
  callbackURL: appConfig.authentication.facebook.callbackURL
}, (accessToken, refreshToken, profile, done) => {
    console.log(profile.id);
    console.log(profile.givenName);
    console.log(profile.displayName);
    console.log(profile.gender);
    console.log(profile.middleName);
    
    console.log(profile.emails);
    return done(null, profile);
});

module.exports.FacebookStrategy = facebookStrategy;