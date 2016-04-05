var express = require('express');
var router = express.Router();
var fs = require('fs');
var Members = require('../models/member');

var sendJsonResponse = function(res,json){
    console.log('inside success');
    res.json(json);
};

var sendErrorResponse = function(res,err){
    console.log('inside error');
    res.send(err);
};

//Get all members
router.get('/', function(req, res, next) {
  var promise = Members.fetchAllMembers();
  promise.then(json => sendJsonResponse(res,json),err => sendErrorResponse(res,err));
});

//Get a single member by ID
router.get('/:memberid', function(req, res, next) {
  var memberId = req.params.memberid;
  var promise = Members.fetchMemberById(memberId);
  promise.then(json => sendJsonResponse(res,json),err => sendErrorResponse(res,err));
});

//Get members by first name and last name
router.get('/:firstName/:lastName', function(req, res, next) {
  var filterObject = {firstName:req.params.firstName, lastName:req.params.lastName}
  var promise = Members.filterMembers(filterObject);
  promise.then(json => sendJsonResponse(res,json),err => sendErrorResponse(res,err));
});

//Add a single member
router.post('/',function(memberReq,res){
   var promise = Members.add(memberReq);
  promise.then(json => sendJsonResponse(res,json),err => sendErrorResponse(res,err));
});


//Update a member by ID

//Delete a member by ID
module.exports = router;
