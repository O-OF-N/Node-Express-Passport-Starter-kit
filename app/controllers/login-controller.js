'use strict';
/*
Description: 
    Controller for adding, removing, updating and fetching members.
Author: 
    Vinod Mohanan
Update log:
        
*/
var passport = require('passport');
var express = require('express');
var router = express.Router();
var Members = require('../models/member');
var log4js = require('log4js');

var logger = log4js.getLogger("app");

router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
        logger.trace('the user is authenticated' + req.user.id);
        var promise = Members.fetchMemberByProfileId(req.user.id);
        promise.then((members) => {
            logger.trace('member fetched = ' + members.length);
            if (members.length < 1) {
                var memberPromise = Members.createNewUser(req.user.id);
                memberPromise.then((member) => {
                        logger.trace('New member Created');
                        res.redirect('/members/');
                    },(err)=>{
                        logger.error('Member creation failed');
                    });
            } else{
               logger.trace('Existing user'); 
               res.redirect('/members/');
            }
        }, (err) => {
            logger.error('err = ' + err);
        });
    });

module.exports.router = router;
