var express = require('express');
var router = express.Router();
var fs = require('fs');
var Members = require('../models/member');
var log4js = require('log4js');

var logger = log4js.getLogger("app");
//Send success response
var sendJsonResponse = function (res, json) {
    try {
        logger.trace('entering sendJsonResponse');
        res.json(json);
    } catch (err) {
        logger.error('rendering json response failed with error:' + err);
    } finally{
        logger.trace('leaving sendJsonResponse');
    }
};

//Send error response
var sendErrorResponse = function (res, err) {
    try {
        logger.trace('entering sendErrorResponse');
        res.send(err);
    } catch (err) {
        logger.error('rendering json response failed with error:' + err);
    } finally{
        logger.trace('leaving sendErrorResponse');
    }
};


//Get all members
router.get('/', function (req, res, next) {
    try {
        logger.trace('entering get all members');
        var promise = Members.fetchAllMembers();
        promise.then(json => sendJsonResponse(res, json), err => sendErrorResponse(res, err));
    } catch (err) {
        console.log('rendering json response failed with error:' + err);
    } finally{
        logger.trace('leaving get all members');
    }
});

//Get a single member by ID
router.get('/:memberid', function (req, res, next) {
    try {
        logger.trace('entering get member by id');
        var memberId = req.params.memberid;
        var promise = Members.fetchMemberById(memberId);
        promise.then(json => sendJsonResponse(res, json), err => sendErrorResponse(res, err));
    } catch (err) {
        console.log('rendering json response failed with error:' + err);
    } finally{
        logger.trace('leaving get member by id');
    }
});

//Get members by first name and last name
router.get('/:firstName/:lastName', function (req, res, next) {
    try {
        logger.trace('entering get member by name');
        var filterObject = { firstName: req.params.firstName, lastName: req.params.lastName }
        var promise = Members.filterMembers(filterObject);
        promise.then(json => sendJsonResponse(res, json), err => sendErrorResponse(res, err));
    } catch (err) {
        console.log('rendering json response failed with error:' + err);
    } finally{
        logger.trace('leaving get member by name');
    }
});

//Add a single member
router.post('/', function (memberReq, res) {
    try {
        logger.trace('entering post');
        var promise = Members.add(memberReq);
        promise.then(json => sendJsonResponse(res, json), err => sendErrorResponse(res, err));
    } catch (err) {
        console.log('rendering json response failed with error:' + err);
    } finally{
        logger.trace('leaving post');
    }
});


//Update a member by ID
router.put('/:memberId', function (memberReq, res) {
 try {
        logger.trace('entering put');
        var promise = Members.updateByID(memberReq);
        promise.then(json => sendJsonResponse(res, json), err => sendErrorResponse(res, err));
    } catch (err) {
        console.log('rendering json response failed with error:' + err);
    } finally{
        logger.trace('leaving put');
    }
});
//Delete a member by ID
module.exports = router;
