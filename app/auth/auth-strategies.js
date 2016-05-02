var FacebookStrategy = require('passport-facebook').Strategy;
var appConfig = require('../../config/app-config');


var facebookStrategy = new FacebookStrategy({
  clientID: appConfig.authentication.facebook.clientID,
  clientSecret: appConfig.authentication.facebook.clientSecret,
  callbackURL: appConfig.authentication.facebook.callbackURL
}, (accessToken, refreshToken, profile, done) => {
    console.log(profile.id);
    console.log(profile.username);
    console.log(profile.displayName);
    console.log(profile.gender);
    console.log(profile.profileUrl);
    return done(null, profile);
});

module.exports.FacebookStrategy = facebookStrategy;