var express = require('express');
var router = express.Router();
var fs = require('fs');
var Members = require('../models/member');

var sendJsonResponse = function (res, json) {
    try {
        console.log('inside success');
        res.json(json);
    } catch (err) {
        console.log('rendering json response failed with error:' + err);
    }
};

var sendErrorResponse = function (res, err) {
    try {
        console.log('inside error');
        res.send(err);
    } catch (err) {
        console.log('rendering json response failed with error:' + err);
    }
};

//Get all members
router.get('/', function (req, res, next) {
    try {
        var promise = Members.fetchAllMembers();
        promise.then(json => sendJsonResponse(res, json), err => sendErrorResponse(res, err));
    } catch (err) {
        console.log('rendering json response failed with error:' + err);
    }
});

//Get a single member by ID
router.get('/:memberid', function (req, res, next) {
    try {
        var memberId = req.params.memberid;
        var promise = Members.fetchMemberById(memberId);
        promise.then(json => sendJsonResponse(res, json), err => sendErrorResponse(res, err));
    } catch (err) {
        console.log('rendering json response failed with error:' + err);
    }
});

//Get members by first name and last name
router.get('/:firstName/:lastName', function (req, res, next) {
    try {
        var filterObject = { firstName: req.params.firstName, lastName: req.params.lastName }
        var promise = Members.filterMembers(filterObject);
        promise.then(json => sendJsonResponse(res, json), err => sendErrorResponse(res, err));
    } catch (err) {
        console.log('rendering json response failed with error:' + err);
    }
});

//Add a single member
router.post('/', function (memberReq, res) {
    try {
        var promise = Members.add(memberReq);
        promise.then(json => sendJsonResponse(res, json), err => sendErrorResponse(res, err));
    } catch (err) {
        console.log('rendering json response failed with error:' + err);
    }
});


//Update a member by ID
router.put('/', function (memberReq, res) {

});
//Delete a member by ID
module.exports = router;
