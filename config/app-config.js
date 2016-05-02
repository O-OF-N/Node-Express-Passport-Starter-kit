database = {
    development: "mongodb://family-tree:Om1Shiva@ds055545.mongolab.com:55545/family-tree"        
}

authentication = {
    facebook: {
        clientID:"1687445188183815",
        clientSecret:"e4ba2c69d8480c2728692583f7f29928",
        callbackURL:"http://localhost:3000/login/auth/facebook/callback"
    }
}

module.exports.database = database;
module.exports.authentication = authentication;