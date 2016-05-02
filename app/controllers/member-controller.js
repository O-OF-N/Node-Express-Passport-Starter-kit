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
var Members = require('../models/member');
var log4js = require('log4js');

var logger = log4js.getLogger("app");
//Send success response
var sendSuccessResponse = function (res, json) {
    try {
        logger.trace('entering sendJsonResponse');
        res.json(json);
    } catch (err) {
        logger.error('sendJsonResponse: rendering json response failed with error:' + err);
    } finally{
        logger.trace('leaving sendJsonResponse');
    }
};

//Send error response
var sendErrorResponse = function (res, err) {
    try {
        logger.trace('entering sendErrorResponse');
        res.json(err);
    } catch (err) {
        logger.error('sendErrorResponse: rendering json response failed with error:' + err);
    } finally{
        logger.trace('leaving sendErrorResponse');
    }
};

//Get all members
var getAllMembers = function (req, res, next) {
    try {
        logger.trace('entering getAllMembers');
        var promise = Members.fetchAllMembers();
        promise.then(json => sendSuccessResponse(res, json), err => sendErrorResponse(res, err));
    } catch (err) {
        logger.error('getAllMembers: rendering json response failed with error:' + err);
        sendErrorResponse(res,err);
    } finally{
        logger.trace('leaving getAllMembers');
    }
};

//Get a single member by ID
var getMemberById = function (req, res, next) {
    try {
        logger.trace('entering getMemberById');
        var memberId = req.params.memberid;
        var promise = Members.fetchMemberById(memberId);
        promise.then(json => sendSuccessResponse(res, json), err => sendErrorResponse(res, err));
    } catch (err) {
        logger.error('getMemberById: rendering json response failed with error:' + err);
        sendErrorResponse(res,err);
    } finally{
        logger.trace('leaving getMemberById');
    }
};

//Get members by first name and last name
var getMemberByName = function (req, res, next) {
    try {
        logger.trace('entering getMemberByName');
        var filterObject = { firstName: req.params.firstName, lastName: req.params.lastName }
        var promise = Members.filterMembers(filterObject);
        promise.then(json => sendSuccessResponse(res, json), err => sendErrorResponse(res, err));
    } catch (err) {
        logger.error('getMemberByName: rendering json response failed with error:' + err);
        sendErrorResponse(res,err);
    } finally{
        logger.trace('leaving getMemberByName');
    }
};

//Add a single member
var addMemeber = function (memberReq, res) {
    try {
        logger.trace('entering addMemeber');
        var promise = Members.add(memberReq);
        promise.then(json => sendSuccessResponse(res, json), err => sendErrorResponse(res, err));
    } catch (err) {
        logger.error('addMemeber: rendering json response failed with error:' + err);
        sendErrorResponse(res,err);
    } finally{
        logger.trace('leaving addMemeber');
    }
};

//Update a member by ID
var updateMember = function (memberReq, res) {
 try {
        logger.trace('entering updateMember');
        var promise = Members.updateByID(memberReq);
        promise.then(json => sendSuccessResponse(res, json), err => sendErrorResponse(res, err));
    } catch (err) {
        logger.error('updateMember: rendering json response failed with error:' + err);
        sendErrorResponse(res,err);
    } finally{
        logger.trace('leaving updateMember');
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
module.exports.sendSuccessResponse = sendSuccessResponse;
module.exports.sendErrorResponse = sendErrorResponse;
