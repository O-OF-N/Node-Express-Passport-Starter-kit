'use strict';
/*
Description: 
    Controller for adding, removing, updating and fetching members.
Author: 
    Vinod Mohanan
Update log:
        
*/

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
var getAllMembers = function (req, res, next) {
    try {
        logger.trace('entering get all members');
        var promise = Members.fetchAllMembers();
        promise.then(json => sendJsonResponse(res, json), err => sendErrorResponse(res, err));
    } catch (err) {
        console.log('rendering json response failed with error:' + err);
    } finally{
        logger.trace('leaving get all members');
    }
};

//Get a single member by ID
var getMemberById = function (req, res, next) {
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
};

//Get members by first name and last name
var getMemberByName = function (req, res, next) {
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
};

//Add a single member
var addMemeber = function (memberReq, res) {
    try {
        logger.trace('entering post');
        var promise = Members.add(memberReq);
        promise.then(json => sendJsonResponse(res, json), err => sendErrorResponse(res, err));
    } catch (err) {
        console.log('rendering json response failed with error:' + err);
    } finally{
        logger.trace('leaving post');
    }
};

//Update a member by ID
var updateMember = function (memberReq, res) {
 try {
        logger.trace('entering put');
        var promise = Members.updateByID(memberReq);
        promise.then(json => sendJsonResponse(res, json), err => sendErrorResponse(res, err));
    } catch (err) {
        console.log('rendering json response failed with error:' + err);
    } finally{
        logger.trace('leaving put');
    }
};

//routes
router.get('/', (req, res, next) => getAllMembers(req, res, next));
router.get('/:memberid', (req, res, next) => getMemberById(req, res, next));
router.get('/:firstName/:lastName', (req, res, next) => getMemberByName(req, res, next));
router.post('/', (req, res, next) => addMemeber(req, res, next));
router.put('/', (req, res, next) => updateMember(req, res, next));

//exports
module.exports.router = router;
module.exports.getAllMembers = getAllMembers;
module.exports.getMemberById = getMemberById;
module.exports.getMemberByName = getMemberByName;
module.exports.addMemeber = addMemeber;
module.exports.updateMember = updateMember;
module.exports.sendJsonResponse = sendJsonResponse;
module.exports.sendErrorResponse = sendErrorResponse;
